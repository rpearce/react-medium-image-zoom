import React, {
  FC,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import useWindowSize from './hooks/useWindowSize'
import {
  getModalContentStyle,
  getModalOverlayStyle,
  pseudoParentEl,
} from './helpers'

export interface UncontrolledActivatedProps {
  children: ReactNode
  closeText?: string
  onUnload: () => void
  onLoad: () => void
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  parentRef: RefObject<HTMLElement>
  portalEl?: HTMLElement
  scrollableEl?: HTMLElement | Window
  transitionDuration?: number
  zoomMargin?: number
  zoomZindex?: number
}

const UncontrolledActivated: FC<UncontrolledActivatedProps> = ({
  children,
  closeText = 'Unzoom Image',
  onUnload,
  onLoad,
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  parentRef,
  portalEl = document.body,
  scrollableEl = window,
  transitionDuration = 300,
  zoomMargin = 0,
  zoomZindex = 2147483647,
}: UncontrolledActivatedProps) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [, forceUpdate] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isUnloading, setIsUnloading] = useState<boolean>(false)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // on click, begin unloading
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsUnloading(true)
    },
    []
  )

  // on escape, begin unloading
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.stopPropagation()
        setIsUnloading(true)
      }
    },
    []
  )

  const handleScroll = useCallback(() => {
    forceUpdate(n => n + 1)

    if (!isUnloading) {
      setIsUnloading(true)
    }
  }, [isUnloading])

  // listen for keydown on the document
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // listen for scroll and close
  useEffect(() => {
    scrollableEl?.addEventListener?.('scroll', handleScroll)

    return () => {
      scrollableEl?.removeEventListener?.('scroll', handleScroll)
    }
  }, [handleScroll, scrollableEl])

  // set loaded on mount and focus
  useEffect(() => {
    setIsLoaded(true)
    onLoad()

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [onLoad])

  // if unloading, tell parent that we're all done here after Nms
  useEffect(() => {
    const unloadTimeout = isUnloading
      ? setTimeout(onUnload, transitionDuration)
      : null

    return (): void => {
      if (unloadTimeout) {
        clearTimeout(unloadTimeout)
      }
    }
  }, [isUnloading, onUnload, transitionDuration])

  // use parent element or fake one if it's not yet loaded
  const parentEl = parentRef.current || pseudoParentEl

  // get parent item's dimensions
  const { height, left, top, width } = parentEl.getBoundingClientRect()

  const overlayStyle = getModalOverlayStyle({
    isLoaded,
    isUnloading,
    overlayBgColorEnd,
    overlayBgColorStart,
    transitionDuration,
    zoomZindex,
  })

  const contentStyle = getModalContentStyle({
    height,
    isLoaded,
    innerHeight,
    innerWidth,
    isUnloading,
    left,
    originalTransform: parentEl.style.transform,
    top,
    transitionDuration,
    width,
    zoomMargin,
  })

  return createPortal(
    <div aria-label="Zoomed image" aria-modal data-rmiz-overlay role="dialog" style={overlayStyle}>
      <div data-rmiz-modal-content style={contentStyle}>
        {children}
      </div>
      <button
        aria-label={closeText}
        data-rmiz-btn-close
        onClick={handleClick}
        ref={btnRef}
      />
    </div>,
    portalEl
  )
}

export default memo(UncontrolledActivated)
