import 'focus-options-polyfill'
import { bool, func, node, number, object, string } from 'prop-types'
import React, { memo, StrictMode, useCallback, useRef, useState } from 'react'
import ControlledActivated from './ControlledActivated'
import { btn, trigger, wrap, wrapHidden } from './styles'

const Controlled = ({
  children,
  closeText,
  isZoomed: isActive,
  overlayBgColorEnd,
  overlayBgColorStart,
  portalEl,
  onZoomChange,
  openText,
  scrollableEl,
  transitionDuration,
  wrapStyle,
  zoomMargin,
  zoomZindex
}) => {
  const [isChildLoaded, setIsChildLoaded] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        onZoomChange(true)
      }
    },
    [isActive, onZoomChange]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const divStyle = isChildLoaded ? wrapHidden : wrap

  return (
    <StrictMode>
      <div ref={wrapRef} style={{ ...divStyle, ...wrapStyle }}>
        {children}
        <button
          aria-label={openText}
          style={{ ...trigger, ...btn }}
          onClick={handleClickTrigger}
          ref={btnRef}
          type="button"
        />
        <ControlledActivated
          closeText={closeText}
          isActive={isActive}
          onLoad={handleChildLoad}
          onUnload={handleChildUnload}
          onZoomChange={onZoomChange}
          overlayBgColorEnd={overlayBgColorEnd}
          overlayBgColorStart={overlayBgColorStart}
          parentRef={wrapRef}
          portalEl={portalEl || document.body}
          scrollableEl={scrollableEl || window}
          transitionDuration={transitionDuration}
          zoomMargin={zoomMargin}
          zoomZindex={zoomZindex}
        >
          {children}
        </ControlledActivated>
      </div>
    </StrictMode>
  )
}

Controlled.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  isZoomed: bool.isRequired,
  onZoomChange: func.isRequired,
  openText: string.isRequired,
  overlayBgColorEnd: string.isRequired,
  overlayBgColorStart: string.isRequired,
  portalEl: object,
  scrollableEl: object,
  transitionDuration: number.isRequired,
  wrapStyle: object,
  zoomMargin: number.isRequired,
  zoomZindex: number.isRequired
}

Controlled.defaultProps = {
  closeText: 'Unzoom image',
  isZoomed: false,
  onZoomChange: Function.prototype,
  openText: 'Zoom image',
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart: 'rgba(255, 255, 255, 0)',
  transitionDuration: 300,
  wrapStyle: null,
  zoomMargin: 0,
  zoomZindex: 2147483647
}

export default memo(Controlled)
