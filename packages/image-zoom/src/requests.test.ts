import { expect, it, vi } from 'vitest'
import './index.js'
import './styles.css'
import {
  builtInButton,
  end,
  IMG,
  IMG_HTML,
  mount,
  mountZoom,
  open,
  ready,
  record,
  until,
  zoomEvents,
} from './test-helpers.js'

it('a click on the source requests zoom and, uncancelled, zooms', async () => {
  const el = await ready(IMG_HTML)
  const events = zoomEvents(el)
  const click = new MouseEvent('click', { bubbles: true })
  el.querySelector('img')!.dispatchEvent(click)
  expect(events).toHaveLength(1)
  expect(events[0]).toMatchObject({
    bubbles: true,
    cancelable: true,
    composed: false,
  })
  expect(events[0]!.detail).toEqual({ zoomed: true, originalEvent: click })
  expect([el.zoomed, el.state.modalState]).toEqual([true, 'LOADING'])
})

it('preventDefault gives controlled mode', async () => {
  const el = await ready(IMG_HTML)
  el.addEventListener('zoomchange', e => {
    e.preventDefault()
  })
  el.querySelector('img')!.click()
  expect([el.zoomed, el.state.modalState]).toEqual([false, 'UNLOADED'])
})

it('the built-in zoom button requests zoom', async () => {
  const el = await ready(IMG_HTML)
  const events = zoomEvents(el)
  builtInButton(el).click()
  expect(events.map(e => e.detail.zoomed)).toEqual([true])
})

it('disabled drops every request', async () => {
  const el = await ready(`<image-zoom disabled><img src="${IMG}"></image-zoom>`)
  const events = zoomEvents(el)
  el.querySelector('img')!.click()
  builtInButton(el).click()
  el.zoomed = true
  end(el)
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  )
  expect(events).toHaveLength(0)
})

it('drops a zoom request while there is no image', () => {
  const el = mountZoom('<image-zoom><p>text</p></image-zoom>')
  const events = zoomEvents(el)
  el.querySelector('p')!.click()
  builtInButton(el).click()
  expect(events).toHaveLength(0)
})

it.each([
  '[data-rmiz-modal-content]',
  '[data-rmiz-modal-img]',
  '[data-rmiz-btn-unzoom]',
])('a click on %s requests unzoom and stops there', async sel => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = zoomEvents(el)
  const outside = record(document.body, 'click')
  el.dialog!.querySelector<HTMLElement>(sel)!.click()
  expect(events.map(e => e.detail.zoomed)).toEqual([false])
  expect(outside).toHaveLength(0)
})

it('a click on the overlay does not request unzoom', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = zoomEvents(el)
  el.dialog!.querySelector<HTMLElement>('[data-rmiz-modal-overlay]')!.click()
  expect(events).toHaveLength(0)
})

it('cancel is prevented, and close requests unzoom', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = zoomEvents(el)
  expect(
    el.dialog!.dispatchEvent(new Event('cancel', { cancelable: true })),
  ).toBe(false)
  el.dialog!.dispatchEvent(new Event('close'))
  expect(events.map(e => e.detail.zoomed)).toEqual([false])
})

it('every completed unzoom is followed by one more zoomchange(false) from close', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = zoomEvents(el)
  el.zoomed = false
  end(el)
  expect(events).toHaveLength(0)
  await vi.waitFor(() => {
    expect(events.map(e => e.detail.zoomed)).toEqual([false])
  })
})

it("originalEvent.stopPropagation() keeps the click from the host's ancestors", async () => {
  const wrap = mount(`<div>${IMG_HTML}</div>`)
  const el = wrap.querySelector('image-zoom')!
  await until(el, s => s.hasImage)
  const outside = record(wrap, 'click')
  el.addEventListener('zoomchange', e => {
    e.detail.originalEvent.stopPropagation()
  })
  el.querySelector('img')!.click()
  expect(outside).toHaveLength(0)
})

it('a close that fires after the element was removed makes no request', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const closes = record(el.dialog!, 'close')
  const events = zoomEvents(el)
  el.zoomed = false
  end(el) // UNLOADED calls dialog.close(), whose `close` event comes later
  el.remove()
  await vi.waitFor(() => {
    expect(closes).toHaveLength(1)
  })
  expect(events).toHaveLength(0)
})
