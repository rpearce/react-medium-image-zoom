import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { useClickAway, useEvent, usePrevious } from 'react-use'
import ICompress from './ICompress'
import getScaleToWindow from './getScaleToWindow'
import getScaleToWindowMax from './getScaleToWindowMax'

const SVG_REGEX = /\.svg$/i
const URL_REGEX = /url(?:\(['"]?)(.*?)(?:['"]?\))/

export interface ModalProps {
  closeText:            string
  imgEl?:               HTMLImageElement
  isZoomed:             boolean
  modalLabelText:       string
  onClose:              () => void
  overlayBgColorEnd:    string
  overlayBgColorStart:  string
  transitionDuration:   number
  zoomMargin:           number
}

const Modal: FC<ModalProps> = ({
  closeText,
  imgEl,
  isZoomed,
  modalLabelText,
  onClose,
  overlayBgColorEnd,
  overlayBgColorStart,
  transitionDuration,
  zoomMargin,
}: ModalProps) => {
  const refDialog    = useRef<HTMLDivElement>(null)
  const refImg       = useRef<HTMLImageElement>(null)
  const refBtnClose  = useRef<HTMLButtonElement>(null)
  const prevIsActive = usePrevious(isZoomed)

  const tabIndexBoundary = isZoomed ? 0 : undefined
  const tabIndexBtn      = isZoomed ? undefined : -1
  const tabIndexModal    = isZoomed ? -1 : undefined

  const imgRect = imgEl?.getBoundingClientRect()

  const styleWrap: CSSProperties = isZoomed
    ? {
      transition: 'visibility 0s ease 0s',
      visibility: 'visible',
    }
    : {
      transition: `visibility 0s ease ${transitionDuration}ms`,
      visibility: 'hidden',
    }

  const styleOverlay: CSSProperties = isZoomed
    ? {
      backgroundColor: overlayBgColorEnd,
      transitionDuration: `${transitionDuration}ms`,
    }
    : {
      backgroundColor: overlayBgColorStart,
      transitionDuration: `${transitionDuration}ms`,
      pointerEvents: 'none',
    }

  const styleModalImg: CSSProperties = useMemo(() => {
    if (!imgEl || !imgRect) {
      return { position: 'absolute' }
    }

    const isSvgSrc = imgEl.src && SVG_REGEX.test(imgEl.src)

    const scale = !isSvgSrc && imgEl.naturalHeight && imgEl.naturalWidth
      ? getScaleToWindowMax(
        imgRect.width,
        imgEl.naturalWidth,
        imgRect.height,
        imgEl.naturalHeight,
        zoomMargin
      )
      : getScaleToWindow(imgRect.width, imgRect.height, zoomMargin)

    const style: CSSProperties = {
      position:            'absolute',
      top:                 imgRect.top + window.scrollY,
      left:                imgRect.left + window.scrollX,
      width:               imgRect.width * scale,
      height:              imgRect.height * scale,
      transform:           `scale(${1 / scale}) translate(0,0)`,
      transitionDuration:  `${transitionDuration}ms`,
      transformOrigin:     'top left',
      transitionProperty:  'transform',
      willChange:          'transform',
    }

    if (isZoomed) {
      const viewportX    = window.innerWidth  / 2
      const viewportY    = window.innerHeight / 2
      const childCenterX = imgRect.left + imgRect.width  * scale / 2
      const childCenterY = imgRect.top  + imgRect.height * scale / 2
      const translateX   = viewportX - childCenterX
      const translateY   = viewportY - childCenterY

      style.transform = `scale(1) translate(${translateX}px,${translateY}px)`
    }

    return style
  }, [ imgEl, imgRect, isZoomed, transitionDuration, zoomMargin ])

  const handleFocusBoundary = useCallback(() => {
    refBtnClose.current?.focus({ preventScroll: true })
  }, [])

  const handleClickTrigger = useCallback(() => {
    if (isZoomed) {
      onClose()
    }
  }, [isZoomed, onClose])

  const handleKeyDown = useCallback(e => {
    if (isZoomed && e.key === 'Escape' || e.keyCode === 27) {
      e.stopPropagation()
      onClose()
    }
  }, [isZoomed, onClose])

  useEffect(() => {
    if (!imgEl) {
      return
    }

    if (!prevIsActive && isZoomed) {
      imgEl.style.visibility = 'hidden'
    } else if (prevIsActive && !isZoomed) {
      window.setTimeout(() => {
        imgEl.style.visibility = ''
      }, Math.max(transitionDuration - 50, 0))
    }
  }, [imgEl, isZoomed, prevIsActive, transitionDuration])

  useLayoutEffect(() => {
    if (!prevIsActive && isZoomed) {
      refBtnClose.current?.focus({ preventScroll: true })
      window.addEventListener('scroll', onClose, { capture: false, passive: true })
    }

    return () => {
      window.removeEventListener('scroll', onClose)
    }
  }, [isZoomed, onClose, prevIsActive])

  useEvent('click', handleClickTrigger, refImg.current)
  useEvent('keydown', handleKeyDown, document)
  useClickAway(refDialog, onClose)


  let foo = undefined

  if (imgEl) {
    foo = URL_REGEX.exec(window.getComputedStyle(imgEl).backgroundImage)?.[1]
  }

  return (
    <div data-rmiz-portal-content style={styleWrap}>
      <div data-rmiz-overlay style={styleOverlay} />
      <div onFocus={handleFocusBoundary} tabIndex={tabIndexBoundary} />
      <div
        aria-label={modalLabelText}
        aria-modal="true"
        data-rmiz-modal
        ref={refDialog}
        role="dialog"
        tabIndex={tabIndexModal}
      >
        <button
          aria-label={closeText}
          data-rmiz-btn-close
          onClick={handleClickTrigger}
          ref={refBtnClose}
          tabIndex={tabIndexBtn}
          type="button"
        >
          <ICompress />
        </button>
        <img
          alt={imgEl?.alt}
          data-rmiz-modal-img
          ref={refImg}
          sizes={imgEl?.sizes}
          src={imgEl?.src || foo}
          srcSet={imgEl?.srcset}
          style={styleModalImg}
        />
      </div>
      <div onFocus={handleFocusBoundary} tabIndex={tabIndexBoundary} />
    </div>
  )
}

export default Modal
