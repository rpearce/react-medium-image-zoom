import 'focus-options-polyfill'

enum State {
  LOADED = 'LOADED',
  UNLOADED = 'UNLOADED',
  UNLOADING = 'UNLOADING',
}

type AriaHiddenSiblingsTuple = [HTMLElement, string][]
type ModalEl = HTMLDivElement | undefined
type ScrollableEl = HTMLElement | Window
type ZoomEl = HTMLDivElement | undefined
type ZoomImgEl = HTMLImageElement | undefined

const ARIA_LABEL = 'aria-label'
const ARIA_LABELLEDBY = 'aria-labelledby'
const ARIA_MODAL = 'aria-modal'
const BUTTON = 'button'
const CLICK = 'click'
const DATA_RMIZ_OVERLAY = 'data-rmiz-overlay'
const DATA_RMIZ_WRAP = 'data-rmiz-wrap'
const DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed'
const DIALOG = 'dialog'
const DIV = 'div'
const FOCUS = 'focus'
const ID = 'id'
const KEYDOWN = 'keydown'
const LOAD = 'load'
const RESIZE = 'resize'
const ROLE = 'role'
const SCROLL = 'scroll'
const STYLE = 'style'
const TABINDEX = 'tabindex'
const TRANSITIONEND = 'transitionend'
const TRUE_STR = 'true'
const ZERO_MS = '0ms'

