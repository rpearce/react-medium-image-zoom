/* eslint-disable max-lines -- this file contains a single React class component that manages zoom state and rendering */
import React from 'react'
import ReactDOM from 'react-dom'

import type { StyleObject, SupportedImage } from './utils/types.js'
import { adjustSvgIDs } from './utils/adjust-svg-ids.js'
import {
  testDiv,
  testImg,
  testImgLoaded,
  testSvg,
} from './utils/element-tests.js'
import { getImgAlt } from './utils/get-img-alt.js'
import { getImgSrc } from './utils/get-img-src.js'
import { getStyleGhost } from './utils/get-style-ghost.js'
import { getStyleModalImg } from './utils/get-style-modal-img.js'

// =============================================================================

/**
 * The selector query we use to find and track the image
 */
const IMAGE_QUERY = ['img', 'svg', '[role="img"]', '[data-zoom]']
  .map(x => `${x}:not([aria-hidden="true"])`)
  .join(',')

// =============================================================================

type ModalState = 'LOADED' | 'LOADING' | 'UNLOADED' | 'UNLOADING'

// =============================================================================

interface BodyAttrs {
  overflow: string
  width: string
}

/**
 * Helps keep track of some key `<body>` attributes
 * so we can remove and re-add them when disabling and
 * re-enabling body scrolling
 */
const defaultBodyAttrs: BodyAttrs = {
  overflow: '',
  width: '',
}

// =============================================================================

/**
 * Find or create a container for the dialog
 */
function getDialogContainer(): HTMLDivElement {
  const existing = document.querySelector<HTMLDivElement>('[data-rmiz-portal]')

  if (existing != null) {
    return existing
  }

  const el = document.createElement('div')
  el.setAttribute('data-rmiz-portal', '')
  document.body.appendChild(el)

  return el
}

/**
 * Prevent the browser from removing the dialog on Escape
 */
function handleDialogCancelStatic(e: React.SyntheticEvent): void {
  e.preventDefault()
}

// =============================================================================

export interface ControlledProps {
  a11yNameButtonUnzoom?: string
  a11yNameButtonZoom?: string
  canSwipeToUnzoom?: boolean
  children: React.ReactNode
  classDialog?: string
  IconUnzoom?: React.ElementType
  IconZoom?: React.ElementType
  isDisabled?: boolean
  isZoomed: boolean
  onZoomChange?: (
    value: boolean,
    data: { event: React.SyntheticEvent | Event },
  ) => void
  swipeToUnzoomThreshold?: number
  wrapElement?: 'div' | 'span'
  ZoomContent?: (data: {
    buttonUnzoom: React.ReactElement<HTMLButtonElement>
    img: React.ReactElement | null
    isZoomImgLoaded: boolean
    modalState: ModalState
    onUnzoom: (e: Event) => void
  }) => React.ReactElement
  zoomImg?: React.ImgHTMLAttributes<HTMLImageElement>
  zoomMargin?: number
}

export function Controlled(props: ControlledProps): React.JSX.Element {
  return <ControlledBase {...props} />
}

interface ControlledDefaultProps {
  a11yNameButtonUnzoom: string
  a11yNameButtonZoom: string
  canSwipeToUnzoom: boolean
  IconUnzoom: React.ElementType
  IconZoom: React.ElementType
  isDisabled?: boolean
  swipeToUnzoomThreshold: number
  wrapElement: 'div' | 'span'
  zoomMargin: number
}

type ControlledPropsWithDefaults = ControlledDefaultProps & ControlledProps

interface ControlledState {
  id: string
  isZoomImgLoaded: boolean
  loadedImgEl: HTMLImageElement | undefined
  modalState: ModalState
  shouldRefresh: boolean
  styleGhost: StyleObject
}

class ControlledBase extends React.Component<
  ControlledPropsWithDefaults,
  ControlledState
