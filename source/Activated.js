import React, { useCallback, useEffect, useRef, useState } from 'react'
import { bool, func, node, object, string } from 'prop-types'
import useWindowSize from 'react-use/lib/useWindowSize'
import cn from './Activated.css'

const Activated = ({
  children,
  closeText,
  id,
  onDeactivate,
  onLoad,
  forwardedRef: { current: original } = {}
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
  const handleKeydown = useCallback(e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault()
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

  // ========================================
  // = TELL PARENT THAT WE'RE ALL DONE HERE =
  // ========================================
  useEffect(() => {
    // @TODO: sync with transition duration?
    const unloadTimeout = isUnloading ? setTimeout(onDeactivate, 300) : null

    document.addEventListener('keydown', handleKeydown, false)

    return () => {
      clearTimeout(unloadTimeout)
      document.removeEventListener('keydown', handleKeydown, false)
    }
  }, [handleKeydown, isUnloading, onDeactivate])

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

  const className = isLoaded && !isUnloading ? cn.btnLoaded : cn.btn

  return (
    <button
      aria-label={closeText}
      className={className}
      onClick={handleClick}
      ref={btnRef}
    >
      <div
        aria-modal
        className={cn.modal}
        id={id}
        role="dialog"
        tabIndex="-1"
        style={style}
      >
        {children}
      </div>
    </button>
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
  id: string.isRequired,
  isActive: bool.isRequired,
  onDeactivate: func.isRequired,
  onLoad: func.isRequired,
  forwardedRef: object
}

export default Activated
