import React, {
  CSSProperties,
  Component,
  ElementType,
  ImgHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  createRef,
} from 'react'

import type { SupportedImage } from './types'
import { IEnlarge, ICompress } from './icons'

import {
  getImgAlt,
  getImgSrc,
  getStyleGhost,
  getStyleModalImg,
  testDiv,
  testImg,
  testSvg,
} from './utils'

// =============================================================================

const enum ModalState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  UNLOADED = 'UNLOADED',
  UNLOADING = 'UNLOADING',
}

// =============================================================================

export interface ControlledProps {
  a11yNameButtonUnzoom?: string
  a11yNameButtonZoom?: string
  children: ReactNode
  IconUnzoom?: ElementType
  IconZoom?: ElementType
  isZoomed: boolean
  onZoomChange?: (value: boolean) => void
  scrollableEl?: Window | HTMLElement
  ZoomContent?: (data: {
    img: ReactElement | null
    buttonUnzoom: ReactElement<HTMLButtonElement>
    modalState: ModalState
    onUnzoom: () => void
  }) => ReactElement
  zoomImg?: ImgHTMLAttributes<HTMLImageElement>
  zoomMargin?: number
}

export function Controlled (props: ControlledProps) {
  return <ControlledBase {...props} />
}

interface ControlledDefaultProps {
  a11yNameButtonUnzoom: string
  a11yNameButtonZoom: string
  IconUnzoom: ElementType
  IconZoom: ElementType
  zoomMargin: number
}

type ControlledPropsWithDefaults = ControlledDefaultProps & ControlledProps

interface ControlledState {
  id: string,
  isZoomImgLoaded: boolean
  loadedImgEl: HTMLImageElement | undefined
  modalState: ModalState
  shouldRefresh: boolean
}

class ControlledBase extends Component<ControlledPropsWithDefaults, ControlledState> {
  static defaultProps: ControlledDefaultProps = {
    a11yNameButtonUnzoom: 'Minimize image',
    a11yNameButtonZoom: 'Expand image',
    IconUnzoom: ICompress,
    IconZoom: IEnlarge,
    zoomMargin: 0,
  }

  state: ControlledState = {
    id: '',
    isZoomImgLoaded: false,
    loadedImgEl: undefined,
    modalState: ModalState.UNLOADED,
    shouldRefresh: false,
  }

  private refContent = createRef<HTMLDivElement>()
  private refDialog = createRef<HTMLDialogElement>()
  private refModalContent = createRef<HTMLDivElement>()
  private refModalImg = createRef<HTMLImageElement>()
  private refWrap = createRef<HTMLDivElement>()

  private changeObserver: MutationObserver | undefined
  private imgEl: SupportedImage | null = null
  private imgElObserver: ResizeObserver | undefined
  private styleModalImg: CSSProperties = {}

