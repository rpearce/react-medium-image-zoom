import React from 'react'

import type { SupportedImage } from '../utils/types.js'
import { testImgLoaded, testSvg } from '../utils/element-tests.js'
import { adjustSvgIDs } from '../utils/adjust-svg-ids.js'

import type { ModalState } from './types.js'
import { useBodyScrollLock } from './use-body-scroll-lock.js'
import { useZoomEvents } from './use-zoom-events.js'

export interface ZoomModalOpts {
  imgEl: SupportedImage | null
  hasImage: boolean
  isZoomed: boolean
  isDisabled: boolean
  onZoomChange?: (
    value: boolean,
    data: { event: React.SyntheticEvent | Event },
  ) => void
  canSwipeToUnzoom: boolean
  swipeToUnzoomThreshold: number
  zoomImg?: React.ImgHTMLAttributes<HTMLImageElement>
}

export interface ZoomModalResult {
  modalState: ModalState
  isZoomImgLoaded: boolean
  shouldRefresh: boolean
  refDialog: React.RefObject<HTMLDialogElement | null>
  refModalContent: React.RefObject<HTMLDivElement | null>
  refModalImg: React.RefObject<HTMLImageElement | null>
  handleZoom: (e: React.SyntheticEvent | Event) => void
  handleUnzoom: (e: React.SyntheticEvent | Event) => void
  handleBtnUnzoomClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleDialogClick: (e: React.MouseEvent<HTMLDialogElement>) => void
  handleDialogClose: (e: React.SyntheticEvent<HTMLDialogElement>) => void
}

/**
 * Own the entire zoom modal lifecycle:
 * state machine, body scroll, zoom img loading,
 * transition end handling, event listeners, and callbacks.
 */
