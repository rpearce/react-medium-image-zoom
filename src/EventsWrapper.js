import React, { Component } from 'react'
import { element, func } from 'prop-types'
import defaults from './defaults'
import { isEscapeKey, isEnterOrSpaceBarKey } from './keyboardEvents'

export default class EventsWrapper extends Component {
  constructor() {
    super()
    this.unzoom = this.unzoom.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleResize = this._handleResize.bind(this)
    this._handleTouchStart = this._handleTouchStart.bind(this)
    this._handleTouchMove = this._handleTouchMove.bind(this)
    this._handleTouchEnd = this._handleTouchEnd.bind(this)
  }

  componentDidMount() {
    this.pageYOffset = window.pageYOffset
    setTimeout(() => {
      window.addEventListener('scroll', this._handleScroll, true)
      window.addEventListener('keydown', this._handleKeyDown)
      window.addEventListener('ontouchstart', this._handleTouchStart)
      window.addEventListener('ontouchmove', this._handleTouchMove)
      window.addEventListener('ontouchend', this._handleTouchEnd)
      window.addEventListener('ontouchcancel', this._handleTouchEnd)
      window.addEventListener('resize', this._handleResize)
    }, defaults.transitionDuration)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll, true)
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('ontouchstart', this._handleTouchStart)
    window.removeEventListener('ontouchmove', this._handleTouchMove)
    window.removeEventListener('ontouchend', this._handleTouchEnd)
    window.removeEventListener('ontouchcancel', this._handleTouchEnd)
    window.removeEventListener('resize', this._handleResize)
  }

  render() {
    return <div onClick={this.unzoom}>{this._cloneChild()}</div>
  }

  unzoom({ force, allowRefocus } = {}) {
    if (this.props.controlledEventFn && !force) {
      return this.props.controlledEventFn()
    }

    return this.refs.child.unzoom(allowRefocus)
  }

  _cloneChild() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: 'child'
    })
  }

  _handleKeyDown(e) {
    const { allowAccessibilityClose } = this.props
    const unzoomForEnterOrSpace =
      allowAccessibilityClose && isEnterOrSpaceBarKey(e)
    const unzoomForEscape = isEscapeKey(e)

    if (unzoomForEnterOrSpace) {
      e.preventDefault() // prevent space bar from scrolling
    }

    if (unzoomForEnterOrSpace || unzoomForEscape) {
      this.unzoom({ allowRefocus: true })
    }
  }

  _handleResize() {
    this.forceUpdate()
  }

  _handleScroll() {
    this.forceUpdate()
    const scrollChange = Math.abs(window.pageYOffset - this.pageYOffset)
    if (scrollChange > 10) {
      this.unzoom()
    }
  }

  _handleTouchStart(e) {
    this.yTouchPosition = e.touches[0].clientY
  }

  _handleTouchMove(e) {
    this.forceUpdate()
    const touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition)
    if (touchChange > 10) {
      this.unzoom()
    }
  }

  _handleTouchEnd() {
    delete this.yTouchPosition
  }
}

EventsWrapper.propTypes = {
  children: element.isRequired,
  getControlledEventFn: func
}
