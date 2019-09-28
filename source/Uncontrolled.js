import React, { StrictMode, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { instanceOf, node, string } from 'prop-types'
import tinygen from 'tinygen'
import cn from './Uncontrolled.css'
import Activated from './Activated'

const idBase = 'rmiz-'

const Uncontrolled = ({ children, closeText, portalEl, openText }) => {
  const [id] = useState(() => idBase.concat(tinygen()))
  const [isActive, setIsActive] = useState(false)
  const [isChildLoaded, setIsChildLoaded] = useState(false)
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

    if (btnRef && btnRef.current) {
      btnRef.current.focus()
    }
  }, [])

  const controlledId = isExpanded ? id : null
  const isExpanded = isActive && isChildLoaded
  const className = isExpanded ? cn.btnHidden : cn.btn

  return (
    <StrictMode>
      <button
        aria-controls={controlledId}
        aria-expanded={isExpanded}
        aria-haspopup={true}
        aria-label={openText}
        aria-owns={controlledId}
        className={className}
        onClick={handleClickTrigger}
        ref={btnRef}
      >
        {children}
        {isActive &&
          createPortal(
            <Activated
              closeText={closeText}
              id={id}
              isActive={isActive}
              onDeactivate={handleDeactivate}
              onLoad={handleChildLoad}
              forwardedRef={btnRef}
            >
              {children}
            </Activated>,
            portalEl
          )}
      </button>
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
  portalEl: (document || {}).body,
  openText: 'Zoom image'
}

export default Uncontrolled
