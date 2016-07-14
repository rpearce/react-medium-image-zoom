import React, { Component, PropTypes } from 'react'
import defaults from './defaults'

class Overlay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  componentDidMount() {
    this.setState({ isVisible: true })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isVisible) this.setState({ isVisible: false })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isVisible !== nextProps.isVisible ||
      this.state.isVisible !== nextProps.isVisible
  }

  render() {
    return <div style={ this.getStyle() }></div>
  }

  getStyle() {
    const opacity = this.state.isVisible & 1 // bitwise and; converts bool to 0 or 1
    return Object.assign({}, defaults.styles.overlay, { opacity })
  }
}

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

export default Overlay
