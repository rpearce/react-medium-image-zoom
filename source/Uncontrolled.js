import React, { StrictMode, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { node, string } from 'prop-types'
import tinygen from 'tinygen'
import cn from './Uncontrolled.css'
import Activated from './Activated'

const idBase = 'rmiz-'

const Uncontrolled = ({ children, closeText, containerEl, openText }) => {
  const [id] = useState(() => idBase.concat(tinygen()))
  const [isActive, setIsActive] = useState(false)
  const btnEl = useRef(null)
  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        setIsActive(true)
      }
    },
    [isActive]
  )
  const handleDeactivate = useCallback(e => {
    e.preventDefault()
    setIsActive(false)
  }, [])
  const label = isActive ? closeText : openText

  return (
    <StrictMode>
      <button
        aria-controls={id}
        aria-expanded={isActive}
        aria-haspopup={true}
        aria-label={label}
        aria-owns={id}
        className={cn.btnOpen}
        onClick={handleClickTrigger}
        ref={btnEl}
      >
        {children}
        {isActive &&
          createPortal(
            <Activated
              containerEl={containerEl}
              id={id}
              isActive={isActive}
              onDeactivate={handleDeactivate}
            >
              {children}
            </Activated>,
            containerEl
          )}
      </button>
    </StrictMode>
  )
}

Uncontrolled.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  containerEl: node.isRequired,
  openText: string.isRequired
}

Uncontrolled.defaultProps = {
  closeText: 'Unzoom image',
  containerEl: (document || {}).body,
  openText: 'Zoom image'
}

export default Uncontrolled
