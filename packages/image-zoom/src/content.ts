import { parseCrossOrigin } from './attributes.js'
import type { Instance } from './instance.js'
import { createIconCompress } from './template.js'
import { adjustSvgIDs } from './utils/adjust-svg-ids.js'
import { testImgLoaded, testSvg } from './utils/element-tests.js'
import type { StyleObject } from './utils/types.js'

/**
 * Set an attribute only when its value differs, or remove it for undefined.
 * Re-setting the same src, srcset or sizes reloads an <img> (run: a second
 * `load` event), so an update that changes nothing must not write them.
 */
function put(el: Element, name: string, value: string | undefined): void {
  if (value === undefined) {
    el.removeAttribute(name)
  } else if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value)
  }
}

const nonEmpty = (value: string | null | undefined): string | undefined =>
  value == null || value === '' ? undefined : value

/**
 * The modal img node for a source kind: an <img>, or a <div> for SVG sources
 */
function createModalImg(isSvg: boolean): HTMLElement {
  const node = document.createElement(isSvg ? 'div' : 'img')
  node.setAttribute('data-rmiz-modal-img', '')
  return node
}

/**
 * The built-in modalContent: the modal img, then the unzoom button. Created
 * once per instance, by the first read of modalContent or the first built-in
 * dialog; it survives teardown and is appended to every dialog.
 */
export function ensureContent(inst: Instance): HTMLElement {
  if (inst.content !== null) return inst.content

  const content = document.createElement('div')
  content.setAttribute('data-rmiz-modal-content', '')

  const img = createModalImg(inst.state.isSvg)

  const button = document.createElement('button')
  button.setAttribute('data-rmiz-btn-unzoom', '')
  button.type = 'button'
  button.appendChild(createIconCompress())
  // Port of handleBtnUnzoomClick
  button.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    inst.hooks.request(false, event)
  })

  content.append(img, button)
  inst.content = content
  inst.modalImg = img
  inst.btnUnzoom = button
  return content
}

/**
 * The modal img of the source's kind. The node has the wrong kind when the
 * content was built before the first update of an SVG source (from the
 * initial state, or by a read of modalContent), or when a reconnect finds
 * another kind of source (a tracked image is never re-searched). Only the
 * element's own node is replaced, in place.
 */
function matchKind(inst: Instance, node: HTMLElement): HTMLElement {
  const isSvg = inst.state.isSvg
  const isImgNode = node instanceof HTMLImageElement
  if (isImgNode !== isSvg) return node // already the right kind
  const next = createModalImg(isSvg)
  node.replaceWith(next)
  inst.modalImg = next
  return next
}

/**
 * The element's own nodes first, img then button, ahead of anything the
 * consumer added (a prepend, say). Each moves only when out of place, so an
 * update never touches consumer nodes or their order.
 */
function keepFirst(inst: Instance, img: HTMLElement): void {
  const content = inst.content
  const button = inst.btnUnzoom
  if (content === null || button === null) return
  if (content.firstChild !== img) content.prepend(img)
  if (img.nextSibling !== button) img.after(button)
}

/**
 * The source's attributes, with the zoom-* values swapped in at LOADED once
 * the zoom image has loaded. As today's zoomImg spread does, a provided
 * (present) value replaces the source's even when empty, and an absent one
 * keeps it; zoom-src must be non-empty, or there is no zoom image.
 */
function writeImg(inst: Instance, img: HTMLImageElement): void {
  const s = inst.state
  const swap = s.modalState === 'LOADED' && s.isZoomImgLoaded
  const zoom = (name: string): string | null =>
    swap ? inst.host.getAttribute(name) : null
  put(img, 'alt', s.alt) // an empty alt is meaningful
  put(img, 'crossorigin', zoom('zoom-crossorigin') ?? nonEmpty(s.crossOrigin))
  // sizes and srcset before src, because of Firefox flickering on zoom
  put(img, 'sizes', zoom('zoom-sizes') ?? nonEmpty(s.sizes))
  put(img, 'srcset', zoom('zoom-srcset') ?? nonEmpty(s.srcset))
  put(img, 'src', nonEmpty(zoom('zoom-src')) ?? nonEmpty(s.src))
}

/**
 * The element as its own consumer: while there is an image, the modal img of
 * the source's kind, first with the button after it, and for an <img> its
 * source attributes; then the unzoom button's label
 */
export function writeBuiltIn(inst: Instance): void {
  const node = inst.modalImg
  if (node !== null && inst.state.hasImage) {
    const img = matchKind(inst, node)
    keepFirst(inst, img)
    if (img instanceof HTMLImageElement) writeImg(inst, img)
  }
  inst.btnUnzoom?.setAttribute(
    'aria-label',
    inst.host.getAttribute('label-unzoom') ?? 'Minimize image',
  )
}

/**
 * At the start of each zoom: the unzoom button gets a clone of the host's
 * slot="icon-unzoom" child, or else the default compress icon. The child
 * itself is never rendered, since no slot has that name.
 */
export function cloneUnzoomIcon(inst: Instance): void {
  const button = inst.btnUnzoom
  if (button === null) return
  const child = inst.host.querySelector(':scope > [slot="icon-unzoom"]')
  if (child === null) {
    if (button.querySelector('[data-rmiz-btn-unzoom-icon]') === null) {
      button.replaceChildren(createIconCompress())
    }
    return
  }
  const clone = child.cloneNode(true)
  if (clone instanceof Element) clone.removeAttribute('slot')
  button.replaceChildren(clone)
}

/**
 * Port of UNSAFE_handleSvg, run on every update: replace the target's content
 * with an id-adjusted clone of the source SVG, sized from the modal img style
 */
export function cloneSvg(
  inst: Instance,
  target: HTMLElement,
  style: StyleObject,
): void {
  const source = inst.imgEl
  if (!testSvg(source)) return
  const clone = source.cloneNode(true)
  if (!(clone instanceof SVGElement)) return

  // Deal with cloned SVG ID duplicate issues from https://github.com/rpearce/react-medium-image-zoom/issues/438
  adjustSvgIDs(clone)

  clone.style.width = `${style.width ?? 0}px`
  clone.style.height = `${style.height ?? 0}px`
  clone.addEventListener('click', event => {
    inst.hooks.request(false, event)
  })

  target.firstChild?.remove()
  target.appendChild(clone)
}

/**
 * Port of loadZoomImg, run on entering LOADING: preload zoom-src with the
 * zoom-* attributes as they are now. isZoomImgLoaded then stays true until
 * teardown; a completion after teardown (a new generation) is ignored.
 */
export function loadZoomImage(inst: Instance): void {
  const host = inst.host
  const zoomImgSrc = host.getAttribute('zoom-src') ?? ''
  if (zoomImgSrc === '') return

  const img = new Image()
  img.sizes = host.getAttribute('zoom-sizes') ?? ''
  img.srcset = host.getAttribute('zoom-srcset') ?? ''
  img.crossOrigin = parseCrossOrigin(host.getAttribute('zoom-crossorigin'))
  img.src = zoomImgSrc

  const generation = inst.generation
  const setLoaded = (): void => {
    if (inst.generation !== generation) return
    inst.isZoomImgLoaded = true
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
