import { expect, it, vi } from 'vitest'
import './index.js'
import './styles.css'
import {
  idle,
  IMG,
  IMG_HTML,
  modalImg,
  mountZoom,
  ready,
  record,
  until,
} from './test-helpers.js'

it('has no dialog without an image, and one under the portal with it', async () => {
  const bare = mountZoom('<image-zoom></image-zoom>')
  expect(bare.dialog).toBeNull()
  const el = await ready(IMG_HTML)
  const d = el.dialog!
  expect(d.parentElement?.matches('body > [data-rmiz-portal]')).toBe(true)
  expect(
    d.matches('dialog[data-rmiz-modal][role="dialog"][aria-modal="true"]'),
  ).toBe(true)
  expect(d.id).toMatch(/^rmiz-modal-[0-9a-f]{12}$/)
  expect(d.open).toBe(false)
  expect(d.getAttribute('aria-labelledby')).toBe(
    d.id.replace('rmiz-modal-', 'rmiz-modal-img-'),
  )
  expect(modalImg(el).id).toBe(d.getAttribute('aria-labelledby'))
})

it('builds overlay, then content with the img and the unzoom button', async () => {
  const el = await ready(IMG_HTML)
  const [overlay, content] = el.dialog!.children
  expect(overlay?.getAttribute('data-rmiz-modal-overlay')).toBe('hidden')
  expect(content?.matches('div[data-rmiz-modal-content]')).toBe(true)
  expect(content?.children[0]).toBe(modalImg(el))
  expect(
    content?.children[1]?.matches(
      'button[data-rmiz-btn-unzoom][type="button"][aria-label="Minimize image"]',
    ),
  ).toBe(true)
  expect(
    content?.querySelector('svg[data-rmiz-btn-unzoom-icon]'),
  ).not.toBeNull()
})

it('writes the modal img from the source', async () => {
  const el = await ready(
    `<image-zoom><img src="${IMG}" alt="A lighthouse" width="200"></image-zoom>`,
  )
  const m = modalImg(el)
  if (!(m instanceof HTMLImageElement)) {
    throw new TypeError('the built-in modal img is an <img>')
  }
  const s = el.state.modalImgStyle
  expect(m.alt).toBe('A lighthouse')
  expect(m.getAttribute('src')).toBe(el.state.src)
  expect(m.getAttribute('width')).toBe(String(s.width))
  expect(m.getAttribute('height')).toBe(String(s.height))
  // CSSOM serializes what it is given (`translate(0,0)` → `translate(0px, 0px)`)
  const probe = document.createElement('div')
  probe.style.transform = s.transform ?? ''
  expect(m.style.transform).not.toBe('')
  expect(m.style.transform).toBe(probe.style.transform)
})

it('writes an empty alt and leaves out empty source attributes', async () => {
  const el = await ready(`<image-zoom><img src="${IMG}" alt=""></image-zoom>`)
  const m = modalImg(el)
  expect(m.getAttribute('alt')).toBe('')
  expect(
    ['crossorigin', 'sizes', 'srcset'].filter(name => m.hasAttribute(name)),
  ).toEqual([])
})

it('does not reload the modal img on an update that changes nothing', async () => {
  const el = await ready(IMG_HTML)
  const loads = record(modalImg(el), 'load')
  await vi.waitFor(() => {
    expect(loads).toHaveLength(1)
  })
  el.labelZoom = 'Open'
  await idle()
  expect(loads).toHaveLength(1)
})

it('leaves a foreign style property on the modal img alone', async () => {
  const el = await ready(IMG_HTML)
  modalImg(el).style.outline = '1px solid red'
  // Chrome serializes the shorthand as `red solid 1px`
  const outline = modalImg(el).style.outline
  expect(outline).not.toBe('')
  el.zoomMargin = 10
  expect(modalImg(el).style.outline).toBe(outline)
})

it('reflects label-unzoom and dialog-class, and follows changes', async () => {
  const el = await ready(
    `<image-zoom label-unzoom="Close" dialog-class="a b"><img src="${IMG}"></image-zoom>`,
  )
  expect(el.dialog!.className).toBe('a b')
  expect(
    el
      .dialog!.querySelector('[data-rmiz-btn-unzoom]')
      ?.getAttribute('aria-label'),
  ).toBe('Close')
  el.dialogClass = 'c'
  expect(el.dialog!.className).toBe('c')
})

it('removes the dialog before reporting hasImage: false, and creates it before reporting true', async () => {
  const el = mountZoom(IMG_HTML)
  const seen: Array<[boolean, boolean]> = []
  el.addEventListener('statechange', () =>
    seen.push([el.state.hasImage, el.dialog !== null]),
  )
  await until(el, s => s.hasImage)
  el.querySelector('img')!.style.display = 'none'
  await until(el, s => !s.hasImage)
  expect(seen).toContainEqual([true, true])
  expect(seen.filter(([has, dialog]) => has !== dialog)).toEqual([])
})

it('reuses an existing portal and never removes it', async () => {
  const el = await ready(IMG_HTML)
  const portal = document.querySelector('[data-rmiz-portal]')!
  const old = el.dialog!
  el.remove()
  expect(el.dialog).toBeNull()
  expect(old.isConnected).toBe(false)
  expect(portal.isConnected).toBe(true)
  const again = await ready(IMG_HTML)
  expect(again.dialog!.parentElement).toBe(portal)
})

it('appends the same built-in content to the next dialog after a reconnect', async () => {
  const el = await ready(IMG_HTML)
  const first = el.dialog!
  const content = first.querySelector('[data-rmiz-modal-content]')
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  expect(el.dialog).not.toBe(first)
  expect(el.dialog!.querySelector('[data-rmiz-modal-content]')).toBe(content)
})

it('does not dispatch statechange when an update changes nothing', async () => {
  const el = await ready(IMG_HTML)
  const events = record(el, 'statechange')
  el.labelZoom = 'Open'
  el.labelZoom = 'Open'
  expect(events).toHaveLength(0)
})

it('keeps the snapshot through a no-op update, and freezes a changed one', async () => {
  const el = await ready(IMG_HTML)
  const before = el.state
  el.labelZoom = 'Open'
  expect(el.state).toBe(before)
  el.zoomMargin = 10
  expect(el.state).not.toBe(before)
  expect(el.state.modalImgStyle).not.toEqual(before.modalImgStyle)
  expect(Object.isFrozen(el.state)).toBe(true)
  expect(Object.isFrozen(el.state.modalImgStyle)).toBe(true)
})
