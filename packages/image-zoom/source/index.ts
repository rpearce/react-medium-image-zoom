import 'focus-options-polyfill'
import {
  addEventListener,
  appendChild,
  blur,
  cloneElement,
  createElement,
  focus,
  forEachSibling,
  getAttribute,
  getBoundingClientRect,
  getComputedStyle,
  getParentNode,
  getScaleToWindow,
  getScaleToWindowMax,
  getStyleProperty,
  getWindowInnerHeight,
  getWindowInnerWidth,
  removeAttribute,
  removeChild,
  removeEventListener,
  setAttribute,
  setStyleProperty,
} from '@rpearce/ts-dom-fns'

type PossibleElement = HTMLElement | null | undefined

enum State {
  LOADED = 'LOADED',
  UNLOADED = 'UNLOADED',
  UNLOADING = 'UNLOADING',
}

const { LOADED, UNLOADED, UNLOADING } = State

const focusPreventScroll = focus.bind(null, { preventScroll: true })

const ABSOLUTE = 'absolute'
const ARIA_HIDDEN = 'aria-hidden'
const ARIA_LABEL = 'aria-label'
const ARIA_MODAL = 'aria-modal'
const BG_COLOR_CSS = 'background-color'
const BG_COLOR = 'backgroundColor'
const BLOCK = 'block'
const BUTTON = 'button'
const CLICK = 'click'
const CURSOR = 'cursor'
const DATA_RMIZ_OVERLAY = 'data-rmiz-overlay'
const DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed'
const DIALOG = 'dialog'
const DISPLAY = 'display'
const DIV = 'div'
const FOCUS = 'focus'
const HEIGHT = 'height'
const HIDDEN = 'hidden'
const HUNDRED_PCT = '100%'
const ID = 'id'
const KEYDOWN = 'keydown'
const LEFT = 'left'
const LOAD = 'load'
const MARGIN = 'margin'
const MARGIN_LEFT_JS = `${MARGIN}Left`
const MARGIN_TOP_JS = `${MARGIN}Top`
const MAX_HEIGHT = 'maxHeight'
const MAX_WIDTH = 'maxWidth'
const NONE = 'none'
const POSITION = 'position'
const RESIZE = 'resize'
const ROLE = 'role'
const SCROLL = 'scroll'
const STYLE = 'style'
const TABINDEX = 'tabindex'
const TOP = 'top'
const TRANSFORM = 'transform'
const TRANSITION = 'transition'
const TRANSITIONEND = 'transitionend'
const TRUE_STR = 'true'
const TYPE = 'type'
const VISIBILITY = 'visibility'
const WIDTH = 'width'
const ZERO = '0'
const Z_INDEX_CSS = 'z-index'

export interface ImageZoomOpts {
  closeText?: string
  isControlled?: boolean
  modalText?: string
  onZoomChange?: (isZoomed: boolean) => void
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  transitionDuration?: number
  zoomMargin?: number
  zoomZindex?: number
}

export interface ImageZoomUpdateOpts extends ImageZoomOpts {
  isZoomed?: boolean
}

interface Update {
  (opts?: ImageZoomUpdateOpts): void
}

export interface ImageZoomReturnType {
  cleanup: () => void
  update: Update
}

