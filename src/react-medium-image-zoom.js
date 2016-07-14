import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

const { bool, shape, string, object } = PropTypes

const defaults = {
  styles: {
    image: {
      cursor: 'zoom-in'
    },
    zoomImage: {
      cursor          : 'zoom-out',
      position        : 'absolute',
      transition      : 'all 300ms',
      transform       : 'translate3d(0, 0, 0)',
      transformOrigin : 'center center',
    },
    zoomContainer: {
      position        : 'fixed',
      top             : 0,
      right           : 0,
      bottom          : 0,
      left            : 0,
      zIndex          : 999,
    },
    overlay: {
      position        : 'absolute',
      top             : 0,
      right           : 0,
      bottom          : 0,
      left            : 0,
      backgroundColor : '#fff',
      opacity         : 0,
      transition      : 'opacity 300ms'
    }
  }
}

export default class ImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isZoomed: false
    }

    this.handleZoom   = this.handleZoom.bind(this)
    this.handleUnzoom = this.handleUnzoom.bind(this)
  }

  componentDidMount() {
    this.portal = document.createElement('div')
    document.body.appendChild(this.portal)
  }

  componentWillUnmount() {
    document.body.removeChild(this.portal)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isZoomed !== this.state.isZoomed) {
      this.state.isZoomed ? this.renderZoomed() : this.removeZoomed()
    }
  }

  render() {
    return (
      <img
        src={ this.props.image.src }
        alt={ this.props.image.alt }
        className={ this.props.image.className }
        style={ this.getImageStyle() }
        onClick={ this.handleZoom }
      />
    )
  }

  renderZoomed() {
    const image = ReactDOM.findDOMNode(this)

    ReactDOM.render(
      <Zoom
        { ...this.props.zoomImage }
        image={ image }
        onClick={ this.handleUnzoom }
      />
    , this.portal)
  }

  removeZoomed() {
    if (this.portal) ReactDOM.unmountComponentAtNode(this.portal)
  }

  getImageStyle() {
    const style = {}
    if (this.state.isZoomed) style.visibility = 'hidden'
    return Object.assign({}, defaults.styles.image, style, this.props.image.style)
  }

  handleZoom() {
    this.setState({ isZoomed: true })
  }

  handleUnzoom() {
    this.setState({ isZoomed: false })
  }
}

ImageZoom.propTypes = {
  image: shape({
    src: string.isRequired,
    alt: string,
    className: string,
    style: object
  }).isRequired,
  zoomImage: shape({
    src: string.isRequired,
    alt: string,
    className: string,
    style: object
  })
}

//====================================================

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

//====================================================

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
  isVisible: bool.isRequired
}
