import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const { bool, func, object, shape, string } = PropTypes

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

export default class ImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isZoomed: props.isZoomed,
      image: props.image,
      hasAlreadyLoaded: false
    }

    this.handleZoom   = this.handleZoom.bind(this)
    this.handleUnzoom = this.handleUnzoom.bind(this)
  }

  static get defaultProps() {
    return {
      isZoomed: false,
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
    if (this.state.isZoomed) this.renderZoomed()
  }

  // Clean up any mess we made of the DOM before we unmount
  componentWillUnmount() {
    this.removeZoomed()
  }

  /**
   * We need to check to see if any changes are being
   * mandated by the consumer and if so, update accordingly
   */
  componentWillReceiveProps(nextProps) {
    const imageChanged = this.props.image.src !== nextProps.image.src
    const isZoomedChanged = this.state.isZoomed !== nextProps.isZoomed
    const changes = Object.assign({},
      imageChanged && { image: nextProps.image },
      isZoomedChanged && { isZoomed : nextProps.isZoomed }
    )

    if (Object.keys(changes).length) {
      this.setState(changes)
    }
  }

  /**
   * When the component's state updates, check for changes
   * and either zoom or start the unzoom procedure
   */
  componentDidUpdate(_, prevState) {
    if (prevState.isZoomed !== this.state.isZoomed) {
      if (this.state.isZoomed) this.renderZoomed()
      else if (this.portalInstance) this.portalInstance.handleUnzoom()
    }
  }

  render() {
    /**
     * Take whatever attributes you want to pass the image
     * and then override with the properties we need
     */
    const attrs = Object.assign({}, this.state.image, {
      style: this.getImageStyle(),
      onClick: this.handleZoom
    })

    const image = (
      <img ref="image" { ...attrs } />
    )

    if (this.props.shouldPreload && this.props.zoomImage && this.props.zoomImage.src) {
      return (
        <span>
          <link rel="preload" href={this.props.zoomImage.src} as="image" />
          { image }
        </span>
      )
    }

    return image
  }

  // Side-effects!
  renderZoomed() {
    this.portal = createPortal('div')
    this.portalInstance = ReactDOM.render(
      <Zoom
        zoomImage={ this.props.zoomImage }
        image={ ReactDOM.findDOMNode(this.refs.image) }
        defaultStyles={ this.props.defaultStyles }
        hasAlreadyLoaded={ this.state.hasAlreadyLoaded }
        shouldRespectMaxDimension={ this.props.shouldRespectMaxDimension }
        zoomMargin={ this.props.zoomMargin }
        onClick={ this.handleUnzoom }
      />
    , this.portal)
  }

  // Side-effects!
  removeZoomed() {
    if (this.portal) {
      ReactDOM.unmountComponentAtNode(this.portal)
      removePortal(this.portal)
      delete this.portalInstance
      delete this.portal
    }
  }

  getImageStyle() {
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

  handleZoom(event) {
    if (this.props.shouldHandleZoom(event)) {
      this.setState({ isZoomed: true }, this.props.onZoom)
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
  handleUnzoom(src) {
    return () => {
      const changes = Object.assign({},
        { isZoomed: false },
        { hasAlreadyLoaded: true },
        this.props.shouldReplaceImage && { image: Object.assign({}, this.state.image, { src }) }
      )

      /**
       * Lamentable but necessary right now in order to
       * remove the portal instance before the next
       * `componentDidUpdate` check for the portalInstance.
       * The reasoning is so we can differentiate between an
       * external `isZoomed` command and an internal one.
       */
      this.removeZoomed()

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
  shouldPreload: bool,
  shouldReplaceImage: bool,
  shouldRespectMaxDimension: bool,
  onZoom: func,
  onUnzoom: func
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

    this.handleResize     = this.handleResize.bind(this)
    this.handleUnzoom     = this.handleUnzoom.bind(this)
    this.handleScroll     = this.handleScroll.bind(this)
    this.handleKeyUp      = this.handleKeyUp.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove  = this.handleTouchMove.bind(this)
    this.handleTouchEnd   = this.handleTouchEnd.bind(this)
  }

  static get defaultProps() {
    return {
      zoomImage: {},
    }
  }

  componentDidMount() {
    const { hasAlreadyLoaded, zoomImage: { src, srcSet } } = this.props

    this.setState({ hasLoaded: true })
    if ((src || srcSet) && !hasAlreadyLoaded) this.fetchZoomImage()
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    const { defaultStyles, zoomImage } = this.props
    const { isZoomed, src } = this.state

    return (
      <div onClick={ this.handleUnzoom } style={ this.getZoomContainerStyle() }>
        <Overlay
          isVisible={ isZoomed }
          defaultStyles={ defaultStyles }
        />
        <img
          { ...zoomImage }
          src={ src }
          style={ this.getZoomImageStyle() }
        />
      </div>
    )
  }

  getZoomContainerStyle() {
    return Object.assign(
      {},
      defaults.styles.zoomContainer,
      this.props.defaultStyles.zoomContainer
    )
  }

  fetchZoomImage() {
    const { src, srcSet, sizes } = this.props.zoomImage
    const img = new Image()

    img.src = src
    if (srcSet) img.srcset = srcSet
    if (sizes) img.sizes = sizes

    const onLoad = () => {
      // Only set state if component is still mounted
      if (this.state.isZoomed) {
        this.setState({ hasLoaded: true, src: img.currentSrc || img.src })
      }

      /**
       * If using srcset, future resize events can trigger
       * additional onload events to fire.
       * Remove listener after first load
       */
      img.removeEventListener('load', onLoad)
    }

    img.addEventListener('load', onLoad);
  }

  addListeners() {
    this.isTicking = false
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll, true)
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('ontouchstart', this.handleTouchStart)
    window.addEventListener('ontouchmove', this.handleTouchMove)
    window.addEventListener('ontouchend', this.handleTouchEnd)
    window.addEventListener('ontouchcancel', this.handleTouchEnd)
  }

  removeListeners() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll, true)
    window.removeEventListener('keyup', this.handleKeyUp)
    window.removeEventListener('ontouchstart', this.handleTouchStart)
    window.removeEventListener('ontouchmove', this.handleTouchMove)
    window.removeEventListener('ontouchend', this.handleTouchEnd)
    window.removeEventListener('ontouchcancel', this.handleTouchEnd)
  }

  handleResize() {
    this.forceUpdate()
  }

  handleScroll() {
    this.forceUpdate()
    if (this.state.isZoomed) this.handleUnzoom()
  }

  handleKeyUp({ which }) {
    const opts = {
      27: this.handleUnzoom
    }

    if(opts[which]) return opts[which]()
  }

  handleTouchStart(e) {
    this.yTouchPosition = e.touches[0].clientY
  }

  handleTouchMove(e) {
    this.forceUpdate()
    const touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition)
    if (touchChange > 10 && this.state.isZoomed) this.handleUnzoom()
  }

  handleTouchEnd(e) {
    delete this.yTouchPosition
  }

  handleUnzoom(e) {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
    this.setState({ isZoomed: false }, () => setTimeout(this.props.onClick(this.state.src), transitionDuration))
  }

  getZoomImageStyle() {
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

Zoom.propTypes = {
  zoomImage: shape({
    src: string,
    alt: string,
    className: string,
    style: object
  }).isRequired,
  image: object.isRequired,
  hasAlreadyLoaded: bool.isRequired,
  defaultStyles: object.isRequired
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
    return Object.assign(
      {},
      defaults.styles.overlay,
      this.props.defaultStyles.overlay,
      { opacity }
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
