import React from 'react'
import ImageZoom from '../src'

const ZoomImage = () =>
  <div>
    <h1>Provide a zoomImage</h1>
    <p>
      In order to keep your inital page-size a little bit slimmer, your initial
      image can be a low-res version, and you can pass a larger image via
      zoomImage (make sure they have the same aspect ratio).
    </p>
    <p>
      Once you click to zoom the initial image, the component will start
      fetching the high-res image in the background while simultaneously
      transitioning the smaller image to the size it needs to be on the screen.
      Once the high-res image loads, it will replace the low-res image in the
      zoomed area and on the page, itself.
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
      />
    </p>
  </div>


export default ZoomImage
