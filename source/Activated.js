import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { func, node, object, string } from 'prop-types'
import useEvent from 'react-use/lib/useEvent'
import useWindowSize from 'react-use/lib/useWindowSize'
import cn from './Activated.css'

const Activated = ({
  children,
  closeText,
  forwardedRef: { current: original } = {},
  onDeactivate,
  onLoad,
  portalEl
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
    const unloadTimeout = isUnloading ? setTimeout(onDeactivate, 300) : null

    return () => {
      clearTimeout(unloadTimeout)
    }
  }, [isUnloading, onDeactivate])

  // ======================================
  // = LISTEN FOR KEYDOWN ON THE DOCUMENT =
  // ======================================
  useEvent('keydown', handleKeyDown, document)

  // ==================================
  // = GET ORIGINAL ITEM'S DIMENSIONS =
  // ==================================
  const { height, left, top, width } = original.getBoundingClientRect()

  const style = getStyle({
    height,
    isLoaded,
    innerHeight,
    innerWidth,
    isUnloading,
    left,
    originalTransform: original.style.transform,
    top,
    width,
    zoomMargin: 0 // @TODO: accept zoomMargin
  })

  const overlayCn = isLoaded && !isUnloading ? cn.overlayLoaded : cn.overlay

  return createPortal(
    <div aria-modal className={overlayCn} role="dialog">
      <div className={cn.content} style={style}>
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

const getScale = ({ height, innerHeight, innerWidth, width, zoomMargin }) => {
  const scaleX = innerWidth / (width + zoomMargin)
  const scaleY = innerHeight / (height + zoomMargin)
  const scale = Math.min(scaleX, scaleY)

  return scale
}

// @TODO: export and test getStyle
const getStyle = ({
  height,
  innerHeight,
  innerWidth,
  isLoaded,
  isUnloading,
  left,
  originalTransform,
  top,
  width,
  zoomMargin
}) => {
  if (isUnloading) {
    return { height, left, top, transform: originalTransform, width }
  }

  if (isLoaded) {
    // Get the the coords for center of the viewport
    const viewportX = innerWidth / 2
    const viewportY = innerHeight / 2

    // Get the coords for center of the original item
    const childCenterX = left + width / 2
    const childCenterY = top + height / 2

    // Get offset amounts for item coords to be centered on screen
    const translateX = viewportX - childCenterX
    const translateY = viewportY - childCenterY

    // Get amount to scale item
    const scale = getScale({
      height,
      innerWidth,
      innerHeight,
      width,
      zoomMargin
    })

    // Build transform style, including any original transform
    const transform = [
      ...(originalTransform ? [originalTransform] : []),
      `translate3d(${translateX}px, ${translateY}px, 0)`,
      `scale(${scale})`
    ].join(' ')

    return { height, left, top, transform, width }
  }

  return { height, left, top, width }
}

Activated.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  onDeactivate: func.isRequired,
  onLoad: func.isRequired,
  forwardedRef: object
}

export default memo(Activated)