const ImageZoom = (
  {
    closeText = 'Unzoom image',
    isControlled = false,
    modalText = 'Zoomed item',
    onZoomChange,
    openText = 'Zoom image',
    overlayBgColorEnd = 'rgba(255,255,255,0.95)',
    overlayBgColorStart = 'rgba(255,255,255,0)',
    transitionDuration: _transitionDuration = 300,
    zoomMargin = 0,
    zoomZindex = 2147483647,
  }: ImageZoomOpts = {},
  targetEl: HTMLElement
): ImageZoomReturnType => {
  const isImgEl = targetEl.tagName === 'IMG'
  const isSvgSrc = isImgEl && SVG_REGEX.test(
    (targetEl as HTMLImageElement).currentSrc
  )
  const isImg = !isSvgSrc && isImgEl
  const documentBody = document.body
  const scrollableEl = window

  let ariaHiddenSiblings: [HTMLElement, string][] = []
  let zoomableEl: HTMLElement | undefined
  let closeBtnEl: HTMLButtonElement | undefined
  let boundaryDivFirst: HTMLDivElement | undefined
  let boundaryDivLast: HTMLDivElement | undefined
  let modalEl: HTMLDivElement | undefined
  let motionPref: MediaQueryList | undefined
  let observer: MutationObserver | undefined
  let openBtnEl: HTMLButtonElement | undefined
  let overlayEl: HTMLDivElement | undefined
  let state: State = UNLOADED
  let transitionDuration = _transitionDuration

  const init = (): void => {
    addEventListener(RESIZE, handleResize, window)

    initMotionPref()

    if (isImgEl && !(targetEl as HTMLImageElement).complete) {
      addEventListener(LOAD, initImg, targetEl)
    } else {
      initImg()
    }
  }

  // START TARGET MUTATION OBSERVER

  const initMutationObserver = (): void => {
    const cb = (mutationsList: MutationRecord[]): void => {
      if (targetEl && mutationsList.length > 0) {
        adjustOpenBtnEl()
      }
    }

    observer = new MutationObserver(cb)
    observer.observe(targetEl, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    })
  }

  const cleanupMutationObserver = (): void => {
    observer?.disconnect()
    observer = undefined
  }

  // END TARGET MUTATION OBSERVER

  // START MOTION PREFS

  const initMotionPref = (): void => {
    motionPref = window.matchMedia('(prefers-reduced-motion:reduce)')
    motionPref.addListener(handleMotionPref) // NOT addEventListener because compatibility
  }

  const handleMotionPref = (): void => {
    transitionDuration = 0
  }

  const cleanupMotionPref = (): void => {
    motionPref?.removeListener(handleMotionPref) // NOT removeEventListener because compatibility
    motionPref = undefined
  }

  // END MOTION PREFS

  const initImg = (): void => {
    if (!targetEl || state !== UNLOADED) return

    const { height, width } = getBoundingClientRect(targetEl)
    const { naturalHeight, naturalWidth } = targetEl as HTMLImageElement

    const currentScale = isImg && naturalHeight && naturalWidth
      ? getScaleToWindowMax(
          width,
          naturalWidth,
          height,
          naturalHeight,
          zoomMargin
        )
      : getScaleToWindow(width, height, zoomMargin)

    if (currentScale > 1) {
      // create openBtnEl
      openBtnEl = createElement(BUTTON) as HTMLButtonElement
      setAttribute(ARIA_LABEL, openText, openBtnEl)
      setAttribute(STYLE, styleZoomBtnIn, openBtnEl)
      setAttribute(TYPE, BUTTON, openBtnEl)
      adjustOpenBtnEl()
      addEventListener(CLICK, handleOpenBtnClick, openBtnEl)

      // insert openBtnEl after targetEl
      targetEl.insertAdjacentElement('afterend', openBtnEl)

      initMutationObserver()
    } else {
      cleanupZoom()
      cleanupMutationObserver()
      cleanupTargetLoad()
      cleanupDOMMutations()
    }
  }

  const adjustOpenBtnEl = () => {
    if (!openBtnEl) return

    const { height, width } = getBoundingClientRect(targetEl)
    const type = getComputedStyle(targetEl)[DISPLAY]

    setStyleProperty(WIDTH, `${width}px`, openBtnEl)
    setStyleProperty(HEIGHT, `${height}px`, openBtnEl)

    if (
      type === BLOCK ||
      type === 'flex' ||
      type === 'grid' ||
      type === 'table'
    ) {
      setStyleProperty(MARGIN_TOP_JS, `-${height}px`, openBtnEl)
    } else {
      setStyleProperty(MARGIN_LEFT_JS, `-${width}px`, openBtnEl)
    }
  }

  const update: Update = (opts = {}) => {
    if (opts.closeText) closeText = opts.closeText
    if (opts.modalText) modalText = opts.modalText
    if (opts.openText) openText = opts.openText
    if (opts.overlayBgColorEnd) overlayBgColorEnd = opts.overlayBgColorEnd
    if (opts.overlayBgColorStart) overlayBgColorStart = opts.overlayBgColorStart
    if (opts.transitionDuration) transitionDuration = opts.transitionDuration
    if (opts.zoomMargin) zoomMargin = opts.zoomMargin
    if (opts.zoomZindex) zoomZindex = opts.zoomZindex

    setZoomImgStyle(false)

    if (state === UNLOADED && opts.isZoomed) {
      zoom()
    } else if (state === LOADED && opts.isZoomed === false) {
      unzoom()
    }
  }

  // START CLEANUP

  const cleanup = (): void => {
    cleanupZoom()
    cleanupMutationObserver()
    cleanupTargetLoad()
    cleanupDOMMutations()
    cleanupMotionPref()

    removeEventListener(RESIZE, handleResize, window)
  }

  const cleanupTargetLoad = (): void => {
    if (isImg && targetEl) {
      removeEventListener(LOAD, initImg, targetEl)
    }
  }

  const cleanupDOMMutations = (): void => {
    if (openBtnEl) {
      removeEventListener(CLICK, handleOpenBtnClick, openBtnEl)
      removeChild(openBtnEl, getParentNode(openBtnEl) as HTMLElement)
    }

    openBtnEl = undefined
  }

  const cleanupZoom = (): void => {
    removeEventListener(SCROLL, handleScroll, scrollableEl)
    removeEventListener(KEYDOWN, handleDocumentKeyDown, document)

    if (zoomableEl) {
      removeEventListener(LOAD, handleZoomImgLoad, zoomableEl)
      removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomableEl)
      removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomableEl)
    }

    if (closeBtnEl) {
      removeEventListener(CLICK, handleCloseBtnClick, closeBtnEl)
    }

    if (boundaryDivFirst) {
      removeEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst)
    }

    if (boundaryDivLast) {
      removeEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast)
    }

    if (modalEl) {
      removeEventListener(CLICK, handleModalClick, modalEl)
      removeChild(modalEl, documentBody)
    }

    zoomableEl = undefined
    closeBtnEl = undefined
    boundaryDivFirst = undefined
    boundaryDivLast = undefined
    overlayEl = undefined
    modalEl = undefined
  }

  // END CLEANUP

  const handleOpenBtnClick = (e: MouseEvent): void => {
    e.preventDefault()

    if (onZoomChange) {
      onZoomChange(true)
    }

    if (!isControlled) {
      zoom()
    }
  }

  const handleCloseBtnClick = (e: MouseEvent): void => {
    e.preventDefault()

    if (onZoomChange) {
      onZoomChange(false)
    }

    if (!isControlled) {
      unzoom()
    }
  }

  const handleFocusBoundaryDiv = (): void => {
    focusPreventScroll(closeBtnEl)
  }

  const handleResize = (): void => {
    if (state === LOADED) {
      setZoomImgStyle(true)
    } else {
      cleanupZoom()
      cleanupMutationObserver()
      cleanupTargetLoad()
      cleanupDOMMutations()

      initImg()
    }
  }

  const handleZoomTransitionEnd = (): void => {
    focusPreventScroll(closeBtnEl)
  }

  const handleZoomImgLoad = (): void => {
    if (!zoomableEl) return

    modalEl = createModal()

    if (!modalEl) return

    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)

    if (targetEl) {
      setStyleProperty(VISIBILITY, HIDDEN, targetEl)
    }

    if (zoomableEl) {
      addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomableEl)
    }

    state = LOADED
    setZoomImgStyle(false)

    ariaHideOtherContent()

    if (overlayEl) {
      setAttribute(
        STYLE,
        stylePosAbsolute +
          styleAllDirsZero +
          `${TRANSITION}:${BG_COLOR_CSS} ${transitionDuration}ms ${styleTransitionTimingFn};` +
          `${BG_COLOR_CSS}:${overlayBgColorStart};` +
          `will-change:${BG_COLOR_CSS};`,
        overlayEl
      )

      setStyleProperty(BG_COLOR, overlayBgColorEnd, overlayEl)
    }
  }

  const handleUnzoomTransitionEnd = (): void => {
    if (targetEl) {
      setStyleProperty(VISIBILITY, '', targetEl)
    }

    state = UNLOADED
    setZoomImgStyle(true)

    cleanupZoom()

    focusPreventScroll(openBtnEl)
  }

  const handleModalClick = (): void => {
    if (onZoomChange) {
      onZoomChange(false)
    }

    if (!isControlled) {
      unzoom()
    }
  }

  const handleScroll = (): void => {
    if (state === LOADED) {
      if (onZoomChange) {
        onZoomChange(false)
      }

      if (!isControlled) {
        unzoom()
      }
    } else if (state === UNLOADING) {
      setZoomImgStyle(false)
    }
  }

  const handleDocumentKeyDown = (e: KeyboardEvent): void => {
    if (isEscapeKey(e)) {
      e.stopPropagation()

      if (onZoomChange) {
        onZoomChange(false)
      }

      if (!isControlled) {
        unzoom()
      }
    }
  }

  const setZoomImgStyle = (instant: boolean): void => {
    if (!targetEl || !zoomableEl) return

    const td = instant ? 0 : transitionDuration
    const { height, left, top, width } = targetEl.getBoundingClientRect()
    const originalTransform = getStyleProperty(TRANSFORM, targetEl)

    let transform: string

    if (state !== LOADED) {
      transform = 'scale(1) translate(0,0)' + (originalTransform ? ` ${originalTransform}` : '')
    } else {
      let scale = getScaleToWindow(width, height, zoomMargin)

      if (isImg) {
        const { naturalHeight, naturalWidth } = targetEl as HTMLImageElement

        if (naturalHeight && naturalWidth) {
          scale = getScaleToWindowMax(
            width,
            naturalWidth,
            height,
            naturalHeight,
            zoomMargin
          )
        }
      }

      // Get the the coords for center of the viewport
      const viewportX = getWindowInnerWidth() / 2
      const viewportY = getWindowInnerHeight() / 2

      // Get the coords for center of the parent item
      const childCenterX = left + width / 2
      const childCenterY = top + height / 2

      // Get offset amounts for item coords to be centered on screen
      const translateX = (viewportX - childCenterX) / scale
      const translateY = (viewportY - childCenterY) / scale

      // Build transform style, including any original transform
      transform =
        `scale(${scale}) translate(${translateX}px,${translateY}px)` +
        (originalTransform ? ` ${originalTransform}` : '')
    }

    setAttribute(
      STYLE,
      stylePosAbsolute +
        styleDisplayBlock +
        styleMaxWidth100pct +
        styleMaxHeight100pct +
          `${WIDTH}:${width}px;` +
          `${HEIGHT}:${height}px;` +
          `${LEFT}:${left}px;` +
          `${TOP}:${top}px;` +
          `${TRANSITION}:transform ${td}ms ${styleTransitionTimingFn};` +
          `-webkit-transform:${transform};` +
          `-ms-transform:${transform};` +
          `transform:${transform};`,
      zoomableEl
    )
  }

  const zoom = (): void => {
    if (isImgEl) {
      zoomImg()
    } else {
      zoomNonImg()
    }

    blur(openBtnEl)
  }

  const zoomImg = (): void => {
    if (!targetEl || state !== UNLOADED) return

    zoomableEl = cloneElement(true, targetEl) as HTMLImageElement
    removeAttribute(ID, zoomableEl)
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomableEl)

    addEventListener(LOAD, handleZoomImgLoad, zoomableEl)
  }

  const zoomNonImg = (): void => {
    if (!targetEl || state !== UNLOADED) return

    zoomableEl = createElement(DIV) as HTMLDivElement
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomableEl)
    setAttribute(STYLE, styleZoomStart, zoomableEl)

    const cloneEl = cloneElement(true, targetEl)
    removeAttribute(ID, cloneEl)
    setStyleProperty(MAX_WIDTH, NONE, cloneEl)
    setStyleProperty(MAX_HEIGHT, NONE, cloneEl)

    appendChild(cloneEl, zoomableEl)

    handleZoomImgLoad()
  }

  const createModal = (): HTMLDivElement | undefined => {
    if (!zoomableEl) return

    const el = createElement(DIV) as HTMLDivElement

    setAttribute(ARIA_LABEL, modalText, el)
    setAttribute(ARIA_MODAL, TRUE_STR, el)
    setAttribute(DATA_RMIZ_OVERLAY, '', el)
    setAttribute(ROLE, DIALOG, el)
    setAttribute(
      STYLE,
      `${POSITION}:fixed;` +
        styleAllDirsZero +
        styleWidth100pct +
        styleHeight100pct +
        `${Z_INDEX_CSS}:${zoomZindex};`,
      el
    )
    addEventListener(CLICK, handleModalClick, el)

    overlayEl = createElement(DIV) as HTMLDivElement

    boundaryDivFirst = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, ZERO, boundaryDivFirst)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst)

    boundaryDivLast = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, ZERO, boundaryDivLast)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast)

    closeBtnEl = createElement(BUTTON) as HTMLButtonElement
    setAttribute(ARIA_LABEL, closeText, closeBtnEl)
    setAttribute(STYLE, styleZoomBtnOut, closeBtnEl)
    setAttribute(TYPE, BUTTON, el)
    addEventListener(CLICK, handleCloseBtnClick, closeBtnEl)

    appendChild(overlayEl, el)
    appendChild(boundaryDivFirst, el)
    appendChild(closeBtnEl, el)
    appendChild(zoomableEl, el)
    appendChild(boundaryDivLast, el)

    return el
  }

  const ariaHideOtherContent = (): void => {
    if (modalEl) {
      forEachSibling((el) => {
        if (isIgnoredElement(el)) return

        const ariaHiddenValue = getAttribute(ARIA_HIDDEN, el)

        if (ariaHiddenValue) {
          ariaHiddenSiblings.push([el, ariaHiddenValue])
        }

        el.setAttribute(ARIA_HIDDEN, TRUE_STR)
      }, modalEl)
    }
  }

  const ariaResetOtherContent = (): void => {
    if (modalEl) {
      forEachSibling((el) => {
        if (isIgnoredElement(el)) return

        removeAttribute(ARIA_HIDDEN, el)
      }, modalEl)
    }

    ariaHiddenSiblings.forEach(([el, ariaHiddenValue]) => {
      if (el) {
        setAttribute(ARIA_HIDDEN, ariaHiddenValue, el)
      }
    })

    ariaHiddenSiblings = []
  }

  const unzoom = (): void => {
    if (state === LOADED) {
      blur(closeBtnEl)

      ariaResetOtherContent()

      if (zoomableEl) {
        addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomableEl)
      }

      state = UNLOADING
      setZoomImgStyle(false)

      if (overlayEl) {
        setStyleProperty(BG_COLOR, overlayBgColorStart, overlayEl)
      }
    } else {
      setZoomImgStyle(false)
    }
  }

  init()

  return { cleanup, update }
}

