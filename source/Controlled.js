import React, { StrictMode, useCallback, useState } from 'react'
import { bool, node, string } from 'prop-types'
import tinygen from 'tinygen'

const Controlled = ({ children, isActive, label }) => {
  const [id] = useState(tinygen('rmiz-'))
  const handleClickTrigger = useCallback(e => {
    return e
  }, [])

  return (
    <StrictMode>
      <button
        aria-controls={id}
        aria-expanded={isActive}
        aria-haspopup={true}
        aria-label={label}
        aria-owns={id}
        onClick={handleClickTrigger}
      >
        {children}
      </button>
    </StrictMode>
  )
}

Controlled.propTypes = {
  children: node.isRequired,
  isActive: bool.isRequired,
  label: string.isRequired
}

export default Controlled
