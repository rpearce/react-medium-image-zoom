import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'
import defaults from './defaults'

export default class Overlay extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    return <div style={this._getStyle()} />
  }

  _getStyle() {
    const isVisible = this.state.isMounted && this.props.isVisible
    const opacity = isVisible & 1 // bitwise and; converts bool to 0 or 1
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
