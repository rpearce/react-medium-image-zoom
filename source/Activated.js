import React, { useEffect, useRef } from 'react'
import { bool, func, node, string } from 'prop-types'
import cn from './Activated.css'

const Activated = ({ children, id, onDeactivate }) => {
  const modalEl = useRef(null)

  useEffect(() => {
    if (modalEl.current) {
      modalEl.current.focus()
    }
  }, [])

  return (
    <button aria-label="ACTIVATED" className={cn.wrap} onClick={onDeactivate}>
      <div
        aria-modal
        className={cn.modal}
        id={id}
        ref={modalEl}
        role="dialog"
        tabIndex="-1"
      >
        {children}
      </div>
    </button>
  )
}

Activated.propTypes = {
  children: node.isRequired,
  id: string.isRequired,
  isActive: bool.isRequired,
  onDeactivate: func.isRequired
}

export default Activated
