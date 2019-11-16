import React, { StrictMode, memo, useCallback, useRef, useState } from 'react'
import { instanceOf, node, number, string } from 'prop-types'
import cn from './Uncontrolled.css'
import Activated from './Activated'

const Uncontrolled = ({
  children,
  closeText,
  overlayBgColorEnd,
  overlayBgColorStart,
  portalEl,
  openText,
  transitionDuration,
  zoomMargin
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

  const handleDeactivate = useCallback(() => {
    setIsActive(false)
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus()
    }
  }, [])

  const isExpanded = isActive && isChildLoaded
  const className = isExpanded ? cn.wrapHidden : cn.wrap

  return (
    <StrictMode>
      <div className={className} ref={wrapRef}>
        {children}
        <button
          aria-label={openText}
          className={cn.btn}
          onClick={handleClickTrigger}
          ref={btnRef}
        />
        {isActive && (
          <Activated
            closeText={closeText}
            onDeactivate={handleDeactivate}
            onLoad={handleChildLoad}
            overlayBgColorEnd={overlayBgColorEnd}
            overlayBgColorStart={overlayBgColorStart}
            parentRef={wrapRef}
            portalEl={portalEl}
            transitionDuration={transitionDuration}
            zoomMargin={zoomMargin}
          >
            {children}
          </Activated>
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
  portalEl: instanceOf(Element).isRequired,
  transitionDuration: number.isRequired,
  zoomMargin: number.isRequired
}

Uncontrolled.defaultProps = {
  closeText: 'Unzoom image',
  openText: 'Zoom image',
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart: 'rgba(255, 255, 255, 0)',
  portalEl: document.body,
  transitionDuration: 300,
  zoomMargin: 0
}

export default memo(Uncontrolled)
