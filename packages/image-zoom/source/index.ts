import 'focus-options-polyfill'

enum State {
  LOADED = 'LOADED',
  UNLOADED = 'UNLOADED',
  UNLOADING = 'UNLOADING',
}

type DescEl = HTMLDivElement | undefined
type DescWrapEl = HTMLDivElement | null | undefined
type ModalEl = HTMLDivElement | undefined
type PortalEl = HTMLElement
type ScrollableEl = HTMLElement | Window
type ZoomEl = HTMLDivElement | undefined
type ZoomImgEl = HTMLImageElement | undefined

const ARIA_DESCRIBEDBY = 'aria-describedby'
const ARIA_LABEL = 'aria-label'
const ARIA_LABELLEDBY = 'aria-labelledby'
const ARIA_MODAL = 'aria-modal'
const BUTTON = 'button'
const CLICK = 'click'
const DATA_RMIZ_DESC = 'data-rmiz-desc'
const DATA_RMIZ_DESC_WRAP = 'data-rmiz-desc-wrap'
const DATA_RMIZ_OVERLAY = 'data-rmiz-overlay'
const DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed'
const DIALOG = 'dialog'
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
const ZERO_STR = '0'
const ZERO_MS = ZERO_STR + 'ms'

export interface ImageZoomOpts {
  closeText?: string
  isControlled?: boolean
  modalText?: string
  onZoomChange?: (isZoomed: boolean) => void
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  portalEl?: PortalEl
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
    closeText = 'Press to unzoom image',
    isControlled = false,
    modalText = 'Zoomed item',
    onZoomChange,
    openText = 'Press to zoom image',
    overlayBgColorEnd = 'rgba(255,255,255,0.95)',
    overlayBgColorStart = 'rgba(255,255,255,0)',
    portalEl: _portalEl,
    scrollableEl: _scrollableEl,
    transitionDuration = '300ms',
    zoomMargin = 0,
    zoomZindex = 2147483647,
  }: ImageZoomOpts = {},
  targetEl: HTMLElement
): ImageZoomReturnType => {
  const closeDescId = uniqueId('rmiz-close-')
  const openDescId = uniqueId('rmiz-open-')
  const originalAriaDescribedBy = getAttribute(ARIA_DESCRIBEDBY, targetEl)
  const originalRole = getAttribute(ROLE, targetEl)
  const originalStyle = getAttribute(STYLE, targetEl)
  const originalTabIndex = getAttribute(TABINDEX, targetEl)
  const isImgEl = targetEl.tagName === 'IMG'
  const isSvgSrc = isImgEl && SVG_REGEX.test(
    (targetEl as HTMLImageElement).currentSrc
  )
  const isImg = !isSvgSrc && isImgEl
  const documentBody = document.body

  let closeDescEl: DescEl
  let descWrapEl: DescWrapEl
  let modalEl: ModalEl
  let motionPref: MediaQueryList | undefined
  let openDescEl: DescEl
  let portalEl: PortalEl = _portalEl || documentBody
  let scrollableEl: ScrollableEl = _scrollableEl || window
  let state: State = State.UNLOADED
  let zoomEl: ZoomEl
  let zoomImgEl: ZoomImgEl

  const init = (): void => {
    addEventListener(RESIZE, handleResize, window)

    initMotionPref()
    initDescriptions()

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

  const initMotionPref = (): void => {
    motionPref = window.matchMedia('(prefers-reduced-motion:reduce)')
    motionPref.addListener(handleMotionPref) // NOT addEventListener b/c compatibility
  }

  const initDescriptions = (): void => {
    descWrapEl = documentBody.querySelector(`[${DATA_RMIZ_DESC_WRAP}]`) as DescWrapEl

    if (!descWrapEl) {
      descWrapEl = createDiv()
      setAttribute(DATA_RMIZ_DESC_WRAP, '', descWrapEl)
      appendChild(descWrapEl, documentBody)
    }

    openDescEl = createDescEl(openDescId, openText)
    closeDescEl = createDescEl(closeDescId, closeText)

    appendChild(openDescEl, descWrapEl)
    appendChild(closeDescEl, descWrapEl)
  }

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
      setAttribute(ARIA_DESCRIBEDBY, openDescId, targetEl)
      setAttribute(ROLE, BUTTON, targetEl)
      setAttribute(TABINDEX, originalTabIndex || ZERO_STR, targetEl)
      setAttribute(
        STYLE,
        combineStyles(originalStyle, styleCursorZoomIn),
        targetEl
      )
      addEventListener(CLICK, handleImgClick, targetEl)
      addEventListener(KEYDOWN, handleImgKeyDown, targetEl)
    } else {
      cleanupImg()
    }
  }

  const update: Update = (opts = {}) => {
    if (opts.modalText) modalText = opts.modalText
    if (opts.overlayBgColorEnd) overlayBgColorEnd = opts.overlayBgColorEnd
    if (opts.overlayBgColorStart) overlayBgColorStart = opts.overlayBgColorStart
    if (opts.transitionDuration) transitionDuration = opts.transitionDuration
    if (opts.zoomMargin) zoomMargin = opts.zoomMargin
    if (opts.zoomZindex) zoomZindex = opts.zoomZindex

    if (opts.closeText) {
      closeText = opts.closeText
      if (closeDescEl) {
        setTextContent(closeText, closeDescEl)
      }
    }

    if (opts.openText) {
      openText = opts.openText
      if (openDescEl) {
        setTextContent(openText, openDescEl)
      }
    }

    if (state === State.UNLOADED) {
      if (opts.portalEl) {
        portalEl = opts.portalEl
      }
      if (opts.scrollableEl) {
        scrollableEl = opts.scrollableEl
      }
    }

    setZoomImgStyle()

    if (state === State.UNLOADED && opts.isZoomed) {
      zoom()
    } else if (state === State.LOADED && opts.isZoomed === false) {
      unzoom()
    }
  }

  const cleanup = (): void => {
    cleanupZoomImg()
    cleanupImg()
    cleanupModal()
    cleanupDescriptions()

    if (isImg && targetEl) {
      removeEventListener(LOAD, initImg, targetEl)
    }

    if (motionPref) {
      motionPref.removeListener(handleMotionPref)
      motionPref = undefined
    }

    removeEventListener(RESIZE, handleResize, window)
  }

  const cleanupDescriptions = (): void => {
    const openEl = document.getElementById(openDescId)
    const closeEl = document.getElementById(closeDescId)

    removeChild(openEl, descWrapEl)
    removeChild(closeEl, descWrapEl)
  }

  const cleanupImg = (): void => {
    if (!targetEl) return

    removeEventListener(KEYDOWN, handleImgKeyDown, targetEl)
    removeEventListener(CLICK, handleImgClick, targetEl)

    if (originalTabIndex) {
      setAttribute(TABINDEX, originalTabIndex, targetEl)
    } else {
      removeAttribute(TABINDEX, targetEl)
    }

    if (originalStyle) {
      setAttribute(STYLE, originalStyle, targetEl)
    } else {
      removeAttribute(STYLE, targetEl)
    }

    if (originalRole) {
      setAttribute(ROLE, originalRole, targetEl)
    } else {
      removeAttribute(ROLE, targetEl)
    }

    if (originalAriaDescribedBy) {
      setAttribute(ARIA_DESCRIBEDBY, originalAriaDescribedBy, targetEl)
    } else {
      removeAttribute(ARIA_DESCRIBEDBY, targetEl)
    }
  }

  const cleanupZoomImg = (): void => {
    const el = isImg ? zoomImgEl : zoomEl

    if (el) {
      removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el)
      removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, el)
      removeEventListener(CLICK, handleZoomImgClick, el)
      removeEventListener(KEYDOWN, handleZoomImgKeyDown, el)
      removeEventListener(LOAD, handleZoomImgLoad, el)

      removeChild(el, modalEl)
    }

    zoomImgEl = undefined
    zoomEl = undefined

    removeEventListener(SCROLL, handleScroll, scrollableEl)
    removeEventListener(KEYDOWN, handleDocumentKeyDown, document)
  }

  const cleanupModal = (): void => {
    if (!modalEl) return

    removeEventListener(CLICK, handleModalClick, modalEl)

    removeChild(modalEl, portalEl)

    modalEl = undefined
  }

  const handleMotionPref = (): void => {
    transitionDuration = ZERO_MS
  }

  const handleImgClick = (e: MouseEvent): void => {
    e.preventDefault()

    if (onZoomChange) {
      onZoomChange(true)
    }

    if (!isControlled) {
      zoom()
    }
  }

  const handleZoomImgClick = (e: MouseEvent): void => {
    e.preventDefault()

    if (onZoomChange) {
      onZoomChange(false)
    }

    if (!isControlled) {
      unzoom()
    }
  }

  const handleImgKeyDown = (e: KeyboardEvent): void => {
    if (isSelectKey(e)) {
      e.preventDefault()

      if (onZoomChange) {
        onZoomChange(true)
      }

      if (!isControlled) {
        zoom()
      }
    }
  }

  const handleZoomImgKeyDown = (e: KeyboardEvent): void => {
    if (isSelectKey(e)) {
      e.preventDefault()

      if (onZoomChange) {
        onZoomChange(false)
      }

      if (!isControlled) {
        unzoom()
      }
    }
  }

  const handleResize = (): void => {
    if (state === State.LOADED) {
      window.requestAnimationFrame(() => setZoomImgStyle(true))
    } else {
      initImg()
    }
  }

  const handleZoomTransitionEnd = (): void => {
    const el = zoomImgEl || zoomEl

    if (el) {
      focus(el)
    }
  }

  const handleZoomImgLoad = (): void => {
    if (targetEl) {
      setAttribute(
        STYLE,
        combineStyles(originalStyle, styleVisibilityHidden),
        targetEl
      )
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
    if (!targetEl) return

    setAttribute(
      STYLE,
      combineStyles(originalStyle, styleCursorZoomIn),
      targetEl
    )

    // timeout for Safari flickering issue
    window.setTimeout(() => {
      cleanupZoomImg()
      cleanupModal()

      focus(targetEl)

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
    if (!targetEl) return

    const el = isImg ? zoomImgEl : zoomEl

    if (el) {
      setAttribute(
        STYLE,
        getZoomImgStyle(
          instant ? ZERO_MS : transitionDuration,
          zoomMargin,
          targetEl,
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
  }

  const zoomImg = (): void => {
    if (!targetEl || state !== State.UNLOADED) return

    const targetAlt = (targetEl as HTMLImageElement).alt
    const targetLabel = getAttribute(ARIA_LABEL, targetEl)
    const targetLabelledBy = getAttribute(ARIA_LABELLEDBY, targetEl)
    const targetSizes = (targetEl as HTMLImageElement).sizes
    const targetSrc = (targetEl as HTMLImageElement).src
    const targetSrcset = (targetEl as HTMLImageElement).srcset

    zoomImgEl = new Image()
    addEventListener(LOAD, handleZoomImgLoad, zoomImgEl)
    addEventListener(CLICK, handleZoomImgClick, zoomImgEl)
    addEventListener(KEYDOWN, handleZoomImgKeyDown, zoomImgEl)
    setAttribute(ARIA_DESCRIBEDBY, closeDescId, zoomImgEl)
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomImgEl)
    setAttribute(ROLE, BUTTON, zoomImgEl)
    setAttribute(STYLE, styleZoomStart, zoomImgEl)
    setAttribute(TABINDEX, ZERO_STR, zoomImgEl)

    if (targetAlt) zoomImgEl.alt = targetAlt
    if (targetSrc) zoomImgEl.src = targetSrc
    if (targetSrcset) zoomImgEl.srcset = targetSrcset
    if (targetSizes) zoomImgEl.sizes = targetSizes
    if (targetLabel) setAttribute(ARIA_LABEL, targetLabel, zoomImgEl)
    if (targetLabelledBy) {
      setAttribute(ARIA_LABELLEDBY, targetLabelledBy, zoomImgEl)
    }

    modalEl = createModal()

    appendChild(zoomImgEl, modalEl)
    appendChild(modalEl, portalEl)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)
  }

  const zoomNonImg = (): void => {
    if (!targetEl || state !== State.UNLOADED) return

    zoomEl = createDiv()
    addEventListener(CLICK, handleZoomImgClick, zoomEl)
    addEventListener(KEYDOWN, handleZoomImgKeyDown, zoomEl)
    setAttribute(ARIA_DESCRIBEDBY, closeDescId, zoomEl)
    setAttribute(DATA_RMIZ_ZOOMED, '', zoomEl)
    setAttribute(ID, 'abc', zoomEl)
    setAttribute(ROLE, BUTTON, zoomEl)
    setAttribute(STYLE, styleZoomStart, zoomEl)
    setAttribute(TABINDEX, ZERO_STR, zoomEl)

    const cloneEl = targetEl.cloneNode(true) as HTMLElement
    removeAttribute(ID, cloneEl)
    removeAttribute(TABINDEX, cloneEl)
    if (originalRole) {
      setAttribute(ROLE, originalRole, cloneEl)
    } else {
      removeAttribute(ROLE, cloneEl)
    }
    if (originalAriaDescribedBy) {
      setAttribute(ARIA_DESCRIBEDBY, originalAriaDescribedBy, cloneEl)
    } else {
      removeAttribute(ARIA_DESCRIBEDBY, cloneEl)
    }
    addEventListener(CLICK, handleZoomImgClick, zoomEl)
    appendChild(cloneEl, zoomEl)

    modalEl = createModal()

    appendChild(zoomEl, modalEl)
    appendChild(modalEl, portalEl)

    addEventListener(KEYDOWN, handleDocumentKeyDown, document)
    addEventListener(SCROLL, handleScroll, scrollableEl)

    handleZoomImgLoad()
  }

  interface CreateModal {
    (): HTMLDivElement
  }

  const createModal: CreateModal = () => {
    const el = createDiv()

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

  const unzoom = (): void => {
    if (state === State.LOADED) {
      const el = isImg ? zoomImgEl : zoomEl

      if (el) {
        el.blur()
        addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el)
      }

      if (modalEl) {
        modalEl.style.backgroundColor = overlayBgColorStart
      }
    }

    if (state !== State.UNLOADED) {
      setState(State.UNLOADING)
    }
  }

  init()

  return { cleanup, update }
}

export default ImageZoom

//
// STYLING
//

const styleCursorZoomIn = 'cursor:-webkit-zoom-in;cursor:zoom-in;'

const styleCursorZoomOut = 'cursor:-webkit-zoom-out;cursor:zoom-out;'

interface GetStyleOverlay {
  (backgroundColor: string, transitionDuration: string, zIndex: string): string
}

const getStyleOverlay: GetStyleOverlay = (
  backgroundColor,
  transitionDuration,
  zIndex
) =>
  styleCursorZoomOut +
  'position:fixed;' +
  'top:0;' +
  'right:0;' +
  'bottom:0;' +
  'left:0;' +
  'width:100%;' +
  'height:100%;' +
  '-webkit-transition-property:background-color;' +
  '-o-transition-property:background-color;' +
  'transition-property:background-color;' +
  `background-color:${backgroundColor};` +
  `transition-duration:${transitionDuration};` +
  `z-index:${zIndex};`

const styleVisibilityHidden = 'visibility:hidden;'

const styleHidden = 'display:none;'

const styleZoomed =
  styleCursorZoomOut +
  'position:absolute;' +
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
  `transition-duration:${transitionDuration};`

interface CombineStyles {
  (x: string | null, y: string): string
}

const combineStyles: CombineStyles = (x, y) => {
  const safeX = (x || '').trim()
  const separator = safeX.slice(-1) === ';' ? '' : ';'

  return [safeX, y].join(separator)
}

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
    return getZoomImgStyleStr(0, 0, 0, 0, 'none', '0ms')
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

const isSelectKey: IsKey = (e) =>
  e.key === 'Enter' || e.keyCode === 13 || e.key === 'Space' || e.keyCode === 32

const isEscapeKey: IsKey = (e) => e.key === 'Escape' || e.keyCode === 27

interface UniqueId {
  (prefix?: string): string
}

const uniqueId: UniqueId = (prefix = '') =>
  prefix.concat(Math.random().toString(16).slice(-4))

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

interface CreateDiv {
  (): HTMLDivElement
}

const createDiv: CreateDiv = () => document.createElement('div')

interface CreateDescEl {
  (id: string, text: string): HTMLDivElement
}

const createDescEl: CreateDescEl = (id, text) => {
  const el = createDiv()

  setAttribute(ID, id, el)
  setAttribute(DATA_RMIZ_DESC, '', el)
  setAttribute(STYLE, styleHidden, el)
  setTextContent(text, el)

  return el
}

interface Focus {
  (el: HTMLElement): void
}

const focus: Focus = (el) => {
  el.focus({ preventScroll: true })
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

interface SetTextContent {
  (text: string, el: HTMLElement): void
}

const setTextContent: SetTextContent = (text, el) => (el.textContent = text)
