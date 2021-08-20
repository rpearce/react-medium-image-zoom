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
import usePrevious from 'react-use/lib/usePrevious'
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
  isActive: boolean
  onLoad: () => void
  onUnload: () => void
  onZoomChange?: (value: boolean) => void
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

const ControlledActivated: FC<Props> = ({
  children,
  closeText = 'Unzoom Image',
  isActive: isActiveFromParent,
  onLoad,
  onUnload,
  onZoomChange,
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
  const [isActive, setIsActive] = useState<boolean>(isActiveFromParent)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isUnloading, setIsUnloading] = useState<boolean>(false)
  const prevIsActive = usePrevious(isActive)
  const prevIsActiveFromParent = usePrevious(isActiveFromParent)
  const prevIsLoaded = usePrevious(isLoaded)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // on click, tell caller it should zoom
  const handleClick = useCallback(
    e => {
      e.preventDefault()
      if (onZoomChange) {
        onZoomChange(false)
      }
    },
    [onZoomChange]
  )

  // on escape, tell caller it should unzoom
  const handleKeyDown = useCallback(
    e => {
      if (isActive && (e.key === 'Escape' || e.keyCode === 27)) {
        e.stopPropagation()
        if (onZoomChange) {
          onZoomChange(false)
        }
      }
    },
    [isActive, onZoomChange]
  )

  const handleScroll = useCallback(() => {
    forceUpdate(n => n + 1)

    if (!isUnloading && onZoomChange) {
      onZoomChange(false)
    }
  }, [isUnloading, onZoomChange])

  // listen for keydown on the document
  useEvent('keydown', handleKeyDown, document)

  // listen for scroll and close
  useEvent('scroll', handleScroll, scrollableEl)

  // set loaded on mount and focus
  useEffect(() => {
    if (!prevIsActive && isActive) {
      setIsLoaded(true)

      if (btnRef.current) {
        btnRef.current.focus({ preventScroll: true })
      }
    }
  }, [isActive, prevIsActive])

  useEffect(() => {
    // when parent says to deactivate, begin unloading process
    if (prevIsActiveFromParent && !isActiveFromParent) {
      setIsUnloading(true)
    }

    // when parent says to activate, begin active process
    if (!prevIsActiveFromParent && isActiveFromParent) {
      setIsActive(true)
    }
  }, [isActiveFromParent, prevIsActiveFromParent])

  // if unloading, tell parent that we're all done here after Nms
  useEffect(() => {
    let unloadTimeout: NodeJS.Timeout

    if (isUnloading) {
      unloadTimeout = setTimeout(() => {
        setIsLoaded(false)
        setIsActive(false)
        setIsUnloading(false)
      }, transitionDuration)
    }

    return (): void => {
      clearTimeout(unloadTimeout)
    }
  }, [isUnloading, transitionDuration])

  // let parent know of changes to load status
  useEffect(() => {
    if (!prevIsLoaded && isLoaded) {
      onLoad()
    }
    if (prevIsLoaded && !isLoaded) {
      onUnload()
    }
  }, [isLoaded, onLoad, onUnload, prevIsLoaded])

  // use parent element or fake one if it's not yet loaded
  const parentEl = parentRef.current || pseudoParentEl

  // get parent element's dimensions
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

  return isActive
    ? createPortal(
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
            type="button"
          />
        </div>,
        portalEl
      )
    : null
}

export default memo(ControlledActivated)
