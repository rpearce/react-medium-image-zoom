import type { StyleObject } from './utils/types.js'

export type ModalState = 'UNLOADED' | 'LOADING' | 'LOADED' | 'UNLOADING'

export type ModalImgStyle = StyleObject

export interface ImageZoomState {
  readonly hasImage: boolean // source found, loaded (or SVG) and not display:none
  readonly isSvg: boolean
  readonly alt: string | undefined // getImgAlt(source)
  readonly src: string | undefined // getImgSrc(source)
  readonly srcset: string | undefined // <img> sources only
  readonly sizes: string | undefined // <img> sources only
  readonly crossOrigin: 'anonymous' | 'use-credentials' | null | undefined // <img> sources only
  readonly modalState: 'UNLOADED' | 'LOADING' | 'LOADED' | 'UNLOADING'
  readonly isZoomImgLoaded: boolean
  readonly modalImgStyle: Readonly<ModalImgStyle> // getStyleModalImg's result
}

export interface ZoomChangeEventDetail {
  zoomed: boolean
  originalEvent: Event
}

export interface ImageZoomElementEventMap extends HTMLElementEventMap {
  zoomchange: CustomEvent<ZoomChangeEventDetail>
  statechange: Event
}

export interface ImageZoomElement extends HTMLElement {
  get zoomed(): boolean
  set zoomed(value: boolean | null | undefined)
  get disabled(): boolean
  set disabled(value: boolean | null | undefined)
  get inline(): boolean
  set inline(value: boolean | null | undefined)
  get customContent(): boolean
  set customContent(value: boolean | null | undefined)
  zoomMargin: number
  swipeToUnzoomThreshold: number
  get labelZoom(): string
  set labelZoom(value: string | null | undefined)
  get labelUnzoom(): string
  set labelUnzoom(value: string | null | undefined)
  get dialogClass(): string
  set dialogClass(value: string | null | undefined)
  get zoomSrc(): string
  set zoomSrc(value: string | null | undefined)
  get zoomSrcset(): string
  set zoomSrcset(value: string | null | undefined)
  get zoomSizes(): string
  set zoomSizes(value: string | null | undefined)
  get zoomCrossOrigin(): 'anonymous' | 'use-credentials' | null
  set zoomCrossOrigin(value: string | null | undefined)
  get swipe(): 'unzoom' | 'none'
  set swipe(value: 'unzoom' | 'none' | null | undefined)
  readonly state: ImageZoomState
  readonly dialog: HTMLDialogElement | null
  readonly modalContent: HTMLElement | null
  addEventListener<K extends keyof ImageZoomElementEventMap>(
    type: K,
    listener: (
      this: ImageZoomElement,
      ev: ImageZoomElementEventMap[K],
    ) => unknown,
    options?: AddEventListenerOptions | boolean,
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean,
  ): void
  removeEventListener<K extends keyof ImageZoomElementEventMap>(
    type: K,
    listener: (
      this: ImageZoomElement,
      ev: ImageZoomElementEventMap[K],
    ) => unknown,
    options?: EventListenerOptions | boolean,
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void
}
