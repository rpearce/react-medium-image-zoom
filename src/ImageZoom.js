import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import defaults from './defaults'
import Zoom from './Zoom'

const { shape, string, object } = PropTypes

class ImageZoom extends Component {
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

export default ImageZoom
