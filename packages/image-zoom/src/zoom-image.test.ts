import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import {
  end,
  flush,
  IMG,
  IMG_2,
  IMG_HTML,
  modalImg,
  open,
  ready,
  until,
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

const ZOOM_HTML = `<image-zoom zoom-src="${IMG_2}"><img src="${IMG}" srcset="${IMG} 1x" alt="x"></image-zoom>`

it('preloads on LOADING, swaps in at LOADED, swaps back at UNLOADING, and stays loaded', async () => {
  const el = await ready(ZOOM_HTML)
  const m = () => modalImg(el)
  expect(el.state.isZoomImgLoaded).toBe(false)
  el.zoomed = true
  await until(el, s => s.isZoomImgLoaded)
  expect(m().getAttribute('src')).toBe(el.state.src)
  end(el)
  expect(m().getAttribute('src')).toBe(IMG_2)
  expect(m().getAttribute('srcset')).toBe(`${IMG} 1x`)
  el.zoomed = false
  expect(m().getAttribute('src')).toBe(el.state.src)
  end(el)
  expect(el.state.isZoomImgLoaded).toBe(true)
  el.zoomed = true
  end(el)
  expect(m().getAttribute('src')).toBe(IMG_2)
})

it('reads zoom-src when LOADING is entered', async () => {
  const el = await ready(IMG_HTML)
  el.zoomSrc = IMG_2
  el.zoomed = true
  await until(el, s => s.isZoomImgLoaded)
  expect(el.state.isZoomImgLoaded).toBe(true)
})

it('clones the icon-unzoom child into the unzoom button at each zoom', async () => {
  const el = await ready(
    `<image-zoom><img src="${IMG}"><span slot="icon-unzoom" class="mine">x</span></image-zoom>`,
  )
  const button = get(el.dialog, '[data-rmiz-btn-unzoom]', HTMLButtonElement)
  await open(el)
  expect(button.querySelector('.mine')).not.toBeNull()
  expect(button.querySelector('.mine')?.hasAttribute('slot')).toBe(false)
  expect(button.querySelector('[data-rmiz-btn-unzoom-icon]')).toBeNull()
  expect(el.querySelector('.mine')).not.toBeNull()
  expect(get(el, '.mine', HTMLElement).getBoundingClientRect().width).toBe(0)
})

it('puts the default icon back at the next zoom once the icon-unzoom child is gone', async () => {
  const el = await ready(
    `<image-zoom><img src="${IMG}"><span slot="icon-unzoom" class="mine">x</span></image-zoom>`,
  )
  const button = get(el.dialog, '[data-rmiz-btn-unzoom]', HTMLButtonElement)
  await open(el)
  el.zoomed = false
  end(el)
  await flush() // the close that UNLOADED queued
  get(el, '.mine', HTMLElement).remove()
  await open(el)
  expect(button.querySelector('.mine')).toBeNull()
  expect(button.querySelector('[data-rmiz-btn-unzoom-icon]')).not.toBeNull()
})
