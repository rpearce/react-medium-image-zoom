import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { func, node, number, object, string } from 'prop-types'
import useEvent from 'react-use/lib/useEvent'
import useWindowSize from 'react-use/lib/useWindowSize'
import {
  getModalContentStyle,
  getModalOverlayStyle,
  pseudoParentEl
} from './helpers'
import './styles.css'

const UncontrolledActivated = ({
  children,
  closeText,
  onUnload,
  onLoad,
  overlayBgColorEnd,
  overlayBgColorStart,
  parentRef,
  portalEl,
  scrollableEl,
  transitionDuration,
  zoomMargin,
  zoomZindex
}) => {
  const btnRef = useRef(null)
  const [, forceUpdate] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUnloading, setIsUnloading] = useState(false)
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

    return () => {
      clearTimeout(unloadTimeout)
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
    zoomMargin
  })

  return createPortal(
    <div aria-modal data-rmiz-overlay role="dialog" style={overlayStyle}>
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

UncontrolledActivated.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  onUnload: func.isRequired,
  onLoad: func.isRequired,
  overlayBgColorEnd: string.isRequired,
  overlayBgColorStart: string.isRequired,
  parentRef: object.isRequired,
  portalEl: object,
  scrollableEl: object,
  transitionDuration: number.isRequired,
  zoomMargin: number.isRequired,
  zoomZindex: number.isRequired
}

export default memo(UncontrolledActivated)
