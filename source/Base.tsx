import React, {
  FC,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { useEvent, usePrevious } from 'react-use'
import IEnlarge from './IEnlarge'
import Modal from './Modal'
import useAriaHideSiblings from './useAriaHideSiblings'
import useResizeObserver from './useResizeObserver'
import useRmizPortal from './useRmizPortal'

export interface BaseProps {
  children:              ReactNode
  closeText?:            string
  isZoomed:              boolean
  modalLabelText?:       string
  onZoomChange?:         (value: boolean) => void
  openText?:             string
  overlayBgColorEnd?:    string
  overlayBgColorStart?:  string
  scrollableEl?:         HTMLElement | Window
  transitionDuration?:   number
  zoomMargin?:           number
}

const Base: FC<BaseProps> = ({
  children,
  closeText = 'Unzoom image',
  isZoomed,
  modalLabelText = 'Zoomed image',
  onZoomChange,
  openText = 'Zoom image',
  overlayBgColorEnd = 'rgba(255,255,255,0.95)',
  overlayBgColorStart = 'rgba(255,255,255,0)',
  //scrollableEl,
  transitionDuration = 300,
  zoomMargin = 0,
}: BaseProps) => {
  const prevIsZoomed = usePrevious(isZoomed)
  const rmizPortalEl = useRmizPortal()

  const refWrap     = useRef<HTMLDivElement>(null)
  const refContent  = useRef<HTMLDivElement>(null)
  const refBtnOpen  = useRef<HTMLButtonElement>(null)

  const queryTarget = useCallback(() => {
    return refContent.current?.querySelector(
      'img:not([aria-hidden="true"]), [role="img"]'
    )
  }, [])

  const imgEntry = useResizeObserver(queryTarget)
  const imgEl    = imgEntry?.target as HTMLImageElement

  const styleGhost = !imgEl ? undefined : {
    height:  imgEl.offsetHeight,
    left:    imgEl.offsetLeft,
    width:   imgEl.offsetWidth,
    top:     imgEl.offsetTop,
  }

  const handleClickTrigger = useCallback(() => {
    if (!isZoomed && onZoomChange) {
      onZoomChange(true)
    }
  }, [isZoomed, onZoomChange])

  const handleClose = useCallback(() => {
    if (isZoomed && onZoomChange) {
      onZoomChange(false)
    }
  }, [isZoomed, onZoomChange])

  useLayoutEffect(() => {
    if (prevIsZoomed && !isZoomed) {
      window.setTimeout(() => {
        refBtnOpen.current?.focus({ preventScroll: true })
      }, transitionDuration)
    }
  }, [ imgEl, isZoomed, prevIsZoomed, transitionDuration ])

  useEvent('click', handleClickTrigger, imgEl)
  useAriaHideSiblings(rmizPortalEl, isZoomed)

  return (
    <div data-rmiz ref={refWrap}>
      <div data-rmiz-ghost style={styleGhost}>
        <button
          aria-label={openText}
          data-rmiz-btn-open
          onClick={handleClickTrigger}
          ref={refBtnOpen}
          type="button"
        >
          <IEnlarge />
        </button>
      </div>
      <div data-rmiz-content ref={refContent}>
        {children}
      </div>
      {createPortal(
        <Modal
          closeText={closeText}
          imgEl={imgEl}
          isZoomed={isZoomed}
          modalLabelText={modalLabelText}
          onClose={handleClose}
          overlayBgColorEnd={overlayBgColorEnd}
          overlayBgColorStart={overlayBgColorStart}
          transitionDuration={transitionDuration}
          zoomMargin={zoomMargin}
        />,
        rmizPortalEl
      )}
    </div>
  )
}

export default Base
