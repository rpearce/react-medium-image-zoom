# react-medium-image-zoom

![](https://img.shields.io/npm/dm/react-medium-image-zoom.svg)
![](https://img.shields.io/npm/v/react-medium-image-zoom.svg)

This library is a different implementation of [Medium.com's image zoom](https://medium.com/design/image-zoom-on-medium-24d146fc0c20) that allows for a low-res and high-res images to work together for "zooming" effects, works regardless of parent elements that have `overflow: hidden` and is made to work explicitly with [React.js](https://github.com/facebook/react) >= v0.14.

You can [view the demo here](https://rpearce.github.io/react-medium-image-zoom/).

## Installation
```
$ npm install --save react-medium-image-zoom
```

## Usage
```js
import ImageZoom from 'react-medium-image-zoom'

function MyComponent(props) {
  return (
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
  )
}
```

| Prop                        | Type    | Required | Default | Details |
| ------                      | ------- | -------  | ------- | ------- |
| `image`                     | object  | yes      | none    | The original image |
| `zoomImage`                 | object  | no       | `image` | The image to be used for zooming |
| `zoomMargin`                | number  | no       | `40`    | Pixel number to offset zoomed image from the window |
| `isZoomed`                  | boolean | no       | `false` | For more direct control over the zoom state |
| `shouldHandleZoom`          | func    | no       | `(event) => true` | Pass this callback to intercept a zoom click event and determine whether or not to zoom. Function must return a truthy or falsy value |
| `shouldPreload`             | bool    | no       | `false` | When `true` and `zoomImage` is included, preload the `zoomImage.src` by including a `<link rel="preload">` for image's source |
| `shouldReplaceImage`        | boolean | no       | `true`  | Once the image has been "zoomed" and downloaded the larger image, this replaces the original `image` with the `zoomImage` |
| `shouldRespectMaxDimension` | boolean | no       | `false` | When `true`, don't make the zoomed image's dimensions larger than the original dimensions. _Currently only supported when NO zoomImage is provided._  |
| `defaultStyles`             | object  | no       | `{}` | For fine-grained control over all default styles (`zoomContainer`, `overlay`, `image`, `zoomImage`) |
| `onZoom`                    | func    | no       | `() => {}` | Pass this callback to respond to a zoom interaction. |
| `onUnzoom`                  | func    | no       | `() => {}` | Pass this callback to respond to an unzoom interaction. |

Each one of these image props accepts normal `image` props, for example:

| Prop | Type | Required | Details |
| ------ |  ---- | ------- | ------- |
| `src` | string | yes | The source for the image |
| `alt` | string | no | The alt text for the image |
| `className` | string | no | Classes to apply to the image |
| `style` | object | no | Additional styles to apply to the image |
| ... | ... | no | ... |

## Browser Support
Currently, this has only been tested on the latest modern browsers. Pull requests are welcome.

## Development
The source code is located within the `src` directory. Use `$npm run build:example` to build the main file as well as the example during development.

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
