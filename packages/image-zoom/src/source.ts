import type { Instance } from './instance.js'
import { observeResize, unobserveResize } from './scheduler.js'
import { testImg, testImgLoaded, testSvg } from './utils/element-tests.js'
import { getImgSrc } from './utils/get-img-src.js'
import type { SupportedImage } from './utils/types.js'

/**
 * The selector query used to find and track the image
 */
export const IMAGE_QUERY = ['img', 'svg', '[role="img"]', '[data-zoom]']
  .map(x => `${x}:not([aria-hidden="true"])`)
  .join(',')

/**
 * Per-instance listeners and observers, so untrack can remove them
 */
interface Tracking {
  readonly onLoad: () => void
  readonly onClick: (event: Event) => void
  readonly retry: () => void // slotchange and the not-found observer
  readonly content: MutationObserver
  notFound: MutationObserver | undefined
}

const tracking = new WeakMap<Instance, Tracking>()

// Like querySelector(IMAGE_QUERY), which types its match the same way
function matchesImage(el: Element): el is SupportedImage {
  return el.matches(IMAGE_QUERY)
}

/**
 * The first image among the default slot's assigned elements (flattened)
 */
export function findImage(slot: HTMLSlotElement): SupportedImage | null {
  for (const el of slot.assignedElements({ flatten: true })) {
    const found = matchesImage(el)
      ? el
      : el.querySelector<SupportedImage>(IMAGE_QUERY)
    if (found !== null) return found
  }
  return null
}

/**
 * Whether a content mutation can move the ghost. Attribute changes on the host
 * belong to attributeChangedCallback, and anything inside a direct child with
 * a `slot` attribute (the consumer's zoom button, its icons) is not content.
 */
function isContentChange(host: HTMLElement, record: MutationRecord): boolean {
  if (record.target === host) return record.type === 'childList'
  let child: Node | null = record.target
  while (child !== null && child.parentNode !== host) {
    child = child.parentNode
  }
  return !(child instanceof Element && child.hasAttribute('slot'))
}

/**
 * Port of setAndTrackImg: find the image and track it, or watch for one
 */
function search(inst: Instance, t: Tracking): void {
  const img = findImage(inst.parts.slot)
  if (img === null) {
    if (t.notFound === undefined) {
      t.notFound = new MutationObserver(t.retry)
      t.notFound.observe(inst.host, { childList: true, subtree: true })
    }
    return
  }
  inst.imgEl = img
  t.notFound?.disconnect()
  img.addEventListener('load', t.onLoad)
  img.addEventListener('click', t.onClick)
  loadSource(inst)
  observeResize(img, inst.job)
  t.content.observe(inst.host, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}

export function track(inst: Instance): void {
  const host = inst.host
  const t: Tracking = {
    onLoad: () => {
      loadSource(inst)
    },
    onClick: event => {
      inst.hooks.request(true, event)
    },
    // Once an image is tracked, the element never searches again
    retry: () => {
      if (inst.imgEl === null) search(inst, t)
    },
    content: new MutationObserver(records => {
      if (records.some(r => isContentChange(host, r))) inst.hooks.queue()
    }),
    notFound: undefined,
  }
  tracking.set(inst, t)
  inst.parts.slot.addEventListener('slotchange', t.retry)
  search(inst, t)
}

export function untrack(inst: Instance): void {
  const t = tracking.get(inst)
  if (t === undefined) return
  tracking.delete(inst)
  inst.parts.slot.removeEventListener('slotchange', t.retry)
  t.notFound?.disconnect()
  t.content.disconnect()
  const img = inst.imgEl
  if (img !== null) {
    img.removeEventListener('load', t.onLoad)
    img.removeEventListener('click', t.onClick)
    unobserveResize(img)
  }
}

/**
 * Port of handleImgLoad: preload the source's current src and record it as
 * loaded. A completion after teardown (a new generation) is ignored.
 */
export function loadSource(inst: Instance): void {
  const imgEl = inst.imgEl
  const imgSrc = getImgSrc(imgEl)

  if (imgSrc == null || imgSrc === '') return

  const img = new Image()

  if (testImg(imgEl)) {
    img.sizes = imgEl.sizes
    img.srcset = imgEl.srcset
    img.crossOrigin = imgEl.crossOrigin
  }

  // img.src must be set after sizes and srcset
  // because of Firefox flickering on zoom
  img.src = imgSrc

  const generation = inst.generation
  const setLoaded = (): void => {
    if (inst.generation !== generation) return
    inst.loadedImgEl = img
    inst.hooks.queue()
  }

  img
    .decode()
    .then(setLoaded)
    .catch(() => {
      if (testImgLoaded(img)) {
        setLoaded()
        return
      }
      img.onload = setLoaded
    })
}

/**
 * Port of hasImage: tracked, loaded (or SVG), and not display:none
 */
export function hasImage(inst: Instance): boolean {
  const imgEl = inst.imgEl
  return (
    imgEl !== null &&
    (inst.loadedImgEl !== undefined || testSvg(imgEl)) &&
    getComputedStyle(imgEl).display !== 'none'
  )
}
