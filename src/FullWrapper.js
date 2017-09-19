import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { element } = PropTypes

export default class FullWrapper extends Component {
  constructor() {
    super()
    this._handleScroll = this._handleScroll.bind(this)
    this._handleKeyUp = this._handleKeyUp.bind(this)
    this._handleTouchStart = this._handleTouchStart.bind(this)
    this._handleTouchMove = this._handleTouchMove.bind(this)
    this._handleTouchEnd = this._handleTouchEnd.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll, true)
    window.addEventListener('keyup', this._handleKeyUp)
    window.addEventListener('ontouchstart', this._handleTouchStart)
    window.addEventListener('ontouchmove', this._handleTouchMove)
    window.addEventListener('ontouchend', this._handleTouchEnd)
    window.addEventListener('ontouchcancel', this._handleTouchEnd)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll, true)
    window.removeEventListener('keyup', this._handleKeyUp)
    window.removeEventListener('ontouchstart', this._handleTouchStart)
    window.removeEventListener('ontouchmove', this._handleTouchMove)
    window.removeEventListener('ontouchend', this._handleTouchEnd)
    window.removeEventListener('ontouchcancel', this._handleTouchEnd)
  }

  render() {
    return (
      <div onClick={this.unzoom.bind(this)}>
        {this._cloneChild()}
      </div>
    )
  }

  unzoom() {
    this.refs.child.unzoom()
  }

  _cloneChild() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      { ref: 'child' }
    )
  }

  _handleScroll() {
    this.forceUpdate()
    this.unzoom()
  }

  _handleKeyUp({ which }) {
    const opts = {
      27: this.unzoom
    }

    if(opts[which]) return opts[which]()
  }

  _handleTouchStart(e) {
    this.yTouchPosition = e.touches[0].clientY
  }

  _handleTouchMove(e) {
    this.forceUpdate()
    const touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition)
    if (touchChange > 10) this.unzoom()
  }

  _handleTouchEnd(e) {
    delete this.yTouchPosition
  }
}

FullWrapper.propTypes = {
  children: element.isRequired
}
