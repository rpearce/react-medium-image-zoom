# API Documentation

| Prop | Type | Required | Default  | Details |
| ---  | --- | ---  | --- | --- |
| `closeText` | `String` | no | `'Unzoom Image'` | Accessible label text for when you want to unzoom |
| `openTextText` | `String` | no | `'Zoom Image'` | Accessible label text for when you want to zoom |
| `overlayBgColorEnd` | `String` | no | `'rgba(255, 255, 255, 0.95)'` | Modal overlay background color at end of zoom |
| `overlayBgColorStart` | `String` | no | `'rgba(255, 255, 255, 0)'` | Modal overlay background color at start of zoom |
| `portalEl` | `Element` | no | `document.body` | [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/element) to which we will append the zoom modal |
| `transitionDuration` | `Number` | no | `300` | Transition duration in milliseconds for the component to use on zoom and unzoom |
| `zoomMargin` | `Number` | no | `0` | Offset in pixels the zoomed image should be from the `window`' boundaries |

## Installation
```js
$ npm i react-medium-image-zoom
```
or
```js
$ yarn add react-medium-image-zoom
```

## Basic Usage

```js
import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'

const MyComponent = () => (
  <Zoom>
    <img
      alt="that wanaka tree"
      src="/path/to/thatwanakatree.jpg"
      width="500"
    />
  </Zoom>
)

export default MyComponent
```
