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

The component accepts three props:
* `image` [ object | required ]: the original image
* `zoomImage` [ object | optional ]: the image to be used for zooming
* `replaceImage` [ boolean | optional | default `true` ]: once the image has been "zoomed" and downloaded the larger image, replace the original image. This is set to `true` by default.

Each one of these image props accepts four props:
* `src` [ string | required ]: the source for the image
* `alt` [ string | optional ]: the alt text for the image
* `className` [ string | optional ]: classes to apply to the image
* `style` [ object | optional ]: additional styles to apply to the image

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-medium-image-zoom/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master branch
1. When all is merged, pull down the upstream changes to your master
1. Delete your feature branch
