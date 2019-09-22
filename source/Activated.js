import React, { useEffect, useRef, useState } from 'react'
import { bool, func, node, object, string } from 'prop-types'
import cn from './Activated.css'

const getScale = ({ height, width, zoomMargin }) => {
  const scaleX = window.innerWidth / (width + zoomMargin)
  const scaleY = window.innerHeight / (height + zoomMargin)
  const scale = Math.min(scaleX, scaleY)
  return scale
  //const ratio =
  //  naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height

  //return scale > 1 ? ratio : scale * ratio
}

const Activated = ({
  children,
  closeText,
  id,
  onDeactivate,
  forwardedRef: { current: original } = {}
}) => {
  const modalEl = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    offsetHeight: height,
    offsetWidth: width,
    style: { transform: originalTransform }
  } = original

  const { top, left } = original.getBoundingClientRect()

  let style = { height, left, top, width }

  if (isLoaded) {
    // Get the the coords for center of the viewport
    const viewportX = document.body.clientWidth / 2
    const viewportY = window.innerHeight / 2

    // Get the coords for center of the original image
    const childCenterX = left + width / 2
    const childCenterY = top + height / 2

    // Get offset amounts for image coords to be centered on screen
    const translateX = viewportX - childCenterX
    const translateY = viewportY - childCenterY

    // @TODO: accept zoomMargin
    const scale = getScale({ height, width, zoomMargin: 0 })

    const transform = [
      ...(originalTransform ? [originalTransform] : []),
      `translate3d(${translateX}px, ${translateY}px, 0)`,
      `scale(${scale})`
    ].join(' ')

    style = { height, left, top, transform, width }
  }

  useEffect(() => {
    setIsLoaded(true)

    if (modalEl.current) {
      modalEl.current.focus()
    }
  }, [])

  return (
    <button aria-label={closeText} className={cn.btn} onClick={onDeactivate}>
      <div
        aria-modal
        className={cn.modal}
        id={id}
        ref={modalEl}
        role="dialog"
        tabIndex="-1"
        style={style}
      >
        {children}
      </div>
    </button>
  )
}

Activated.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  id: string.isRequired,
  isActive: bool.isRequired,
  onDeactivate: func.isRequired,
  forwardedRef: object
}

export default Activated