export default ImageZoom

//
// STYLING
//

const styleAllDirsZero = `${TOP}:0;right:0;bottom:0;${LEFT}:0;`
const styleAppearanceNone = `-webkit-appearance:${NONE};-moz-appearance:${NONE};appearance:${NONE};`
const styleCursorPointer = `${CURSOR}:pointer;`
const styleCursorZoomIn = styleCursorPointer + `${CURSOR}:-webkit-zoom-in;cursor:zoom-in;`
const styleCursorZoomOut = styleCursorPointer + `${CURSOR}:-webkit-zoom-out;cursor:zoom-out;`
const styleDisplayBlock = `${DISPLAY}:${BLOCK};`
const styleFastTap = 'touch-action:manipulation;'
const styleHeight100pct = `${HEIGHT}:${HUNDRED_PCT};`
const styleMaxHeight100pct = `max-height:${HUNDRED_PCT};`
const styleMaxWidth100pct = `max-width:${HUNDRED_PCT};`
const stylePosAbsolute = `${POSITION}:${ABSOLUTE};`
const styleTransitionTimingFn = 'ease'
const styleVisibilityHidden = `${VISIBILITY}:${HIDDEN};`
const styleWidth100pct = `${WIDTH}:${HUNDRED_PCT};`

const styleZoomBtnBase =
  stylePosAbsolute +
  styleFastTap +
  styleAppearanceNone +
  `background:${NONE};` +
  `border:${NONE};` +
  `${MARGIN}:0;` +
  'padding:0;'

const styleZoomBtnIn = styleZoomBtnBase + styleCursorZoomIn

const styleZoomBtnOut =
  styleZoomBtnBase +
  styleAllDirsZero +
  styleHeight100pct +
  styleWidth100pct +
  styleCursorZoomOut +
  `${Z_INDEX_CSS}:1;`

const styleZoomStart = stylePosAbsolute + styleVisibilityHidden

//
// HELPERS
//

const SVG_REGEX = /\.svg$/i

interface IsKey {
  (e: KeyboardEvent): boolean
}

const isEscapeKey: IsKey = (e) => e.key === 'Escape' || e.keyCode === 27

interface IsIgnoredElement {
  (el: HTMLElement): boolean
}

const isIgnoredElement: IsIgnoredElement = ({ tagName }) =>
  tagName === 'SCRIPT' || tagName === 'NOSCRIPT' || tagName === 'STYLE'
