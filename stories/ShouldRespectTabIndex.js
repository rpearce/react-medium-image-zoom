import React from 'react'
import ImageZoom from '../src'

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


export default ShouldRespectTabIndex
