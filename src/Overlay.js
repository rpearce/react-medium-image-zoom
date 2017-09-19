import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaults from './defaults'

const { bool, object } = PropTypes

export default class Overlay extends Component {
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
    return <div style={ this._getStyle() }></div>
  }

  _getStyle() {
    const opacity = this.state.isVisible & 1 // bitwise and; converts bool to 0 or 1
    return Object.assign(
      {},
      defaults.styles.overlay,
      { opacity },
      this.props.defaultStyles.overlay
    )
  }
}

Overlay.propTypes = {
  isVisible: bool.isRequired,
  defaultStyles: object.isRequired
}
