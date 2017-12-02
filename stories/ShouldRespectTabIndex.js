import React, { Component } from 'react'
import ImageZoom from '../src'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocusEnabled: false
    }
  }

  render() {
    return (
      <div>
        <ShouldRespectTabIndex />
        <ShouldRespectAttributeChange
          isFocusEnabled={this.state.isFocusEnabled}
          onToggle={() =>
            this.setState({ isFocusEnabled: !this.state.isFocusEnabled })}
        />
      </div>
    )
  }
}

const ShouldRespectAttributeChange = ({ isFocusEnabled, onToggle }) => {
  const tabIndex = isFocusEnabled ? 0 : -1
  return (
    <div>
      <h1>
        Conditionally allow/disallow keyboard interaction for accessibility
      </h1>
      <p>
        There are instances where you might want to conditionally enable or
        disable the ability to zoom an image dynamically. You can specify -1 for
        the image element tabIndex attribute to disable focus/interaction and 0
        to enable focus/interaction.
      </p>
      <p>
        Try it! Click this checkbox to enable keyboard interaction and uncheck
        it to disable keyboard interaction.
      </p>
      <p>
        <input
          type="checkbox"
          value={isFocusEnabled}
          checked={isFocusEnabled}
          onChange={onToggle}
          id="enable"
        />
        <label htmlFor="enable">Enable Keyboard Interaction</label>
      </p>
      <hr />
      <p>
        <ImageZoom
          image={{
            src: 'https://rpearce.github.io/react-medium-image-zoom/bridge.jpg',
            alt: 'Golden Gate Bridge',
            style: {
              width: '300px'
            },
            tabIndex
          }}
        />
      </p>
    </div>
  )
}

const ShouldRespectTabIndex = () =>
  <div>
    <h1>Respect image&apos;s tab index</h1>
    <p>
      By default, the component honors accessibility conventions for interactive
      components. This means that the component receives tab focus, renders a
      focus outline and respects keydown handling of the Enter and Spacebar keys
      for image zooming (in and out).
    </p>
    <p>
      To disable this behavior, specify -1 for the image element tabIndex
      attribute.
    </p>
    <hr />
    <h2>
      Receives focus and allows for keyboard interaction for accessibility.
    </h2>
    <p>
      <ImageZoom
        image={{
          src: 'https://rpearce.github.io/react-medium-image-zoom/gazelle.jpg',
          alt: 'Gazelle Stomping',
          title: 'Keyboard accessible...'
        }}
      />
    </p>
    <h2>
      Does not receive focus and disallows keyboard interaction for
      accessibility.
    </h2>
    <p>
      <ImageZoom
        image={{
          src: 'https://rpearce.github.io/react-medium-image-zoom/gazelle.jpg',
          alt: 'Gazelle Stomping',
          title: 'Not keyboard accessible...',
          tabIndex: -1
        }}
      />
    </p>
  </div>

