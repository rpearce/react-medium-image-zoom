import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { func, instanceOf, node, number, object, string } from 'prop-types'
import useEvent from 'react-use/lib/useEvent'
import useWindowSize from 'react-use/lib/useWindowSize'
import getModalContentStyle from './lib/getModalContentStyle'
import getModalOverlayStyle from './lib/getModalOverlayStyle'
import cn from './Activated.css'

const Activated = ({
  overlayBgColorStart,
  overlayBgColorEnd,
  children,
  closeText,
  onDeactivate,
  onLoad,
  parentRef,
  portalEl,
  transitionDuration,
  zoomMargin
}) => {
  const btnRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isUnloading, setIsUnloading] = useState(false)
  const { width: innerWidth, height: innerHeight } = useWindowSize()

  // =============================
  // = ON CLICK, BEGIN UNLOADING =
  // =============================
  const handleClick = useCallback(e => {
    e.preventDefault()
    setIsUnloading(true)
  }, [])

  // ==============================
  // = ON ESCAPE, BEGIN UNLOADING =
  // ==============================
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.stopPropagation()
      setIsUnloading(true)
    }
  }, [])

  // =================================
  // = SET LOADED ON MOUNT AND FOCUS =
  // =================================
  useEffect(() => {
    setIsLoaded(true)
    onLoad()

    if (btnRef.current) {
      btnRef.current.focus()
    }
  }, [onLoad])

  // ================================================================
  // = IF UNLOADING, TELL PARENT THAT WE'RE ALL DONE HERE AFTER Nms =
  // ================================================================
  useEffect(() => {
    // @TODO: sync with transition duration?
    const unloadTimeout = isUnloading
      ? setTimeout(onDeactivate, transitionDuration)
      : null

    return () => {
      clearTimeout(unloadTimeout)
    }
  }, [isUnloading, onDeactivate, transitionDuration])

  // ======================================
  // = LISTEN FOR KEYDOWN ON THE DOCUMENT =
  // ======================================
  useEvent('keydown', handleKeyDown, document)

  // ==================================
  // = GET PARENT ITEM'S DIMENSIONS =
  // ==================================
  const { height, left, top, width } = parentRef.current.getBoundingClientRect()

  const overlayStyle = getModalOverlayStyle({
    isLoaded,
    isUnloading,
    overlayBgColorEnd,
    overlayBgColorStart,
    transitionDuration
  })

  const contentStyle = getModalContentStyle({
    height,
    isLoaded,
    innerHeight,
    innerWidth,
    isUnloading,
    left,
    originalTransform: parentRef.current.style.transform,
    top,
    transitionDuration,
    width,
    zoomMargin
  })

  return createPortal(
    <div aria-modal className={cn.overlay} role="dialog" style={overlayStyle}>
      <div className={cn.content} style={contentStyle}>
        {children}
      </div>
      <button
        aria-label={closeText}
        className={cn.btn}
        onClick={handleClick}
        ref={btnRef}
      />
    </div>,
    portalEl
  )
}

Activated.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  onDeactivate: func.isRequired,
  onLoad: func.isRequired,
  overlayBgColorEnd: string.isRequired,
  overlayBgColorStart: string.isRequired,
  parentRef: object.isRequired,
  portalEl: instanceOf(Element).isRequired,
  transitionDuration: number.isRequired,
  zoomMargin: number.isRequired
}

export default memo(Activated)
