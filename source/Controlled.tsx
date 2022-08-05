import React, {
  CSSProperties,
  Component,
  ElementType,
  ImgHTMLAttributes,
  KeyboardEvent,
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
  LOADED,
  LOADING,
  UNLOADED,
  UNLOADING,
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
  private refModalImg = createRef<HTMLImageElement>()
  private refWrap = createRef<HTMLDivElement>()

  private imgEl: SupportedImage | null = null
  private imgElObserver: ResizeObserver | undefined
  private styleModalImg: CSSProperties = {}

  render() {
    const {
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
        zoomImg,
        zoomMargin,
      },
      refContent,
      refDialog,
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

    const labelBtnZoom = imgAlt
      ? `${a11yNameButtonZoom}: ${imgAlt}`
      : a11yNameButtonZoom

    const isModalActive = modalState === ModalState.LOADING ||
      modalState === ModalState.LOADED

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
    this.styleModalImg = imgEl && (loadedImgEl || isSvg)
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

    return (
      <div data-rmiz ref={refWrap}>
        <div data-rmiz-content ref={refContent} style={styleContent}>
          {children}
        </div>
        <div data-rmiz-ghost style={styleGhost}>
          <button
            aria-label={labelBtnZoom}
            data-rmiz-btn-zoom
            onClick={handleZoom}
            type="button"
          >
            <IconZoom />
          </button>
        </div>
        <dialog /* eslint-disable-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-redundant-roles */
          aria-labelledby={idModalImg}
          aria-modal="true"
          data-rmiz-modal
          ref={refDialog}
          onClick={handleUnzoom}
          onClose={handleUnzoom}
          onKeyDown={handleDialogKeyDown}
          role="dialog"
        >
          <div data-rmiz-modal-overlay={dataOverlayState} />
          <div data-rmiz-modal-content>
            {isImg || isDiv
              ? <img
                alt={imgAlt}
                sizes={imgSizes}
                src={imgSrc}
                srcSet={imgSrcSet}
                {...isZoomImgLoaded && modalState === ModalState.LOADED ? zoomImg : {}}
                data-rmiz-modal-img
                height={this.styleModalImg.height}
                id={idModalImg}
                ref={refModalImg}
                style={this.styleModalImg}
                width={this.styleModalImg.width}
              />
              : undefined
            }
            {isSvg
              ? <div
              data-rmiz-modal-img
              ref={refModalImg}
              style={this.styleModalImg}
              />
              : undefined
            }
            <button
              aria-label={a11yNameButtonUnzoom}
              data-rmiz-btn-unzoom
              onClick={handleUnzoom}
              type="button"
            >
              <IconUnzoom />
            </button>
          </div>
        </dialog>
      </div>
    )
  }

  // ===========================================================================

  componentDidMount() {
    this.setId()
    this.setAndTrackImg()
    this.handleImgLoad()
    this.UNSAFE_handleSvg()
    this.imgEl?.addEventListener?.('load', this.handleImgLoad)
    this.imgEl?.addEventListener?.('click', this.handleZoom)
  }

  componentWillUnmount() {
    this.imgElObserver?.disconnect()
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
    this.setState({ id: Math.random().toString(16).slice(-4) })
  }

  // ===========================================================================
  // Find and set the image we're working with

  setAndTrackImg = () => {
    this.imgEl = this.refContent.current?.querySelector?.(
      ':is(img, svg, [role="img"], [data-zoom]):not([aria-hidden="true"])'
    ) as SupportedImage | null

    if (this.imgEl) {
      this.imgElObserver = new ResizeObserver(entries => {
        const entry = entries[0]

        if (entry?.target) {
          this.imgEl = entry.target as SupportedImage
          this.setState({}) // Force a re-render
        }
      })

      this.imgElObserver.observe(this.imgEl)
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

    const img = new Image()

    if (testImg(imgEl)) {
      img.sizes = imgEl.sizes
      img.srcset = imgEl.srcset
    }

    img.src = getImgSrc(imgEl) ?? ''

    img.decode()
      .then(() => {
        this.setState({ loadedImgEl: img })
      })
      .catch(() => {
        img.onload = () => {
          this.setState({ loadedImgEl: img })
        }
      })
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
      img.src = zoomImgSrc
      img.sizes = zoomImg?.sizes ?? ''
      img.srcset = zoomImg?.srcSet ?? ''

      img.decode().then(() => {
        this.setState({ isZoomImgLoaded: true })
      })
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
