import React, { PropTypes } from 'react'
import defaults from './defaults'

const Overlay = (props) => <div style={ getStyle(props) }></div>

const getStyle = ({ isVisible }) =>
  isVisible ? defaults.styles.overlay : Object.assign({}, defaults.styles.overlay, { opacity: 0 })

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

export default Overlay
