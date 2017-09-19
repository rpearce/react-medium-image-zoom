import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { element } = PropTypes

export default class ResizeWrapper extends Component {
  constructor() {
    super()
    this._handleResize = this._handleResize.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this._handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  render() {
    const cloned = React.cloneElement(
      React.Children.only(this.props.children),
      { ref: 'child' }
    )
    return (
      <div>{cloned}</div>
    )
  }

  unzoom() {
    this.refs.child.unzoom()
  }

  _handleResize() {
    this.forceUpdate()
  }
}

ResizeWrapper.propTypes = {
  children: element.isRequired
}
