import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const { bool, element, func, object, number, shape, string } = PropTypes

const transitionDuration = 300

const defaults = {
  styles: {
    image: {
      cursor          : 'zoom-in'
    },
    zoomImage: {
      cursor          : 'zoom-out',
      position        : 'absolute',
      transition      : `transform ${transitionDuration}ms`,
      transform       : 'translate3d(0, 0, 0) scale(1)',
      transformOrigin : 'center center',
      willChange      : 'transform, top, left'
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
      transition      : `opacity ${transitionDuration}ms`
    }
  }
}

const uncontrolledControlledError = 'A component is changing a react-medium-image-zoom component from an uncontrolled component to a controlled one. ImageZoom elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled image zoom element for the lifetime of the component.'
const controlledUncontrolledError = 'A component is changing a react-medium-image-zoom component from a controlled component to an uncontrolled one. ImageZoom elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled image zoom element for the lifetime of the component.'

export default class ImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isZoomed: false,
      image: props.image,
      hasAlreadyLoaded: false
    }

    this._handleZoom = this._handleZoom.bind(this)
    this._handleUnzoom = this._handleUnzoom.bind(this)
  }

  static get defaultProps() {
    return {
      shouldReplaceImage: true,
      shouldRespectMaxDimension: false,
      zoomMargin: 40,
      defaultStyles: {
        zoomContainer: {},
        overlay: {},
        image: {},
        zoomImage: {}
      },
      shouldHandleZoom: (_) => true,
      onZoom: () => {},
      onUnzoom: () => {}
    }
  }

  componentDidMount() {
    if (this.state.isZoomed || this.props.isZoomed) this.renderZoomed()
  }

  // Clean up any mess we made of the DOM before we unmount
  componentWillUnmount() {
    this.removeZoomed()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isZoomed == null && nextProps.isZoomed != null) {
      throw new Error(uncontrolledControlledError)
    } else if (this.props.isZoomed != null && nextProps.isZoomed == null) {
      throw new Error(controlledUncontrolledError)
    }

    // If the consumer wants to change the image's src, then so be it.
    if (this.props.image.src !== nextProps.image.src) {
      this.setState({ image: nextProps.image })
    }
  }

  /**
   * When the component's state updates, check for changes
   * and either zoom or start the unzoom procedure.
   * NOTE: We need to differentiate whether this is a
   * controlled or uncontrolled component and do the check
   * based off of that.
   */
  componentDidUpdate(prevProps, prevState) {
    const prevIsZoomed = prevProps.isZoomed != null ? prevProps.isZoomed : prevState.isZoomed
    const isZoomed = this.props.isZoomed != null ? this.props.isZoomed : this.state.isZoomed
    if (prevIsZoomed !== isZoomed) {
      if (isZoomed) this._renderZoomed()
      else if (this.portalInstance) this.portalInstance.unzoom()
    }
  }

  render() {
    /**
     * Take whatever attributes you want to pass the image
     * and then override with the properties we need
     */
    const attrs = Object.assign({}, this.state.image, {
      style: this._getImageStyle(),
      onClick: this._handleZoom
    })

    return <img ref="image" { ...attrs } />
  }

  _renderZoomed() {
    /**
     * If it's an uncontrolled component, include all wrap controls.
     * If it's a controlled component, only wrap it in the resize controls.
     */
    const innerComponent = (
      <ResizeWrapper>
        <Zoom
          defaultStyles={ this.props.defaultStyles }
          image={ ReactDOM.findDOMNode(this.refs.image) }
          hasAlreadyLoaded={ this.state.hasAlreadyLoaded }
          shouldRespectMaxDimension={ this.props.shouldRespectMaxDimension }
          zoomImage={ this.props.zoomImage }
          zoomMargin={ this.props.zoomMargin }
          onUnzoom={ this._handleUnzoom }
        />
      </ResizeWrapper>
    )
    const component = this.props.isZoomed == null
      ? <FullWrapper>{innerComponent}</FullWrapper>
      : innerComponent
    this.portal = createPortal('div')
    this.portalInstance = ReactDOM.render(component, this.portal)
  }

  _removeZoomed() {
    if (this.portal) {
      ReactDOM.unmountComponentAtNode(this.portal)
      removePortal(this.portal)
      delete this.portalInstance
      delete this.portal
    }
  }

  _getImageStyle() {
    const style = Object.assign({},
      this.state.isZoomed && { visibility: 'hidden' }
    )

    return Object.assign(
      {},
      defaults.styles.image,
      style,
      this.props.defaultStyles.image,
      this.state.image.style
    )
  }

  _handleZoom(event) {
    if (this.props.isZoomed == null && this.props.shouldHandleZoom(event)) {
      this.setState({ isZoomed: true }, this.props.onZoom)
    } else {
      this.props.onZoom()
    }
  }

  /**
   * This gets passed to the zoomed component as a callback
   * to trigger when the time is right to shut down the zoom.
   * If `shouldReplaceImage`, update the normal image we're showing
   * with the zoomed image -- useful when wanting to replace a low-res
   * image with a high-res one once it's already been downloaded.
   * It also cleans up the zoom references and then updates state.
   */
  _handleUnzoom(src) {
    return () => {
      const changes = Object.assign({}, { hasAlreadyLoaded: true, isZoomed: false },
        this.props.shouldReplaceImage && {
          image: Object.assign({}, this.state.image, { src })
        }
      )

      /**
       * Lamentable but necessary right now in order to
       * remove the portal instance before the next
       * `componentDidUpdate` check for the portalInstance.
       * The reasoning is so we can differentiate between an
       * external `isZoomed` command and an internal one.
       */
      this._removeZoomed()

      this.setState(changes, this.props.onUnzoom)
    }
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
    src: string,
    alt: string,
    className: string,
    style: object
  }),
  defaultStyles: object,
  isZoomed: bool,
  shouldHandleZoom: func,
  shouldReplaceImage: bool,
  shouldRespectMaxDimension: bool.isRequired,
  onZoom: func,
  onUnzoom: func
}

