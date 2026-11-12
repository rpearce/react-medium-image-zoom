import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import {
  IMG_HTML,
  modalImg,
  mountZoom,
  open,
  ready,
  record,
} from './test-helpers.js'

/**
 * root.querySelector(selector), narrowed to `type`; throws when it is missing
 */
function get<T extends Element>(
  root: ParentNode | null,
  selector: string,
  type: new () => T,
): T {
  const found = root?.querySelector(selector)
  if (!(found instanceof type)) {
    throw new TypeError(`no ${type.name} matching ${selector}`)
  }
  return found
}

const SVG_HTML = `<image-zoom><svg width="100" height="80" viewBox="0 0 100 80"><defs><linearGradient id="g"></linearGradient></defs><rect width="100" height="80" fill="url(#g)"/></svg></image-zoom>`

it('fills a div modal img with an id-adjusted clone sized from the style', () => {
  const el = mountZoom(SVG_HTML)
  const m = modalImg(el)
  const clone = get(m, 'svg', SVGSVGElement)
  expect(m.matches('div[data-rmiz-modal-img]')).toBe(true)
  expect(clone).not.toBe(el.querySelector('svg'))
  expect(get(clone, 'linearGradient', SVGLinearGradientElement).id).not.toBe(
    'g',
  )
  expect(clone.style.width).toBe(`${el.state.modalImgStyle.width ?? 0}px`)
})

it('re-clones on update without a statechange, and a click on the clone requests unzoom', async () => {
  const el = mountZoom(SVG_HTML)
  await open(el)
  const before = modalImg(el).querySelector('svg')
  const states = record(el, 'statechange')
  const zooms = record(el, 'zoomchange')
  el.labelZoom = 'Open'
  const after = get(modalImg(el), 'svg', SVGSVGElement)
  expect(after).not.toBe(before)
  expect(modalImg(el).querySelectorAll('svg')).toHaveLength(1)
  expect(states).toHaveLength(0)
  after.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(zooms).toHaveLength(1)
})

it('a transitionend from inside the clone advances the state', () => {
  const el = mountZoom(SVG_HTML)
  el.zoomed = true
  get(modalImg(el), 'rect', SVGRectElement).dispatchEvent(
    new Event('transitionend', { bubbles: true }),
  )
  expect(el.state.modalState).toBe('LOADED')
})

// A tracked image is never re-searched (as today), so the kind can only change across a reconnect.
it('swaps its own node when a reconnect finds an svg where there was an img', async () => {
  const el = await ready(IMG_HTML)
  const button = get(el.dialog, '[data-rmiz-btn-unzoom]', HTMLButtonElement)
  el.remove()
  el.replaceChildren(
    document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  )
  document.body.append(el)
  expect(el.state.isSvg).toBe(true)
  expect(modalImg(el).tagName).toBe('DIV')
  expect(modalImg(el).nextElementSibling).toBe(button)
  el.remove()
})
