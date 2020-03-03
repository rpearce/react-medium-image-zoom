import React, { StrictMode, memo, useCallback, useRef, useState } from 'react'
import { bool, func, node, number, object, string } from 'prop-types'
import 'focus-options-polyfill'
import ControlledActivated from './ControlledActivated'
import cn from './Main.css'
import sharedCn from './Shared.css'

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

  const className = isChildLoaded ? cn.wrapHidden : cn.wrap
  const btnCn = `${sharedCn.trigger} ${cn.btn}`
  const portalElement = portalEl || (document || {}).body
  const scrollableElement = scrollableEl || window

  return (
    <StrictMode>
      <div className={className} ref={wrapRef} style={wrapStyle}>
        {children}
        <button
          aria-label={openText}
          className={btnCn}
          onClick={handleClickTrigger}
          ref={btnRef}
          type="button"
        />
        {portalElement && (
          <ControlledActivated
            closeText={closeText}
            isActive={isActive}
            onLoad={handleChildLoad}
            onUnload={handleChildUnload}
            onZoomChange={onZoomChange}
            overlayBgColorEnd={overlayBgColorEnd}
            overlayBgColorStart={overlayBgColorStart}
            parentRef={wrapRef}
            portalEl={portalElement}
            scrollableEl={scrollableElement}
            transitionDuration={transitionDuration}
            zoomMargin={zoomMargin}
            zoomZindex={zoomZindex}
          >
            {children}
          </ControlledActivated>
        )}
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
