import React, { Component } from 'react'
import ImageZoom from '../src'

const image = 'https://rpearce.github.io/react-medium-image-zoom/bridge.jpg'
const bigImage =
  'https://rpearce.github.io/react-medium-image-zoom/bridge-big.jpg'

export default class ZoomOnLoad extends Component {
  constructor(...params) {
    super(...params)
    this._handleZoom = this._handleZoom.bind(this)
    this._handleUnzoom = this._handleUnzoom.bind(this)
    this.state = { isZoomed: true }
  }

  render() {
    return (
      <div>
        <h1>Zoom On Load</h1>
        <p>
          What we want to do here is zoom the image as soon as we load/mount.
        </p>
        <hr />
        <p>
          <ImageZoom
            image={{
              src: image,
              alt: 'Golden Gate Bridge',
              style: {
                width: '300px'
              }
            }}
            zoomImage={{
              src: bigImage,
              alt: 'Golden Gate Bridge'
            }}
            isZoomed={this.state.isZoomed}
            onZoom={this._handleZoom}
            onUnzoom={this._handleUnzoom}
          />
        </p>
      </div>
    )
  }

  _handleZoom() {
    this.setState({ isZoomed: true })
  }

  _handleUnzoom() {
    this.setState({ isZoomed: false })
  }
}
