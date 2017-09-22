import React from 'react'
import ImageZoom from '../src'

const ShouldReplaceImage = () =>
  <div>
    <h1>Prevent replacing original image with zoomImage</h1>
    <p>
      If you provide a zoomImage but don&apos;t want it to replace the original
      image on the page, you can pass the shouldReplaceImage prop with a value
      of false.
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
        zoomImage={{
          src:
            'https://rpearce.github.io/react-medium-image-zoom/bridge-big.jpg',
          alt: 'Golden Gate Bridge'
        }}
        shouldReplaceImage={false}
      />
    </p>
  </div>


export default ShouldReplaceImage
