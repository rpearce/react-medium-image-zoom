import 'focus-options-polyfill'
import { node, number, object, string } from 'prop-types'
import React, { memo, StrictMode, useCallback, useRef, useState } from 'react'
import { btn, trigger, wrap, wrapHidden } from './styles'
import UncontrolledActivated from './UncontrolledActivated'

const Uncontrolled = ({
  children,
  closeText,
  overlayBgColorEnd,
  overlayBgColorStart,
  portalEl,
  openText,
  scrollableEl,
  transitionDuration,
  wrapStyle,
  zoomMargin,
  zoomZindex
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isChildLoaded, setIsChildLoaded] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        setIsActive(true)
      }
    },
    [isActive]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsActive(false)
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const isExpanded = isActive && isChildLoaded
  const divStyle = isExpanded ? wrapHidden : wrap

  return (
    <StrictMode>
      <div ref={wrapRef} style={{ ...divStyle, ...wrapStyle }}>
        {children}
        <button
          aria-label={openText}
          style={{ ...trigger, ...btn }}
          onClick={handleClickTrigger}
          ref={btnRef}
        />
        {isActive && (
          <UncontrolledActivated
            closeText={closeText}
            onLoad={handleChildLoad}
            onUnload={handleChildUnload}
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
          </UncontrolledActivated>
        )}
      </div>
    </StrictMode>
  )
}

Uncontrolled.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
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

Uncontrolled.defaultProps = {
  closeText: 'Unzoom image',
  openText: 'Zoom image',
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart: 'rgba(255, 255, 255, 0)',
  transitionDuration: 300,
  wrapStyle: null,
  zoomMargin: 0,
  zoomZindex: 2147483647
}

export default memo(Uncontrolled)
