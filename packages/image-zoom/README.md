# @rpearce/image-zoom

`<image-zoom>` is a custom element that zooms an image into a full-window modal,
in the style of medium.com. It has no dependencies and needs no framework. It
works from plain HTML and JavaScript, Vue, Svelte, and anything else that
renders HTML.

React users: [`react-medium-image-zoom`](../react-medium-image-zoom/README.md)
wraps this element in a `<Zoom>` component.

- [Install and usage](#install-and-usage)
- [Attributes and properties](#attributes-and-properties)
- [Events and controlled mode](#events-and-controlled-mode)
- [Slots, parts and state](#slots-parts-and-state)
- [Adding to the modal](#adding-to-the-modal)
- [Vue and Svelte](#vue-and-svelte)
- [Replacing the modal content](#replacing-the-modal-content)
- [Styling](#styling)
- [Browser support](#browser-support)
- [Limits](#limits)
- [React](#react)

## Install and usage

```bash
npm install @rpearce/image-zoom
```

With a bundler, import the module and the stylesheet once:

```js
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/styles.css'
```

Without one, load them from the package's `dist/` folder:

```html
<!-- bundlers: import '@rpearce/image-zoom' and '@rpearce/image-zoom/styles.css' -->
<link rel="stylesheet" href="…/@rpearce/image-zoom/dist/styles.css" />
<script type="module" src="…/@rpearce/image-zoom/dist/index.js"></script>

<image-zoom zoom-margin="20" zoom-src="large.jpg">
  <img src="small.jpg" alt="A lighthouse" />
</image-zoom>
```

Importing the module defines `<image-zoom>`. Importing it again does nothing.
The stylesheet styles the modal and the buttons, and gives the element its
`display`.

The element zooms the first `img`, `svg`, `[role="img"]` or `[data-zoom]` it
finds among its children and their descendants, skipping any with
`aria-hidden="true"`. So a plain `<img>`, a `<picture>`, an `<img>` inside a
`<figure>`, an `<svg>`, or a `<div>` with a `background-image` and
`role="img"` all work. Zooming becomes possible once that image has loaded.

A click on the image zooms it. Keyboard users get a zoom button that stays
visually hidden until it has focus. A click on the zoomed image, the modal
background or the unzoom button unzooms it, and so do Escape, scrolling and a
vertical swipe.

Without any event listeners, the element manages its own zoomed state. To
manage it yourself, see [controlled mode](#events-and-controlled-mode).

- **No bundler.** `dist/` holds unbundled ES modules with `.js` extensions on
  their imports, so it loads from a `<script type="module">` as shown, at the
  cost of about thirty small requests. A CDN that bundles packages on demand,
  such as esm.sh or jsDelivr's `/+esm` URLs, serves it as one file instead.
- **Load order.** Until the module has run, `el.state`, `el.dialog` and
  `el.modalContent` are `undefined`. Code that uses them imports the module
  first, or awaits `customElements.whenDefined('image-zoom')`, as the examples
  below do.

## Attributes and properties

Every property reads and writes its attribute. The attribute is the storage, so
server-rendered HTML and the live DOM always agree.

| Attribute                                                   | Property                                                | Default                          | What it does                                                                                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `zoomed`                                                    | `zoomed: boolean`                                       | `false`                          | Whether the image is zoomed. See [Zooming from code](#zooming-from-code).                                                           |
| `disabled`                                                  | `disabled: boolean`                                     | `false`                          | Ignores clicks, keys and gestures that would zoom or unzoom. Setting `zoomed` from code still works.                                |
| `zoom-margin`                                               | `zoomMargin: number`                                    | `0`                              | Space, in pixels, between the zoomed image and the edges of the window.                                                             |
| `label-zoom`                                                | `labelZoom: string`                                     | `"Expand image"`                 | Accessible name of the built-in zoom button. When the image has alt text (or an `aria-label`), the name is `"<label-zoom>: <alt>"`. |
| `label-unzoom`                                              | `labelUnzoom: string`                                   | `"Minimize image"`               | Accessible name of the built-in unzoom button.                                                                                      |
| `swipe`                                                     | `swipe: 'unzoom' \| 'none'`                             | `'unzoom'`                       | `none` turns swipe-to-unzoom off.                                                                                                   |
| `swipe-to-unzoom-threshold`                                 | `swipeToUnzoomThreshold: number`                        | `10`                             | How far, in pixels, a vertical swipe must travel before it unzooms.                                                                 |
| `dialog-class`                                              | `dialogClass: string`                                   | `""`                             | The `class` of the modal's `<dialog>`, for scoping your CSS.                                                                        |
| `zoom-src`, `zoom-srcset`, `zoom-sizes`, `zoom-crossorigin` | `zoomSrc`, `zoomSrcset`, `zoomSizes`, `zoomCrossOrigin` | `""` (`zoomCrossOrigin`: `null`) | A larger image for the zoomed view. It loads when a zoom starts and replaces the small one once it has loaded.                      |
| `inline`                                                    | `inline: boolean`                                       | `false`                          | Makes the element `display: inline` instead of `block`, for an image inside a paragraph, say.                                       |
| `custom-content`                                            | `customContent: boolean`                                | `false`                          | You render the modal's content yourself. See [Replacing the modal content](#replacing-the-modal-content).                           |

- **Booleans** (`zoomed`, `disabled`, `inline`, `custom-content`) are true when
  the attribute is present and not the literal string `"false"`. Vue and
  Svelte server rendering write `zoomed={false}` as `zoomed="false"`, which
  therefore reads as false. Setters accept `boolean | null | undefined`: `true`
  writes `""`, and a falsy value removes the attribute.
- **`swipe` is an enumerated attribute.** Only the value `"none"` turns
  swipe-to-unzoom off. Any other value, and no attribute at all, means
  `unzoom`. So a mistaken `swipe={false}`, which ends up as `"false"` or as no
  attribute, leaves swipe on. The getter returns `'unzoom' | 'none'`; the
  setter writes the given string, and `null` or `undefined` removes the
  attribute.
- **Strings.** An absent attribute reads as the default in the table. The
  exception is `zoomCrossOrigin`, which reads as
  `'anonymous' | 'use-credentials' | null`, like
  `HTMLImageElement.crossOrigin`. Setters accept `string | null | undefined`,
  and `null` or `undefined` removes the attribute.
- **Numbers** parse with `Number()`. A missing, empty or non-numeric value
  falls back to the default. `Infinity` is kept, so
  `swipe-to-unzoom-threshold="Infinity"` means no swipe is ever long enough.
- **`zoom-*`** attributes are read when a zoom starts, so set them before
  `zoomed`. Only the ones you set replace the source image's values: with only
  `zoom-src`, the zoomed image keeps the source's `srcset` and `sizes`.
- **`inline` and the default `display: block`** come from `styles.css`.
- **Templates use the attribute names.** In Vue, Svelte and other template
  languages, bind the kebab-case attribute names (`zoom-margin`, not
  `zoomMargin`). A camelCase binding such as `:zoomMargin="20"` made before the
  element is defined becomes a dead `zoommargin` attribute.
- **`custom-content`** is read each time the element is connected, and stays
  fixed until it is removed from the document. Changing it in between has no
  effect.
- **Properties set before the element is defined** (some frameworks do this)
  are applied when it upgrades.

### Zooming from code

Setting `zoomed`, as an attribute or a property, zooms or unzooms. Writing the
value it already has does nothing.

- **An initial `zoomed` is ignored.** If the attribute is present when the
  element is connected, the element doesn't zoom, and it doesn't remove the
  attribute either. `el.zoomed` reads `true` while the image is unzoomed, until
  the next write. The next request (a click, say) writes `zoomed` again and
  zooms. After an ignored initial `true`, writing `false` does nothing.
- **Removing the element unzooms it.** Its dialog, listeners and scroll lock go
  with it. Moving it (`append` or `insertBefore` to another place, or a
  framework's keyed reorder) keeps everything, including an open zoom. An
  element inserted again after a removal shows its image again, and the next
  click zooms.
- **Set `zoomed` only once `state.hasImage` is true.** Zooming before there is
  an image locks page scrolling, and unzooming may not unlock it. This is a
  known issue.

### Read-only properties

- **`state`** is a frozen snapshot of the element's state. It gets a new
  identity whenever any field changes:

  ```ts
  interface ImageZoomState {
    readonly hasImage: boolean // image found, loaded (or an SVG) and not display: none
    readonly isSvg: boolean
    readonly alt: string | undefined // the image's alt, or its aria-label
    readonly src: string | undefined // an <img>'s currentSrc, or a background-image URL
    readonly srcset: string | undefined // <img> sources only
    readonly sizes: string | undefined // <img> sources only
    readonly crossOrigin: 'anonymous' | 'use-credentials' | null | undefined // <img> sources only
    readonly modalState: 'UNLOADED' | 'LOADING' | 'LOADED' | 'UNLOADING'
    readonly isZoomImgLoaded: boolean
    readonly modalImgStyle: Readonly<ModalImgStyle> // the zoomed image's position and size
  }
  ```

  - `modalState` steps through `LOADING` (zooming in), `LOADED` (zoomed),
    `UNLOADING` (zooming out) and back to `UNLOADED`.
  - The source fields (`isSvg`, `alt`, `src`, `srcset`, `sizes`,
    `crossOrigin`) are filled in only while `hasImage` is true. Until then they
    are `undefined`, and `isSvg` is `false`.
  - `isZoomImgLoaded` turns true once the `zoom-src` image has loaded, and
    stays true.
  - `modalImgStyle` is the zoomed image's position and size (`top`, `left`,
    `width`, `height`, `transform`, `transitionDuration`). It changes whenever
    the geometry does, on a window resize for example.

- **`dialog`** is the modal's `<dialog>`. It is `null` while `hasImage` is
  false. The dialog lives at the end of `document.body`, not inside the
  element.
- **`modalContent`** is the element inside the dialog that holds the zoomed
  image and the unzoom button (see [Adding to the modal](#adding-to-the-modal)).
  It is created the first time it is read or needed, and keeps its identity for
  the element's lifetime. With `custom-content` it is `null`.

## Events and controlled mode

Both event names are lowercase with no dashes, so Svelte 5's `onzoomchange`
and React 19's custom-element events work.

- **`zoomchange`** is a `CustomEvent<{ zoomed: boolean; originalEvent: Event }>`
  that bubbles, is cancelable and is not composed.
  - It fires when the user asks to zoom or unzoom: a click on the image or the
    zoom button, Escape, scrolling, a swipe, the dialog's `close`, a click on a
    cloned SVG, and (with the built-in content) a click on the modal
    background, the zoomed image or the unzoom button.
  - Setting `zoomed` from code doesn't fire it directly. But every completed
    unzoom closes the dialog, and `close` counts as a request. So each unzoom,
    including one where code set `zoomed = false`, is followed by one more
    `zoomchange` with `zoomed: false`.
  - It never fires while `disabled`. A zoom request before the image is ready
    is dropped without an event.
  - If no listener cancels it, the element sets `zoomed` to `detail.zoomed`.
    Calling `preventDefault()` gives you controlled mode.
  - `originalEvent` is the event that caused the request. Calling
    `originalEvent.stopPropagation()` stops it as usual.
  - It bubbles, so a listener on an outer `<image-zoom>` also hears a nested
    one. Check `event.target === event.currentTarget`, as below.
- **`statechange`** is a plain `Event` that doesn't bubble.
  - It fires once at the end of anything that changes the element (an
    attribute change, a step of the zoom, the image loading or resizing) if
    `state` or `dialog` differs from what the last `statechange` reported.
  - The first one after each connect always fires, so a listener added before
    the element was defined learns the initial values.
  - Removing the element fires it once, with `hasImage: false` and
    `dialog: null`.
  - The dialog is created or removed before the `statechange` that reports the
    `hasImage` change.

Controlled mode in plain JavaScript:

```js
el.addEventListener('zoomchange', event => {
  if (event.target !== event.currentTarget) return // a nested <image-zoom>
  event.preventDefault()
  setZoomed(event.detail.zoomed) // your state, which then sets el.zoomed
})
```

If you remove a controlled element while it is zoomed and insert it again
later (Vue's `KeepAlive` does this), set your state to `false` when you remove
it. The element resets itself on removal; your state would still say zoomed,
and your next "zoom" would change nothing.

### TypeScript

The package exports `tagName` (`'image-zoom'`) and these types:
`ImageZoomElement`, `ImageZoomElementEventMap`, `ImageZoomState`, `ModalState`,
`ModalImgStyle` and `ZoomChangeEventDetail`. It adds `'image-zoom'` to
`HTMLElementTagNameMap`, so `document.querySelector('image-zoom')` returns an
`ImageZoomElement | null`, and `addEventListener('zoomchange', …)` on it types
the event.

## Slots, parts and state

- **Default slot:** the content, meaning the image and anything around it.
- **`icon-zoom` slot:** replaces the icon inside the built-in zoom button.
- **`zoom-button` slot:** replaces the whole zoom button. You own everything
  about your button, including its `aria-label`, because the element never
  writes to slotted nodes. A click on it requests a zoom.
- **`icon-unzoom` child:** a child with `slot="icon-unzoom"` becomes the icon
  of the built-in unzoom button. It isn't a real slot, because the dialog
  isn't inside the element. Each time a zoom starts, the element copies that
  child into the unzoom button; the child itself is never shown. The copy
  keeps any `id`, so the icon must not carry ids.
- **Before the element is defined,** children with a `slot` attribute would
  show in place. `styles.css` hides them until then.
- **Parts:** `::part(ghost)` is the box laid over the image that holds the
  zoom button, and `::part(btn-zoom)` is the built-in zoom button. The shadow
  root is open.
- **Custom state:** `:state(found)` matches while `state.hasImage` is true. It
  is set only in browsers that support it (see
  [Browser support](#browser-support)).

Replacing both icons:

```html
<image-zoom>
  <svg slot="icon-zoom" width="16" height="16" viewBox="0 0 16 16">
    <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" />
  </svg>
  <svg slot="icon-unzoom" width="16" height="16" viewBox="0 0 16 16">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" />
  </svg>
  <img src="small.jpg" alt="A lighthouse" />
</image-zoom>
```

Replacing the zoom button (`data-rmiz-btn-zoom` picks up the default button
styles from `styles.css`):

```html
<image-zoom>
  <button slot="zoom-button" data-rmiz-btn-zoom aria-label="Open the image">
    Open
  </button>
  <img src="small.jpg" alt="A lighthouse" />
</image-zoom>
```

## Adding to the modal

Add captions, loaders or links to the zoomed view by appending nodes to
`el.modalContent`. The element keeps the parts that are easy to get wrong: the
zoomed image and the swap to `zoom-src`, the unzoom button, click-to-unzoom,
focus, and the dialog's accessible name.

- **What's yours.** The element creates `modalContent`, the zoomed image (an
  `<img>`, or a `<div>` holding a copy of an SVG source) and the unzoom button,
  and keeps those two first, image then button. Everything else in
  `modalContent` is yours. The element never reads, removes or writes your
  nodes.
- **Append only.** Append your nodes; don't prepend them or insert them
  between the element's own nodes. If one of your nodes ends up ahead of
  them, the element moves its image and button back in front at its next
  update. Nothing watches `modalContent`, so that happens at the next update,
  not immediately. If it happens while the modal is open, the unzoom button
  loses focus. Don't remove or reorder the element's nodes either (with
  `replaceChildren()`, say): the modal lacks them until the next update puts
  them back.
- **Lifetime.** `modalContent` exists, detached, before there is a dialog, so
  you can add to it at any time. What you add stays when the dialog is
  recreated and when the element is removed and inserted again.
- **Clicks.** A click on the modal background, the zoomed image or the unzoom
  button unzooms. A click on your nodes doesn't. Your own close control sets
  `el.zoomed = false`, or updates your state in controlled mode.
- **Transitions.** Your nodes' transitions (a caption fading in, say) don't
  affect the zoom.
- **Focus.** Opening the modal focuses the unzoom button, because it is the
  first focusable node, even when your nodes contain links.
- **Limits.** Your nodes can't wrap or replace the zoomed image, so a caption
  is a sibling of the image, not a `<figcaption>` tied to it. Wrapping needs
  [`custom-content`](#replacing-the-modal-content).
- **Event bubbling.** Events from your nodes bubble through the dialog at the
  end of `document.body`, not through the element. A listener on an ancestor
  of `<image-zoom>` doesn't hear a click on your caption.

A caption that fades in below a wide image, or beside a tall one:

```html
<image-zoom id="tree">
  <img src="that-wanaka-tree.jpg" alt="That Wanaka Tree, New Zealand" />
</image-zoom>
<template id="tree-caption">
  <div class="zoom-caption">
    That Wanaka Tree, also known as the Wanaka Willow, …
  </div>
</template>

<script type="module">
  await customElements.whenDefined('image-zoom')

  const el = document.getElementById('tree')
  const caption = document
    .getElementById('tree-caption')
    .content.firstElementChild.cloneNode(true)
  el.modalContent.append(caption) // once

  function render() {
    const s = el.state
    const w = s.modalImgStyle.width
    const h = s.modalImgStyle.height
    const hasSize = w !== undefined && h !== undefined
    const wide = hasSize && w / h > innerWidth / innerHeight
    caption.classList.toggle('zoom-caption--loaded', s.modalState === 'LOADED')
    caption.classList.toggle('zoom-caption--bottom', hasSize && wide)
    caption.classList.toggle('zoom-caption--left', hasSize && !wide)
  }

  el.addEventListener('statechange', render)
  render()
</script>
```

```css
.zoom-caption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: 14px;
  padding: 17px 25px;
  opacity: 0.0001;
  transition: opacity 0.3s;
}
.zoom-caption--loaded {
  opacity: 1;
}
.zoom-caption--bottom {
  inset: auto 0 0 0;
}
.zoom-caption--left {
  max-width: 400px;
  top: 50%;
  transform: translateY(-50%);
}
```

## Vue and Svelte

There are no helper packages and nothing to install beyond the element. Both
frameworks use the pattern the example above uses: listen for `statechange`,
and read once on mount. The read matters because the element can be defined
and fire its first `statechange` before hydration attaches your listener.

These components add the caption from the example above to the modal.

```vue
<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from 'vue'
import type { ImageZoomElement, ImageZoomState } from '@rpearce/image-zoom'

const el = useTemplateRef<ImageZoomElement>('zoom')
const zoomState = shallowRef<ImageZoomState>()
const modalContent = shallowRef<HTMLElement | null>(null)

// Both stay empty until <image-zoom> is defined; its first statechange fills them in.
function sync(): void {
  zoomState.value = el.value?.state
  modalContent.value = el.value?.modalContent ?? null
}

onMounted(sync)
</script>

<template>
  <image-zoom ref="zoom" @statechange="sync">
    <img src="/that-wanaka-tree.jpg" alt="That Wanaka Tree, New Zealand" />
  </image-zoom>
  <Teleport v-if="modalContent" :to="modalContent">
    <div
      class="zoom-caption"
      :class="{ 'zoom-caption--loaded': zoomState?.modalState === 'LOADED' }"
    >
      That Wanaka Tree, …
    </div>
  </Teleport>
</template>
```

```svelte
<script lang="ts">
  import '@rpearce/image-zoom' // a no-op on the server
  import type { ImageZoomElement, ImageZoomState } from '@rpearce/image-zoom'

  let el = $state<ImageZoomElement>()
  let zoomState = $state.raw<ImageZoomState>()
  let modalContent = $state.raw<HTMLElement | null>(null)

  // Both stay empty until <image-zoom> is defined; its first statechange fills them in.
  function sync(): void {
    zoomState = el?.state
    modalContent = el?.modalContent ?? null
  }

  $effect(sync)
</script>

<image-zoom bind:this={el} onstatechange={sync}>
  <img src="/that-wanaka-tree.jpg" alt="That Wanaka Tree, New Zealand" />
</image-zoom>
{#if modalContent}
  <div
    class={['zoom-caption', { 'zoom-caption--loaded': zoomState?.modalState === 'LOADED' }]}
    {@attach (node) => {
      modalContent?.append(node)
      return () => node.remove()
    }}
  >
    That Wanaka Tree, …
  </div>
{/if}
```

**Controlled mode.** Bind `zoomed` to your state and cancel `zoomchange`. With
`import type { ZoomChangeEventDetail } from '@rpearce/image-zoom'` and a
boolean `z`:

- Vue:
  `:zoomed="z" @zoomchange="(e: CustomEvent<ZoomChangeEventDetail>) => { e.preventDefault(); z = e.detail.zoomed }"`
- Svelte:
  `zoomed={z} onzoomchange={(e: CustomEvent<ZoomChangeEventDetail>) => { e.preventDefault(); z = e.detail.zoomed }}`

The handlers are annotated because, under strict type checking, `vue-tsc` and
`svelte-check` report an inline `e => …` as an implicit `any`.

**Vue notes.**

- Tell Vue that `image-zoom` is a custom element, and import the element and
  its stylesheet on the client. With Vite:

  ```js
  // vite.config.js
  import vue from '@vitejs/plugin-vue'

  export default {
    plugins: [
      vue({
        template: {
          compilerOptions: { isCustomElement: tag => tag === 'image-zoom' },
        },
      }),
    ],
  }
  ```

  In Nuxt, set `vue.compilerOptions.isCustomElement` in `nuxt.config`, and
  import the element from a `.client` plugin.

- The `v-if` on `Teleport` is required. Without it, Vue throws once the target
  appears.
- `useTemplateRef` needs Vue 3.5. On older versions, use a `ref` whose name
  matches the template's `ref` attribute:

  ```ts
  import { onMounted, ref, shallowRef } from 'vue'

  const zoomEl = ref<ImageZoomElement | null>(null) // with <image-zoom ref="zoomEl" …>
  ```

  and read `zoomEl.value` where the example reads `el.value`.

- In the Vue 3.5 example, the variable (`el`) and the ref key (`'zoom'`) have
  different names on purpose. With the same name, Vue 3.5.0 logs a "target is
  readonly" warning.

**Svelte notes.**

- The `{@attach}` goes on the single root element of the `{#if}` block. A
  sibling without it is left behind when the block is removed.
- `{@attach}` needs Svelte 5.29, and the array form of `class` needs 5.16.
- Import `@rpearce/image-zoom/styles.css` once, in your root layout for
  example.

**Both.** `el.state` is typed `ImageZoomState`, but it is `undefined` until the
element is defined. Both components store it in a variable that allows
`undefined`.

## Replacing the modal content

This is for wrapper authors: content that has to wrap or replace the zoomed
image, such as a `<figure>` or a pan-and-zoom library. The `custom-content`
attribute turns it on, and `react-medium-image-zoom` is built on it.

1. The element creates only the dialog and its overlay, and exposes the dialog
   as `el.dialog`.
2. You render a `[data-rmiz-modal-content]` element into `el.dialog`, after
   the overlay. Inside it goes one `[data-rmiz-modal-img]`: an `<img>`, or an
   empty `<div>` when `state.isSvg` is true. Anything else (captions, buttons)
   can go alongside it.
3. **Who writes what on `[data-rmiz-modal-img]`:**
   - The element writes `width`, `height` and `id` (on an `<img>`), the copy of
     an SVG source (inside the `<div>`), and these style properties: `top`,
     `left`, `width`, `height`, `transform` and `transitionDuration`. It sets
     them one by one and removes the ones it no longer needs. It never
     replaces `style` as a whole, so other style properties you set survive.
   - You write `src`, `srcset`, `sizes`, `alt` and `crossorigin`, taken from
     `el.state`.
   - Once `state.isZoomImgLoaded` is true and `state.modalState` is
     `'LOADED'`, you swap in the larger image.
4. Zooming is unavailable until a `[data-rmiz-modal-content]` exists in the
   dialog, and the zoom button stays hidden until then. So a click before you
   have rendered can't open an empty dialog. The `[data-rmiz-modal-img]` may
   arrive later.
5. **Unzooming is your job.** The element doesn't listen for clicks on your
   content. A click on the content or the image, or on your own unzoom
   control, sets `el.zoomed = false`, or in controlled mode updates your
   state. (A copied SVG still unzooms on click by itself.)
6. **Render a labelled unzoom button.** `label-unzoom` doesn't apply in this
   mode. Without a button the dialog has nothing to focus. Give the `<img>` an
   `alt` too: the dialog's `aria-labelledby` points at the `id` the element
   writes on it.
7. **Render once right after adding your listener.** The first `statechange`
   can fire before your script adds its listener (an SVG source has an image
   as soon as the element is defined, for example).

```js
await customElements.whenDefined('image-zoom')
const el = document.querySelector('image-zoom[custom-content]')

function render() {
  const dialog = el.dialog
  if (dialog === null) return
  let content = dialog.querySelector('[data-rmiz-modal-content]')
  if (content === null) {
    content = document.createElement('div')
    content.setAttribute('data-rmiz-modal-content', '')
    content.innerHTML =
      '<figure><img data-rmiz-modal-img><figcaption>…</figcaption></figure>' +
      '<button type="button" data-rmiz-btn-unzoom aria-label="Minimize image">×</button>'
    content.addEventListener('click', e => {
      if (
        e.target === content ||
        e.target.matches('[data-rmiz-modal-img], [data-rmiz-btn-unzoom]')
      ) {
        el.zoomed = false
      }
    })
    dialog.append(content)
  }
  const img = content.querySelector('[data-rmiz-modal-img]')
  img.alt = el.state.alt ?? ''
  img.src = el.state.src ?? ''
}

el.addEventListener('statechange', render)
render()
```

The example uses `innerHTML` to stay short. On a page that requires Trusted
Types, build the same nodes with DOM calls.

## Styling

`styles.css` is a global stylesheet. Override its rules, or copy the file and
change it. These hooks are stable:

- **`data-rmiz-*` attributes** on the modal, which lives in light DOM at the
  end of `document.body`:
  - `[data-rmiz-portal]`: the container for every dialog
  - `[data-rmiz-modal]`: the `<dialog>`
  - `[data-rmiz-modal-overlay="hidden"]` and `[data-rmiz-modal-overlay="visible"]`:
    the background, before and during the zoom
  - `[data-rmiz-modal-content]`: `modalContent`
  - `[data-rmiz-modal-img]`: the zoomed image
  - `[data-rmiz-btn-unzoom]`: the unzoom button, and
    `[data-rmiz-btn-unzoom-icon]` its default icon
- **`image-zoom::part(ghost)`**: the box over the image that holds the zoom
  button. Its `position`, `pointer-events`, `box-sizing` and geometry are
  inline styles, so a rule can override them only with `!important`.
- **`image-zoom::part(btn-zoom)`**: the built-in zoom button. Page CSS can't
  reach it otherwise. A slotted `zoom-button` is yours to style; give it
  `data-rmiz-btn-zoom` to pick up the default button rules from `styles.css`.
- **`dialog-class`**: scopes rules to one element's modal, for example
  `.dark-zoom [data-rmiz-modal-overlay="visible"] { background-color: #000 }`
  with `dialog-class="dark-zoom"`.
- **`image-zoom:state(found)`**: the element while it has an image.
  `styles.css` uses it to give the image a `cursor: zoom-in`.

The rules for `image-zoom` itself (`display`, `inline`, `hidden`, hiding
slotted children before definition) have zero specificity, so any rule of
yours wins.

The zoom moves through its states on the zoomed image's `transitionend`. If you
change the image's `transition-duration`, keep it above zero; the
reduced-motion rule in `styles.css` uses `0.01ms`.

## Browser support

The element needs `<dialog>`, custom elements, shadow DOM and
`ResizeObserver`. The lowest versions, from compatibility data for the
features it uses, are Safari 15.4 (macOS and iOS), Firefox 98, and Chrome and
Edge 93. The code is compiled to ES2021; to support older syntax, run it
through your build. The automated tests run in Chromium.

Two features are used only where they exist:

| Feature                 | Missing in                                                | Effect where missing                                                                                               |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `:state(found)`         | Safari before 17.4, Firefox before 126, Chrome before 125 | The `:state(found)` rules don't match, so the image doesn't get `cursor: zoom-in`. Nothing else changes.           |
| Constructed stylesheets | Safari before 16.4                                        | The built-in zoom button's styles go in a `<style>` element in the shadow root, which a strict CSP blocks (below). |

**Content Security Policy.** The element builds its shadow tree with DOM calls
and writes styles through the CSSOM (`element.style`), never through HTML
strings or `setAttribute('style', …)`. It works under `style-src 'self'`
(without `'unsafe-inline'`) and `require-trusted-types-for 'script'`. Load
`styles.css` as a file, with a `<link>` or through your bundler. The one
exception is Safari 15.4 to 16.3: there, under a `style-src` without
`'unsafe-inline'`, the built-in zoom button is unstyled. A slotted
`zoom-button` styled from your own stylesheet is unaffected.

## Limits

- **Forwarded slots.** If another component renders
  `<image-zoom><slot></slot></image-zoom>` in its shadow root, the element
  finds the forwarded image, but it doesn't notice changes to the forwarded
  content, and a positioned element in the outer shadow tree offsets the zoom
  button's box.
- **Moving to another document**, such as an iframe, isn't supported. The
  browser treats it as a move, so the element keeps its dialog, scroll lock
  and listeners in the old document.
- **`disabled="false"` in Chrome.** Chrome reports the built-in zoom button as
  disabled whenever the element has a `disabled` attribute, whatever its
  value. So `disabled="false"` leaves a working button that screen readers
  announce as disabled. Remove the attribute instead of setting it to
  `"false"`.
- **Two installed copies.** If a page loads two copies of the package, the
  first one to run defines `<image-zoom>`, and the second does nothing.
- **The tag name is fixed.** If another library has already defined
  `image-zoom`, importing this package throws.

## React

For React, use [`react-medium-image-zoom`](../react-medium-image-zoom/README.md).
Its `<Zoom>` component renders this element and keeps the v5 props.
