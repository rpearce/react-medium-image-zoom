import React, {
  StrictMode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { node, string } from 'prop-types'
import tinygen from 'tinygen'
import { cleanup, unzoom, zoom } from './helpers'
import cn from './Uncontrolled.css'

const idBase = 'rmiz-'

const Uncontrolled = ({ children, closeText, containerEl, openText }) => {
  const [id] = useState(() => idBase.concat(tinygen()))
  const [isActive, setActive] = useState(false)
  const btnEl = useRef(null)
  const handleClickTrigger = useCallback(
    e => {
      e.preventDefault()

      const el = btnEl.current.firstChild

      // EFFECT
      if (isActive) {
        unzoom(id)
      } else {
        zoom(containerEl, id, el)
      }

      setActive(!isActive)
    },
    [containerEl, id, isActive]
  )

  useEffect(
    () => () => {
      cleanup(id)
    },
    [id]
  )

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
  containerEl: document && document.body,
  openText: 'Zoom image'
}

export default Uncontrolled
