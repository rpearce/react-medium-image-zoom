import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import {
  builtInButton,
  end,
  get,
  IMG,
  IMG_HTML,
  open,
  ready,
  record,
  until,
} from './test-helpers.js'
import type { ImageZoomElement } from './types.js'

/**
 * el.modalContent, which built-in mode must provide
 */
function contentOf(el: ImageZoomElement): HTMLElement {
  const c = el.modalContent
  if (c === null) throw new TypeError('modalContent: null in built-in mode')
  return c
}

const tags = (c: HTMLElement): string[] => [...c.children].map(n => n.tagName)

it('is created on first read, before any image, and is not in the document', () => {
  const el = document.createElement('image-zoom')
  const c = contentOf(el)
  expect(c.matches('div[data-rmiz-modal-content]')).toBe(true)
  expect(c.isConnected).toBe(false)
  expect(el.modalContent).toBe(c)
  expect(
    get(c, 'img[data-rmiz-modal-img]', HTMLImageElement).hasAttribute('src'),
  ).toBe(false)
})

it('is null in custom-content mode, and follows the attribute while disconnected', () => {
  const el = document.createElement('image-zoom')
  el.customContent = true
  expect(el.modalContent).toBeNull()
  el.customContent = false
  expect(el.modalContent).not.toBeNull()
})

it('follows the mode latched at setup while connected, and keeps its identity', async () => {
  const custom = await ready(
    `<image-zoom custom-content><img src="${IMG}" alt=""></image-zoom>`,
  )
  custom.customContent = false
  expect(custom.modalContent).toBeNull()
  const el = await ready(IMG_HTML)
  const c = contentOf(el)
  el.customContent = true
  expect(el.modalContent).toBe(c)
  el.remove()
  expect(el.modalContent).toBeNull()
  el.customContent = false
  expect(el.modalContent).toBe(c)
})

it("keeps its identity and the consumer's nodes across dialog recreation and teardown", async () => {
  const el = await ready(IMG_HTML)
  const c = contentOf(el)
  const caption = document.createElement('p')
  c.append(caption)
  const img = get(el, 'img', HTMLImageElement)
  img.style.display = 'none'
  await until(el, s => !s.hasImage)
  expect(el.dialog).toBeNull()
  expect(c.isConnected).toBe(false)
  img.style.display = ''
  await until(el, s => s.hasImage)
  expect(el.modalContent).toBe(c)
  expect(el.dialog?.lastElementChild).toBe(c)
  expect(caption.parentElement).toBe(c)
  el.remove()
  expect(el.modalContent).toBe(c)
  expect(caption.parentElement).toBe(c)
})

// A tracked image is never re-searched (as today), so the kind can only change across a reconnect.
it('keeps its img and button first, ahead of consumer nodes, through an img↔SVG swap', async () => {
  const el = await ready(IMG_HTML)
  const c = contentOf(el)
  const caption = document.createElement('p')
  c.prepend(caption)
  el.zoomMargin = 1
  expect(tags(c)).toEqual(['IMG', 'BUTTON', 'P'])
  el.remove()
  el.replaceChildren(
    document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  )
  document.body.append(el)
  expect(tags(c)).toEqual(['DIV', 'BUTTON', 'P'])
  el.remove()
  c.prepend(document.createElement('span'))
  const back = document.createElement('img')
  back.src = IMG
  el.replaceChildren(back)
  document.body.append(el)
  await until(el, s => s.hasImage)
  expect(tags(c)).toEqual(['IMG', 'BUTTON', 'SPAN', 'P'])
  el.remove()
})

it('leaves consumer nodes in place when the order is already right', async () => {
  const el = await ready(IMG_HTML)
  const c = contentOf(el)
  c.append(document.createElement('p'), document.createElement('span'))
  const changes: MutationRecord[] = []
  const observer = new MutationObserver(records => {
    changes.push(...records)
  })
  observer.observe(c, { childList: true })
  await open(el)
  el.zoomMargin = 1
  changes.push(...observer.takeRecords())
  observer.disconnect()
  expect(changes).toHaveLength(0)
  expect(tags(c)).toEqual(['IMG', 'BUTTON', 'P', 'SPAN'])
})

it('clicks on consumer nodes do not unzoom, and their transitions do not advance the state', async () => {
  const el = await ready(IMG_HTML)
  const caption = document.createElement('p')
  contentOf(el).append(caption)
  const zooms = record(el, 'zoomchange')
  el.zoomed = true
  caption.dispatchEvent(new Event('transitionend', { bubbles: true }))
  expect(el.state.modalState).toBe('LOADING')
  end(el)
  caption.click()
  expect(zooms).toHaveLength(0)
})

it('showModal still focuses the unzoom button when extras contain a link', async () => {
  const el = await ready(IMG_HTML)
  contentOf(el).insertAdjacentHTML('beforeend', '<a href="#x">more</a>')
  await open(el)
  expect(document.activeElement).toBe(
    get(el.dialog, '[data-rmiz-btn-unzoom]', HTMLButtonElement),
  )
})

it('focus returns to the built-in zoom button after a keyboard zoom and unzoom', async () => {
  const el = await ready(IMG_HTML)
  builtInButton(el).focus()
  builtInButton(el).click()
  end(el)
  el.zoomed = false
  end(el)
  expect(el.shadowRoot?.activeElement).toBe(builtInButton(el))
})