export interface ImageZoomOpts {
  closeText?: string
  isControlled?: boolean
  modalText?: string
  onZoomChange?: (isZoomed: boolean) => void
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  scrollableEl?: ScrollableEl
  transitionDuration?: string
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
    scrollableEl: _scrollableEl,
    transitionDuration = '300ms',
    zoomMargin = 0,
    zoomZindex = 2147483647,
  }: ImageZoomOpts = {},
  targetEl: HTMLElement
): ImageZoomReturnType => {
  const originalRole = getAttribute(ROLE, targetEl)
  const isDisplayBlock = window.getComputedStyle(targetEl).display === 'block'
  const isImgEl = targetEl.tagName === 'IMG'
  const isSvgSrc = isImgEl && SVG_REGEX.test(
    (targetEl as HTMLImageElement).currentSrc
  )
  const isImg = !isSvgSrc && isImgEl
  const documentBody = document.body

  let ariaHiddenSiblings: AriaHiddenSiblingsTuple = []
  let closeBtnEl: HTMLButtonElement | undefined
  let boundaryDivFirst: HTMLDivElement | undefined
  let boundaryDivLast: HTMLDivElement | undefined
  let modalEl: ModalEl
  let motionPref: MediaQueryList | undefined
  let openBtnEl: HTMLButtonElement | undefined
  let scrollableEl: ScrollableEl = _scrollableEl || window
  let state: State = State.UNLOADED
  let targetCloneEl: HTMLElement | undefined
  let wrapEl: HTMLDivElement | undefined
  let zoomEl: ZoomEl
  let zoomImgEl: ZoomImgEl

  const init = (): void => {
    addEventListener(RESIZE, handleResize, window)

    initMotionPref()

    if (isImg && !(targetEl as HTMLImageElement).complete) {
      targetEl.addEventListener(LOAD, () => {
        window.setTimeout(() => {
          initImg()
        }, 500)
      })
    } else {
      initImg()
    }
  }

  // START MOTION PREFS

  const initMotionPref = (): void => {
    motionPref = window.matchMedia('(prefers-reduced-motion:reduce)')
    motionPref.addListener(handleMotionPref) // NOT addEventListener because compatibility
  }

  const handleMotionPref = (): void => {
    transitionDuration = ZERO_MS
  }

  const cleanupMotionPref = (): void => {
    motionPref?.removeListener(handleMotionPref) // NOT removeEventListener because compatibility
    motionPref = undefined
  }

  // END MOTION PREFS

  const initImg = (): void => {
    if (!targetEl || state !== State.UNLOADED) return

    const { height, width } = targetEl.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = targetEl as HTMLImageElement

    const currentScale = isImg && naturalHeight && naturalWidth
      ? getMaxDimensionScale(
          height,
          width,
          zoomMargin,
          naturalHeight,
          naturalWidth
        )
      : getScale(height, width, zoomMargin)

    if (currentScale > 1) {
      if (!targetCloneEl) {
        targetCloneEl = targetEl.cloneNode(true) as HTMLElement
        wrapEl = createElement(DIV) as HTMLDivElement
        openBtnEl = createElement(BUTTON) as HTMLButtonElement

        setAttribute(DATA_RMIZ_WRAP, '', wrapEl)
        setAttribute(
          STYLE,
          isDisplayBlock ? styleWrapDiv : styleWrap,
          wrapEl
        )

        setAttribute(ARIA_LABEL, openText, openBtnEl)
        setAttribute(STYLE, styleZoomBtnIn, openBtnEl)
        addEventListener(CLICK, handleOpenBtnClick, openBtnEl)

        appendChild(targetCloneEl, wrapEl)
        appendChild(openBtnEl, wrapEl)

        replaceChild(targetEl.parentNode as HTMLElement, targetEl, wrapEl)
      }
    } else {
      cleanupZoom()
      cleanupDOMMutations()
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
    if (state === State.UNLOADED && opts.scrollableEl) {
      scrollableEl = opts.scrollableEl
    }

    setZoomImgStyle()

    if (state === State.UNLOADED && opts.isZoomed) {
      zoom()
    } else if (state === State.LOADED && opts.isZoomed === false) {
      unzoom()
    }
  }

  // START CLEANUP

  const cleanup = (): void => {
    cleanupZoom()

    if (isImg && targetEl) {
      removeEventListener(LOAD, initImg, targetEl)
    }

    cleanupDOMMutations()
    cleanupMotionPref()

    removeEventListener(RESIZE, handleResize, window)
  }

  const cleanupDOMMutations = (): void => {
    if (openBtnEl) {
      removeEventListener(CLICK, handleOpenBtnClick, openBtnEl)
    }

    replaceChild(wrapEl?.parentNode as HTMLElement, wrapEl, targetEl)

    openBtnEl = undefined
    wrapEl = undefined
    targetCloneEl = undefined
  }

  const cleanupZoom = (): void => {
    const el = isImg ? zoomImgEl : zoomEl

    if (el) {
      removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el)
      removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, el)
      removeEventListener(LOAD, handleZoomImgLoad, el)
      removeChild(el, modalEl)
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

    zoomImgEl = undefined
    zoomEl = undefined
    closeBtnEl = undefined
    boundaryDivFirst = undefined
    boundaryDivLast = undefined
    modalEl = undefined

    removeEventListener(SCROLL, handleScroll, scrollableEl)
    removeEventListener(KEYDOWN, handleDocumentKeyDown, document)
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
    focus(closeBtnEl)
  }

  const handleResize = (): void => {
    if (state === State.LOADED) {
      window.requestAnimationFrame(() => setZoomImgStyle(true))
    } else {
      initImg()
    }
  }

  const handleZoomTransitionEnd = (): void => {
    focus(closeBtnEl)
  }

  const handleZoomImgLoad = (): void => {
    if (targetCloneEl) {
      targetCloneEl.style.visibility = 'hidden'
    }

    if (modalEl) {
      modalEl.style.backgroundColor = overlayBgColorEnd
    }

    if (zoomImgEl) {
      removeEventListener(LOAD, handleZoomImgLoad, zoomImgEl)
      addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomImgEl)
      setAttribute(STYLE, styleZoomed, zoomImgEl)
    }

    if (zoomEl) {
      addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomEl)
      setAttribute(STYLE, styleZoomed, zoomEl)
    }

    setState(State.LOADED)
  }

  const handleUnzoomTransitionEnd = (): void => {
    if (!targetCloneEl) return

    targetCloneEl.style.visibility = ''

    // timeout for Safari flickering issue
    window.setTimeout(() => {
      cleanupZoom()
      focus(openBtnEl)
      setState(State.UNLOADED)
    }, 0)
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
    window.requestAnimationFrame(() => {
      if (onZoomChange) {
        return onZoomChange(false)
      }

      if (!isControlled) {
        return unzoom()
      }
    })
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

  const setState = (s: State): void => {
    state = s

    setZoomImgStyle()
  }

  const setZoomImgStyle = (instant = false): void => {
    if (!targetCloneEl) return

    const el = isImg ? zoomImgEl : zoomEl

    if (el) {
      setAttribute(
        STYLE,
        getZoomImgStyle(
          instant ? ZERO_MS : transitionDuration,
          zoomMargin,
          targetCloneEl,
          isImg,
          state
        ),
        el
      )
    }
  }

  const zoom = (): void => {
    if (isImg) {
      zoomImg()
    } else {
      zoomNonImg()
    }

    blur(openBtnEl)
    ariaHideOtherContent()
  }

  const zoomImg = (): void => {
    if (!targetCloneEl || state !== State.UNLOADED) return

    const targetAlt = (targetCloneEl as HTMLImageElement).alt
    const targetLabel = getAttribute(ARIA_LABEL, targetCloneEl)
    const targetLabelledBy = getAttribute(ARIA_LABELLEDBY, targetCloneEl)
    const targetSizes = (targetCloneEl as HTMLImageElement).sizes
    const targetSrc = (targetCloneEl as HTMLImageElement).src
    const targetSrcset = (targetCloneEl as HTMLImageElement).srcset

    boundaryDivFirst = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, '0', boundaryDivFirst)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst)

    boundaryDivLast = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, '0', boundaryDivLast)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast)

    closeBtnEl = createElement(BUTTON) as HTMLButtonElement
    setAttribute(STYLE, styleZoomBtnOut, closeBtnEl)
    setAttribute(ARIA_LABEL, closeText, closeBtnEl)
    addEventListener(CLICK, handleCloseBtnClick, closeBtnEl)

    zoomImgEl = new Image()
    addEventListener(LOAD, handleZoomImgLoad, zoomImgEl)
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomImgEl)
    setAttribute(STYLE, styleZoomStart, zoomImgEl)

    if (targetAlt) zoomImgEl.alt = targetAlt
    if (targetSrc) zoomImgEl.src = targetSrc
    if (targetSrcset) zoomImgEl.srcset = targetSrcset
    if (targetSizes) zoomImgEl.sizes = targetSizes
    if (targetLabel) setAttribute(ARIA_LABEL, targetLabel, zoomImgEl)
    if (targetLabelledBy) {
      setAttribute(ARIA_LABELLEDBY, targetLabelledBy, zoomImgEl)
    }

    modalEl = createModal()

    appendChild(boundaryDivFirst, modalEl)
    appendChild(closeBtnEl, modalEl)
    appendChild(zoomImgEl, modalEl)
    appendChild(boundaryDivLast, modalEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)
  }

  const zoomNonImg = (): void => {
    if (!targetEl || state !== State.UNLOADED) return

    boundaryDivFirst = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, '0', boundaryDivFirst)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst)

    boundaryDivLast = createElement(DIV) as HTMLDivElement
    setAttribute(TABINDEX, '0', boundaryDivLast)
    addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast)

    closeBtnEl = createElement(BUTTON) as HTMLButtonElement
    setAttribute(STYLE, styleZoomBtnOut, closeBtnEl)
    setAttribute(ARIA_LABEL, closeText, closeBtnEl)
    addEventListener(CLICK, handleCloseBtnClick, closeBtnEl)

    zoomEl = createElement(DIV) as HTMLDivElement
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomEl)
    setAttribute(STYLE, styleZoomStart, zoomEl)

    const cloneEl = targetEl.cloneNode(true) as HTMLElement
    removeAttribute(ID, cloneEl)
    removeAttribute(TABINDEX, cloneEl)
    if (originalRole) {
      setAttribute(ROLE, originalRole, cloneEl)
    } else {
      removeAttribute(ROLE, cloneEl)
    }
    addEventListener(CLICK, handleCloseBtnClick, zoomEl)
    appendChild(cloneEl, zoomEl)

    modalEl = createModal()

    appendChild(boundaryDivFirst, modalEl)
    appendChild(closeBtnEl, modalEl)
    appendChild(zoomEl, modalEl)
    appendChild(boundaryDivLast, modalEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)

    handleZoomImgLoad()
  }

  interface CreateModal {
    (): HTMLDivElement
  }

  const createModal: CreateModal = () => {
    const el = createElement(DIV) as HTMLDivElement

    setAttribute(ARIA_LABEL, modalText, el)
    setAttribute(ARIA_MODAL, TRUE_STR, el)
    setAttribute(DATA_RMIZ_OVERLAY, '', el)
    setAttribute(ROLE, DIALOG, el)
    setAttribute(
      STYLE,
      getStyleOverlay(
        overlayBgColorStart,
        transitionDuration,
        String(zoomZindex)
      ),
      el
    )
    addEventListener(CLICK, handleModalClick, el)

    return el
  }

  const ariaHideOtherContent = (): void => {
    forEachSibling((el) => {
      const ariaHiddenValue = el.getAttribute('aria-hidden')

      if (ariaHiddenValue) {
        ariaHiddenSiblings.push([el, ariaHiddenValue])
      }

      el.setAttribute('aria-hidden', 'true')
    }, documentBody)
  }

  const ariaResetOtherContent = (): void => {
    forEachSibling((el) => {
      el.removeAttribute('aria-hidden')
    }, documentBody)

    ariaHiddenSiblings.forEach(([el, ariaHiddenValue]) => {
      el?.setAttribute('aria-hidden', ariaHiddenValue)
    })

    ariaHiddenSiblings = []
  }

  const unzoom = (): void => {
    if (state === State.LOADED) {
      const el = isImg ? zoomImgEl : zoomEl

      if (el) {
        blur(el)
        addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el)
      }

      if (modalEl) {
        modalEl.style.backgroundColor = overlayBgColorStart
      }
    }

    if (state !== State.UNLOADED) {
      setState(State.UNLOADING)
    }

    ariaResetOtherContent()
  }

  init()

  return { cleanup, update }
}

