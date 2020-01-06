import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { func, node, number, object, string } from 'prop-types'
import useEvent from 'react-use/lib/useEvent'
import usePrevious from 'react-use/lib/usePrevious'
import useWindowSize from 'react-use/lib/useWindowSize'
import { getModalContentStyle, getModalOverlayStyle } from './helpers'
import cn from './Activated.css'
import sharedCn from './Shared.css'

const ControlledActivated = ({
  children,
  closeText,
  isActive: isActiveFromParent,
  onLoad,
  onUnload,
  onZoomChange,
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
  const [isActive, setIsActive] = useState(isActiveFromParent)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUnloading, setIsUnloading] = useState(false)
  const prevIsActive = usePrevious(isActive)
  const prevIsActiveFromParent = usePrevious(isActiveFromParent)
  const prevIsLoaded = usePrevious(isLoaded)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // on click, tell caller it should zoom
  const handleClick = useCallback(
    e => {
      e.preventDefault()
      onZoomChange(false)
    },
    [onZoomChange]
  )

  // on escape, tell caller it should unzoom
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.stopPropagation()
        onZoomChange(false)
      }
    },
    [onZoomChange]
  )

  const handleScroll = useCallback(() => {
    forceUpdate(n => n + 1)

    if (!isUnloading) {
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
    let unloadTimeout

    if (isUnloading) {
      unloadTimeout = setTimeout(() => {
        setIsLoaded(false)
        setIsActive(false)
        setIsUnloading(false)
      }, transitionDuration)
    }

    return () => {
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

  const btnCn = `${sharedCn.trigger} ${cn.btn}`

  return (
    isActive &&
    createPortal(
      <div aria-modal className={cn.overlay} role="dialog" style={overlayStyle}>
        <div className={cn.content} style={contentStyle}>
          {children}
        </div>
        <button
          aria-label={closeText}
          className={btnCn}
          onClick={handleClick}
          ref={btnRef}
          type="button"
        />
      </div>,
      portalEl
    )
  )
}

ControlledActivated.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  onLoad: func.isRequired,
  onUnload: func.isRequired,
  overlayBgColorEnd: string.isRequired,
  overlayBgColorStart: string.isRequired,
  parentRef: object.isRequired,
  portalEl: object.isRequired,
  scrollableEl: object.isRequired,
  transitionDuration: number.isRequired,
  zoomMargin: number.isRequired,
  zoomZindex: number.isRequired
}

// if parentRef.current is not available yet,
// we can fall back to these defaults
const pseudoParentEl = {
  getBoundingClientRect: () => ({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }),
  style: {
    transform: null
  }
}

export default memo(ControlledActivated)