  render() {
    const {
      handleDialogClick,
      handleDialogKeyDown,
      handleUnzoom,
      handleZoom,
      imgEl,
      props: {
        a11yNameButtonUnzoom,
        a11yNameButtonZoom,
        children,
        IconUnzoom,
        IconZoom,
        isZoomed,
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
      },
    } = this

    const idModalImg = `rmiz-modal-img-${id}`

    // =========================================================================

    const isDiv = testDiv(imgEl)
    const isImg = testImg(imgEl)
    const isSvg = testSvg(imgEl)

    const imgAlt = getImgAlt(imgEl)
    const imgSrc = getImgSrc(imgEl)
    const imgSizes = isImg ? imgEl.sizes : undefined
    const imgSrcSet = isImg ? imgEl.srcset : undefined

    const hasZoomImg = !!zoomImg?.src
    const hasImage = imgEl && (loadedImgEl || isSvg)

    const labelBtnZoom = imgAlt
      ? `${a11yNameButtonZoom}: ${imgAlt}`
      : a11yNameButtonZoom

    const isModalActive = modalState === ModalState.LOADING ||
      modalState === ModalState.LOADED

    const dataContentState = hasImage ? 'found' : 'not-found'

    const dataOverlayState =
      modalState === ModalState.UNLOADED || modalState === ModalState.UNLOADING
        ? 'hidden'
        : 'visible'

    // =========================================================================

    const styleContent: CSSProperties = {
      visibility: modalState === ModalState.UNLOADED ? 'visible' : 'hidden',
    }

    const styleGhost = getStyleGhost(imgEl)

    // Share this with UNSAFE_handleSvg
    this.styleModalImg = hasImage
      ? getStyleModalImg({
        hasZoomImg,
        imgSrc,
        isSvg,
        isZoomed: isZoomed && isModalActive,
        loadedImgEl,
        offset: zoomMargin,
        shouldRefresh,
        targetEl: imgEl,
      })
      : {}

    // =========================================================================

    let modalContent = null

    if (hasImage) {
      const modalImg = isImg || isDiv
        ? <img
          alt={imgAlt}
          sizes={imgSizes}
          src={imgSrc}
          srcSet={imgSrcSet}
          {...isZoomImgLoaded && modalState === ModalState.LOADED ? zoomImg : {}}
          data-rmiz-modal-img=""
          height={this.styleModalImg.height}
          id={idModalImg}
          ref={refModalImg}
          style={this.styleModalImg}
          width={this.styleModalImg.width}
        />
        : isSvg
          ? <div
            data-rmiz-modal-img
            ref={refModalImg}
            style={this.styleModalImg}
            />
          : null

      const modalBtnUnzoom = <button
        aria-label={a11yNameButtonUnzoom}
        data-rmiz-btn-unzoom=""
        onClick={handleUnzoom}
        type="button"
      >
        <IconUnzoom />
      </button>

      modalContent = ZoomContent
        ? <ZoomContent
          buttonUnzoom={modalBtnUnzoom}
          modalState={modalState}
          img={modalImg}
          onUnzoom={handleUnzoom}
        />
        : <>{modalImg}{modalBtnUnzoom}</>
    }

    // =========================================================================

    return (
      <div data-rmiz="" ref={refWrap}>
        <div data-rmiz-content={dataContentState} ref={refContent} style={styleContent}>
          {children}
        </div>
        {hasImage && <div data-rmiz-ghost="" style={styleGhost}>
          <button
            aria-label={labelBtnZoom}
            data-rmiz-btn-zoom=""
            onClick={handleZoom}
            type="button"
          >
            <IconZoom />
          </button>
        </div>}
        {hasImage && <dialog /* eslint-disable-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-redundant-roles */
          aria-labelledby={idModalImg}
          aria-modal="true"
          data-rmiz-modal=""
          ref={refDialog}
          onClick={handleDialogClick}
          onClose={handleUnzoom /* eslint-disable-line react/no-unknown-property */}
          onKeyDown={handleDialogKeyDown}
          role="dialog"
        >
          <div data-rmiz-modal-overlay={dataOverlayState} />
          <div data-rmiz-modal-content="" ref={refModalContent}>
            {modalContent}
          </div>
        </dialog>}
      </div>
    )
  }

  // ===========================================================================

  componentDidMount() {
    this.setId()
    this.setAndTrackImg()
    this.handleImgLoad()
    this.UNSAFE_handleSvg()
  }

  componentWillUnmount() {
    this.changeObserver?.disconnect?.()
    this.imgElObserver?.disconnect?.()
    this.imgEl?.removeEventListener?.('load', this.handleImgLoad)
    this.imgEl?.removeEventListener?.('click', this.handleZoom)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  }

  // ===========================================================================

  componentDidUpdate(prevProps: ControlledPropsWithDefaults) {
    this.UNSAFE_handleSvg()
    this.handleIfZoomChanged(prevProps.isZoomed)
  }

  // ===========================================================================
  // Because of SSR, set a unique ID after render

  setId = () => {
    const gen4 = () => Math.random().toString(16).slice(-4)
    this.setState({ id: gen4() + gen4() + gen4() })
  }

  // ===========================================================================
  // Find and set the image we're working with

  setAndTrackImg = () => {
    const contentEl = this.refContent.current

    if (!contentEl) return

    this.imgEl = contentEl.querySelector(
      ':is(img, svg, [role="img"], [data-zoom]):not([aria-hidden="true"])'
    ) as SupportedImage | null

    if (this.imgEl) {
      this.changeObserver?.disconnect?.()
      this.imgEl?.addEventListener?.('load', this.handleImgLoad)
      this.imgEl?.addEventListener?.('click', this.handleZoom)

      if (!this.state.loadedImgEl) {
        this.handleImgLoad()
      }

      this.imgElObserver = new ResizeObserver(entries => {
        const entry = entries[0]

        if (entry?.target) {
          this.imgEl = entry.target as SupportedImage
          this.setState({}) // Force a re-render
        }
      })

      this.imgElObserver.observe(this.imgEl)
    } else if (!this.changeObserver) {
      this.changeObserver = new MutationObserver(this.setAndTrackImg)
      this.changeObserver.observe(contentEl, { childList: true, subtree: true })
    }
  }

