import React, { Component } from 'react'
import { bool, func, object, number, shape, string } from 'prop-types'
import defaults from './defaults'
import { fetchImage, getMaxDimensionScale, getScale } from './helpers'

import Overlay from './Overlay'

export default class Zoom extends Component {
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

    if ((src || srcSet) && !hasAlreadyLoaded) {
      fetchImage(this.props.zoomImage, this._handleImageLoad)
    }
  }

  render() {
    return (
      <div style={this._getZoomContainerStyle()}>
        <Overlay
          isVisible={this.state.isZoomed}
          defaultStyles={this.props.defaultStyles}
        />
        <img
          {...this.props.zoomImage}
          src={this.state.src}
          style={this._getZoomImageStyle()}
        />
      </div>
    )
  }

  unzoom(allowRefocus = true) {
    const onUnzoom = this.props.onUnzoom(this.state.src, allowRefocus)
    this.setState({ isZoomed: false }, () =>
      setTimeout(onUnzoom, defaults.transitionDuration)
    )
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
    const scale =
      shouldRespectMaxDimension && !src
        ? getMaxDimensionScale({
            width,
            height,
            naturalWidth,
            naturalHeight,
            zoomMargin
          })
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
