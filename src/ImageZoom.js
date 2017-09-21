import React, { Component } from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import ReactDOM from 'react-dom'
import defaults from './defaults'
import { createPortal, removePortal } from './helpers'

import EventsWrapper from './EventsWrapper'
import Zoom from './Zoom'

const isControlled = isZoomed => isZoomed !== null && isZoomed !== undefined

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
      shouldHandleZoom: () => true,
      onZoom: () => {},
      onUnzoom: () => {}
    }
  }

  componentDidMount() {
    if (this.props.isZoomed) {
      /**
       * Add to the end of the execution queue
       * to make sure other things can execute
       * first and prevent it from being "jumpy"
       */
      setTimeout(this._renderZoomed.bind(this), 0)
    }
  }

  // Clean up any mess we made of the DOM before we unmount
  componentWillUnmount() {
    this._removeZoomed()
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isControlled(this.props.isZoomed) &&
      isControlled(nextProps.isZoomed)
    ) {
      throw new Error(defaults.errors.uncontrolled)
    } else if (
      isControlled(this.props.isZoomed) &&
      !isControlled(nextProps.isZoomed)
    ) {
      throw new Error(defaults.errors.controlled)
    }

    /**
     * When component is controlled, we need a flag
     * set when it's about to close in order to keep
     * hiding the original image on the page until the
     * unzooming is complete
     */
    if (this.props.isZoomed && !nextProps.isZoomed) {
      this.isClosing = true
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
    const prevIsZoomed = isControlled(prevProps.isZoomed)
      ? prevProps.isZoomed
      : prevState.isZoomed
    const isZoomed = isControlled(this.props.isZoomed)
      ? this.props.isZoomed
      : this.state.isZoomed
    if (prevIsZoomed !== isZoomed) {
      if (isZoomed) {
        this._renderZoomed()
      } else if (this.portalInstance) {
        this.portalInstance.unzoom({ force: true })
      }
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

    return <img ref="image" {...attrs} />
  }

  _renderZoomed() {
    this.portal = createPortal('div')
    this.portalInstance = ReactDOM.render(
      <EventsWrapper controlledEventFn={this._getControlledEventFn()}>
        <Zoom
          defaultStyles={this.props.defaultStyles}
          image={ReactDOM.findDOMNode(this.refs.image)}
          hasAlreadyLoaded={this.state.hasAlreadyLoaded}
          shouldRespectMaxDimension={this.props.shouldRespectMaxDimension}
          zoomImage={this.props.zoomImage}
          zoomMargin={this.props.zoomMargin}
          onUnzoom={this._handleUnzoom}
        />
      </EventsWrapper>,
      this.portal
    )
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
    const isHidden =
      this.state.isZoomed || this.props.isZoomed || this.isClosing
    const style = Object.assign({}, isHidden && { visibility: 'hidden' })

    return Object.assign(
      {},
      defaults.styles.image,
      style,
      this.props.defaultStyles.image,
      this.state.image.style
    )
  }

  _handleZoom(event) {
    if (
      !isControlled(this.props.isZoomed) &&
      this.props.shouldHandleZoom(event)
    ) {
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
      const changes = Object.assign(
        {},
        { hasAlreadyLoaded: true, isZoomed: false },
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

      delete this.isClosing

      this.setState(changes, this.props.onUnzoom)
    }
  }

  _getControlledEventFn() {
    return isControlled(this.props.isZoomed) ? this.props.onUnzoom : null
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
