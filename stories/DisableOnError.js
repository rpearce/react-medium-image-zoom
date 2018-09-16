import React, { Component } from 'react'
import ImageZoom from '../src'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newSrc: 'https://rpearce.github.io/react-medium-image-zoom/bridgezzz.jpg'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        newSrc: 'https://rpearce.github.io/react-medium-image-zoom/bridge.jpg'
      })
    }, 1000)
  }

  render() {
    return <DisableOnError newSrc={this.state.newSrc} />
  }
}

const DisableOnError = ({ newSrc }) =>
  <div>
    <h1>Behavior when an image load error occurs</h1>
    <p>
      If your initial image fails to load, the component will be disabled to
      prevent any interaction and avoid awkward scenarios. If you provide a new
      image source, it will try to load that and try again.
    </p>
    <hr />
    <h2>Failing example</h2>
    <p>
      <ImageZoom
        image={{
          src:
            'https://rpearce.github.io/react-medium-image-zoom/bridgezzz.jpg',
          alt: 'Golden Gate Bridge image',
          style: {
            width: '300px'
          }
        }}
        defaultStyles={{
          image: {
            cursor: 'pointer'
          },
          zoomImage: {
            cursor: 'pointer'
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.7)'
          }
        }}
      />
    </p>
    <hr />
    <h2>User-provided retry example</h2>
    <p>This image should not load and then should load.</p>
    <p>
      Be sure to check the developer console to see that the onLoad and onError
      callbacks work for the image prop passed to ImageZoom.
    </p>
    <p>
      <ImageZoom
        image={{
          src: newSrc,
          alt: 'Golden Gate Bridge image',
          style: {
            width: '300px'
          },
          onLoad: a => {
            console.log('onload', a)
          },
          onError: a => {
            console.log('onerror', a)
          }
        }}
        defaultStyles={{
          image: {
            cursor: 'pointer'
          },
          zoomImage: {
            cursor: 'pointer'
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.7)'
          }
        }}
      />
    </p>
  </div>

