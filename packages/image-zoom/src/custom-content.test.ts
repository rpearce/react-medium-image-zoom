import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import {
  flush,
  get,
  ghost,
  idle,
  IMG,
  mount,
  mountZoom,
  open,
  ready,
  record,
  until,
} from './test-helpers.js'
import type { ImageZoomElement } from './types.js'

const CUSTOM = `<image-zoom custom-content><img src="${IMG}" alt="x"></image-zoom>`

function dialogOf(el: ImageZoomElement): HTMLDialogElement {
  const dialog = el.dialog
  if (dialog === null) throw new TypeError('dialogOf: el.dialog is null')
  return dialog
}

function addContent(el: ImageZoomElement, withImg = true): HTMLElement {
  const c = document.createElement('div')
  c.setAttribute('data-rmiz-modal-content', '')
  if (withImg) {
    const img = document.createElement('img')
    img.setAttribute('data-rmiz-modal-img', '')
    img.src = IMG
    c.append(img)
  }
  dialogOf(el).append(c)
  return c
}

// CSSOM serializes what it is given (`translate(0px,0px)` → `translate(0px, 0px)`)
function cssTransform(value: string | undefined): string {
  const probe = document.createElement('div')
  probe.style.transform = value ?? ''
  return probe.style.transform
}

// Resolves from a requestAnimationFrame callback: code after `await frame()`
// runs in that frame's rendering step, before its style recalc and paint
async function frame(): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>()
  requestAnimationFrame(() => {
    resolve()
  })
  await promise
}

// The computed (matrix) form of a transform
function computedTransform(value: string | undefined): string {
  const probe = mount('<div></div>')
  probe.style.transform = value ?? ''
  return getComputedStyle(probe).transform
}

it('creates only the overlay and latches the mode at setup', async () => {
  const el = await ready(CUSTOM)
  const dialog = dialogOf(el)
  expect([...dialog.children].map(c => c.tagName)).toEqual(['DIV'])
  expect(
    dialog.firstElementChild?.hasAttribute('data-rmiz-modal-overlay'),
  ).toBe(true)
  el.customContent = false
  await flush()
  expect(dialogOf(el).children).toHaveLength(1)
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  expect(dialogOf(el).querySelector('[data-rmiz-modal-content]')).not.toBeNull()
  el.remove()
})

it('cannot zoom, and hides the ghost, until a content container exists; the img may come later', async () => {
  const el = await ready(CUSTOM)
  const source = get(el, 'img', HTMLImageElement)
  const zooms = record(el, 'zoomchange')
  source.click()
  expect(zooms).toHaveLength(0)
  expect(ghost(el).hidden).toBe(true)
  addContent(el, false)
  await flush()
  expect(ghost(el).hidden).toBe(false)
  source.click()
  expect(zooms).toHaveLength(1)
  expect(el.state.modalState).toBe('LOADING')
})

it('a modal img that arrives while zoomed is shown zoomed and the state stays LOADING', async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el, false)
  el.zoomed = true
  const img = document.createElement('img')
  img.setAttribute('data-rmiz-modal-img', '')
  c.append(img)
  await flush()
  expect(img.style.transform).not.toBe('')
  expect(img.style.transform).toBe(
    cssTransform(el.state.modalImgStyle.transform),
  )
  expect(el.state.modalState).toBe('LOADING')
  el.zoomed = false
  await until(el, s => s.modalState === 'UNLOADED')
  expect(el.state.modalState).toBe('UNLOADED')
})

// Synchronous through a non-zoomed attribute change, so no frame can style
// the img first; getAnimations() flushes style
it('a modal img that arrives while zoomed is pre-styled zoomed and starts no transition', async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el, false)
  el.zoomed = true
  const img = document.createElement('img')
  img.setAttribute('data-rmiz-modal-img', '')
  c.append(img)
  el.labelZoom = 'Open'
  expect(img.getAnimations()).toHaveLength(0)
  expect(img.style.transform).toBe(
    cssTransform(el.state.modalImgStyle.transform),
  )
  expect(el.state.modalState).toBe('LOADING')
})

it("writes only its own properties on the consumer's img", async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el)
  const img = get(c, 'img', HTMLImageElement)
  img.style.outline = '1px solid red'
  img.alt = 'mine'
  // Chrome serializes the shorthand as `red solid 1px`
  const outline = img.style.outline
  expect(outline).not.toBe('')
  await flush()
  el.zoomMargin = 10
  expect([img.style.outline, img.alt]).toEqual([outline, 'mine'])
  expect(img.id).toBe(dialogOf(el).getAttribute('aria-labelledby'))
  expect(img.getAttribute('width')).toBe(String(el.state.modalImgStyle.width))
})

