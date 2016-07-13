import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

const { shape, string, object } = PropTypes

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

  componentDidUpdate(prevProps, prevState) {
    this.state.isZoomed ? this.renderZoomed() : this.removeZoomed()
  }

  render() {
    console.log(this.getImageStyle())
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
    this.portal = document.createElement('div')
    document.body.appendChild(this.portal)
    ReactDOM.render(<Zoom { ...this.props.zoomImage } />, this.portal)
  }

  removeZoomed() {
    if (this.portal) ReactDOM.unmountComponentAtNode(this.portal)
  }

  getImageStyle() {
    const style = {}
    if (this.state.isZoomed) style.visibility = 'hidden'
    return Object.assign({}, ImageZoom.defaultStyle.image, style, this.props.image.style)
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

ImageZoom.defaultStyle = {
  image: {
  },
  zoomImage: {
    zIndex    : 999,
    position  : 'fixed',
    top       : 20,
    maxWidth  : '95vw',
    maxHeight : '95vh'
  }
}

// =============================================

const Zoom = (props) =>
  <div>
    <ZoomImage { ...props } />
    <Overlay />
  </div>

const ZoomImage = (props) =>
  <img
    src={ props.src }
    alt={ props.alt }
    className={ props.className }
    style={ getZoomImageStyle(props.style) }
    onClick={ props.handleUnzoom }
  />

const Overlay = () => <div style={ overlayStyles }></div>

const overlayStyles = {
  position        : 'fixed',
  top             : 0,
  right           : 0,
  bottom          : 0,
  left            : 0,
  backgroundColor : '#fff',
  zIndex          : 998,
  pointerEvents   : 'none',
  opacity         : 1,
  transition      : 'opacity 300ms'
}

const getZoomImageStyle = (style) => Object.assign({}, ImageZoom.defaultStyle.zoomImage, style)
