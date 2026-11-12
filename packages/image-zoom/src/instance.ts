import type { Job } from './scheduler.js'
import type { BodyAttrs } from './scroll-lock.js'
import type { ShadowParts } from './template.js'
import type { ImageZoomState, ModalState } from './types.js'
import type { StyleObject, SupportedImage } from './utils/types.js'

export interface Hooks {
  request: (zoomed: boolean, event: Event) => void // a user request
  queue: () => void // schedule(job)
  refresh: () => void // a synchronous operation
  resized: () => void // shouldRefresh = true, then refresh
  transitionEnd: () => void
}

export interface Instance {
  readonly host: HTMLElement
  readonly parts: ShadowParts
  readonly internals: ElementInternals | undefined
  readonly id: string // 12 hex chars
  readonly hooks: Hooks
  readonly job: Job
  isSetUp: boolean
  generation: number // +1 at teardown; async completions compare it
  isCustom: boolean // custom-content, latched at setup
  mustReport: boolean // first operation after connect
  appliedZoomed: boolean
  modalState: ModalState
  shouldRefresh: boolean
  isZoomImgLoaded: boolean
  prevBodyAttrs: BodyAttrs
  fallbackTimer: ReturnType<typeof setTimeout> | undefined
  imgEl: SupportedImage | null
  loadedImgEl: HTMLImageElement | undefined
  dialog: HTMLDialogElement | null
  overlay: HTMLDivElement | null
  content: HTMLElement | null // built-in modalContent, created on first use
  modalImg: HTMLElement | null // built-in <img> or SVG <div>
  btnUnzoom: HTMLButtonElement | null
  writtenStyle: StyleObject // last style written to a modal img
  styled: WeakSet<Element> // modal imgs the element has styled
  state: ImageZoomState
  reportedState: ImageZoomState | undefined
  reportedDialog: HTMLDialogElement | null | undefined
}

export const INITIAL_STATE: ImageZoomState = Object.freeze({
  hasImage: false,
  isSvg: false,
  alt: undefined,
  src: undefined,
  srcset: undefined,
  sizes: undefined,
  crossOrigin: undefined,
  modalState: 'UNLOADED',
  isZoomImgLoaded: false,
  modalImgStyle: Object.freeze({}),
})

/**
 * Same keys with the same values
 */
function stylesEqual(
  a: Readonly<StyleObject>,
  b: Readonly<StyleObject>,
): boolean {
  const keys = Object.keys(a)
  return (
    keys.length === Object.keys(b).length &&
    keys.every(
      key =>
        Object.hasOwn(b, key) && Reflect.get(a, key) === Reflect.get(b, key),
    )
  )
}

/**
 * Every field with ===, and modalImgStyle entry by entry: getStyleModalImg
 * returns a fresh object on every call, so identity can't be the test
 */
export function statesEqual(a: ImageZoomState, b: ImageZoomState): boolean {
  return (
    a.hasImage === b.hasImage &&
    a.isSvg === b.isSvg &&
    a.alt === b.alt &&
    a.src === b.src &&
    a.srcset === b.srcset &&
    a.sizes === b.sizes &&
    a.crossOrigin === b.crossOrigin &&
    a.modalState === b.modalState &&
    a.isZoomImgLoaded === b.isZoomImgLoaded &&
    stylesEqual(a.modalImgStyle, b.modalImgStyle)
  )
}
