import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import defaults from './defaults'
import { createPortal, removePortal } from './helpers'

import FullWrapper from './FullWrapper'
import Overlay from './Overlay'
import ResizeWrapper from './ResizeWrapper'
import Zoom from './Zoom'

const { bool, element, func, object, number, shape, string } = PropTypes

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
      throw new Error(defaults.errors.uncontrolled)
    } else if (this.props.isZoomed != null && nextProps.isZoomed == null) {
      throw new Error(defaults.errors.controlled)
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

