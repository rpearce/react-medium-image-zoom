import React, { Component } from 'react'
import { bool, func, object, number, shape, string } from 'prop-types'
import defaults from './defaults'
import { fetchImage, getMaxDimensionScale, getScale } from './helpers'

import Overlay from './Overlay'

/**
 * The `tmpSrc` and `TmpImg` code here is a workaround
 * for a longstanding Firefox issue where replacing the
 * `src` of an `<img>` tag requires calculations and
 * results in a "flicker" of sorts.
 *
 * See https://github.com/rpearce/react-medium-image-zoom/issues/96
 * for further details.
 */

export default class Zoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLoaded: false,
      isZoomed: true,
      src: props.image.currentSrc || props.image.src,
      tmpSrc: null
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
    const { zoomImage: { src, srcSet } } = this.props

    this.setState({ hasLoaded: true })

    if (src || srcSet) {
      fetchImage(this.props.zoomImage, this._handleImageLoad)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If we have a `tmpSrc`, wait and then give it to `src`
    if (!prevState.tmpSrc && this.state.tmpSrc) {
      setTimeout(() => {
        this.setState({ src: this.state.tmpSrc, tmpSrc: null })
      }, 100)
    }
  }

  render() {
    const {
      props: { defaultStyles, zoomImage },
      state: { tmpSrc, isZoomed, src }
    } = this

    const style = this._getZoomImageStyle()

    return (
      <div style={this._getZoomContainerStyle()}>
        <Overlay isVisible={isZoomed} defaultStyles={defaultStyles} />
        <img {...zoomImage} src={src} style={style} />
        <TmpImg {...zoomImage} src={tmpSrc} style={style} />
      </div>
    )
  }

  unzoom(allowRefocus) {
    const onUnzoom = this.props.onUnzoom(this.state.src, allowRefocus)
    this.setState({ isZoomed: false }, () =>
      setTimeout(onUnzoom, defaults.transitionDuration)
    )
  }

  _handleImageLoad(img) {
    // Only set state if component is still mounted
    if (this.state.isZoomed) {
      this.setState({ tmpSrc: img.currentSrc || img.src })
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
    const viewportX = document.body.clientWidth / 2
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

const TmpImg = ({ src, style, ...props }) =>
  src ? <img {...props} src={src} style={getTmpStyle(style)} /> : null

const tmpStyle = {
  position: 'fixed',
  visibility: 'hidden'
}

const getTmpStyle = style => Object.assign({}, style, tmpStyle)
