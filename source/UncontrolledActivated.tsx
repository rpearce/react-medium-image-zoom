import React, {
  FC,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import useEvent from 'react-use/lib/useEvent'
import useWindowSize from 'react-use/lib/useWindowSize'
import {
  getModalContentStyle,
  getModalOverlayStyle,
  getScale,
  GetScaleFn,
  pseudoParentEl
} from './helpers'
import './styles.css'

interface Props {
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
  getScale?: GetScaleFn
}

const UncontrolledActivated: FC<Props> = ({
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
  getScale: getScaleFn
}: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [, forceUpdate] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isUnloading, setIsUnloading] = useState<boolean>(false)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // on click, begin unloading
  const handleClick = useCallback(e => {
    e.preventDefault()
    setIsUnloading(true)
  }, [])

  // on escape, begin unloading
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.stopPropagation()
      setIsUnloading(true)
    }
  }, [])

  const handleScroll = useCallback(() => {
    forceUpdate(n => n + 1)

    if (!isUnloading) {
      setIsUnloading(true)
    }
  }, [isUnloading])

  // listen for keydown on the document
  useEvent('keydown', handleKeyDown, document)

  // listen for scroll and close
  useEvent('scroll', handleScroll, scrollableEl)

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
    zoomZindex
  })

  const scale = getScale(
    {
      height,
      innerHeight,
      innerWidth,
      width,
      zoomMargin
    },
    getScaleFn
  )

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
    scale
  })

  const buttonStyle = {
    width: `${width * scale}px`,
    height: `${height * scale}px`
  }

  return createPortal(
    <div aria-modal data-rmiz-overlay role="dialog" style={overlayStyle}>
      <div data-rmiz-modal-content style={contentStyle}>
        {children}
      </div>
      <button
        aria-label={closeText}
        data-rmiz-btn-close
        style={buttonStyle}
        onClick={handleClick}
        ref={btnRef}
      />
    </div>,
    portalEl
  )
}

export default memo(UncontrolledActivated)
