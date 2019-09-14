import React, { StrictMode, useCallback, useRef, useState } from 'react'
import { node } from 'prop-types'
import tinygen from 'tinygen'
import { unzoom, zoom } from './helpers'
import cn from './Uncontrolled.css'

const Uncontrolled = ({ children }) => {
  const [id] = useState(tinygen('rmiz-'))
  const [isActive, setActive] = useState(false)
  const btnEl = useRef(null)
  const handleClickTrigger = useCallback(
    e => {
      e.preventDefault()

      const el = btnEl.current.firstChild

      // EFFECT
      if (isActive) {
        unzoom(el)
      } else {
        zoom(el)
      }

      setActive(!isActive)
    },
    [isActive]
  )

  return (
    <StrictMode>
      <button
        aria-controls={id}
        aria-expanded={isActive}
        aria-haspopup={true}
        aria-label={'CLICK ME'}
        aria-owns={id}
        className={cn.btn}
        onClick={handleClickTrigger}
        ref={btnEl}
      >
        {children}
      </button>
    </StrictMode>
  )
}

Uncontrolled.propTypes = {
  children: node.isRequired
}

//Uncontrolled.defaultProps = {
//}

export default Uncontrolled
