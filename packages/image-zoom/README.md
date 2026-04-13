# @rpearce/image-zoom

[![npm version](https://img.shields.io/npm/v/@rpearce/image-zoom.svg)](https://www.npmjs.com/package/@rpearce/image-zoom)

Accessible [medium.com-inspired image zoom](https://medium.design/image-zoom-on-medium-24d146fc0c20)
as a framework-agnostic web component.

This is the standalone custom element that backs
[`react-medium-image-zoom`](https://www.npmjs.com/package/react-medium-image-zoom).
You can use it directly from vanilla HTML/JS, or from any framework that
supports custom elements — Vue, Svelte, Angular, Lit, Solid, Preact,
Astro, Qwik, etc.

## Features

- `<img />` including all [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
  values, any [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position),
  and [`loading="lazy"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
- `<div>` and `<span>` with any [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image),
  [`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size),
  and [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
- `<picture>` with `<source />` and `<img />`
- `<figure>` with `<img />`
- `<svg>`
- Custom modal content via `<slot name="modal">`
- Custom trigger button via `<slot name="trigger">`
- Zero dependencies
- Works inside any framework with custom element support
- Ships a [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
  (`custom-elements.json`) for IDE completions and framework integrations

## Requirements

- [`<dialog>` element](https://caniuse.com/dialog)
- [`ResizeObserver`](https://caniuse.com/mdn-api_resizeobserver)
- [Custom elements](https://caniuse.com/custom-elementsv1) and
  [shadow DOM](https://caniuse.com/shadowdomv1)
- Build target is `ES2022`

## Install

```bash
npm install @rpearce/image-zoom
```

## Quickstart — vanilla HTML/JS

```html
<!-- Load the custom element + the light-DOM stylesheet -->
<script type="module">
  import '@rpearce/image-zoom'
</script>
<link rel="stylesheet" href="https://unpkg.com/@rpearce/image-zoom/styles.css" />

<image-zoom>
  <img src="photo.jpg" alt="A photo" />
</image-zoom>
```

Or in a bundled app:

```javascript
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/styles.css'
```

```html
<image-zoom>
  <img src="photo.jpg" alt="A photo" />
</image-zoom>
```

## Framework usage

The custom element works inside any framework that lets you render an
element with a custom tag name. Most frameworks do, but they differ in
how they pass properties, listen for events, and manage children. Here
are the common patterns.

### Vue 3

Vue 3 forwards unknown DOM attributes to elements by default, so there's
nothing special to configure for most usage. If you're using the global
compiler, tell Vue that `image-zoom` is a custom element so it doesn't
emit a "Failed to resolve component" warning:

```javascript
// main.js — Vite
import { createApp } from 'vue'
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/styles.css'
import App from './App.vue'

const app = createApp(App)
app.config.compilerOptions.isCustomElement = tag => tag === 'image-zoom'
app.mount('#app')
```

Or in `vite.config.js`:

```javascript
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'image-zoom',
        },
      },
    }),
  ],
}
```

Then use it like any element:

```vue
<template>
  <image-zoom :zoomed="isZoomed" @image-zoom:zoom-change="onZoomChange">
    <img :src="photo" alt="A photo" />
  </image-zoom>
</template>

<script setup>
import { ref } from 'vue'
const isZoomed = ref(false)
const onZoomChange = (e) => {
  isZoomed.value = e.detail.zoomed
}
</script>
```

### Svelte

Svelte 4 and 5 support custom elements natively. For kebab-case events,
use `on:image-zoom:zoom-change` directly:

```svelte
<script>
  import '@rpearce/image-zoom'
  import '@rpearce/image-zoom/styles.css'

  let isZoomed = false

  function onZoomChange(e) {
    isZoomed = e.detail.zoomed
  }
</script>

<image-zoom
  zoomed={isZoomed || undefined}
  on:image-zoom:zoom-change={onZoomChange}
>
  <img src="photo.jpg" alt="A photo" />
</image-zoom>
```

### Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to the module (or component, in standalone
components) so Angular doesn't try to resolve `<image-zoom>` as an
Angular component:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@rpearce/image-zoom'
// In your global styles.css: @import '@rpearce/image-zoom/styles.css';

@Component({
  standalone: true,
  selector: 'app-photo',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <image-zoom>
      <img src="photo.jpg" alt="A photo" />
    </image-zoom>
  `,
})
export class PhotoComponent {}
```

Angular's event binding with colons needs brackets:

```html
<image-zoom (image-zoom:zoom-change)="onZoomChange($event)">
  <img src="photo.jpg" alt="A photo" />
</image-zoom>
```

### Lit

```javascript
import { html, LitElement } from 'lit'
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/styles.css'

class MyPhoto extends LitElement {
  render() {
    return html`
      <image-zoom @image-zoom:zoom-change=${this.#onZoomChange}>
        <img src="photo.jpg" alt="A photo" />
      </image-zoom>
    `
  }
  #onZoomChange = (e) => {
    // e.detail.zoomed
  }
}
customElements.define('my-photo', MyPhoto)
```

### SolidJS

```jsx
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/styles.css'

export function Photo() {
  return (
    <image-zoom on:image-zoom:zoom-change={(e) => console.log(e.detail)}>
      <img src="photo.jpg" alt="A photo" />
    </image-zoom>
  )
}
```

Solid's `on:`-prefix binding attaches via `addEventListener`, which is
the right fit for custom events.

### Astro

```astro
---
import '@rpearce/image-zoom/styles.css'
---

<image-zoom>
  <img src="/photo.jpg" alt="A photo" />
</image-zoom>

<script>
  import '@rpearce/image-zoom'
</script>
```

The inline `<script>` tag runs client-side and registers the custom
element after hydration.

### React

Use [`react-medium-image-zoom`](https://www.npmjs.com/package/react-medium-image-zoom),
which is a thin wrapper around this package and handles the React
lifecycle details (portal-based `IconUnzoom`, controlled mode, event
bridging) for you.

## API — attributes

All attributes are optional.

| Attribute                   | Type    | Default         | Description |
| --------------------------- | ------- | --------------- | ----------- |
| `zoomed`                    | boolean | `false`         | Controls whether the modal is open. Toggling dispatches `image-zoom:zoom-change`; handlers can `preventDefault()` to enter controlled mode. |
| `disabled`                  | boolean | `false`         | When set, clicks on the image are a no-op and bubble normally to parent handlers. |
| `zoom-margin`               | number  | `0`             | Pixel offset reserved around the zoomed image inside the viewport. |
| `zoom-src`                  | string  | —               | Optional higher-resolution image URL loaded lazily when the user zooms in. |
| `zoom-srcset`               | string  | —               | `srcset` for the zoom image. |
| `zoom-sizes`                | string  | —               | `sizes` for the zoom image. |
| `zoom-crossorigin`          | string  | —               | `crossorigin` for the zoom image. |
| `label-zoom`                | string  | `Expand image`  | Accessible label for the built-in zoom trigger button. Appended with the source image's `alt` when present. |
| `label-unzoom`              | string  | `Minimize image`| Accessible label for the modal's close button. |
| `can-swipe-to-unzoom`       | boolean | `true`          | Inverted: set `can-swipe-to-unzoom="false"` to disable the swipe-down-to-close gesture on touch devices. |
| `swipe-to-unzoom-threshold` | number  | `10`            | Pixel threshold for the swipe-to-close gesture. |

All attributes have matching IDL properties on the element (`el.zoomed`,
`el.zoomMargin`, etc.) so you can set them from JS without touching the
DOM attribute.

## API — slots

| Slot            | Description |
| --------------- | ----------- |
| _(default)_     | Your source image (or scalable element). Required. |
| `trigger`       | Optional override for the built-in zoom trigger button. Provide a focusable element (e.g. `<button slot="trigger">…</button>`). |
| `modal`         | Optional override for the modal content. Put `data-rmiz-modal-img` on the element that should receive the zoom transform. |
| `modal-button`  | Optional override for the modal's close button. |

Example — custom modal layout with a caption:

```html
<image-zoom>
  <img src="photo.jpg" alt="A photo" />
  <figure slot="modal">
    <img data-rmiz-modal-img src="photo.jpg" alt="A photo" />
    <figcaption>Photo by Jane Doe</figcaption>
  </figure>
</image-zoom>
```

## API — events

All events bubble and are composed (cross shadow DOM boundaries).

| Event                          | Detail                                            | Cancelable | Description |
| ------------------------------ | ------------------------------------------------- | ---------- | ----------- |
| `image-zoom:zoom-change`       | `{ zoomed: boolean }`                             | yes        | Fires when the user initiates a zoom or unzoom. Call `event.preventDefault()` to enter controlled mode and manage the `zoomed` attribute yourself. |
| `image-zoom:state-change`      | `{ state: ModalState, previous: ModalState }`     | no         | Fires on every transition of the internal modal state machine (`UNLOADED` → `LOADING` → `LOADED` → `UNLOADING` → `UNLOADED`). |
| `image-zoom:error`             | `{ src: string, type: 'load' }`                   | no         | Fires when the source image or optional zoom image fails to load. |
| `image-zoom:btn-unzoom-change` | `{ button: HTMLButtonElement }`                   | no         | Fires when the active unzoom button changes (e.g. because a consumer dynamically assigned `slot="modal-button"`). Framework wrappers caching the button reference should re-read it on this event. |

## API — CSS parts

The shadow-DOM elements are exposed via [CSS `::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
so consumers can style them from outside:

| Part              | Description |
| ----------------- | ----------- |
| `content`         | Wrapper around the default slot. |
| `ghost`           | Invisible overlay positioned over the source image that hosts the default trigger button. |
| `btn-zoom`        | The built-in (fallback) zoom trigger button. |
| `btn-zoom-icon`   | The icon inside the built-in zoom button. |
| `modal`           | The modal `<dialog>` element. |
| `modal-overlay`   | The opaque fade-in overlay inside the dialog. |
| `modal-content`   | The positioning wrapper inside the overlay. |
| `modal-img`       | The fallback modal image (shadow DOM). |
| `btn-unzoom`      | The fallback modal close button (shadow DOM). |
| `btn-unzoom-icon` | The icon inside the built-in unzoom button. |

```css
image-zoom::part(btn-unzoom):focus-visible {
  outline-offset: 0.4rem;
  outline: 0.2rem solid #bd93f9;
}
```

## API — CSS custom properties

| Property                    | Default                  | Description |
| --------------------------- | ------------------------ | ----------- |
| `--rmiz-btn-bg`             | `rgba(0, 0, 0, 0.7)`     | Background color of the built-in zoom trigger button. |
| `--rmiz-btn-color`          | `#fff`                   | Foreground color of the built-in zoom trigger button. |
| `--rmiz-btn-unzoom-bg`      | `rgba(0, 0, 0, 0.7)`     | Background color of the modal's unzoom button. |
| `--rmiz-btn-unzoom-color`   | `#fff`                   | Foreground color of the modal's unzoom button. |
| `--rmiz-overlay-bg`         | `rgba(255, 255, 255, 1)` | Fully-opaque modal overlay color. |
| `--rmiz-overlay-bg-hidden`  | `rgba(255, 255, 255, 0)` | Starting/ending modal overlay color used for fade-in/out. |
| `--rmiz-transition-duration`| `0.3s`                   | Duration of the overlay fade and image zoom transitions. |

```css
image-zoom {
  --rmiz-transition-duration: 0.4s;
  --rmiz-overlay-bg: rgb(56 58 89 / 100%);
  --rmiz-overlay-bg-hidden: rgb(56 58 89 / 0%);
}
```

## Controlled mode

By default, the element toggles its own `zoomed` attribute on click. To
take control — for example, to drive the zoom state from your framework —
listen for `image-zoom:zoom-change`, call `preventDefault()`, and set the
attribute yourself based on your own state:

```javascript
const el = document.querySelector('image-zoom')

el.addEventListener('image-zoom:zoom-change', (e) => {
  e.preventDefault()
  // your own state machine
  if (e.detail.zoomed) {
    openMyModal().then(() => {
      el.zoomed = true
    })
  } else {
    el.zoomed = false
  }
})
```

## Custom Elements Manifest

The package ships a
[Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
at `@rpearce/image-zoom/custom-elements.json`. IDE extensions and
framework tooling read this file for autocompletion, type info, and
validation:

- [VS Code custom-data](https://code.visualstudio.com/api/extension-guides/custom-data-extension)
- [Lit Analyzer / `ts-lit-plugin`](https://github.com/runem/ts-lit-plugin)
- [Vue language tools](https://github.com/vuejs/language-tools)
- [web-types](https://plugins.jetbrains.com/docs/intellij/websymbols-web-types.html)
  (WebStorm / JetBrains)

## License

BSD-3-Clause © Robert Pearce
