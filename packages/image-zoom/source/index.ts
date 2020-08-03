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
const BLOCK = 'block'
const BUTTON = 'button'
const CLICK = 'click'
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
const LOAD = 'load'
const MARGIN = 'margin'
const MARGIN_LEFT = `${MARGIN}Left`
const MARGIN_TOP = `${MARGIN}Top`
const MAX_HEIGHT = 'maxHeight'
const MAX_WIDTH = 'maxWidth'
const NONE = 'none'
const POSITION = 'position'
const RESIZE = 'resize'
const ROLE = 'role'
const SCROLL = 'scroll'
const STYLE = 'style'
const TABINDEX = 'tabindex'
const TRANSFORM = 'transform'
const TRANSITIONEND = 'transitionend'
const TRUE_STR = 'true'
const TYPE = 'type'
const VISIBILITY = 'visibility'
const WIDTH = 'width'
const ZERO = '0'
const Z_INDEX = 'z-index'

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
  const win = window
  const doc = document
  const documentBody = doc.body
  const scrollableEl = win

  let ariaHiddenSiblings: [HTMLElement, string][] = []
  let cloneImgEl: HTMLImageElement | undefined
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
  let zoomWrapEl: HTMLDivElement | undefined

  const init = (): void => {
    addEventListener(RESIZE, handleResize, win)

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
    motionPref = win.matchMedia('(prefers-reduced-motion:reduce)')
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
    const compStyleDisplay = getComputedStyle(targetEl)[DISPLAY]

    setStyleProperty(WIDTH, `${width}px`, openBtnEl)
    setStyleProperty(HEIGHT, `${height}px`, openBtnEl)

    if (compStyleDisplay === BLOCK) {
      setStyleProperty(MARGIN_TOP, `-${height}px`, openBtnEl)
    } else {
      setStyleProperty(MARGIN_LEFT, `-${width}px`, openBtnEl)
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

    setZoomImgStyle()

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

    removeEventListener(RESIZE, handleResize, win)
  }

  const cleanupTargetLoad = ():void => {
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
    removeEventListener(KEYDOWN, handleDocumentKeyDown, doc)

    if (cloneImgEl) {
      removeEventListener(LOAD, handleZoomImgLoad, cloneImgEl)
    }

    if (zoomWrapEl) {
      removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomWrapEl)
      removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomWrapEl)
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

    cloneImgEl = undefined
    closeBtnEl = undefined
    boundaryDivFirst = undefined
    boundaryDivLast = undefined
    zoomWrapEl = undefined
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
      initImg()
    }
  }

  const handleZoomTransitionEnd = (): void => {
    focusPreventScroll(closeBtnEl)
  }

  const handleZoomImgLoad = (): void => {
    if (targetEl) {
      setStyleProperty(VISIBILITY, HIDDEN, targetEl)
    }

    if (overlayEl) {
      setAttribute(
        STYLE,
        getStyleOverlay(overlayBgColorEnd, transitionDuration),
        overlayEl
      )
    }

    if (zoomWrapEl) {
      addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomWrapEl)
      setAttribute(STYLE, stylePosAbsolute, zoomWrapEl)
    }

    state = LOADED
    setZoomImgStyle()

    ariaHideOtherContent()
  }

  const handleUnzoomTransitionEnd = (): void => {
    // timeout for Safari flickering issue
    //win.setTimeout(() => {
    if (targetEl) {
      setStyleProperty(VISIBILITY, '', targetEl)
    }

    state = UNLOADED
    setZoomImgStyle(true)

    cleanupZoom()

    focusPreventScroll(openBtnEl)
    //}, 0)
  }

  const handleModalClick = (): void => {
    if (onZoomChange) {
      onZoomChange(false)
    }

    if (!isControlled) {
      unzoom()
    }
  }

  //let lastOffset = window.pageYOffset
  //let delta = 0
  //let start: number

  //const step = (timestamp: number) => {
  //  if (start === undefined) {
  //    start = timestamp
  //  }

  //  const elapsed = timestamp - start

  //  //// `Math.min()` is used here to make sure that the element stops at exactly 200px.
  //  //element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  //  if (state !== UNLOADED && zoomWrapEl) {
  //    const pageOffset = window.pageYOffset

  //    delta = pageOffset - lastOffset
  //    lastOffset = pageOffset

  //    console.log(delta)
  //    if (delta > 0) {
  //      const top = parseFloat(zoomWrapEl.style.top)
  //      console.log('top', top)
  //      zoomWrapEl.style.top = `${top + delta}px`
  //    }
  //  }

  //  if (elapsed < transitionDuration) { // Stop the animation after 2 seconds
  //    window.requestAnimationFrame(step)
  //  }
  //}

  const handleScroll = (): void => {
    if (state === LOADED) {
      if (onZoomChange) {
        onZoomChange(false)
      }

      if (!isControlled) {
        unzoom()
      }
    }

    //window.requestAnimationFrame(step)
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

  const setZoomImgStyle = (instant = false): void => {
    if (!targetEl) return

    if (zoomWrapEl) {
      setAttribute(
        STYLE,
        getZoomImgStyle(
          instant ? 0 : transitionDuration,
          zoomMargin,
          targetEl,
          isImg,
          state
        ),
        zoomWrapEl
      )
    }
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

    cloneImgEl = cloneElement(true, targetEl) as HTMLImageElement
    addEventListener(LOAD, handleZoomImgLoad, cloneImgEl)
    removeAttribute(ID, cloneImgEl)
    setAttribute(STYLE, styleZoomImgContent, cloneImgEl)

    modalEl = createModal(cloneImgEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, doc)
    addEventListener(SCROLL, handleScroll, scrollableEl)
  }

  const zoomNonImg = (): void => {
    if (!targetEl || state !== UNLOADED) return

    const cloneEl = cloneElement(true, targetEl)
    removeAttribute(ID, cloneEl)
    setStyleProperty(MAX_WIDTH, NONE, cloneEl)
    setStyleProperty(MAX_HEIGHT, NONE, cloneEl)

    modalEl = createModal(cloneEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, doc)
    addEventListener(SCROLL, handleScroll, scrollableEl)

    handleZoomImgLoad()
  }

  interface CreateModal {
    (contentEl: HTMLElement): HTMLDivElement
  }

  const createModal: CreateModal = (contentEl) => {
    const el = createElement(DIV) as HTMLDivElement

    setAttribute(ARIA_LABEL, modalText, el)
    setAttribute(ARIA_MODAL, TRUE_STR, el)
    setAttribute(DATA_RMIZ_OVERLAY, '', el)
    setAttribute(ROLE, DIALOG, el)
    setAttribute(STYLE, getStyleDialog(String(zoomZindex)), el)
    addEventListener(CLICK, handleModalClick, el)

    overlayEl = createElement(DIV) as HTMLDivElement
    setAttribute(
      STYLE,
      getStyleOverlay(overlayBgColorStart, transitionDuration),
      overlayEl
    )

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

    zoomWrapEl = createElement(DIV) as HTMLDivElement
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomWrapEl)
    setAttribute(STYLE, styleZoomStart, zoomWrapEl)

    appendChild(contentEl, zoomWrapEl)
    appendChild(overlayEl, el)
    appendChild(boundaryDivFirst, el)
    appendChild(closeBtnEl, el)
    appendChild(zoomWrapEl, el)
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

      if (zoomWrapEl) {
        addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomWrapEl)
      }

      if (overlayEl) {
        setAttribute(
          STYLE,
          getStyleOverlay(overlayBgColorStart, transitionDuration),
          overlayEl
        )
      }

      state = UNLOADING
      setZoomImgStyle()
    }

    //if (state !== UNLOADED) {
    //  state = UNLOADING
    //  setZoomImgStyle()
    //}
  }

  init()

  return { cleanup, update }
}