it('ignores clicks on custom content', async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el)
  await flush()
  await open(el)
  const zooms = record(el, 'zoomchange')
  c.click()
  get(c, 'img', HTMLImageElement).click()
  expect(zooms).toHaveLength(0)
})

it.each([true, false])(
  'a remount during unzoom still animates (pre-styled: %j)',
  async preStyled => {
    const el = await ready(CUSTOM)
    const c = addContent(el)
    await flush()
    await open(el)
    const old = get(c, 'img', HTMLImageElement)
    const next = document.createElement('img')
    next.setAttribute('data-rmiz-modal-img', '')
    next.src = IMG
    if (preStyled) next.style.cssText = old.style.cssText
    const outcome = Promise.withResolvers<string>()
    next.addEventListener(
      'transitionrun',
      () => {
        outcome.resolve('ran')
      },
      { once: true },
    )
    const timer = setTimeout(() => {
      outcome.resolve('none')
    }, 1000)
    c.replaceChildren(next)
    el.zoomed = false
    await expect(outcome.promise).resolves.toBe('ran')
    clearTimeout(timer)
  },
)

// A new transition's clock starts at the next frame, so until then its
// current value is its start value
it('an unstyled img remounted during unzoom transitions from the zoomed style', async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el)
  await flush()
  await open(el)
  const zoomed = computedTransform(el.state.modalImgStyle.transform)
  expect(zoomed).not.toBe('none')
  const next = document.createElement('img')
  next.setAttribute('data-rmiz-modal-img', '')
  next.src = IMG
  c.replaceChildren(next)
  el.zoomed = false
  expect(next.getAnimations()).toHaveLength(1)
  expect(getComputedStyle(next).transform).toBe(zoomed)
})

// Inserted during a frame's rendering step, so that frame's style recalc
// follows before any task: a batched update would come after the img was
// first computed unstyled, and it would then transition in
it('an unstyled img remounted while zoomed is styled before the next frame, without a transition', async () => {
  const el = await ready(CUSTOM)
  const c = addContent(el)
  await flush()
  await open(el)
  const next = document.createElement('img')
  next.setAttribute('data-rmiz-modal-img', '')
  next.src = IMG
  const runs = record(next, 'transitionrun')
  await frame()
  c.replaceChildren(next)
  // One frame to render it, and one more for a transition started there to
  // report transitionrun
  await frame()
  await frame()
  expect(next.style.transform).toBe(
    cssTransform(el.state.modalImgStyle.transform),
  )
  expect(runs).toHaveLength(0)
  expect(el.state.modalState).toBe('LOADED')
})

it('with the dialog closed, a dialog mutation updates in the next batch, not at once', async () => {
  const el = await ready(CUSTOM)
  addContent(el, false)
  await Promise.resolve() // the observer's callback has run
  expect(ghost(el).hidden).toBe(true)
  await flush()
  expect(ghost(el).hidden).toBe(false)
})

it('fills an empty div for SVG sources', async () => {
  const el = mountZoom(
    `<image-zoom custom-content><svg width="50" height="50"></svg></image-zoom>`,
  )
  // The source's first resize observation updates (and re-clones) too
  await idle()
  const c = document.createElement('div')
  c.setAttribute('data-rmiz-modal-content', '')
  const d = document.createElement('div')
  d.setAttribute('data-rmiz-modal-img', '')
  c.append(d)
  dialogOf(el).append(c)
  await flush()
  const clone = d.querySelector('svg')
  expect(clone).not.toBeNull()
  // Its own clone insertion queues no further update: no re-clone loop
  await idle()
  expect(d.querySelector('svg')).toBe(clone)
})

it('a slotted zoom button requests zoom through the host, from the button or its children', async () => {
  const el = await ready(
    `<image-zoom><img src="${IMG}"><button slot="zoom-button"><i>z</i></button></image-zoom>`,
  )
  const zooms = record(el, 'zoomchange')
  el.addEventListener('zoomchange', e => {
    e.preventDefault()
  })
  get(el, 'button', HTMLButtonElement).click()
  get(el, 'i', HTMLElement).click()
  expect(zooms).toHaveLength(2)
})

it('a slotted zoom button click stopped through originalEvent does not reach ancestors', async () => {
  const wrap = mount(
    `<div><image-zoom><img src="${IMG}"><button slot="zoom-button">z</button></image-zoom></div>`,
  )
  const el = wrap.querySelector('image-zoom')
  if (el === null) throw new TypeError('no <image-zoom> in the markup')
  await until(el, s => s.hasImage)
  const outside = record(wrap, 'click')
  el.addEventListener('zoomchange', e => {
    e.detail.originalEvent.stopPropagation()
  })
  get(el, 'button', HTMLButtonElement).click()
  expect(outside).toHaveLength(0)
})