//====================================================

class ResizeWrapper extends Component {
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

//====================================================

class FullWrapper extends Component {
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
    const cloned = React.cloneElement(
      React.Children.only(this.props.children),
      { ref: 'child' }
    )
    return (
      <div onClick={this.unzoom.bind(this)}>
        {cloned}
      </div>
    )
  }

  unzoom() {
    this.refs.child.unzoom()
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

//====================================================

class Zoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLoaded: false,
      isZoomed: true,
      src: this.props.image.currentSrc || this.props.image.src
    }

    this.unzoom = this.unzoom.bind(this)
    this._handleImageLoad = this._handleImageLoad.bind(this)
  }

  static get defaultProps() {
    return {
      zoomImage: {}
    }
  }

  componentDidMount() {
    const { hasAlreadyLoaded, zoomImage: { src, srcSet } } = this.props

    this.setState({ hasLoaded: true })
    if ((src || srcSet) && !hasAlreadyLoaded) fetchImage(this.props.zoomImage, this._handleImageLoad)
  }

  render() {
    return (
      <div style={ this._getZoomContainerStyle() }>
        <Overlay
          isVisible={ this.state.isZoomed }
          defaultStyles={ this.props.defaultStyles }
        />
        <img
          { ...this.props.zoomImage }
          src={ this.state.src }
          style={ this._getZoomImageStyle() }
        />
      </div>
    )
  }

  unzoom() {
    const onUnzoom = this.props.onUnzoom(this.state.src)
    this.setState({ isZoomed: false }, () => setTimeout(onUnzoom, transitionDuration))
  }

  _handleImageLoad(img) {
    // Only set state if component is still mounted
    if (this.state.isZoomed) {
      this.setState({ hasLoaded: true, src: img.currentSrc || img.src })
    }
  }

  _getZoomContainerStyle() {
    return Object.assign(
      {},
      defaults.styles.zoomContainer,
      this.props.defaultStyles.zoomContainer
    )
  }

  _getZoomImageStyle() {
    const { image, shouldRespectMaxDimension, src, zoomMargin } = this.props
    const imageOffset = image.getBoundingClientRect()

    const { top, left } = imageOffset
    const { width, height, naturalWidth, naturalHeight } = image

    const style = { top, left, width, height }

    if (!this.state.hasLoaded || !this.state.isZoomed) {
      return Object.assign(
        {},
        defaults.styles.zoomImage,
        this.props.defaultStyles.zoomImage,
        this.props.style,
        style
      )
    }

    // Get the the coords for center of the viewport
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2

    // Get the coords for center of the original image
    const imageCenterX = imageOffset.left + width / 2
    const imageCenterY = imageOffset.top + height / 2

    // Get offset amounts for image coords to be centered on screen
    const translateX = viewportX - imageCenterX
    const translateY = viewportY - imageCenterY

    // Figure out how much to scale the image
    const scale = shouldRespectMaxDimension && !src
      ? getMaxDimensionScale({ width, height, naturalWidth, naturalHeight, zoomMargin })
      : getScale({ width, height, zoomMargin })

    const zoomStyle = {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
    }

    return Object.assign(
      {},
      defaults.styles.zoomImage,
      this.props.defaultStyles.zoomImage,
      this.props.style,
      style,
      zoomStyle
    )
  }
}

Zoom.propTypes = {
  defaultStyles: object.isRequired,
  hasAlreadyLoaded: bool.isRequired,
  image: object.isRequired,
  shouldRespectMaxDimension: bool,
  zoomImage: shape({
    src: string,
    alt: string,
    className: string,
    style: object
  }).isRequired,
  zoomMargin: number.isRequired,
  onUnzoom: func.isRequired
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

//====================================================

function createPortal(tag) {
  const portal = document.createElement(tag)
  document.body.appendChild(portal)
  return portal
}

function removePortal(portal) {
  document.body.removeChild(portal)
}

function fetchImage(image, cb) {
  const { src, srcSet, sizes } = image
  const img = new Image()
  const onLoad = () => {
    cb(img)

    /**
     * If using srcset, future resize events can trigger
     * additional onload events to fire.
     * Remove listener after first load
     */
    img.removeEventListener('load', onLoad)
  }
  img.addEventListener('load', onLoad)
  img.src = src
  if (srcSet) img.srcset = srcSet
  if (sizes) img.sizes = sizes

}

/**
 * Figure out how much to scale based
 * solely on no maxing out the browser
 */
function getScale({ width, height, zoomMargin }) {
  const scaleX = window.innerWidth / (width + zoomMargin)
  const scaleY = window.innerHeight / (height + zoomMargin)
  return Math.min(scaleX, scaleY)
}

/**
 * Figure out how much to scale so you're
 * not larger than the original image
 */
function getMaxDimensionScale({ width, height, naturalWidth, naturalHeight, zoomMargin }) {
  const scale = getScale({ width: naturalWidth, height: naturalHeight, zoomMargin })
  const ratio = naturalWidth > naturalHeight
    ? naturalWidth / width
    : naturalHeight / height
  return scale > 1 ? ratio : scale * ratio
}
