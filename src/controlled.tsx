import React from 'react'
import ReactDOM from 'react-dom'

import { testDiv, testImg, testSvg } from './utils/element-tests.js'
import { getImgAlt } from './utils/get-img-alt.js'
import { getImgSrc } from './utils/get-img-src.js'
import { getStyleModalImg } from './utils/get-style-modal-img.js'

import type { ModalState } from './hooks/types.js'
import { useZoomId } from './hooks/use-zoom-id.js'
import { useImageTracker } from './hooks/use-image-tracker.js'
import { useZoomModal } from './hooks/use-zoom-modal.js'

// =============================================================================

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

// eslint-disable-next-line complexity -- render logic requires many conditional branches for modal states and image types
export function Controlled({
  a11yNameButtonUnzoom = 'Minimize image',
  a11yNameButtonZoom = 'Expand image',
  canSwipeToUnzoom = true,
  children,
  classDialog,
  IconUnzoom = ICompress,
  IconZoom = IEnlarge,
  isDisabled = false,
  isZoomed,
  onZoomChange,
  swipeToUnzoomThreshold = 10,
  wrapElement: WrapElement = 'div',
  ZoomContent,
  zoomImg,
  zoomMargin = 0,
}: ControlledProps): React.JSX.Element {
  const refContent = React.useRef<HTMLDivElement>(null)
  const refWrap = React.useRef<HTMLDivElement>(null)

  const id = useZoomId()
  const { imgEl, loadedImgEl, styleGhost } = useImageTracker(refContent)

  // =========================================================================
  // Derived render values
  // =========================================================================

  const hasImage =
    imgEl !== null &&
    (loadedImgEl !== undefined || testSvg(imgEl)) &&
    window.getComputedStyle(imgEl).display !== 'none'

  const isDiv = testDiv(imgEl)
  const isImg = testImg(imgEl)
  const isSvg = testSvg(imgEl)

  const imgAlt = getImgAlt(imgEl)
  const imgSrc = getImgSrc(imgEl)
  const imgSizes = isImg ? imgEl.sizes : undefined
  const imgSrcSet = isImg ? imgEl.srcset : undefined
  const imgCrossOrigin = isImg ? imgEl.crossOrigin : undefined

  // =========================================================================
  // Zoom modal
  // =========================================================================

  const {
    modalState,
    isZoomImgLoaded,
    shouldRefresh,
    refDialog,
    refModalContent,
    refModalImg,
    handleZoom,
    handleUnzoom,
    handleBtnUnzoomClick,
    handleDialogClick,
    handleDialogClose,
  } = useZoomModal({
    imgEl,
    hasImage,
    isZoomed,
    isDisabled,
    onZoomChange,
    canSwipeToUnzoom,
    swipeToUnzoomThreshold,
    zoomImg,
  })

  // =========================================================================
  // Computed styles
  // =========================================================================

  const hasZoomImg = zoomImg?.src !== undefined && zoomImg.src !== ''

  const isModalActive = modalState === 'LOADING' || modalState === 'LOADED'

  const styleModalImg = hasImage
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
  // Render
  // =========================================================================

  const idModal = `${id}-modal`
  const idModalImg = `${id}-modal-img`

  const labelBtnZoom =
    imgAlt !== undefined && imgAlt !== ''
      ? `${a11yNameButtonZoom}: ${imgAlt}`
      : a11yNameButtonZoom

  const dataContentState = hasImage ? 'found' : 'not-found'

  const dataOverlayState =
    modalState === 'UNLOADED' || modalState === 'UNLOADING'
      ? 'hidden'
      : 'visible'

  const styleContent: React.CSSProperties = {
    visibility: modalState === 'UNLOADED' ? 'visible' : 'hidden',
  }

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
          height={styleModalImg.height ?? undefined}
          id={idModalImg}
          ref={refModalImg}
          style={styleModalImg}
          width={styleModalImg.width ?? undefined}
        />
      ) : isSvg ? (
        <div data-rmiz-modal-img ref={refModalImg} style={styleModalImg} />
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