export default ImageZoom

//
// STYLING
//

const styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;'
const styleAppearanceNone = `-webkit-appearance:${NONE};-moz-appearance:${NONE};appearance:${NONE};`
const styleCursorPointer = 'cursor:pointer;'
const styleCursorZoomIn = styleCursorPointer + 'cursor:-webkit-zoom-in;cursor:zoom-in;'
const styleCursorZoomOut = styleCursorPointer + 'cursor:-webkit-zoom-out;cursor:zoom-out;'
const styleDisplayBlock = `${DISPLAY}:${BLOCK};`
const styleFastTap = 'touch-action:manipulation;'
const styleHeight100pct = `height:${HUNDRED_PCT};`
const styleMaxHeight100pct = `max-height:${HUNDRED_PCT};`
const styleMaxWidth100pct = `max-width:${HUNDRED_PCT};`
const stylePosAbsolute = `${POSITION}:${ABSOLUTE};`
const styleTransitionTimingFn = 'cubic-bezier(.42,0,.58,1);'
const styleVisibilityHidden = `${VISIBILITY}:${HIDDEN};`
const styleWidth100pct = `width:${HUNDRED_PCT};`

const styleZoomBtnBase =
  stylePosAbsolute +
  styleFastTap +
  styleAppearanceNone +
  `background:${NONE};` +
  `border:${NONE};` +
  'margin:0;' +
  'padding:0;'