export default ImageZoom

//
// STYLING
//

const stylePosAbsolute = 'position:absolute;'
const stylePosRelative = 'position:relative;'
const styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;'

const styleWrap = stylePosRelative + 'display:inline-block;'
const styleWrapDiv = styleWrap + 'width:100%;'

const styleCursorZoomIn = 'cursor:-webkit-zoom-in;cursor:zoom-in;'
const styleCursorZoomOut = 'cursor:-webkit-zoom-out;cursor:zoom-out;'

const styleZoomBtn =
  stylePosAbsolute +
  styleAllDirsZero +
  'background:none;' +
  'border:none;' +
  'margin:0;' +
  'padding:0;'

const styleZoomBtnIn = styleZoomBtn + styleCursorZoomIn
const styleZoomBtnOut = styleZoomBtn + styleCursorZoomOut

interface GetStyleOverlay {
  (backgroundColor: string, transitionDuration: string, zIndex: string): string
}

const getStyleOverlay: GetStyleOverlay = (
  backgroundColor,
  transitionDuration,
  zIndex
) =>
  'position:fixed;' +
  styleAllDirsZero +
  'width:100%;' +
  'height:100%;' +
  '-webkit-transition-property:background-color;' +
  '-o-transition-property:background-color;' +
  'transition-property:background-color;' +
  `background-color:${backgroundColor};` +
  `transition-duration:${transitionDuration};` +
  'transition-timing-function:ease;' +
  `z-index:${zIndex};`

