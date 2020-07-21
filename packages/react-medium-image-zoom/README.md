# react-medium-image-zoom

[![npm version](https://img.shields.io/npm/v/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom) [![npm downloads](https://img.shields.io/npm/dm/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom) [![bundlephobia size](https://badgen.net/bundlephobia/minzip/react-medium-image-zoom)](bundlephobia.com/result?p=react-medium-image-zoom) [![Build Status](https://travis-ci.org/rpearce/react-medium-image-zoom.svg?branch=master)](https://travis-ci.org/rpearce/react-medium-image-zoom) [![Coverage Status](https://coveralls.io/repos/github/rpearce/react-medium-image-zoom/badge.svg?branch=master)](https://coveralls.io/github/rpearce/react-medium-image-zoom?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/8e4debef4b9f0e8acd6e/maintainability)](https://codeclimate.com/github/rpearce/react-medium-image-zoom/maintainability)

This library is a [`React.js`](https://reactjs.org/) iteration on [Medium.com's
image zoom](https://medium.com/design/image-zoom-on-medium-24d146fc0c20) that
allows for images to work together for a “zooming” effect, is accessible
(keyboard and screen readers), and works regardless of parent elements that have
`overflow: hidden` or [parents with transform
properties](https://codepen.io/rpearce/pen/MEyOmb).

As an added bonus, it should let you zoom _anything_.

## Links
* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [API](#api)
* [Migrating From v3 to v4](#migrating-from-v3-to-v4)
* [Contributors](#contributors)
* [Storybook Examples](https://rpearce.github.io/react-medium-image-zoom/)
* [Changelog](./CHANGELOG.md)
* [Contributing](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)

## Installation
```bash
$ npm i react-medium-image-zoom
```
or
```bash
$ yarn add react-medium-image-zoom
```

## Options

```tsx
interface ImageZoomOpts {
  closeText?: string
  isControlled?: boolean
  isZoomed?: boolean
  modalText?: string
  onZoomChange?: (isZoomed: boolean) => void
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  scrollableEl?: HTMLElement | Window
  transitionDuration?: number
  zoomMargin?: number
  zoomZindex?: number
}
```

* `closeText`
  * accessible text for unzooming
  * default: `'Unzoom image'`
* `isControlled`
  * flag to specify that you intend to control the component's
    state yourself
  * default: `false`
* `isZoomed`
  * flag used in conjunction with `isControlled` to specify the zoom / unzoom
    state of the component
  * default: `false`
* `modalText`
  * accessible modal dialog text when zoomed
  * default: `'Zoomed item'`
* `onZoomChange`
  * callback that is called with `true` when the zooming should be triggered
  * default: `undefined`
* `openText`
  * accessible text for zooming
  * default: `'Zoom image'`
* `overlayBgColorEnd`
  * modal dialog overlay ending background color
  * default: `'rgba(255, 255, 255, 0.95)'`
* `overlayBgColorStart`
  * modal dialog overlay starting background color
  * default: `'rgba(255, 255, 255, 0)'`
* `transitionDuration`
  * length of time in milliseconds for the animations to run
  * default: `300`
* `zoomMargin`
  * amount the zoomed item should be offset from the window
  * default: `0`
* `zoomZindex`
  * `z-index` value the modal dialog should have
  * default: `2147483647`

## Usage

### Regular Usage

```js
import { useImageZoom } from 'react-medium-image-zoom'

const MyComponent = () => {
  const { ref } = useImageZoom({ /* image zoom options here */ })

  return (
    <img
      alt="that wanaka tree"
      ref={ref}
      src="/path/to/thatwanakatree.jpg"
      width="500"
    />
  )
}
```

### Usage with `<picture>`

```js
import { useImageZoom } from 'react-medium-image-zoom'

const MyComponent = () => {
  const { ref } = useImageZoom({ /* image zoom options here */ })

  return (
    <picture>
      <source media="(max-width: 800px)" srcSet="/path/to/teAraiPoint.jpg" />
      <img
        alt="that wanaka tree"
        ref={ref}
        src="/path/to/thatwanakatree.jpg"
        width="500"
      />
    </picture>
  )
}
```

### Usage with `<figure>`

```js
import { useImageZoom } from 'react-medium-image-zoom'

const MyComponent = () => {
  const { ref } = useImageZoom({ /* image zoom options here */ })

  return (
    <figure>
      <img
        alt="that wanaka tree"
        ref={ref}
        src="/path/to/thatwanakatree.jpg"
        width="500"
      />
      <figcaption>That Wanaka Tree</figcaption>
    </figure>
  )
}
```

### Usage with non-image element
Tools like gatsby have their own `Image` elements that can be difficult to add a
`ref` to. There are also instances where you may want to zoom anything from a
`p` to an `svg` to a `div`. Here is an example of how you can do that:

```js
import { useImageZoom } from 'react-medium-image-zoom'

const MyComponent = () => {
  const { ref } = useImageZoom({ /* image zoom options here */ })

  return (
    <div ref={ref}>
      {/* what you want the div to zoom */}
    </div>
  )
}
```