const styleZoomBtnIn = styleZoomBtnBase + styleCursorZoomIn

const styleZoomBtnOut =
  styleZoomBtnBase +
  styleAllDirsZero +
  styleHeight100pct +
  styleWidth100pct +
  styleCursorZoomOut +
  `${Z_INDEX}:1;`

const styleZoomStart = stylePosAbsolute + styleVisibilityHidden

const styleZoomImgContent =
  styleDisplayBlock +
  styleMaxWidth100pct +
  styleMaxHeight100pct

interface GetStyleOverlay {
  (backgroundColor: string, transitionDuration: number): string
}

const getStyleOverlay: GetStyleOverlay = (
  backgroundColor,
  transitionDuration
) =>
  stylePosAbsolute +
  styleAllDirsZero +
  `transition:background ${transitionDuration}ms ${styleTransitionTimingFn};` +
  `background:${backgroundColor};`

interface GetStyleDialog {
  (zIndex: string): string
}

const getStyleDialog: GetStyleDialog = (zIndex) =>
  'position:fixed;' +
  styleAllDirsZero +
  styleWidth100pct +
  styleHeight100pct +
  `${Z_INDEX}:${zIndex};`

interface GetZoomImgStyleStr {
  (
    height: number,
    width: number,
    left: number,
    top: number,
    transform: string,
    transitionDuration: number
  ): string
}

const getZoomImgStyleStr: GetZoomImgStyleStr = (
  height,
  width,
  left,
  top,
  transform,
  transitionDuration
) =>
  stylePosAbsolute  +
  `height:${height}px;` +
  `width:${width}px;` +
  `left:${left}px;` +
  `top:${top}px;` +
  `transition:transform ${transitionDuration}ms ${styleTransitionTimingFn};` +
  `-webkit-transform:${transform};` +
  `-ms-transform:${transform};` +
  `transform:${transform};`

interface GetZoomImgStyle {
  (
    transitionDuration: number,
    zoomMargin: number,
    targetEl: HTMLElement | undefined,
    isImg: boolean,
    state: State
  ): string
}

const getZoomImgStyle: GetZoomImgStyle = (
  transitionDuration,
  zoomMargin,
  targetEl,
  isImg,
  state
) => {
  if (!targetEl) {
    return getZoomImgStyleStr(0, 0, 0, 0, NONE, 0)
  }

  const { height, left, top, width } = targetEl.getBoundingClientRect()
  const originalTransform = getStyleProperty(TRANSFORM, targetEl)

  if (state !== LOADED) {
    const initTransform =
      'scale(1) translate(0,0)' +
      (originalTransform ? ` ${originalTransform}` : '')

    return getZoomImgStyleStr(
      height,
      width,
      left,
      top,
      initTransform,
      transitionDuration
    )
  }

  const { naturalHeight, naturalWidth } = targetEl as HTMLImageElement

  // Get amount to scale item
  const scale =
    isImg && naturalHeight && naturalWidth
      ? getScaleToWindowMax(
          width,
          naturalWidth,
          height,
          naturalHeight,
          zoomMargin
        )
      : getScaleToWindow(width, height, zoomMargin)

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
  const transform =
    `scale(${scale}) translate(${translateX}px,${translateY}px)` +
    (originalTransform ? ` ${originalTransform}` : '')

  return getZoomImgStyleStr(
    height,
    width,
    left,
    top,
    transform,
    transitionDuration
  )
}

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