export function useZoomModal(opts: ZoomModalOpts): ZoomModalResult {
  const {
    imgEl,
    hasImage,
    isZoomed,
    isDisabled,
    onZoomChange,
    canSwipeToUnzoom,
    swipeToUnzoomThreshold,
    zoomImg,
  } = opts

  // Refs
  const refDialog = React.useRef<HTMLDialogElement>(null)
  const refModalContent = React.useRef<HTMLDivElement>(null)
  const refModalImg = React.useRef<HTMLImageElement>(null)

  // State
  const [modalState, setModalState] = React.useState<ModalState>('UNLOADED')
  const [isZoomImgLoaded, setIsZoomImgLoaded] = React.useState(false)
  const [shouldRefresh, setShouldRefresh] = React.useState(false)

  // Body scroll lock
  useBodyScrollLock(modalState !== 'UNLOADED')

  // =========================================================================
  // Callbacks
  // =========================================================================

  const handleUnzoom = React.useCallback(
    (e: React.SyntheticEvent | Event): void => {
      if (!isDisabled) {
        onZoomChange?.(false, { event: e })
      }
    },
    [isDisabled, onZoomChange],
  )

  const handleZoom = React.useCallback(
    (e: React.SyntheticEvent | Event): void => {
      if (!isDisabled && hasImage) {
        onZoomChange?.(true, { event: e })
      }
    },
    [isDisabled, hasImage, onZoomChange],
  )

  const handleBtnUnzoomClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault()
      e.stopPropagation()
      handleUnzoom(e)
    },
    [handleUnzoom],
  )

  const handleDialogClick = React.useCallback(
    (e: React.MouseEvent<HTMLDialogElement>): void => {
      if (
        e.target === refModalContent.current ||
        e.target === refModalImg.current
      ) {
        e.stopPropagation()
        handleUnzoom(e)
      }
    },
    [handleUnzoom],
  )

  const handleDialogClose = React.useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement>): void => {
      e.stopPropagation()
      handleUnzoom(e)
    },
    [handleUnzoom],
  )

  // =========================================================================
  // Event listeners
  // =========================================================================

  useZoomEvents(
    modalState,
    handleUnzoom,
    canSwipeToUnzoom,
    swipeToUnzoomThreshold,
  )

  // Resize → force re-render
  React.useEffect(() => {
    if (modalState !== 'LOADING' && modalState !== 'LOADED') {
      return
    }

    const handleResize = (): void => {
      setShouldRefresh(true)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [modalState])

  // Image click → zoom
  const handleZoomRef = React.useRef(handleZoom)

  React.useEffect(() => {
    handleZoomRef.current = handleZoom
  })

  React.useEffect(() => {
    if (imgEl == null) return

    const handler = (e: Event): void => {
      handleZoomRef.current(e)
    }

    imgEl.addEventListener('click', handler)

    return () => {
      imgEl.removeEventListener('click', handler)
    }
  }, [imgEl])

  // =========================================================================
  // Transition end handling
  // =========================================================================

  const timeoutTransitionEndRef = React.useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)

  const handleImgTransitionEnd = React.useCallback((): void => {
    clearTimeout(timeoutTransitionEndRef.current)

    setModalState(prev => {
      if (prev === 'LOADING') {
        return 'LOADED'
      } else if (prev === 'UNLOADING') {
        setShouldRefresh(false)
        return 'UNLOADED'
      }
      return prev
    })
  }, [])

  React.useEffect(
    () => () => {
      clearTimeout(timeoutTransitionEndRef.current)
    },
    [],
  )

  // =========================================================================
  // Modal state machine side effects
  // =========================================================================

  // Load zoom image when entering LOADING state. Depend on the
  // primitive src string so inline zoomImg objects don't re-fire.
  const zoomImgSrc = zoomImg?.src
  const zoomImgRef = React.useRef(zoomImg)

  React.useEffect(() => {
    zoomImgRef.current = zoomImg
  })

  React.useEffect(() => {
    if (modalState !== 'LOADING') return
    if (zoomImgSrc == null || zoomImgSrc === '') return

    const { current: zi } = zoomImgRef
    const img = new Image()
    img.sizes = zi?.sizes ?? ''
    img.srcset = zi?.srcSet ?? ''
    // @ts-expect-error crossOrigin type is odd
    img.crossOrigin = zi?.crossOrigin ?? undefined
    img.src = zoomImgSrc

    const setLoaded = (): void => {
      setIsZoomImgLoaded(true)
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
  }, [modalState, zoomImgSrc])

  // Modal state transition side effects (UNLOADING / UNLOADED)
  const prevModalStateRef = React.useRef<ModalState>('UNLOADED')

  // eslint-disable-next-line complexity -- state machine with one branch per transition
  React.useEffect(() => {
    const { current: prevModalState } = prevModalStateRef
    prevModalStateRef.current = modalState

    if (prevModalState !== 'UNLOADING' && modalState === 'UNLOADING') {
      if (refModalImg.current !== null) {
        const { transitionDuration: td } = window.getComputedStyle(
          refModalImg.current,
        )
        const tdFloat = parseFloat(td)

        if (tdFloat !== 0 && !Number.isNaN(tdFloat)) {
          const tdMs = tdFloat * (td.endsWith('ms') ? 1 : 1000) + 50
          timeoutTransitionEndRef.current = setTimeout(
            handleImgTransitionEnd,
            tdMs,
          )
        }
      }
    } else if (prevModalState !== 'UNLOADED' && modalState === 'UNLOADED') {
      refModalImg.current?.removeEventListener(
        'transitionend',
        handleImgTransitionEnd,
      )
      refDialog.current?.close()
    }
  }, [modalState, handleImgTransitionEnd])

  // =========================================================================
  // Respond to isZoomed prop changes
  // =========================================================================

  const prevIsZoomedRef = React.useRef(isZoomed)

  React.useEffect(() => {
    const { current: prevIsZoomed } = prevIsZoomedRef
    prevIsZoomedRef.current = isZoomed

    if (!prevIsZoomed && isZoomed) {
      refDialog.current?.showModal()
      refModalImg.current?.addEventListener(
        'transitionend',
        handleImgTransitionEnd,
      )
      setModalState('LOADING')
    } else if (prevIsZoomed && !isZoomed) {
      setModalState('UNLOADING')
    }
  }, [isZoomed, handleImgTransitionEnd])

  // =========================================================================
  // SVG handling
  // =========================================================================

  const handleUnzoomRef = React.useRef(handleUnzoom)

  React.useEffect(() => {
    handleUnzoomRef.current = handleUnzoom
  })

  React.useEffect(() => {
    if (!testSvg(imgEl)) return

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- cloneNode of an SVGElement returns the same type
    const svgEl = imgEl.cloneNode(true) as typeof imgEl
    const { current: modalImg } = refModalImg

    adjustSvgIDs(svgEl)

    svgEl.style.width = modalImg?.style.width ?? '0px'
    svgEl.style.height = modalImg?.style.height ?? '0px'

    const handleClick = (e: Event): void => {
      handleUnzoomRef.current(e)
    }

    svgEl.addEventListener('click', handleClick)

    modalImg?.firstChild?.remove()
    modalImg?.appendChild(svgEl)

    return () => {
      svgEl.removeEventListener('click', handleClick)
      svgEl.remove()
    }
  })

  return {
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
  }
}
