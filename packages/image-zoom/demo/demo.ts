import type { ImageZoomElement } from '../src/index.js'

// Controlled mode: the checkbox is the state.
const el = document.querySelector<ImageZoomElement>('#controlled')
const checkbox = document.querySelector<HTMLInputElement>('#controlled-state')

if (el !== null && checkbox !== null) {
  el.addEventListener('zoomchange', event => {
    if (event.target !== event.currentTarget) return // a nested <image-zoom>
    event.preventDefault()
    checkbox.checked = event.detail.zoomed
    checkbox.dispatchEvent(new Event('change'))
  })

  checkbox.addEventListener('change', () => {
    el.zoomed = checkbox.checked
  })
}