const styleVisibilityHidden = 'visibility:hidden;'

const styleZoomed =
  stylePosAbsolute +
  '-webkit-transition-property:-webkit-transform;' +
  'transition-property:-webkit-transform;' +
  '-o-transition-property:transform;' +
  'transition-property:transform;' +
  'transition-property:transform,-webkit-transform;' +
  '-webkit-transform-origin:center center;' +
  '-ms-transform-origin:center center;' +
  'transform-origin:center center;'

const styleZoomStart = styleZoomed + styleVisibilityHidden

interface GetZoomImgStyleStr {
  (
    height: number,
    width: number,
    left: number,
    top: number,
    transform: string,
    transitionDuration: string
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
  styleZoomed +
  `height:${height}px;` +
  `width:${width}px;` +
  `left:${left}px;` +
  `top:${top}px;` +
  `-webkit-transform:${transform};` +
  `transform:${transform};` +
  `-webkit-transition-duration:${transitionDuration};` +
  `transition-duration:${transitionDuration};` +
  'transition-timing-function:ease;'

interface GetZoomImgStyle {
  (
    transitionDuration: string,
    zoomMargin: number,
    targetEl: HTMLElement,
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
    return getZoomImgStyleStr(0, 0, 0, 0, 'none', ZERO_MS)
  }

  const { height, left, top, width } = targetEl.getBoundingClientRect()
  const originalTransform = targetEl.style.transform

  if (state !== State.LOADED) {
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
      ? getMaxDimensionScale(
          height,
          width,
          zoomMargin,
          naturalHeight,
          naturalWidth
        )
      : getScale(height, width, zoomMargin)

  // Get the the coords for center of the viewport
  const viewportX = window.innerWidth / 2
  const viewportY = window.innerHeight / 2

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

interface IsKey {
  (e: KeyboardEvent): boolean
}

const isEscapeKey: IsKey = (e) => e.key === 'Escape' || e.keyCode === 27

interface UniqueId {
  (prefix?: string): string
}

interface GetScale {
  (height: number, width: number, zoomMargin: number): number
}

const getScale: GetScale = (height, width, zoomMargin) => {
  const scaleX = window.innerWidth / (width + zoomMargin)
  const scaleY = window.innerHeight / (height + zoomMargin)

  return Math.min(scaleX, scaleY)
}

interface GetMaxDimensionScale {
  (
    height: number,
    width: number,
    zoomMargin: number,
    naturalHeight: number,
    naturalWidth: number
  ): number
}

const getMaxDimensionScale: GetMaxDimensionScale = (
  height,
  width,
  zoomMargin,
  naturalHeight,
  naturalWidth
) => {
  const scale = getScale(naturalHeight, naturalWidth, zoomMargin)

  const ratio =
    naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height

  return scale > 1 ? ratio : scale * ratio
}

const SVG_REGEX = /\.svg$/i

//
// DOM
//

interface AppendChild {
  (child: HTMLElement, parent: HTMLElement): void
}

const appendChild: AppendChild = (child, parent) => parent.appendChild(child)

interface RemoveChild {
  (
    child: HTMLElement | null | undefined,
    parent: HTMLElement | null | undefined
  ): void
}

const removeChild: RemoveChild = (child, parent) => {
  if (child && parent) {
    parent.removeChild(child)
  }
}

interface CreateElement {
  (type: string): HTMLElement
}

const createElement: CreateElement = (type) => document.createElement(type)

interface Blur {
  (el: HTMLElement | null | undefined): void
}

const blur: Blur = (el) => {
  if (el) {
    el.blur()
  }
}

interface Focus {
  (el: HTMLElement | null | undefined): void
}

const focus: Focus = (el) => {
  if (el) {
    el.focus({ preventScroll: true })
  }
}

interface ForEachSibling {
  (handler: (el: HTMLElement) => void, target: HTMLElement): void
}

const forEachSibling: ForEachSibling = (handler, target) => {
  const nodes = target.parentNode?.children || []

  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i] as HTMLElement

    if (!el) return

    const { tagName } = el

    if (
      tagName === 'SCRIPT' ||
      tagName === 'NOSCRIPT' ||
      tagName === 'STYLE' ||
      el === target
    ) {
      return
    }

    handler(el)
  }
}

interface ReplaceChild {
  (
    parentNode: HTMLElement | null | undefined,
    oldChild: HTMLElement | null | undefined,
    newChild: HTMLElement | null | undefined
  ): void
}

const replaceChild: ReplaceChild = (parentNode, oldChild, newChild) => {
  if (parentNode && oldChild && newChild) {
    parentNode.replaceChild(newChild, oldChild)
  }
}

interface AddEventListener {
  <A extends EventTarget, E extends Event>(
    type: string,
    cb: (this: A, evt: E) => void,
    el: A
  ): void
}

const addEventListener: AddEventListener = (type, cb, el) => {
  el.addEventListener(type, cb as (e: Event) => void)
}

interface RemoveEventListener {
  <A extends EventTarget, E extends Event>(
    type: string,
    handler: (this: A, evt: E) => void,
    el: A
  ): void
}

const removeEventListener: RemoveEventListener = (type, handler, el) => {
  el.removeEventListener(type, handler as (e: Event) => void)
}

interface GetAttribute {
  (attr: string, el: HTMLElement): string | null
}

const getAttribute: GetAttribute = (attr, el) => el.getAttribute(attr)

interface RemoveAttribute {
  (attr: string, el: HTMLElement): void
}

const removeAttribute: RemoveAttribute = (attr, el) => el.removeAttribute(attr)

interface SetAttribute {
  (attr: string, value: string, el: HTMLElement): void
}

const setAttribute: SetAttribute = (attr, value, el) =>
  el.setAttribute(attr, value)
