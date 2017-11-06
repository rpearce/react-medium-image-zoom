import React, { Component } from 'react'
import ImageZoom from '../src'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: false
    }
  }

  render() {
    return (
      <ShouldHandleZoom
        isEnabled={this.state.isEnabled}
        onToggle={() => this.setState({ isEnabled: !this.state.isEnabled })}
      />
    )
  }
}

const ShouldHandleZoom = ({ isEnabled, onToggle }) =>
  <div>
    <h1>Conditionally allow/disallow zoom capability</h1>
    <p>
      There are instances where you might want to conditionally enable or
      disable the ability to zoom an image. You can do so with the
      shouldHandleZoom prop which should be a function that returns a boolean.
    </p>
    <p>
      Try it! Click this checkbox to enable zooming{' '}
      <strong>only when the image is clicked</strong>
      and uncheck it to disable the zoom capabilities altogether.
    </p>
    <p>
      <input
        type="checkbox"
        value={isEnabled}
        checked={isEnabled}
        onChange={onToggle}
        id="enable"
      />
      <label htmlFor="enable">Enable Zoom</label>
    </p>
    <hr />
    <p>
      <ImageZoom
        image={{
          src: 'https://rpearce.github.io/react-medium-image-zoom/bridge.jpg',
          alt: 'Golden Gate Bridge',
          style: {
            width: '300px'
          }
        }}
        shouldHandleZoom={e => isEnabled && e.type === 'click'}
      />
    </p>
  </div>

