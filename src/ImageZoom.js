import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

const { shape, string, object } = PropTypes

const defaultStyles = {
  image: {
  },
  zoomImage: {
    position        : 'fixed',
    //left            : '50%',
    //top             : '50%',
    //willChange      : 'transform',
    //WebkitTransform : 'translate3d(-50%, -50%, 0)',
    //msTransform     : 'translate3d(-50%, -50%, 0)',
    //transform       : 'translate3d(-50%, -50%, 0)',
    //maxWidth        : '95vw',
    //maxHeight       : '95vh',
    zIndex          : 999,
    transition      : 'all 300ms',
    scale           : 1
  }
}

const overlayStyles = {
  position        : 'fixed',
  top             : 0,
  right           : 0,
  bottom          : 0,
  left            : 0,
  backgroundColor : '#fff',
  zIndex          : 998,
  opacity         : 1,
  transition      : 'opacity 300ms'
}

export default class ImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isZoomed: false
    }

    this.handleZoom       = this.handleZoom.bind(this)
    this.handleUnzoom     = this.handleUnzoom.bind(this)
    this.addListeners     = this.addListeners.bind(this)
    this.removeListeners  = this.removeListeners.bind(this)
    this.handleScroll     = this.handleScroll.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove  = this.handleTouchMove.bind(this)
    this.handleTouchEnd   = this.handleTouchEnd.bind(this)
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
        isZoomed={ this.state.isZoomed }
        onClick={ this.handleUnzoom }
      />
    , this.portal)
  }

  removeZoomed() {
    if (this.portal) {
      this.setState({ isZoomed: false }, () => {
        setTimeout(() => ReactDOM.unmountComponentAtNode(this.portal), 300)
      })
    }
  }

  getImageStyle() {
    const style = {}
    //if (this.state.isZoomed) style.visibility = 'hidden'
    return Object.assign({}, defaultStyles.image, style, this.props.image.style)
  }

  handleZoom() {
    this.setState({ isZoomed: true }, this.addListeners)
  }

  handleUnzoom() {
    this.setState({ isZoomed: false }, this.removeListeners)
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
  }).isRequired
}

// =============================================

class Zoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLoaded: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hasLoaded: true })
    }, 0)
  }

  render() {
    const { src, alt, className, onClick } = this.props

    return (
      <div onClick={ onClick }>
        <Overlay />
        <img
          ref="zoomImage"
          src={ src }
          alt={ alt }
          className={ className }
          style={ this.getZoomImageStyle() }
        />
      </div>
    )
  }

  getZoomImageStyle() {
    const { image } = this.props
    const imageOffset = image.getBoundingClientRect()

    const { top, left } = imageOffset
    const { width, height } = image

    const style = { top, left, width, height }

    if (!this.state.hasLoaded) {
      return Object.assign({}, defaultStyles.zoomImage, this.props.style, style)
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

    return Object.assign({}, defaultStyles.zoomImage, this.props.style, style, zoomStyle)
  }

  getScale({ width, height }) {
    const totalMargin = 40
    const scaleX = window.innerWidth / (width + totalMargin)
    const scaleY = window.innerHeight / (height + totalMargin)
    return Math.min(scaleX, scaleY)
  }
}

const Overlay = () => <div style={ overlayStyles }></div>
