import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Overlay from './Overlay'
import defaults from './defaults'

const { string, object } = PropTypes

class Zoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLoaded: false,
      isZoomed: true,
      src: this.props.image.src
    }

    this.handleUnzoom     = this.handleUnzoom.bind(this)
    this.handleScroll     = this.handleScroll.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove  = this.handleTouchMove.bind(this)
    this.handleTouchEnd   = this.handleTouchEnd.bind(this)
  }

  componentDidMount() {
    this.setState({ hasLoaded: true })
    if (this.props.src) this.fetchZoomImage()
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    return (
      <div onClick={ this.handleUnzoom } style={ defaults.styles.zoomContainer }>
        <Overlay isVisible={ this.state.isZoomed } />
        <img
          ref="zoomImage"
          src={ this.state.src }
          alt={ this.props.alt }
          className={ this.props.className }
          style={ this.getZoomImageStyle() }
        />
      </div>
    )
  }

  fetchZoomImage() {
    const { src } = this.props
    const img = new Image()
    img.src = src
    img.onload = () => this.setState({ hasLoaded: true, src })
  }

  addListeners() {
    this.scrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('ontouchstart', this.handleTouchStart)
    window.addEventListener('ontouchmove', this.handleTouchMove)
    window.addEventListener('ontouchend', this.handleTouchEnd)
  }

  removeListeners() {
    this.scrollPosition = undefined
    this.yTouchPosition = undefined
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('ontouchstart', this.handleTouchStart)
    window.removeEventListener('ontouchmove', this.handleTouchMove)
    window.removeEventListener('ontouchend', this.handleTouchEnd)
  }

  handleScroll() {
    const scrollChange = Math.abs(window.pageYOffset - this.scrollPosition)
    if (scrollChange > 30) this.handleUnzoom()
  }

  handleTouchStart(e) {
    this.yTouchPosition = e.touches[0].clientY
  }

  handleTouchMove(e) {
    const touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition)
    if (touchChange > 10) this.handleUnzoom()
  }

  handleTouchEnd(e) {
    this.yTouchPosition = undefined
  }

  handleUnzoom() {
    this.setState({ isZoomed: false }, () => setTimeout(this.props.onClick, 300))
  }

  getZoomImageStyle() {
    const { image } = this.props
    const imageOffset = image.getBoundingClientRect()

    const { top, left } = imageOffset
    const { width, height } = image

    const style = { top, left, width, height, transform: 'none' }

    if (!this.state.hasLoaded || !this.state.isZoomed) {
      return Object.assign({}, defaults.styles.zoomImage, this.props.style, style)
    }

    // Get the the coords for center of the viewport
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2

    // Get the coords for center of the original image
    const imageCenterX = imageOffset.left + image.width / 2
    const imageCenterY = imageOffset.top + image.height / 2

    // Get offset amounts for image coords to be centered on screen
    const translateX = viewportX - imageCenterX
    const translateY = viewportY - imageCenterY

    // Figure out how much to scale the image so it doesn't overflow the screen
    const scale = this.getScale({ width, height })

    const zoomStyle = {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
      transformOrigin: 'center center',
    }

    return Object.assign({}, defaults.styles.zoomImage, this.props.style, style, zoomStyle)
  }

  getScale({ width, height }) {
    const totalMargin = 40
    const scaleX = window.innerWidth / (width + totalMargin)
    const scaleY = window.innerHeight / (height + totalMargin)
    return Math.min(scaleX, scaleY)
  }
}

Zoom.propTypes = {
  src: string,
  alt: string,
  className: string,
  style: object,
  image: object.isRequired
}

export default Zoom
