import React, { StrictMode, memo, useCallback, useRef, useState } from 'react'
import { instanceOf, node, string } from 'prop-types'
import cn from './Uncontrolled.css'
import Activated from './Activated'

const Uncontrolled = ({ children, closeText, portalEl, openText }) => {
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
            forwardedRef={wrapRef}
            onDeactivate={handleDeactivate}
            onLoad={handleChildLoad}
            portalEl={portalEl}
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
  portalEl: instanceOf(Element).isRequired,
  openText: string.isRequired
}

Uncontrolled.defaultProps = {
  closeText: 'Unzoom image',
  portalEl: document.body,
  openText: 'Zoom image'
}

export default memo(Uncontrolled)
