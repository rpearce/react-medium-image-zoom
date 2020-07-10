# @rpearce/image-zoom

[![npm version](https://img.shields.io/npm/v/@rpearce/image-zoom.svg)](https://www.npmjs.com/package/@rpearce/image-zoom) [![npm downloads](https://img.shields.io/npm/dm/@rpearce/image-zoom.svg)](https://www.npmjs.com/package/@rpearce/image-zoom) [![bundlephobia size](https://badgen.net/bundlephobia/minzip/react-medium-image-zoom)](bundlephobia.com/result?p=@rpearce/image-zoom) [![Build Status](https://travis-ci.org/rpearce/@rpearce/image-zoom.svg?branch=master)](https://travis-ci.org/rpearce/@rpearce/image-zoom) [![Coverage Status](https://coveralls.io/repos/github/rpearce/@rpearce/image-zoom/badge.svg?branch=master)](https://coveralls.io/github/rpearce/@rpearce/image-zoom?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/8e4debef4b9f0e8acd6e/maintainability)](https://codeclimate.com/github/rpearce/@rpearce/image-zoom/maintainability)

Accessible, progressive zooming for images.

Links:
* [Installation](#installation)
* [Usage In a Build System](#usage-in-a-build-system)
* [HTML Usage](#html-usage)
* [Options](#options)
* [Examples](#examples)

## Installation
```bash
$ npm i @rpearce/image-zoom
```
or
```bash
$ yarn add @rpearce/image-zoom
```
or
```html
<script src="https://unpkg.com/@rpearce/image-zoom"></script>
```


## Usage In a Build System
```js
import ImageZoom from '@rpearce/image-zoom'

const images = document.querySelectorAll('img')

for (let i = 0; i < images.length; i++) {
  ImageZoom({/* options here */}, images[i])
}
```

## HTML Usage
Add the following HTML before the closing `</body>` tag on your web page.

### Asynchronous, non-blocking way:
```html
<script>
;(function () {
  window.addEventListener('load', addIZ);

  function addIZ() {
    var script = document.createElement('script');
    script.setAttribute('async', 'true')
    script.onload = izOnload
    script.src = 'https://unpkg.com/@rpearce/image-zoom';
    document.body.appendChild(script);
  }

  function izOnload() {
    var images = document.querySelectorAll('img')

    for (var i = 0; i < images.length; i++) {
      ImageZoom({/* options here */}, images[i])
    }
  }
})();
</script>
```

### Synchronous, blocking way:
```html
<script src="https://unpkg.com/@rpearce/image-zoom"></script>
<script>
;(function () {
  var images = document.querySelectorAll('img');

  for (var i = 0; i < images.length; i++) {
    ImageZoom({/* options here */}, images[i]);
  }
})();
</script>

## Methods
There are two methods, `update` and `cleanup`, that can be called on the result
of initializing an `ImageZoom`:

```js
const imgEl = document.getElementById('zoom-me-123')
const imgZoom = ImageZoom({}, imgEl)

// update the options (see Options section below)
imgZoom.update({/* options here */})

// cleanup the instance of ImageZoom if you don't
// need it any more
imgZoom.cleanup()
```

## Options
The first argument to `ImageZoom` is an object that contains whatever options
you would like to control.

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
  portalEl?: HTMLElement
  scrollableEl?: HTMLElement | Window
  transitionDuration?: string
  zoomMargin?: number
  zoomZindex?: number
}
```

* `closeText`
  * accessible text for unzooming
  * default: `Press to unzoom image`
* `isControlled`
  * flag to specify that you intend to control the component's
    state yourself
  * default: `false`
* `modalText`
  * accessible modal dialog text when zoomed
  * default: `Zoomed item`
* `onZoomChange`
  * callback that is called with `true` when the zooming should be triggered
  * default: `undefined`
* `openText`
  * accessible text for zooming
  * default: `Press to zoom image`
* `overlayBgColorEnd`
  * modal dialog overlay ending background color
  * default: `rgba(255, 255, 255, 0.95)`
* `overlayBgColorStart`
  * modal dialog overlay starting background color
  * default: `rgba(255, 255, 255, 0)`
* `portalEl`
  * `HTMLElement` to be used for the react portal
  * default: `document.body`
* `scrollableEl`
  * `HTMLElement | Window` to be used for the scrolling listener
  * default: `window`
* `transitionDuration`
  * length of time for the animations to run
  * default: `300ms`
* `zoomMargin`
  * amount the zoomed item should be offset from the window
  * default: `0`
* `zoomZindex`
  * `z-index` value the modal dialog should have
  * default: `2147483647`

### Update Options
When updating options, you can pass all the same options as `ImageZoomOpts`,
and if you are using the `isControlled` flag already, you can also specify that
you'd like to zoom or unzoom the item.

```js
interface ImageZoomUpdateOpts extends ImageZoomOpts {
  isZoomed?: boolean
}
```

* `isZoomed`
  * flag used in conjunction with `isControlled` to specify the zoom / unzoom
    state of the component
  * default: `false`

## Examples
This code is from [the examples webpage](https://rpearce.github.io/image-zoom/).

### Uncontrolled
Let's say you have a number of things you would like to zoom that all have
`data-uncontrolled` attributes, and you want this to manage its own zoomed and
unzoomed states.

```js
var uncontrolleds = document.querySelectorAll('[data-uncontrolled]');

for (var i = 0; i < uncontrolleds.length; i++) {
  ImageZoom({}, uncontrolleds[i])
}
```

### Controlled By Listening for `onZoomChange`
If you want to control the zoom state yourself and have `ImageZoom` guide you on
when it should be zooming or unzooming, you can do so like this:

```js
var controlledCb = document.querySelector('[data-cb]');
var controlledCbWithOpts = ImageZoom(
  {
    isControlled: true,
    onZoomChange: function onZoomChange(isZoomed) {
      controlledCbWithOpts.update({ isZoomed: isZoomed });
    },
  },
  controlledCb
);
```

Here we send the `isControlled` option to let `ImageZoom` know that we'd like to
control the zoom state, and we pass `onZoomChange` to listen for when the zoom
state _should_ change. Our `onZoomChange` callback, when called, will reference
our `ImageZoom` instance and call the `update` method, passing `isZoomed` with
`true` or `false`.

### Controlled With Special Zooming Keys
If we want only certain keys to trigger to zoom and unzoom state of a zoomable
item, we can do that, as well.

In this example, we specify that the `j` key will zoom the item, and the `k` key
will unzoom the item. Any other interactions with it will not work.

```js
var controlledJk = document.querySelector('[data-jk]');
var controlledJkWithOpts = ImageZoom(
  {
    isControlled: true,
    closeText: 'Press k to unzoom',
    openText: 'Press j to zoom',
  },
  controlledJk
);

document.addEventListener('keydown', function (e) {
  if (e.key === 'j' || e.keyCode === 74) {
    controlledJkWithOpts.update({ isZoomed: true });
  } else if (e.key === 'k' || e.keyCode === 75) {
    controlledJkWithOpts.update({ isZoomed: false });
  }
})
```
