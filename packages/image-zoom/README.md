# @rpearce/image-zoom

[![npm version](https://img.shields.io/npm/v/@rpearce/image-zoom.svg?style=flat-square)](https://www.npmjs.com/package/@rpearce/image-zoom) [![npm downloads](https://img.shields.io/npm/dm/@rpearce/image-zoom.svg?style=flat-square)](https://www.npmjs.com/package/@rpearce/image-zoom) [![bundlephobia size](https://flat.badgen.net/bundlephobia/minzip/@rpearce/image-zoom)](https://bundlephobia.com/result?p=@rpearce/image-zoom)

Accessible, progressive zooming for images.

As an added bonus, it should let you zoom _anything_, regardless of whether or
not it is inside parent elements with `overflow: hidden;` or [parents with
transform properties](https://codepen.io/rpearce/pen/MEyOmb).

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
```

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
  modalText?: string
  onZoomChange?: (isZoomed: boolean) => void
  openText?: string
  overlayBgColor?: string
  overlayOpacity?: number
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
* `modalText`
  * accessible modal dialog text when zoomed
  * default: `'Zoomed item'`
* `onZoomChange`
  * callback that is called with `true` when the zooming should be triggered
  * default: `undefined`
* `openText`
  * accessible text for zooming
  * default: `'Zoom image'`
* `overlayBgColor`
  * modal dialog overlay background color
  * default: `'#fff'`
* `overlayOpacity`
  * modal dialog overlay opacity
  * default: `0.95`
* `transitionDuration`
  * length of time in milliseconds for the zoom animation to run
  * default: `300`
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
var uncontrolledEls = document.querySelectorAll('[data-uncontrolled]');

for (var i = 0; i < uncontrolledEls.length; i++) {
  ImageZoom({}, uncontrolledEls[i])
}
```

### Controlled By Listening for `onZoomChange`

If you want to control the zoom state yourself and have `ImageZoom` guide you on
when it should be zooming or unzooming, you can do so like this:

```js
var controlledCbEl = document.querySelector('[data-controlled]');
var controlledCbIz = ImageZoom(
  {
    isControlled: true,
    onZoomChange: function onZoomChange(isZoomed) {
      controlledCbIz.update({ isZoomed: isZoomed });
    },
  },
  controlledCbEl
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
var controlledJkEl = document.querySelector('[data-jk]');
var controlledJkIz = ImageZoom(
  {
    isControlled: true,
    closeText: 'Press k to unzoom',
    openText: 'Press j to zoom',
  },
  controlledJkEl
);

document.addEventListener('keydown', function (e) {
  if (e.key === 'j' || e.keyCode === 74) {
    controlledJkIz.update({ isZoomed: true });
  } else if (e.key === 'k' || e.keyCode === 75) {
    controlledJkIz.update({ isZoomed: false });
  }
})
```

### Got Your Own Example?

Create a pull request and share it with the `image-zoom` world!
