import { createImageZoomElement } from './element.js'
import type { ImageZoomElement } from './types.js'

export type {
  ImageZoomElement,
  ImageZoomElementEventMap,
  ImageZoomState,
  ModalImgStyle,
  ModalState,
  ZoomChangeEventDetail,
} from './types.js'

const MARKER = Symbol.for('@rpearce/image-zoom')
export const tagName = 'image-zoom'
if (typeof customElements !== 'undefined') {
  const existing = customElements.get(tagName)
  if (existing === undefined || !(MARKER in existing)) {
    customElements.define(tagName, createImageZoomElement()) // throws natively if a foreign element owns the name
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-zoom': ImageZoomElement
  }
}