  // ===========================================================================
  // Show modal when zoomed; hide modal when unzoomed

  handleIfZoomChanged = (prevIsZoomed: boolean) => {
    const { isZoomed } = this.props

    if (!prevIsZoomed && isZoomed) {
      this.zoom()
    } else if (prevIsZoomed && !isZoomed) {
      this.unzoom()
    }
  }

  // ===========================================================================
  // Ensure we always have the latest img src value loaded

  handleImgLoad = () => {
    const { imgEl } = this

    const imgSrc = getImgSrc(imgEl)

    if (!imgSrc) return

    const img = new Image()

    if (testImg(imgEl)) {
      img.sizes = imgEl.sizes
      img.srcset = imgEl.srcset
    }

    // img.src must be set after sizes and srcset
    // because of Firefox flickering on zoom
    img.src = imgSrc

    const setLoaded = () => {
      this.setState({ loadedImgEl: img })
    }

    img
      .decode()
      .then(setLoaded)
      .catch(() => { img.onload = setLoaded })
  }

  // ===========================================================================
  // Report zoom state changes

  handleZoom = () => {
    this.props.onZoomChange?.(true)
  }

  handleUnzoom = () => {
    this.props.onZoomChange?.(false)
  }

  // ===========================================================================
  // Have dialog.click() only close in certain situations

  handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === this.refModalContent.current || e.target === this.refModalImg.current) {
      this.handleUnzoom()
    }
  }

  // ===========================================================================
  // Intercept default dialog.close() and use ours so we can animate

  handleDialogKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault()
      e.stopPropagation()
      this.handleUnzoom()
    }
  }

  // ===========================================================================
  // Force re-renders on closing scroll

  handleScroll = () => {
    this.setState({ shouldRefresh: true })
    this.handleUnzoom()
  }

  // ===========================================================================
  // Force re-render on resize

  handleResize = () => {
    this.setState({ shouldRefresh: true })
  }

  // ===========================================================================
  // Perform zoom actions

  zoom = () => {
    const {
      handleResize,
      handleScroll,
      loadZoomImg,
      props: {
        scrollableEl = window,
      },
      refDialog,
      refModalImg,
    } = this

    refDialog.current?.showModal?.()
    this.setState({ modalState: ModalState.LOADING })
    loadZoomImg()

    refModalImg.current?.addEventListener?.('transitionend', () => {
      setTimeout(() => {
        this.setState({ modalState: ModalState.LOADED })
        scrollableEl.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
      }, 0)
    }, { once: true })
  }

  // ===========================================================================
  // Perform unzoom actions

  unzoom = () => {
    const {
      handleResize,
      handleScroll,
      refDialog,
      refModalImg,
      props: { scrollableEl = window },
    } = this

    this.setState({ modalState: ModalState.UNLOADING })

    refModalImg.current?.addEventListener?.('transitionend', () => {
      setTimeout(() => {
        window.removeEventListener('resize', handleResize)
        scrollableEl.removeEventListener('scroll', handleScroll)

        this.setState({
          shouldRefresh: false,
          modalState: ModalState.UNLOADED,
        })

        refDialog.current?.close?.()
      }, 0)
    }, { once: true })
  }

  // ===========================================================================
  // Load the zoomImg manually

  loadZoomImg = () => {
    const { props: { zoomImg } } = this
    const zoomImgSrc = zoomImg?.src

    if (zoomImgSrc) {
      const img = new Image()
      img.sizes = zoomImg?.sizes ?? ''
      img.srcset = zoomImg?.srcSet ?? ''
      img.src = zoomImgSrc

      const setLoaded = () => {
        this.setState({ isZoomImgLoaded: true })
      }

      img
        .decode()
        .then(setLoaded)
        .catch(() => { img.onload = setLoaded })
    }
  }

  // ===========================================================================
  // Hackily deal with SVGs because of all of their unknowns.

  UNSAFE_handleSvg = () => {
    const { imgEl, refModalImg, styleModalImg } = this

    if (testSvg(imgEl)) {
      const tmp = document.createElement('div')
      tmp.innerHTML = imgEl.outerHTML

      const svg = tmp.firstChild as SVGSVGElement
      svg.style.width = `${styleModalImg.width ?? 0}px`
      svg.style.height = `${styleModalImg.height ?? 0}px`

      refModalImg.current?.firstChild?.remove?.()
      refModalImg.current?.appendChild?.(svg)
    }
  }
}
