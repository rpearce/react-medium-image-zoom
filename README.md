# react-medium-image-zoom

## Installation
```
$ npm install --save react-medium-image-zoom
```

## Usage
```js
import ImageZoom from 'react-medium-image-zoom'

const MyComponent = (props) =>
  <div>
    <p>Some text...</p>

    <ImageZoom
      image={{
        src: 'bridge.jpg',
        alt: 'Golden Gate Bridge',
        className: 'img',
        style: {}
      }}
      zoomImage={{
        src: 'bridge-big.jpg',
        alt: 'Golden Gate Bridge',
        className: 'img--zoomed',
        style: {}
      }}
    />

    <p>Some text...</p>
  </div>
```

The component accepts two props:
* `image` [ object | required ]: the original image
* `zoomImage` [ object | optional ]: the image to be used for zooming

Each one of these image props accepts four props:
* `src` [ string | required ]: the source for the image
* `alt` [ string | optional ]: the alt text for the image
* `className` [ string | optional ]: classes to apply to the image
* `style` [ object | optional ]: additional styles to apply to the image
