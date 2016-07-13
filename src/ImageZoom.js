import React, { Component, PropTypes } from 'react'

const { shape, string } = PropTypes

export default class ImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isZoomed: false
    }

    this.renderZoomed = this.renderZoomed.bind(this)
    this.renderUnzoomed = this.renderUnzoomed.bind(this)
    this.zoom = this.zoom.bind(this)
    this.unzoom = this.unzoom.bind(this)
    this.addScrollListener = this.addScrollListener.bind(this)
    this.removeScrollListener = this.removeScrollListener.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  static get propTypes() {
    return {
      image: shape({
        src: string.isRequired,
        alt: string,
        className: string
      }).isRequired,
      zoomImage: shape({
        src: string.isRequired,
        alt: string,
        className: string
      }).isRequired
    }
  }

  render() {
    return this.state.isZoomed ? this.renderZoomed() : this.renderUnzoomed()
  }

  renderZoomed() {
    return null;
  }

  renderUnzoomed() {
    return (
      <img
        src={ this.props.image.src }
        alt={ this.props.image.alt }
        className={ this.props.image.className }
        onClick={ this.zoom }
      />
    )
  }

  zoom() {
    this.setState({ isZoomed: true }, this.addScrollListener)
  }

  unzoom() {
    this.setState({ isZoomed: false }, this.removeScrollListener)
  }

  addScrollListener() {
    this.scrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.handleScroll)
  }

  removeScrollListener() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const scrollChange = Math.abs(window.pageYOffset - this.scrollPosition)
    if (scrollChange > 30) {
      this.scrollPosition = undefined
      this.unzoom()
    }
  }
}
