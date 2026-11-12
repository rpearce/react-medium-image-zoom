import { expect, it } from 'vitest'
import './index.js'
import './styles.css'
import {
  end,
  flush,
  get,
  IMG,
  IMG_2,
  IMG_HTML,
  modalImg,
  open,
  ready,
  until,
} from './test-helpers.js'
import type { ImageZoomElement } from './types.js'

const swapped = (el: ImageZoomElement) =>
  ['crossorigin', 'sizes', 'srcset', 'src'].map(name =>
    modalImg(el).getAttribute(name),
  )

/**
 * Zoom, wait for the zoom image, and end the transition: LOADED, swapped
 */
async function zoomLoaded(el: ImageZoomElement): Promise<void> {
  el.zoomed = true
  await until(el, s => s.isZoomImgLoaded)
  end(el)
  expect(el.state.modalState).toBe('LOADED')
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

it('swaps in provided empty zoom-* values at LOADED, and the source values at UNLOADING', async () => {
  const el = await ready(
    `<image-zoom zoom-src="${IMG_2}" zoom-crossorigin="" zoom-sizes="" zoom-srcset=""><img src="${IMG}" sizes="100vw" srcset="${IMG} 1x" alt="x"></image-zoom>`,
  )
  await zoomLoaded(el)
  expect(swapped(el)).toEqual(['', '', '', IMG_2])
  el.zoomed = false
  expect(swapped(el)).toEqual([null, '100vw', `${IMG} 1x`, el.state.src])
})

it('swaps in provided zoom-sizes and zoom-srcset at LOADED, and the source values at UNLOADING', async () => {
  const el = await ready(
    `<image-zoom zoom-src="${IMG_2}" zoom-sizes="50vw" zoom-srcset="${IMG_2} 2x"><img src="${IMG}" sizes="100vw" srcset="${IMG} 1x" alt="x"></image-zoom>`,
  )
  await zoomLoaded(el)
  expect(swapped(el)).toEqual([null, '50vw', `${IMG_2} 2x`, IMG_2])
  el.zoomed = false
  expect(swapped(el)).toEqual([null, '100vw', `${IMG} 1x`, el.state.src])
})

it('keeps the source values zoom-* attributes do not provide', async () => {
  const el = await ready(
    `<image-zoom zoom-src="${IMG_2}"><img src="${IMG}" sizes="100vw" srcset="${IMG} 1x" alt="x"></image-zoom>`,
  )
  await zoomLoaded(el)
  expect(swapped(el)).toEqual([null, '100vw', `${IMG} 1x`, IMG_2])
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
