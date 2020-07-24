import 'focus-options-polyfill'

type PossibleElement = HTMLElement | null | undefined

enum State {
  LOADED = 'LOADED',
  UNLOADED = 'UNLOADED',
  UNLOADING = 'UNLOADING',
}

const ARIA_HIDDEN = 'aria-hidden'
const ARIA_LABEL = 'aria-label'
const ARIA_MODAL = 'aria-modal'
const BLOCK = 'block'
const BUTTON = 'button'
const CLASS = 'class'
const CLICK = 'click'
const DATA_RMIZ_OVERLAY = 'data-rmiz-overlay'
const DATA_RMIZ_WRAP = 'data-rmiz-wrap'
const DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed'
const DIALOG = 'dialog'
const DISPLAY = 'display'
const DIV = 'div'
const FOCUS = 'focus'
const HIDDEN = 'hidden'
const HUNDRED_PCT = '100%'
const ID = 'id'
const KEYDOWN = 'keydown'
const LOAD = 'load'
const MARGIN = 'margin'
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
const VISIBILITY = 'visibility'
const ZERO = '0'

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
  let closeBtnEl: HTMLButtonElement | undefined
  let boundaryDivFirst: HTMLDivElement | undefined
  let boundaryDivLast: HTMLDivElement | undefined
  let modalEl: HTMLDivElement | undefined
  let motionPref: MediaQueryList | undefined
  let observer: MutationObserver | undefined
  let openBtnEl: HTMLButtonElement | undefined
  let overlayEl: HTMLDivElement | undefined
  let state: State = State.UNLOADED
  let targetCloneEl: HTMLElement | undefined
  let transitionDuration = _transitionDuration
  let originalStyleDisplay = ''
  let originalStyleMaxWidth = ''
  let wrapEl: HTMLDivElement | undefined
  let zoomWrapEl: HTMLDivElement | undefined

  const init = (): void => {
    addEventListener(RESIZE, handleResize, window)

    initMotionPref()

    if (isImg && !(targetEl as HTMLImageElement).complete) {
      addEventListener(LOAD, initImg, targetEl)
    } else {
      initImg()
    }
  }

  // START TARGET MUTATION OBSERVER

  const initMutationObserver = (): void => {
    const cb = (): void => {
      cleanup()
      init()
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
        // store the original display style & max-width
        originalStyleDisplay = getComputedStyle(targetEl)[DISPLAY]
        originalStyleMaxWidth = getComputedStyle(targetEl)[MAX_WIDTH]

        targetCloneEl = createTargetCloneEl()
        wrapEl = createWrapEl()
        openBtnEl = createOpenBtnEl()

        // add targetEl margin to wrapEl
        setStyleProp(MARGIN, getCompStyle(targetEl)[MARGIN], wrapEl)

        // remove margin from targetCloneEl
        setStyleProp(MARGIN, ZERO, targetCloneEl)

        // add targetCloneEl & openBtnEl to the wrapEl
        appendChild(targetCloneEl, wrapEl)
        appendChild(openBtnEl, wrapEl)

        // hide the targetEl, and insert wrapEl
        // just before targetEl
        if (targetEl.parentNode) {
          setStyleProp(DISPLAY, NONE, targetEl)
          targetEl.parentNode.insertBefore(wrapEl, targetEl)
        }

        initMutationObserver()
      }
    } else {
      cleanupZoom()
      cleanupMutationObserver()
      cleanupTargetLoad()
      cleanupDOMMutations()
    }
  }

  const createTargetCloneEl = () => {
    const el = cloneElement(true, targetEl)

    removeAttribute(TABINDEX, el)

    if (isImg || originalStyleDisplay !== BLOCK) {
      setStyleProp(DISPLAY, BLOCK, el)
      setStyleProp(MAX_WIDTH, originalStyleMaxWidth || HUNDRED_PCT, el)
    }

    return el
  }

  const createWrapEl = (): HTMLDivElement => {
    const el = createElement(DIV) as HTMLDivElement
    const styleStr = originalStyleDisplay === BLOCK
      ? styleWrapBlock
      : styleWrapInline

    setAttribute(DATA_RMIZ_WRAP, '', el)
    setAttribute(STYLE, styleStr, el)

    return el
  }

  const createOpenBtnEl = (): HTMLButtonElement => {
    const el = createElement(BUTTON) as HTMLButtonElement

    setAttribute(ARIA_LABEL, openText, el)
    setAttribute(STYLE, styleZoomBtnIn, el)
    addEventListener(CLICK, handleOpenBtnClick, el)

    return el
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

    if (state === State.UNLOADED && opts.isZoomed) {
      zoom()
    } else if (state === State.LOADED && opts.isZoomed === false) {
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

  const cleanupTargetLoad = ():void => {
    if (isImg && targetEl) {
      removeEventListener(LOAD, initImg, targetEl)
    }
  }

  const cleanupDOMMutations = (): void => {
    if (openBtnEl) {
      removeEventListener(CLICK, handleOpenBtnClick, openBtnEl)
    }

    removeChild(wrapEl, wrapEl?.parentNode as HTMLElement)
    setStyleProp(DISPLAY, originalStyleDisplay, targetEl)

    openBtnEl = undefined
    wrapEl = undefined
    targetCloneEl = undefined
  }

  const cleanupZoom = (): void => {
    removeEventListener(SCROLL, handleScroll, scrollableEl)
    removeEventListener(KEYDOWN, handleDocumentKeyDown, document)

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
    focus(closeBtnEl)
  }

  const handleResize = (): void => {
    if (state === State.LOADED) {
      setZoomImgStyle(true)
    } else {
      initImg()
    }
  }

  const handleZoomTransitionEnd = (): void => {
    focus(closeBtnEl)
  }

  const handleZoomImgLoad = (): void => {
    if (targetCloneEl) {
      setStyleProp(VISIBILITY, HIDDEN, targetCloneEl)
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

    setState(State.LOADED)
  }

  const handleUnzoomTransitionEnd = (): void => {
    // timeout for Safari flickering issue
    window.setTimeout(() => {
      if (targetCloneEl) {
        setStyleProp(VISIBILITY, '', targetCloneEl)
      }
      cleanupZoom()
      setState(State.UNLOADED)
      focus(openBtnEl)
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
    if (onZoomChange) {
      onZoomChange(false)
    }

    if (!isControlled) {
      unzoom()
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

  const setState = (s: State): void => {
    state = s

    setZoomImgStyle()
  }

  const setZoomImgStyle = (instant = false): void => {
    if (!targetCloneEl) return

    if (zoomWrapEl) {
      setAttribute(
        STYLE,
        getZoomImgStyle(
          instant ? 0 : transitionDuration,
          zoomMargin,
          wrapEl,
          targetCloneEl,
          isImg,
          state
        ),
        zoomWrapEl
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

    const cloneEl = cloneElement(true, targetCloneEl)
    removeAttribute(ID, cloneEl)
    removeAttribute(CLASS, cloneEl)
    setAttribute(STYLE, styleZoomImgContent, cloneEl)

    modalEl = createModal(cloneEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)

    handleZoomImgLoad()
  }

  const zoomNonImg = (): void => {
    if (!targetCloneEl || state !== State.UNLOADED) return

    const cloneEl = cloneElement(true, targetCloneEl)
    removeAttribute(ID, cloneEl)

    modalEl = createModal(cloneEl)
    appendChild(modalEl, documentBody)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
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
    setAttribute(STYLE, styleZoomBtnOut, closeBtnEl)
    setAttribute(ARIA_LABEL, closeText, closeBtnEl)
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
    forEachSibling((el) => {
      const ariaHiddenValue = el.getAttribute(ARIA_HIDDEN)

      if (ariaHiddenValue) {
        ariaHiddenSiblings.push([el, ariaHiddenValue])
      }

      el.setAttribute(ARIA_HIDDEN, TRUE_STR)
    }, documentBody)
  }

  const ariaResetOtherContent = (): void => {
    forEachSibling((el) => {
      removeAttribute(ARIA_HIDDEN, el)
    }, documentBody)

    ariaHiddenSiblings.forEach(([el, ariaHiddenValue]) => {
      if (el) {
        setAttribute(ARIA_HIDDEN, ariaHiddenValue, el)
      }
    })

    ariaHiddenSiblings = []
  }

  const unzoom = (): void => {
    if (state === State.LOADED) {
      blur(closeBtnEl)

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

const styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;'
const styleAppearanceNone = `-webkit-appearance:${NONE};-moz-appearance:${NONE};appearance:${NONE};`
const styleCursorZoomIn = 'cursor:-webkit-zoom-in;cursor:zoom-in;'
const styleCursorZoomOut = 'cursor:-webkit-zoom-out;cursor:zoom-out;'
const styleDisplayBlock = `${DISPLAY}:${BLOCK};`
const styleFastTap = 'touch-action:manipulation;'
const styleHeight100pct = `height:${HUNDRED_PCT};`
const styleMaxWidth100pct = `max-width:${HUNDRED_PCT};`
const stylePosAbsolute = `${POSITION}:absolute;`
const stylePosRelative = `${POSITION}:relative;`
const styleTransitionTimingFn = 'cubic-bezier(.42,0,.58,1);'
const styleVisibilityHidden = `${VISIBILITY}:${HIDDEN};`
const styleWidth100pct = `width:${HUNDRED_PCT};`
const styleDisplayInlineBlock = `${DISPLAY}:inline-block;`

const styleWrapInline =
  stylePosRelative +
  styleDisplayInlineBlock +
  `vertical-align:top;`

const styleWrapBlock = stylePosRelative + styleDisplayBlock

const styleZoomBtn =
  stylePosAbsolute +
  styleAllDirsZero +
  styleHeight100pct +
  styleWidth100pct +
  `background:${NONE};` +
  `border:${NONE};` +
  'margin:0;' +
  'padding:0;'

const styleZoomBtnBase = styleZoomBtn + styleFastTap + styleAppearanceNone
const styleZoomBtnIn = styleZoomBtnBase + styleCursorZoomIn
const styleZoomBtnOut = styleZoomBtnBase + styleCursorZoomOut + 'z-index:1;'

const styleZoomStart = stylePosAbsolute + styleVisibilityHidden

const styleZoomImgContent =
  styleDisplayBlock +
  styleHeight100pct +
  styleMaxWidth100pct

interface GetStyleOverlay {
  (backgroundColor: string, transitionDuration: number): string
}

const getStyleOverlay: GetStyleOverlay = (
  backgroundColor,
  transitionDuration
) => {
  const td = transitionDuration ? transitionDuration / 3 : transitionDuration

  return stylePosAbsolute +
    styleAllDirsZero +
    `transition:background ${td}ms ${styleTransitionTimingFn};` +
    `background:${backgroundColor};`
}

interface GetStyleDialog {
  (zIndex: string): string
}

const getStyleDialog: GetStyleDialog = (zIndex) =>
  'position:fixed;' +
  styleAllDirsZero +
  styleWidth100pct +
  styleHeight100pct +
  `z-index:${zIndex};`

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
    targetCloneEl: HTMLElement,
    isImg: boolean,
    state: State
  ): string
}

const getZoomImgStyle: GetZoomImgStyle = (
  transitionDuration,
  zoomMargin,
  containerEl,
  targetEl,
  isImg,
  state
) => {
  if (!containerEl) {
    return getZoomImgStyleStr(0, 0, 0, 0, NONE, 0)
  }

  const { height, left, top, width } = containerEl.getBoundingClientRect()
  const originalTransform = getStyleProp(TRANSFORM, targetEl)

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
  (child: PossibleElement, parent: PossibleElement): void
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

interface CloneElement {
  (deep: boolean, el: HTMLElement): HTMLElement
}

const cloneElement: CloneElement = (deep, el) =>
  el.cloneNode(deep) as HTMLElement

interface Blur {
  (el: PossibleElement): void
}

const blur: Blur = (el) => {
  el?.blur()
}

interface Focus {
  (el: PossibleElement): void
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

interface AddEventListener {
  <A extends EventTarget, E extends Event>(
    type: string,
    cb: (this: A, evt: E) => void,
    el: A,
    useCapture?: boolean
  ): void
}

const addEventListener: AddEventListener = (
  type,
  cb,
  el,
  useCapture = false
) => {
  el.addEventListener(type, cb as (e: Event) => void, useCapture)
}

interface RemoveEventListener {
  <A extends EventTarget, E extends Event>(
    type: string,
    handler: (this: A, evt: E) => void,
    el: A,
    useCapture?: boolean
  ): void
}

const removeEventListener: RemoveEventListener = (
  type,
  handler,
  el,
  useCapture = false
) => {
  el.removeEventListener(type, handler as (e: Event) => void, useCapture)
}

interface RemoveAttribute {
  (attr: string, el: HTMLElement): void
}

const removeAttribute: RemoveAttribute = (attr, el) => {
  el.removeAttribute(attr)
}

interface SetAttribute {
  (attr: string, value: string, el: HTMLElement): void
}

const setAttribute: SetAttribute = (attr, value, el) =>
  el.setAttribute(attr, value)

interface GetStyle {
  (e: HTMLElement): CSSStyleDeclaration
}

const getStyle: GetStyle = (el) => el.style

type CSSProps =
  'display'
  | 'margin'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'maxWidth'
  | 'transform'
  | 'verticalAlign'
  | 'visibility'

interface GetStyleProp {
  (attr: CSSProps, el: HTMLElement): string
}

const getStyleProp: GetStyleProp = (attr, el) => getStyle(el)[attr]

interface SetStyleProp {
  (attr: CSSProps, value: string, el: HTMLElement): void
}

const setStyleProp: SetStyleProp = (attr, value, el) => {
  getStyle(el)[attr] = value
}

interface GetCompStyle {
  (el: HTMLElement): CSSStyleDeclaration
}

const getCompStyle: GetCompStyle = (el) => window.getComputedStyle(el)
