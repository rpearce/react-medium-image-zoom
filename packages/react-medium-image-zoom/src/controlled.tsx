import React from 'react'
import ReactDOM from 'react-dom'

import {
  type ImageZoomElement,
  type ImageZoomState,
  tagName,
  type ZoomChangeEventDetail,
} from '@rpearce/image-zoom'

// =============================================================================

type ModalState = 'LOADED' | 'LOADING' | 'UNLOADED' | 'UNLOADING'

// =============================================================================

/**
 * The element's state until it reports one: on the server and in the first
 * client render, which hydration needs to agree on
 */
const INITIAL: ImageZoomState = {
  hasImage: false,
  isSvg: false,
  alt: undefined,
  src: undefined,
  srcset: undefined,
  sizes: undefined,
  crossOrigin: undefined,
  modalState: 'UNLOADED',
  isZoomImgLoaded: false,
  modalImgStyle: {},
}

/**
 * Whether the host is an upgraded <image-zoom>. In another document, such as
 * an iframe a portal renders into, it's a plain element: no zoom.
 */
function isImageZoom(node: HTMLElement | null): node is ImageZoomElement {
  return node !== null && 'state' in node
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
  s: ImageZoomState
  dialog: HTMLDialogElement | null
}

/**
 * Renders <image-zoom custom-content> and portals the modal content into the
 * element's dialog. The element does the rest; `s` and `dialog` mirror its
 * `state` and `dialog`.
 */
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
    s: INITIAL,
    dialog: null,
  }

  private readonly refHost = React.createRef<HTMLElement>()
  private readonly refModalImg = React.createRef<HTMLImageElement>()

  render(): React.ReactNode {
    const props = this.props
    const s = this.state.s
    const dialog = this.state.dialog
    const zoomImg = props.zoomImg
    const WrapElement = props.wrapElement
    const IconZoom = props.IconZoom

    const labelBtnZoom =
      s.alt !== undefined && s.alt !== ''
        ? `${props.a11yNameButtonZoom}: ${s.alt}`
        : props.a11yNameButtonZoom

    return React.createElement(
      tagName,
      {
        'data-rmiz': '',
        'custom-content': '',
        disabled: props.isDisabled === true ? true : undefined,
        inline: props.wrapElement === 'span' ? true : undefined,
        swipe: props.canSwipeToUnzoom ? undefined : 'none',
        'zoom-margin': String(props.zoomMargin),
        'swipe-to-unzoom-threshold': String(props.swipeToUnzoomThreshold),
        'dialog-class': props.classDialog,
        'zoom-src': zoomImg?.src,
        'zoom-srcset': zoomImg?.srcSet,
        'zoom-sizes': zoomImg?.sizes,
        'zoom-crossorigin': zoomImg?.crossOrigin,
        ref: this.refHost,
        // Last: React writes props in order, and the element reads zoom-* and
        // zoom-margin when it enters LOADING
        zoomed: props.isZoomed ? true : undefined,
      },
      <WrapElement data-rmiz-content={s.hasImage ? 'found' : 'not-found'}>
        {props.children}
      </WrapElement>,
      s.hasImage && (
        <button
          slot="zoom-button"
          data-rmiz-btn-zoom=""
          aria-label={labelBtnZoom}
          type="button"
        >
          <IconZoom />
        </button>
      ),
      s.hasImage && dialog !== null && this.renderModal(dialog),
    )
  }

  /**
   * The content, portaled into the element's dialog
   */
  renderModal(dialog: HTMLDialogElement): React.ReactPortal {
    const props = this.props
    const s = this.state.s
    const IconUnzoom = props.IconUnzoom
    const ZoomContent = props.ZoomContent
    const img = this.renderModalImg()

    const buttonUnzoom = (
      <button
        aria-label={props.a11yNameButtonUnzoom}
        data-rmiz-btn-unzoom=""
        onClick={this.handleBtnUnzoomClick}
        type="button"
      >
        <IconUnzoom />
      </button>
    )

    const modalContent =
      ZoomContent == null ? (
        <>
          {img}
          {buttonUnzoom}
        </>
      ) : (
        <ZoomContent
          buttonUnzoom={buttonUnzoom}
          modalState={s.modalState}
          img={img}
          isZoomImgLoaded={s.isZoomImgLoaded}
          onUnzoom={this.handleUnzoom}
        />
      )

    return ReactDOM.createPortal(
      <div
        data-rmiz-modal-content=""
        role="presentation"
        onClick={this.handleModalContentClick}
      >
        {modalContent}
      </div>,
      dialog,
    )
  }

  /**
   * The modal img. The element writes its geometry, its `id` and, for an SVG
   * source, the clone inside the div; React writes the source attributes and
   * swaps in `zoomImg` once it has loaded.
   */
  renderModalImg(): React.ReactElement {
    const s = this.state.s

    if (s.isSvg) {
      return (
        <div
          data-rmiz-modal-img
          ref={this.refModalImg}
          style={s.modalImgStyle}
        />
      )
    }

    // `zoomImg` without the two props the element owns
    const zoomImgContent = {
      ...this.props.zoomImg,
      id: undefined,
      onTransitionEnd: undefined,
    }

    return (
      <img
        alt={s.alt}
        crossOrigin={s.crossOrigin ?? undefined}
        sizes={s.sizes}
        src={s.src}
        srcSet={s.srcset}
        {...(s.isZoomImgLoaded && s.modalState === 'LOADED'
          ? zoomImgContent
          : {})}
        data-rmiz-modal-img=""
        height={s.modalImgStyle.height ?? undefined}
        ref={this.refModalImg}
        style={s.modalImgStyle}
        width={s.modalImgStyle.width ?? undefined}
      />
    )
  }

  // ===========================================================================

  componentDidMount(): void {
    const el = this.refHost.current
    if (!isImageZoom(el)) return
    el.addEventListener('zoomchange', this.handleZoomChange)
    el.addEventListener('statechange', this.handleStateChange)
    // An SVG source can report hasImage during connect, before the listener
    this.handleStateChange()
    // After a Suspense or Activity reveal, the element may have unzoomed
    // itself (Escape) while React's state still says zoomed
    const isZoomed = this.props.isZoomed
    if (el.zoomed !== isZoomed) el.zoomed = isZoomed
  }

  componentWillUnmount(): void {
    const el = this.refHost.current
    if (!isImageZoom(el)) return
    el.removeEventListener('zoomchange', this.handleZoomChange)
    el.removeEventListener('statechange', this.handleStateChange)
  }

  // ===========================================================================

  /**
   * Report a request that started in the element; the prop decides
   */
  handleZoomChange = (e: CustomEvent<ZoomChangeEventDetail>): void => {
    if (e.target !== e.currentTarget) return // a nested zoom's request
    e.preventDefault()
    this.props.onZoomChange?.(e.detail.zoomed, {
      event: e.detail.originalEvent,
    })
  }

  /**
   * Mirror the element's state and dialog
   */
  handleStateChange = (): void => {
    const el = this.refHost.current
    if (!isImageZoom(el)) return
    this.setState({ s: el.state, dialog: el.dialog })
  }

  /**
   * Report that unzooming should occur
   */
  handleUnzoom = (e: React.SyntheticEvent | Event): void => {
    if (this.props.isDisabled !== true) {
      this.props.onZoomChange?.(false, { event: e })
    }
  }

  /**
   * Capture click event when clicking unzoom button
   */
  handleBtnUnzoomClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    this.handleUnzoom(e.nativeEvent)
  }

  /**
   * Only a click on the content itself or the modal img unzooms. The stop
   * keeps it from reaching this component's React ancestors.
   */
  handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const img = this.refModalImg.current
    if (e.target === e.currentTarget || e.target === img) {
      e.stopPropagation()
      this.handleUnzoom(e.nativeEvent)
    } else if (e.target instanceof Node && img?.contains(e.target) === true) {
      // The SVG clone: the element's own listener has requested the unzoom
      e.stopPropagation()
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
