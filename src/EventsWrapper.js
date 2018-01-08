import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { element, func } from 'prop-types'
import defaults from './defaults'
import { createPortalContainer, removePortalContainer } from './helpers'
import { isEnterOrSpaceBarKey, isEscapeKey, isTabKey } from './keyboardEvents'

export default class EventsWrapper extends Component {
  constructor() {
    super()
    this.portal = createPortalContainer('div')
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
    this.loadTimeout = setTimeout(() => {
      window.addEventListener('scroll', this._handleScroll)
      window.addEventListener('keydown', this._handleKeyDown)
      window.addEventListener('ontouchstart', this._handleTouchStart)
      window.addEventListener('ontouchmove', this._handleTouchMove)
      window.addEventListener('ontouchend', this._handleTouchEnd)
      window.addEventListener('ontouchcancel', this._handleTouchEnd)
      window.addEventListener('resize', this._handleResize)
    }, defaults.transitionDuration)
  }

  componentWillUnmount() {
    clearTimeout(this.loadTimeout)
    window.removeEventListener('scroll', this._handleScroll)
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('ontouchstart', this._handleTouchStart)
    window.removeEventListener('ontouchmove', this._handleTouchMove)
    window.removeEventListener('ontouchend', this._handleTouchEnd)
    window.removeEventListener('ontouchcancel', this._handleTouchEnd)
    window.removeEventListener('resize', this._handleResize)
    removePortalContainer(this.portal)
  }

  render() {
    return this.portal
      ? createPortal(
          <div onClick={this.unzoom}>{this._cloneChild()}</div>,
          this.portal
        )
      : null
  }

  unzoom({ force, allowRefocus } = {}) {
    if (this.props.controlledEventFn && !force) {
      return this.props.controlledEventFn()
    }

    return this.child.unzoom(allowRefocus)
  }

  _cloneChild() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: child => {
        this.child = child
      }
    })
  }

  _handleKeyDown(e) {
    if (isTabKey(e)) {
      e.preventDefault() // prevent in-behind controls from grabbing focus
      return
    }

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
