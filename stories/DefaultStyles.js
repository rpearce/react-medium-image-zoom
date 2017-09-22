import React from 'react'
import ImageZoom from '../src'

const DefaultStyles = () =>
  <div>
    <h1>Providing defaultStyles</h1>
    <p>
      You can pass defaultStyles in order to have fine-grained control over all
      default styles (zoomContainer, overlay, image, zoomImage). Click the image
      below to see a different cursor over the image, a different cursor on the
      zoomImage, and a different overlay backgroundColor.
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


export default DefaultStyles