> {
  static defaultProps: ControlledDefaultProps = {
    a11yNameButtonUnzoom: 'Minimize image',
    a11yNameButtonZoom: 'Expand image',
    canSwipeToUnzoom: true,
    IconUnzoom: ICompress,
    IconZoom: IEnlarge,
    isDisabled: false,
    swipeToUnzoomThreshold: 10,
    wrapElement: 'div',
    zoomMargin: 0,
  }

  state: ControlledState = {
    id: '',
    isZoomImgLoaded: false,
    loadedImgEl: undefined,
    modalState: 'UNLOADED',
    shouldRefresh: false,
    styleGhost: {},
  }

  private readonly refContent = React.createRef<HTMLDivElement>()
  private readonly refDialog = React.createRef<HTMLDialogElement>()
  private readonly refModalContent = React.createRef<HTMLDivElement>()
  private readonly refModalImg = React.createRef<HTMLImageElement>()
  private readonly refWrap = React.createRef<HTMLDivElement>()

  private contentChangeObserver: MutationObserver | undefined
  private contentNotFoundChangeObserver: MutationObserver | undefined
  private imgEl: SupportedImage | null = null
  private imgElResizeObserver: ResizeObserver | undefined
  private isScaling = false
  private prevBodyAttrs: BodyAttrs = defaultBodyAttrs
  private styleModalImg: StyleObject = {}
  private touchYStart?: number
  private touchYEnd?: number

  private timeoutTransitionEnd?: ReturnType<typeof setTimeout>

  // eslint-disable-next-line complexity -- render method requires many conditional branches for modal states and image types
  render(): React.ReactNode {
    const {
      handleBtnUnzoomClick,
      handleDialogClick,
      handleDialogClose,
      handleUnzoom,
      handleZoom,
      imgEl,
      props: {
        a11yNameButtonUnzoom,
        a11yNameButtonZoom,
        children,
        classDialog,
        IconUnzoom,
        IconZoom,
        wrapElement: WrapElement,
        ZoomContent,
        zoomImg,
        zoomMargin,
      },
      refContent,
      refDialog,
      refModalContent,
      refModalImg,
      refWrap,
      state: {
        id,
        isZoomImgLoaded,
        loadedImgEl,
        modalState,
        shouldRefresh,
        styleGhost,
      },
    } = this

    const idModal = `rmiz-modal-${id}`
    const idModalImg = `rmiz-modal-img-${id}`

    // =========================================================================

    const isDiv = testDiv(imgEl)
    const isImg = testImg(imgEl)
    const isSvg = testSvg(imgEl)

    const imgAlt = getImgAlt(imgEl)
    const imgSrc = getImgSrc(imgEl)
    const imgSizes = isImg ? imgEl.sizes : undefined
    const imgSrcSet = isImg ? imgEl.srcset : undefined
    const imgCrossOrigin = isImg ? imgEl.crossOrigin : undefined

    const hasZoomImg = zoomImg?.src !== undefined && zoomImg.src !== ''

    const hasImage = this.hasImage()

    const labelBtnZoom =
      imgAlt !== undefined && imgAlt !== ''
        ? `${a11yNameButtonZoom}: ${imgAlt}`
        : a11yNameButtonZoom

    const isModalActive = modalState === 'LOADING' || modalState === 'LOADED'

    const dataContentState = hasImage ? 'found' : 'not-found'

    const dataOverlayState =
      modalState === 'UNLOADED' || modalState === 'UNLOADING'
        ? 'hidden'
        : 'visible'

    // =========================================================================

    const styleContent: React.CSSProperties = {
      visibility: modalState === 'UNLOADED' ? 'visible' : 'hidden',
    }

    // Share this with UNSAFE_handleSvg
    // NOTE: drive the "zoomed" style off modalState only (not `isZoomed`).
    // When a consumer passes an inline `ZoomContent` whose identity changes
    // per render, the ZoomContent subtree remounts on each parent render.
    // Using `isZoomed` prop here would cause the fresh modalImg to mount
    // directly in the unzoomed state on the way out, skipping the transition.
    // Driving off modalState means the new modalImg mounts zoomed at LOADED and
    // transitions to unzoomed when we flip to UNLOADING.
    this.styleModalImg =
      hasImage && imgEl !== null
        ? getStyleModalImg({
            hasZoomImg,
            imgSrc,
            isSvg,
            isZoomed: isModalActive,
            loadedImgEl,
            offset: zoomMargin,
            shouldRefresh,
            targetEl: imgEl,
          })
        : {}

    // =========================================================================

    let modalContent = null

    if (hasImage) {
      const modalImg =
        isImg || isDiv ? (
          <img
            alt={imgAlt}
            // @ts-expect-error crossOrigin type is odd
            crossOrigin={imgCrossOrigin}
            sizes={imgSizes}
            src={imgSrc}
            srcSet={imgSrcSet}
            {...(isZoomImgLoaded && modalState === 'LOADED' ? zoomImg : {})}
            data-rmiz-modal-img=""
            height={this.styleModalImg.height ?? undefined}
            id={idModalImg}
            onTransitionEnd={this.handleImgTransitionEnd}
            ref={refModalImg}
            style={this.styleModalImg}
            width={this.styleModalImg.width ?? undefined}
          />
        ) : isSvg ? (
          <div
            data-rmiz-modal-img
            onTransitionEnd={this.handleImgTransitionEnd}
            ref={refModalImg}
            style={this.styleModalImg}
          />
        ) : null

      const modalBtnUnzoom = (
        <button
          aria-label={a11yNameButtonUnzoom}
          data-rmiz-btn-unzoom=""
          onClick={handleBtnUnzoomClick}
          type="button"
        >
          <IconUnzoom />
        </button>
      )

      modalContent =
        ZoomContent == null ? (
          <>
            {modalImg}
            {modalBtnUnzoom}
          </>
        ) : (
          <ZoomContent
            buttonUnzoom={modalBtnUnzoom}
            modalState={modalState}
            img={modalImg}
            isZoomImgLoaded={isZoomImgLoaded}
            onUnzoom={handleUnzoom}
          />
        )
    }

    // =========================================================================

    return (
      <WrapElement aria-owns={idModal} data-rmiz="" ref={refWrap}>
        <WrapElement
          data-rmiz-content={dataContentState}
          ref={refContent}
          style={styleContent}
        >
          {children}
        </WrapElement>
        {hasImage && (
          <WrapElement data-rmiz-ghost="" style={styleGhost}>
            <button
              aria-label={labelBtnZoom}
              data-rmiz-btn-zoom=""
              onClick={handleZoom}
              type="button"
            >
              <IconZoom />
            </button>
          </WrapElement>
        )}
        {hasImage &&
          ReactDOM.createPortal(
            <dialog /* eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-redundant-roles -- dialog element requires these for accessibility workarounds */
              aria-labelledby={idModalImg}
              aria-modal="true"
              className={classDialog}
              data-rmiz-modal=""
              id={idModal}
              onClick={handleDialogClick}
              onClose={handleDialogClose}
              onCancel={handleDialogCancelStatic}
              ref={refDialog}
              role="dialog"
            >
              <div data-rmiz-modal-overlay={dataOverlayState} />
              <div data-rmiz-modal-content="" ref={refModalContent}>
                {modalContent}
              </div>
            </dialog>,
            getDialogContainer(),
          )}
      </WrapElement>
    )
  }

  // ===========================================================================

  componentDidMount(): void {
    this.setId()
    this.setAndTrackImg()
    this.handleImgLoad()
    this.UNSAFE_handleSvg()
  }

  componentWillUnmount(): void {
    if (this.state.modalState !== 'UNLOADED') {
      this.bodyScrollEnable()
    }
    this.contentChangeObserver?.disconnect()
    this.contentNotFoundChangeObserver?.disconnect()
    this.imgElResizeObserver?.disconnect()
    this.imgEl?.removeEventListener('load', this.handleImgLoad)
    this.imgEl?.removeEventListener('click', this.handleZoom)
    clearTimeout(this.timeoutTransitionEnd)
    window.removeEventListener('wheel', this.handleWheel)
    window.removeEventListener('touchstart', this.handleTouchStart)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
    window.removeEventListener('touchcancel', this.handleTouchCancel)
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleKeyDown, true)
  }

  // ===========================================================================

  componentDidUpdate(
    prevProps: ControlledPropsWithDefaults,
    prevState: ControlledState,
  ): void {
    this.handleModalStateChange(prevState.modalState)
    this.UNSAFE_handleSvg()
    this.handleIfZoomChanged(prevProps.isZoomed)
  }

  handleModalStateChange = (
    prevModalState: ControlledState['modalState'],
  ): void => {
    const {
      state: { modalState },
    } = this

    if (prevModalState !== 'LOADING' && modalState === 'LOADING') {
      this.loadZoomImg()
      window.addEventListener('resize', this.handleResize, { passive: true })
      window.addEventListener('touchstart', this.handleTouchStart, {
        passive: true,
      })
      window.addEventListener('touchmove', this.handleTouchMove, {
        passive: true,
      })
      window.addEventListener('touchend', this.handleTouchEnd, {
        passive: true,
      })
      window.addEventListener('touchcancel', this.handleTouchCancel, {
        passive: true,
      })
      document.addEventListener('keydown', this.handleKeyDown, true)
    } else if (prevModalState !== 'LOADED' && modalState === 'LOADED') {
      window.addEventListener('wheel', this.handleWheel, { passive: true })
    } else if (prevModalState !== 'UNLOADING' && modalState === 'UNLOADING') {
      this.ensureImgTransitionEnd()
      window.removeEventListener('wheel', this.handleWheel)
      window.removeEventListener('touchstart', this.handleTouchStart)
      window.removeEventListener('touchmove', this.handleTouchMove)
      window.removeEventListener('touchend', this.handleTouchEnd)
      window.removeEventListener('touchcancel', this.handleTouchCancel)
      document.removeEventListener('keydown', this.handleKeyDown, true)
    } else if (prevModalState !== 'UNLOADED' && modalState === 'UNLOADED') {
      this.bodyScrollEnable()
      window.removeEventListener('resize', this.handleResize)
      this.refDialog.current?.close()
    }
  }

  // ===========================================================================

  /**
   * Because of SSR, set a unique ID after render
   */
  setId = (): void => {
    const gen4 = (): string => Math.random().toString(16).slice(-4)
    this.setState({ id: gen4() + gen4() + gen4() })
  }

  // ===========================================================================

  /**
   * Find and set the image we're working with
   */
  setAndTrackImg = (): void => {
    const {
      refContent: { current: contentEl },
    } = this

    if (contentEl == null) return

    this.imgEl = contentEl.querySelector(IMAGE_QUERY) as SupportedImage | null

    if (this.imgEl !== null) {
      this.contentNotFoundChangeObserver?.disconnect()
      this.imgEl.addEventListener('load', this.handleImgLoad)
      this.imgEl.addEventListener('click', this.handleZoom)

      if (this.state.loadedImgEl == null) {
        this.handleImgLoad()
      }

      this.imgElResizeObserver = new ResizeObserver(entries => {
        const [entry] = entries

        if (entry?.target !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- ResizeObserver is observing this.imgEl which is always a SupportedImage
          this.imgEl = entry.target as SupportedImage

          // Update ghost and force a re-render.
          // NOTE: Always force a re-render here, even if we remove
          //       all state changes. Pass `{}` in that case.
          this.setState({ styleGhost: getStyleGhost(this.imgEl) })
        }
      })

      this.imgElResizeObserver.observe(this.imgEl)

      // Watch for any reasonable DOM changes and update ghost if so
      if (this.contentChangeObserver == null) {
        this.contentChangeObserver = new MutationObserver(() => {
          this.setState({ styleGhost: getStyleGhost(this.imgEl) })
        })

        this.contentChangeObserver.observe(contentEl, {
          attributes: true,
          childList: true,
          subtree: true,
        })
      }
    } else if (this.contentNotFoundChangeObserver == null) {
      this.contentNotFoundChangeObserver = new MutationObserver(
        this.setAndTrackImg,
      )
      this.contentNotFoundChangeObserver.observe(contentEl, {
        childList: true,
        subtree: true,
      })
    }
  }

  // ===========================================================================

  /**
   * Show modal when zoomed; hide modal when unzoomed
   */
  handleIfZoomChanged = (prevIsZoomed: boolean): void => {
    const {
      props: { isZoomed },
    } = this

    if (!prevIsZoomed && isZoomed) {
      this.zoom()
    } else if (prevIsZoomed && !isZoomed) {
      this.unzoom()
    }
  }

  // ===========================================================================

  /**
   * Ensure we always have the latest img src value loaded
   */
  handleImgLoad = (): void => {
    const imgSrc = getImgSrc(this.imgEl)

    if (imgSrc == null || imgSrc === '') return

    const img = new Image()

    const { imgEl } = this
    if (testImg(imgEl)) {
      const { sizes, srcset, crossOrigin } = imgEl
      img.sizes = sizes
      img.srcset = srcset
      img.crossOrigin = crossOrigin
    }

    // img.src must be set after sizes and srcset
    // because of Firefox flickering on zoom
    img.src = imgSrc

    const setLoaded = (): void => {
      this.setState({
        loadedImgEl: img,
        styleGhost: getStyleGhost(this.imgEl),
      })
    }

    img
      .decode()
      .then(setLoaded)
      .catch(() => {
        if (testImgLoaded(img)) {
          setLoaded()
          return
        }
        img.onload = setLoaded
      })
  }

  // ===========================================================================

  /**
   * Report that zooming should occur
   */
  handleZoom = (e: React.SyntheticEvent | Event): void => {
    if (this.props.isDisabled !== true && this.hasImage()) {
      this.props.onZoomChange?.(true, { event: e })
    }
  }

  /**
   * Report that unzooming should occur
   */
  handleUnzoom = (e: React.SyntheticEvent | Event): void => {
    if (this.props.isDisabled !== true) {
      this.props.onZoomChange?.(false, { event: e })
    }
  }

  // ===========================================================================

  /**
   * Capture click event when clicking unzoom button
   */
  handleBtnUnzoomClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    this.handleUnzoom(e)
  }

  // ===========================================================================

  /**
   *  Have dialog.click() only close in certain situations
   */
  handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    if (
      e.target === this.refModalContent.current ||
      e.target === this.refModalImg.current
    ) {
      e.stopPropagation()
      this.handleUnzoom(e)
    }
  }

  // ===========================================================================

  /**
   *  Prevent dialog's close event from closing a parent modal
   */
  handleDialogClose = (e: React.SyntheticEvent<HTMLDialogElement>): void => {
    e.stopPropagation()
    this.handleUnzoom(e)
  }

  // ===========================================================================

  /**
   * Intercept default dialog.close() and use ours so we can animate
   */
  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      this.handleUnzoom(e)
    }
  }

  // ===========================================================================

  /**
   * Unzoom on wheel event
   */
  handleWheel = (e: WheelEvent): void => {
    // don't handle the event when the user is zooming with ctrl + wheel (or with pinch to zoom)
    if (e.ctrlKey) return

    e.stopPropagation()
    queueMicrotask(() => {
      this.handleUnzoom(e)
    })
  }

  /**
   * Start tracking the Y-axis but abort if non-scroll
   * gesture is detected (like pinch-to-zoom)
   */
  handleTouchStart = (e: TouchEvent): void => {
    if (e.touches.length > 1) {
      this.isScaling = true
      return
    }

    const { changedTouches } = e
    const [changedTouch] = changedTouches
    if (changedTouches.length === 1 && changedTouch !== undefined) {
      const { screenY } = changedTouch
      this.touchYStart = screenY
    }
  }

  /**
   * If the window isn't browser zoomed,
   * track how far we've moved on the Y-axis
   * and unzoom if we detect a swipe
   */
  handleTouchMove = (e: TouchEvent): void => {
    const browserScale = window.visualViewport?.scale ?? 1
    const { changedTouches: changedTouchesMove } = e
    const [changedTouchMove] = changedTouchesMove

    if (
      this.props.canSwipeToUnzoom &&
      !this.isScaling &&
      browserScale <= 1 &&
      this.touchYStart != null &&
      changedTouchMove !== undefined
    ) {
      const { screenY } = changedTouchMove
      this.touchYEnd = screenY

      const max = Math.max(this.touchYStart, this.touchYEnd)
      const min = Math.min(this.touchYStart, this.touchYEnd)
      const delta = Math.abs(max - min)

      if (delta > this.props.swipeToUnzoomThreshold) {
        this.touchYStart = undefined
        this.touchYEnd = undefined
        this.handleUnzoom(e)
      }
    }
  }

  /**
   * Reset the scaling check and the Y-axis start and end tracking points
   */
  handleTouchEnd = (): void => {
    this.isScaling = false
    this.touchYStart = undefined
    this.touchYEnd = undefined
  }

  /**
   * Reset the scaling check and the Y-axis start and end tracking points
   */
  handleTouchCancel = (): void => {
    this.isScaling = false
    this.touchYStart = undefined
    this.touchYEnd = undefined
  }

  // ===========================================================================

  /**
   * Force re-render on resize
   */
  handleResize = (): void => {
    this.setState({ shouldRefresh: true })
  }

  // ===========================================================================

  /**
   * Check if we have a loaded image to work with
   */
  hasImage = (): boolean =>
    this.imgEl !== null &&
    (this.state.loadedImgEl !== undefined || testSvg(this.imgEl)) &&
    window.getComputedStyle(this.imgEl).display !== 'none'

  // ===========================================================================

  /**
   * Perform zooming actions
   */
  zoom = (): void => {
    this.bodyScrollDisable()
    this.refDialog.current?.showModal()
    this.setState({ modalState: 'LOADING' })
  }

  /**
   * Perform unzooming actions
   */
  unzoom = (): void => {
    this.setState({ modalState: 'UNLOADING' })
  }

  // ===========================================================================

  /**
   * Handle img zoom/unzoom transitionend events and update states:
   *   - LOADING -> LOADED
   *   - UNLOADING -> UNLOADED
   */
  handleImgTransitionEnd = (): void => {
    clearTimeout(this.timeoutTransitionEnd)

    if (this.state.modalState === 'LOADING') {
      this.setState({ modalState: 'LOADED' })
    } else if (this.state.modalState === 'UNLOADING') {
      this.setState({ shouldRefresh: false, modalState: 'UNLOADED' })
    }
  }

  /**
   * Ensure handleImgTransitionEnd gets called. Safari can have significant
   * delays before firing the event.
   */
  ensureImgTransitionEnd = (): void => {
    if (this.refModalImg.current !== null) {
      const { transitionDuration: td } = window.getComputedStyle(
        this.refModalImg.current,
      )
      const tdFloat = parseFloat(td)

      if (tdFloat !== 0 && !Number.isNaN(tdFloat)) {
        const tdMs = tdFloat * (td.endsWith('ms') ? 1 : 1000) + 50
        this.timeoutTransitionEnd = setTimeout(
          this.handleImgTransitionEnd,
          tdMs,
        )
      }
    }
  }

  // ===========================================================================

  /**
   * Disable body scrolling
   */
  bodyScrollDisable = (): void => {
    this.prevBodyAttrs = {
      overflow: document.body.style.overflow,
      width: document.body.style.width,
    }

    // Get clientWidth before setting overflow: 'hidden'
    const {
      body: { clientWidth },
    } = document

    document.body.style.overflow = 'hidden'
    document.body.style.width = `${clientWidth}px`
  }

  /**
   * Enable body scrolling
   */
  bodyScrollEnable = (): void => {
    const {
      prevBodyAttrs: { overflow, width },
    } = this
    document.body.style.width = width
    document.body.style.overflow = overflow
    this.prevBodyAttrs = defaultBodyAttrs
  }

  // ===========================================================================

  /**
   * Load the zoomImg manually
   */
  loadZoomImg = (): void => {
    const {
      props: { zoomImg },
    } = this
    if (zoomImg == null) return

    const { src: zoomImgSrc } = zoomImg

    if (zoomImgSrc !== undefined && zoomImgSrc !== '') {
      const img = new Image()
      img.sizes = zoomImg.sizes ?? ''
      img.srcset = zoomImg.srcSet ?? ''
      // @ts-expect-error crossOrigin type is odd
      img.crossOrigin = zoomImg.crossOrigin ?? undefined
      img.src = zoomImgSrc

      const setLoaded = (): void => {
        this.setState({ isZoomImgLoaded: true })
      }

      img
        .decode()
        .then(setLoaded)
        .catch(() => {
          if (testImgLoaded(img)) {
            setLoaded()
            return
          }
          img.onload = setLoaded
        })
    }
  }

  // ===========================================================================

  /**
   * Hackily deal with SVGs because of all of their unknowns
   */
  UNSAFE_handleSvg = (): void => {
    const { imgEl, refModalImg, styleModalImg } = this

    if (testSvg(imgEl)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- cloneNode of an SVGElement returns the same type
      const svgEl = imgEl.cloneNode(true) as typeof imgEl

      // Deal with cloned SVG ID duplicate issues from https://github.com/rpearce/react-medium-image-zoom/issues/438
      adjustSvgIDs(svgEl)

      svgEl.style.width = `${styleModalImg.width ?? 0}px`
      svgEl.style.height = `${styleModalImg.height ?? 0}px`
      svgEl.addEventListener('click', this.handleUnzoom)

      refModalImg.current?.firstChild?.remove()
      refModalImg.current?.appendChild(svgEl)
    }
  }
}

function ICompress(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      data-rmiz-btn-unzoom-icon
      fill="currentColor"
      focusable="false"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z" />
    </svg>
  )
}

function IEnlarge(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      data-rmiz-btn-zoom-icon
      fill="currentColor"
      focusable="false"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 9 1 L 9 2 L 12.292969 2 L 2 12.292969 L 2 9 L 1 9 L 1 14 L 6 14 L 6 13 L 2.707031 13 L 13 2.707031 L 13 6 L 14 6 L 14 1 Z" />
    </svg>
  )
}
