# react-medium-image-zoom
This library is a different implementation of [Medium.com's image zoom](https://medium.com/design/image-zoom-on-medium-24d146fc0c20) that allows for a low-res and high-res images to work together for "zooming" effects, works regardless of parent elements that have `overflow: hidden` and is made to work explicitly with [React.js](https://github.com/facebook/react) >= v0.14.

You can [view the demo here](https://rpearce.github.io/react-medium-image-zoom/).

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
        style: { width: '50em' }
      }}
      zoomImage={{
        src: 'bridge-big.jpg',
        alt: 'Golden Gate Bridge'
      }}
    />

    <p>Some text...</p>
  </div>
```

The component accepts three props:
* `image` [ object | required ]: the original image
* `zoomImage` [ object | optional ]: the image to be used for zooming
* `replaceImage` [ boolean | optional | default `true` ]: once the image has been "zoomed" and downloaded the larger image, replace the original image. This is set to `true` by default.

Each one of these image props accepts normal `image` props, for example:
* `src` [ string | required ]: the source for the image
* `alt` [ string | optional ]: the alt text for the image
* `className` [ string | optional ]: classes to apply to the image
* `style` [ object | optional ]: additional styles to apply to the image

## Browser Support
Currently, this has only been tested on the latest modern browsers. Pull requests are welcome.

## Development
The source code is located within the `src` directory. Use `$npm run build:all` to build the main file as well as the example during development.

You can view the the example via `$ open example/index.html`.

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-medium-image-zoom/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master branch
1. When all is merged, pull down the upstream changes to your master
1. Delete your feature branch
