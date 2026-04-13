/* eslint-disable max-lines -- web component with full zoom lifecycle */
import type { StyleObject, SupportedImage } from './utils/types.js'
import { adjustSvgIDs } from './utils/adjust-svg-ids.js'
import {
  testDiv,
  testImg,
  testImgLoaded,
  testSvg,
} from './utils/element-tests.js'
import { getImgAlt } from './utils/get-img-alt.js'
import { getImgSrc } from './utils/get-img-src.js'
import { getStyleGhost } from './utils/get-style-ghost.js'
import { getStyleModalImg } from './utils/get-style-modal-img.js'

// =============================================================================

// Elements we'll treat as zoomable sources. Excludes anything marked
// aria-hidden since that signals the element shouldn't be in the a11y
// tree (and therefore shouldn't be zoomable either).
const IMAGE_QUERY =
  'img:not([aria-hidden="true"])' +
  ',svg:not([aria-hidden="true"])' +
  ',[role="img"]:not([aria-hidden="true"])' +
  ',[data-zoom]:not([aria-hidden="true"])'

type ModalState = 'LOADED' | 'LOADING' | 'UNLOADED' | 'UNLOADING'

interface BodyAttrs {
  readonly overflow: string
  readonly width: string
}

const DEFAULT_BODY_ATTRS: BodyAttrs = Object.freeze({ overflow: '', width: '' })

// Refcounted body scroll lock — multiple <image-zoom> instances can share
// the lock without clobbering each other's restore state.
let bodyScrollLockCount = 0
let bodyScrollLockPrevAttrs: BodyAttrs = DEFAULT_BODY_ATTRS

function lockBodyScroll(): void {
  if (bodyScrollLockCount === 0) {
    const bodyStyle = document.body.style
    bodyScrollLockPrevAttrs = {
      overflow: bodyStyle.overflow,
      width: bodyStyle.width,
    }
    // Read clientWidth BEFORE setting overflow:hidden — otherwise the
    // vertical scrollbar disappears, the body widens by the scrollbar's
    // width, and we'd lock body.style.width to that wider value, shifting
    // every page element horizontally just as the zoom begins.
    const widthBeforeLock = document.body.clientWidth
    bodyStyle.overflow = 'hidden'
    bodyStyle.width = `${widthBeforeLock}px`
  }
  bodyScrollLockCount += 1
}

function unlockBodyScroll(): void {
  if (bodyScrollLockCount === 0) return
  bodyScrollLockCount -= 1
  if (bodyScrollLockCount === 0) {
    const bodyStyle = document.body.style
    bodyStyle.width = bodyScrollLockPrevAttrs.width
    bodyStyle.overflow = bodyScrollLockPrevAttrs.overflow
    bodyScrollLockPrevAttrs = DEFAULT_BODY_ATTRS
  }
}

function queryRequired<T extends Element>(
  shadow: ShadowRoot,
  selector: string,
  kind: new (...args: never[]) => T,
): T {
  const el = shadow.querySelector(selector)
  if (!(el instanceof kind)) {
    throw new Error(
      `image-zoom: shadow DOM template is malformed (missing ${selector})`,
    )
  }
  return el
}

function setStylePx(
  style: CSSStyleDeclaration,
  prop: string,
  value: number | undefined,
): void {
  style.setProperty(prop, value == null ? '' : `${value}px`)
}

function applyStyles(el: HTMLElement, styles: StyleObject): void {
  const { style } = el
  setStylePx(style, 'height', styles.height)
  setStylePx(style, 'width', styles.width)
  setStylePx(style, 'left', styles.left)
  setStylePx(style, 'top', styles.top)
  style.transform = styles.transform ?? ''
  style.transitionDuration = styles.transitionDuration ?? ''
}

// SVG icons — minimal whitespace
const ICON_ZOOM =
  '<svg part=btn-zoom-icon aria-hidden=true fill=currentColor focusable=false viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 1v1h3.293L2 12.293V9H1v5h5v-1H2.707L13 2.707V6h1V1z"/></svg>'
const ICON_UNZOOM =
  '<svg part=btn-unzoom-icon aria-hidden=true fill=currentColor focusable=false viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.145 1.148 9 6.293V3H8v5h5V7H9.707l5.148-5.148zM8 8H3v1h3.293L1.148 14.145l.707.707L7 9.707V13h1z"/></svg>'

// Shadow DOM CSS — minified. The modal rules here match the fallback
// elements inside the shadow DOM. The same rules live in styles.css for
// consumer-slotted modal content (which lives in light DOM and is outside
// the shadow CSS scope).
// NOTE: host default is `display:block`, not `inline-block`. An
// inline-block host shrink-wraps its content, which means any child
// using a percentage width (e.g. `<div role="img" style="width:100%">`
// in a gallery cell) has no containing block to resolve against and
// collapses to zero. That matches v5's default `wrapElement="div"`
// which was a plain block div. Users placing the component in inline
// contexts (`<p>`, `<button>` text flow, etc.) can override with
// `image-zoom { display: inline-block; }` in their own CSS.
const SHADOW_CSS =
  ':host{position:relative;display:block}' +
  '[part=content]{display:contents}' +
  '::slotted(img),::slotted(svg),::slotted([role=img]),::slotted([data-zoom]){cursor:zoom-in}' +
  '[data-rmiz-ghost]{position:absolute;pointer-events:none}' +
  '[data-rmiz-btn-zoom]{background:var(--rmiz-btn-bg,rgba(0,0,0,.7));border-radius:50%;border:none;box-shadow:0 0 1px rgba(255,255,255,.5);color:var(--rmiz-btn-color,#fff);cursor:zoom-in;height:40px;margin:0;outline-offset:2px;padding:9px;position:absolute;inset:10px 10px auto auto;touch-action:manipulation;width:40px;appearance:none}' +
  '[data-rmiz-btn-zoom]:not(:focus):not(:active){position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;pointer-events:none;white-space:nowrap;width:1px}' +
  '[data-rmiz-modal]::backdrop{display:none}' +
  '[data-rmiz-modal][open]{position:fixed;width:100vw;width:100dvw;height:100vh;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;overflow:hidden;pointer-events:all}' +
  '[data-rmiz-modal-overlay]{position:absolute;inset:0;transition:background-color var(--rmiz-transition-duration,.3s)}' +
  '[data-rmiz-modal-overlay=hidden]{background-color:var(--rmiz-overlay-bg-hidden,rgba(255,255,255,0))}' +
  '[data-rmiz-modal-overlay=visible]{background-color:var(--rmiz-overlay-bg,rgba(255,255,255,1))}' +
  '[data-rmiz-modal-content]{position:relative;width:100%;height:100%}' +
  '[data-rmiz-modal-img]{position:absolute;cursor:zoom-out;image-rendering:high-quality;transform-origin:top left;transition:transform var(--rmiz-transition-duration,.3s)}' +
  '[data-rmiz-btn-unzoom]{background-color:var(--rmiz-btn-unzoom-bg,rgba(0,0,0,.7));border-radius:50%;border:none;box-shadow:0 0 1px rgba(255,255,255,.5);color:var(--rmiz-btn-unzoom-color,#fff);height:40px;margin:0;outline-offset:2px;padding:9px;touch-action:manipulation;width:40px;appearance:none;position:absolute;inset:20px 20px auto auto;cursor:zoom-out;z-index:1}' +
  '@media(prefers-reduced-motion:reduce){[data-rmiz-modal-overlay],[data-rmiz-modal-img]{transition-duration:.01ms!important}}'

// =============================================================================

/**
 * Accessible image zoom web component. Wraps an `<img>`, `<svg>`, or any
 * element carrying `role="img"` / `data-zoom` and opens a full-viewport
 * zoomed view on click or via the `zoomed` attribute.
 *
 * Non-`<img>` / non-`<svg>` elements (e.g. `<div data-zoom>`,
 * `<span role="img">`) must have a CSS `background-image` — that's
 * where the modal pulls its source from. A bare `<div data-zoom>` with
 * no background-image is silently non-zoomable because there's nothing
 * to render in the modal.
 *
 * @element image-zoom
 * @summary Accessible medium.com-style image zoom as a framework-agnostic web component.
 *
 * @attr {boolean} zoomed - Controls whether the modal is open. Toggling
 *   dispatches `image-zoom:zoom-change`; callers can `preventDefault` it
 *   to implement controlled mode.
 * @attr {boolean} disabled - When set, clicks on the image are a no-op and
 *   bubble normally to parent handlers.
 * @attr {number} zoom-margin - Pixel offset reserved around the zoomed
 *   image inside the viewport. Defaults to `0`.
 * @attr {string} zoom-src - Optional higher-resolution image URL loaded
 *   lazily when the user zooms in.
 * @attr {string} zoom-srcset - `srcset` for the zoom image (mirrors the
 *   `<img srcset>` attribute).
 * @attr {string} zoom-sizes - `sizes` for the zoom image.
 * @attr {string} zoom-crossorigin - `crossorigin` for the zoom image.
 * @attr {string} label-zoom - Accessible label for the built-in zoom
 *   trigger button. Appended with the source image's `alt` when present.
 *   Defaults to `"Expand image"`.
 * @attr {string} label-unzoom - Accessible label for the modal's close
 *   button. Defaults to `"Minimize image"`.
 * @attr {boolean} can-swipe-to-unzoom - When `false`, disables the
 *   swipe-down-to-close gesture on touch devices. Defaults to `true`.
 * @attr {number} swipe-to-unzoom-threshold - Pixel threshold for the
 *   swipe-to-close gesture. Defaults to `10`.
 *
 * @fires {CustomEvent<{ zoomed: boolean }>} image-zoom:zoom-change -
 *   Cancelable. Fires when the user initiates a zoom or unzoom. Call
 *   `event.preventDefault()` to enter controlled mode and manage the
 *   `zoomed` attribute yourself.
 * @fires {CustomEvent<{ src: string; type: 'load' }>} image-zoom:error -
 *   Fires when the source image or optional zoom image fails to load.
 * @fires {CustomEvent<{ state: ModalState; previous: ModalState }>} image-zoom:state-change -
 *   Fires on every transition of the internal modal state machine
 *   (`UNLOADED` → `LOADING` → `LOADED` → `UNLOADING` → `UNLOADED`).
 * @fires {CustomEvent<{ button: HTMLButtonElement }>} image-zoom:btn-unzoom-change -
 *   Fires when the active unzoom button changes (e.g. because a
 *   consumer dynamically assigned `slot="modal-button"`). Framework
 *   wrappers caching the `btnUnzoom` getter should re-read it on this
 *   event to keep portals targeted at the correct element.
 *
 * @slot - Default slot for the source image or scalable element.
 * @slot trigger - Optional override for the built-in zoom trigger button.
 *   Provide a focusable element (e.g. `<button slot="trigger">…</button>`)
 *   to replace the default. The fallback button stays for a11y when this
 *   slot is empty.
 * @slot modal - Optional override for the modal content (the part shown
 *   when the image is zoomed). The consumer's slotted content replaces
 *   the default `<img data-rmiz-modal-img>`. Put `[data-rmiz-modal-img]`
 *   on the element that should receive the zoom transform.
 * @slot modal-button - Optional override for the modal's close button.
 *
 * @csspart ghost - Invisible overlay positioned over the source image
 *   that hosts the default trigger button.
 * @csspart content - Wrapper around the default slot.
 * @csspart btn-zoom - The built-in (fallback) zoom trigger button.
 * @csspart btn-zoom-icon - The icon inside the built-in zoom button.
 * @csspart modal - The modal `<dialog>` element.
 * @csspart modal-overlay - The opaque fade-in overlay inside the dialog.
 * @csspart modal-content - The positioning wrapper inside the overlay.
 * @csspart modal-img - The fallback modal image (shadow DOM).
 * @csspart btn-unzoom - The fallback modal close button (shadow DOM).
 * @csspart btn-unzoom-icon - The icon inside the built-in unzoom button.
 *
 * @cssprop [--rmiz-btn-bg=rgba(0,0,0,0.7)] - Background color of the built-in zoom trigger button.
 * @cssprop [--rmiz-btn-color=#fff] - Foreground color of the built-in zoom trigger button.
 * @cssprop [--rmiz-btn-unzoom-bg=rgba(0,0,0,0.7)] - Background color of the modal's unzoom button.
 * @cssprop [--rmiz-btn-unzoom-color=#fff] - Foreground color of the modal's unzoom button.
 * @cssprop [--rmiz-overlay-bg=rgba(255,255,255,1)] - Fully-opaque modal overlay color.
 * @cssprop [--rmiz-overlay-bg-hidden=rgba(255,255,255,0)] - Starting/ending modal overlay color used for fade-in/out.
 * @cssprop [--rmiz-transition-duration=0.3s] - Duration of the overlay fade and image zoom transitions.
 */
export class ImageZoomElement extends HTMLElement {
  static readonly observedAttributes = [
    'zoomed',
    'disabled',
    'zoom-margin',
    'zoom-src',
    'zoom-srcset',
    'zoom-sizes',
    'zoom-crossorigin',
    'label-zoom',
    'label-unzoom',
    'can-swipe-to-unzoom',
    'swipe-to-unzoom-threshold',
  ]

  // State
  #modalState: ModalState = 'UNLOADED'
  #isZoomImgLoaded = false
  #shouldRefresh = false
  #hasLockedBody = false
  #isScaling = false
  #touchYStart?: number
  #timeout?: ReturnType<typeof setTimeout>
  #styleModalImg: StyleObject = {}
  // Captured source-image inline `visibility` value so we can restore
  // exactly what the author had set. Using a sentinel so `undefined`
  // (nothing captured) is distinguishable from `''` (author had no
  // inline visibility, which we should restore to).
  #prevImgVisibility: string | null = null
  // SVG clone cache — each #render call used to re-clone and re-adjust
  // the source SVG, which is O(elementCount) on every resize / content
  // observer tick. We cache the last clone and only rebuild when the
  // source reference changes or its attributes mutate. The dirty flag
  // is set by #setAndTrackImg on image swap, by #contentObs on any
  // relevant attribute mutation, and by #swapModalImgEl. #handleSvg
  // clears it on rebuild. #cachedSvgClone is the private ref to the
  // actual clone — don't read firstElementChild from the modal img
  // because consumer code may mutate the modal subtree.
  #svgCloneDirty = true
  #cachedSvgClone: SVGElement | null = null

  // DOM refs
  #imgEl: SupportedImage | null = null
  #loadedImgEl: HTMLImageElement | undefined = undefined
  #imgLoadGen = 0
  #zoomImgLoadGen = 0
  readonly #slot: HTMLSlotElement
  readonly #contentEl: HTMLDivElement
  readonly #ghostEl: HTMLDivElement
  readonly #btnZoomEl: HTMLButtonElement
  readonly #triggerSlot: HTMLSlotElement
  readonly #modalSlot: HTMLSlotElement
  readonly #modalButtonSlot: HTMLSlotElement
  // Currently active trigger — either the fallback #btnZoomEl or a
  // user-provided element slotted via `slot="trigger"`. We always wire the
  // click handler on whatever this points to and focus it on unzoom.
  #triggerEl: HTMLElement
  // The dialog and its content live inside the shadow DOM now (not in a
  // document-body portal). They're always present from construction time
  // and are reused across zooms. Native showModal() puts the dialog into
  // the browser's top layer, escaping any stacking context.
  readonly #dialogEl: HTMLDialogElement
  readonly #overlayEl: HTMLDivElement
  readonly #modalContentEl: HTMLDivElement
  // Currently active modal image — either a consumer-slotted element,
  // the shadow fallback <img>, or a <div> that replaced the fallback
  // during SVG handling. The zoom transform is applied to whichever
  // this points to.
  #modalImgEl: HTMLImageElement | HTMLDivElement
  // Currently active unzoom button — either a consumer-slotted button
  // or the shadow fallback.
  #btnUnzoomEl: HTMLButtonElement

  // Observers
  #contentObs: MutationObserver | null = null
  #notFoundObs: MutationObserver | null = null
  #resizeObs: ResizeObserver | null = null

  // ---------------------------------------------------------------------------
  // Attribute-backed properties
  // ---------------------------------------------------------------------------

  get zoomed(): boolean {
    return this.hasAttribute('zoomed')
  }
  set zoomed(v: boolean) {
    if (v) {
      this.setAttribute('zoomed', '')
    } else {
      this.removeAttribute('zoomed')
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }
  set disabled(v: boolean) {
    if (v) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  get zoomMargin(): number {
    // Accept only finite, non-negative values. NaN, -Infinity, -5,
    // '10px', and other garbage attribute values fall back to 0.
    // The setter already rejects bad values, but authors can still
    // write arbitrary attribute strings via HTML or setAttribute.
    const v = Number(this.getAttribute('zoom-margin'))
    return Number.isFinite(v) && v >= 0 ? v : 0
  }
  set zoomMargin(v: number) {
    if (Number.isFinite(v) && v >= 0) {
      this.setAttribute('zoom-margin', String(v))
    }
  }

  get zoomSrc(): string {
    return this.getAttribute('zoom-src') ?? ''
  }
  set zoomSrc(v: string) {
    if (v === '') this.removeAttribute('zoom-src')
    else this.setAttribute('zoom-src', v)
  }

  get zoomSrcset(): string {
    return this.getAttribute('zoom-srcset') ?? ''
  }
  set zoomSrcset(v: string) {
    if (v === '') this.removeAttribute('zoom-srcset')
    else this.setAttribute('zoom-srcset', v)
  }

  get zoomSizes(): string {
    return this.getAttribute('zoom-sizes') ?? ''
  }
  set zoomSizes(v: string) {
    if (v === '') this.removeAttribute('zoom-sizes')
    else this.setAttribute('zoom-sizes', v)
  }

  get zoomCrossorigin(): string {
    return this.getAttribute('zoom-crossorigin') ?? ''
  }
  set zoomCrossorigin(v: string) {
    if (v === '') this.removeAttribute('zoom-crossorigin')
    else this.setAttribute('zoom-crossorigin', v)
  }

  get labelZoom(): string {
    // Empty-string attribute falls back to the default. Otherwise
    // `label-zoom=""` would produce a button label of `": alt"`
    // (see #updateZoomLabel).
    const v = this.getAttribute('label-zoom')
    return v == null || v === '' ? 'Expand image' : v
  }
  set labelZoom(v: string) {
    this.setAttribute('label-zoom', v)
  }

  get labelUnzoom(): string {
    const v = this.getAttribute('label-unzoom')
    return v == null || v === '' ? 'Minimize image' : v
  }
  set labelUnzoom(v: string) {
    this.setAttribute('label-unzoom', v)
  }

  get canSwipeToUnzoom(): boolean {
    return this.getAttribute('can-swipe-to-unzoom') !== 'false'
  }
  set canSwipeToUnzoom(v: boolean) {
    if (v) this.removeAttribute('can-swipe-to-unzoom')
    else this.setAttribute('can-swipe-to-unzoom', 'false')
  }

  get swipeToUnzoomThreshold(): number {
    const v = Number(this.getAttribute('swipe-to-unzoom-threshold'))
    return Number.isFinite(v) && v >= 0 ? v : 10
  }
  set swipeToUnzoomThreshold(v: number) {
    if (Number.isFinite(v) && v >= 0) {
      this.setAttribute('swipe-to-unzoom-threshold', String(v))
    }
  }

  get modalState(): ModalState {
    return this.#modalState
  }
  get isZoomImgLoaded(): boolean {
    return this.#isZoomImgLoaded
  }

  // ---------------------------------------------------------------------------
  // Public methods
  // ---------------------------------------------------------------------------

  zoom(): void {
    this.#requestZoomChange(true)
  }
  unzoom(): void {
    this.#requestZoomChange(false)
  }

  get modalContentContainer(): HTMLDivElement {
    return this.#modalContentEl
  }

  /**
   * The active unzoom button inside the modal dialog. Exposed so
   * consumers can replace its icon/label or portal framework content
   * into it. Always available after construction — the dialog and its
   * default button live in the shadow DOM from construction time. If
   * the consumer provides a `slot="modal-button"` override, this returns
   * that slotted element instead of the shadow fallback.
   */
  get btnUnzoom(): HTMLButtonElement {
    return this.#btnUnzoomEl
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  constructor() {
    super()
    // Build shadow DOM in constructor so it exists before
    // attributeChangedCallback fires for attributes present at parse time.
    //
    // The <dialog> lives inside the shadow DOM, not in a document-body
    // portal. Native showModal() puts it into the browser's top layer,
    // which escapes every stacking context regardless of where the
    // dialog sits in the DOM — so we get portal semantics for free, with
    // none of the portal management overhead.
    const shadow = this.attachShadow({ mode: 'open' })
    // The aria-labels for the zoom/unzoom buttons are applied via
    // setAttribute below, NOT interpolated into this template string.
    // Interpolating user-controllable strings into innerHTML is an HTML
    // injection sink — a label containing `"` would break out of the
    // attribute and inject markup.
    shadow.innerHTML =
      `<style>${SHADOW_CSS}</style>` +
      '<div part=content data-rmiz-content><slot></slot></div>' +
      `<div part=ghost data-rmiz-ghost style=display:none><slot name=trigger><button part=btn-zoom data-rmiz-btn-zoom type=button>${ICON_ZOOM}</button></slot></div>` +
      '<dialog part=modal data-rmiz-modal role=dialog aria-modal=true>' +
      '<div part=modal-overlay data-rmiz-modal-overlay=hidden></div>' +
      '<div part=modal-content data-rmiz-modal-content>' +
      '<slot name=modal><img part=modal-img data-rmiz-modal-img alt=""></slot>' +
      `<slot name=modal-button><button part=btn-unzoom data-rmiz-btn-unzoom type=button>${ICON_UNZOOM}</button></slot>` +
      '</div>' +
      '</dialog>'

    const Q = queryRequired
    this.#slot = Q(shadow, 'slot:not([name])', HTMLSlotElement)
    this.#triggerSlot = Q(shadow, 'slot[name=trigger]', HTMLSlotElement)
    this.#modalSlot = Q(shadow, 'slot[name=modal]', HTMLSlotElement)
    this.#modalButtonSlot = Q(
      shadow,
      'slot[name=modal-button]',
      HTMLSlotElement,
    )
    this.#contentEl = Q(shadow, '[data-rmiz-content]', HTMLDivElement)
    this.#ghostEl = Q(shadow, '[data-rmiz-ghost]', HTMLDivElement)
    this.#btnZoomEl = Q(shadow, '[data-rmiz-btn-zoom]', HTMLButtonElement)
    this.#triggerEl = this.#btnZoomEl
    this.#dialogEl = Q(shadow, '[data-rmiz-modal]', HTMLDialogElement)
    this.#overlayEl = Q(shadow, '[data-rmiz-modal-overlay]', HTMLDivElement)
    this.#modalContentEl = Q(
      shadow,
      '[data-rmiz-modal-content]',
      HTMLDivElement,
    )
    // The fallback <img> and <button> live as children of their slots.
    // Slot fallback content lives at slot.children (the elements declared
    // inside the <slot> tag in the template).
    const initialModalImgEl = this.#modalSlot.children[0]
    const initialBtnUnzoomEl = this.#modalButtonSlot.children[0]
    if (!(initialModalImgEl instanceof HTMLImageElement)) {
      throw new Error('image-zoom: missing fallback modal img in template')
    }
    if (!(initialBtnUnzoomEl instanceof HTMLButtonElement)) {
      throw new Error('image-zoom: missing fallback unzoom button in template')
    }
    this.#modalImgEl = initialModalImgEl
    this.#btnUnzoomEl = initialBtnUnzoomEl

    // Apply the initial accessible labels via setAttribute (safe path —
    // never interpolated into innerHTML). attributeChangedCallback also
    // updates labelZoom dynamically via #updateZoomLabel, but that only
    // runs once the slotted image is known; this gives the buttons a
    // valid name pre-upgrade for any AT that snapshots eagerly.
    this.#btnZoomEl.setAttribute('aria-label', this.labelZoom)
    this.#btnUnzoomEl.setAttribute('aria-label', this.labelUnzoom)
  }

  connectedCallback(): void {
    // Canonical custom-element pre-upgrade handling. If a consumer set
    // `el.labelZoom = 'Foo'` before `customElements.define` registered
    // the element, that value lives as an instance property shadowing
    // our prototype getter/setter. Migrate it through the setter so
    // the attribute actually gets written and the observers can react.
    this.#upgradeProperty('zoomed')
    this.#upgradeProperty('disabled')
    this.#upgradeProperty('zoomMargin')
    this.#upgradeProperty('zoomSrc')
    this.#upgradeProperty('zoomSrcset')
    this.#upgradeProperty('zoomSizes')
    this.#upgradeProperty('zoomCrossorigin')
    this.#upgradeProperty('labelZoom')
    this.#upgradeProperty('labelUnzoom')
    this.#upgradeProperty('canSwipeToUnzoom')
    this.#upgradeProperty('swipeToUnzoomThreshold')

    this.#slot.addEventListener('slotchange', this.#onSlotChange)
    this.#triggerSlot.addEventListener('slotchange', this.#onTriggerSlotChange)
    this.#modalSlot.addEventListener('slotchange', this.#onModalSlotChange)
    this.#modalButtonSlot.addEventListener(
      'slotchange',
      this.#onModalButtonSlotChange,
    )
    // Attach to the *current* fallback refs first; the explicit slot
    // resolvers below will rewire to consumer-slotted elements if any
    // are assigned. We can't rely on slotchange firing on its own — if
    // the host disconnects and reconnects with the same slotted node
    // reference, the browser sees no change and never fires the event,
    // leaving the slotted element unwired.
    this.#triggerEl.addEventListener('click', this.#onTriggerClick)
    this.#btnUnzoomEl.addEventListener('click', this.#onBtnUnzoomClick)
    this.#modalImgEl.addEventListener('transitionend', this.#onTransitionEnd)
    this.#dialogEl.addEventListener('click', this.#onDialogClick)
    this.#dialogEl.addEventListener('close', this.#onDialogClose)
    this.#dialogEl.addEventListener('cancel', ImageZoomElement.#onDialogCancel)

    this.#onTriggerSlotChange()
    this.#onModalSlotChange()
    this.#onModalButtonSlotChange()

    // Re-apply the current labels to the fallback buttons — if the host
    // was upgraded AFTER a label-zoom attribute was set, the constructor
    // ran with the default, and attributeChangedCallback for label-zoom
    // only updates via #updateZoomLabel which needs an image. Do it
    // eagerly here so AT snapshots before the image loads see the
    // correct name.
    this.#btnZoomEl.setAttribute('aria-label', this.labelZoom)
    if (this.#btnUnzoomEl === this.#modalButtonSlot.children[0]) {
      this.#btnUnzoomEl.setAttribute('aria-label', this.labelUnzoom)
    }

    this.#setAndTrackImg()
  }

  #upgradeProperty(name: string): void {
    if (!Object.hasOwn(this, name)) return
    // Canonical custom-element upgradeProperty pattern: capture the
    // instance-shadowing value, delete it so the next assignment lands
    // on the prototype setter, then re-set. Reflect lets us do this
    // without narrowing `this` to a plain record.
    const value: unknown = Reflect.get(this, name)
    Reflect.deleteProperty(this, name)
    Reflect.set(this, name, value)
  }

  disconnectedCallback(): void {
    if (this.#modalState !== 'UNLOADED') this.#bodyScrollEnable()

    this.#contentObs?.disconnect()
    this.#notFoundObs?.disconnect()
    this.#resizeObs?.disconnect()
    this.#contentObs = null
    this.#notFoundObs = null
    this.#resizeObs = null

    this.#imgEl?.removeEventListener('load', this.#onImgLoad)
    this.#imgEl?.removeEventListener('click', this.#onImgClick)
    this.#slot.removeEventListener('slotchange', this.#onSlotChange)
    this.#triggerSlot.removeEventListener(
      'slotchange',
      this.#onTriggerSlotChange,
    )
    this.#modalSlot.removeEventListener('slotchange', this.#onModalSlotChange)
    this.#modalButtonSlot.removeEventListener(
      'slotchange',
      this.#onModalButtonSlotChange,
    )
    this.#triggerEl.removeEventListener('click', this.#onTriggerClick)
    this.#btnUnzoomEl.removeEventListener('click', this.#onBtnUnzoomClick)
    this.#modalImgEl.removeEventListener('transitionend', this.#onTransitionEnd)
    this.#dialogEl.removeEventListener('click', this.#onDialogClick)
    this.#dialogEl.removeEventListener('close', this.#onDialogClose)
    this.#dialogEl.removeEventListener(
      'cancel',
      ImageZoomElement.#onDialogCancel,
    )

    window.removeEventListener('wheel', this.#onWheel)
    window.removeEventListener('touchstart', this.#onTouchStart)
    window.removeEventListener('touchmove', this.#onTouchMove)
    window.removeEventListener('touchend', this.#onTouchEnd)
    window.removeEventListener('touchcancel', this.#onTouchEnd)
    window.removeEventListener('resize', this.#onResize)
    document.removeEventListener('keydown', this.#onKeyDown, true)

    clearTimeout(this.#timeout)
    // Make sure the dialog closes cleanly if we're being torn down while
    // open (release top layer, inert state). The dialog element itself
    // lives in shadow DOM so it goes away with the host.
    if (this.#dialogEl.open) this.#dialogEl.close()

    // Reset state so re-attaching the element works correctly. The dialog,
    // overlay, modal img/button references are all shadow DOM elements
    // that persist across disconnect/connect — no need to null them.
    // We re-resolve the current modal img and unzoom button from the
    // slots because #handleSvg may have swapped the fallback element.
    this.#modalState = 'UNLOADED'
    this.#isZoomImgLoaded = false
    this.#shouldRefresh = false
    this.#isScaling = false
    this.#touchYStart = undefined
    this.#svgCloneDirty = true
    this.#cachedSvgClone = null
    // Finding R2#5: if we're disconnected mid-zoom, the source image's
    // inline visibility was set to 'hidden' in #enterLoading and the
    // usual restore path (#enterUnloaded) didn't run. Restore it here
    // so re-attaching the host doesn't show an invisible image.
    if (this.#imgEl != null && this.#prevImgVisibility !== null) {
      this.#imgEl.style.visibility = this.#prevImgVisibility
    }
    this.#prevImgVisibility = null
    this.#imgEl = null
    this.#loadedImgEl = undefined
    this.#triggerEl = this.#btnZoomEl
    // Plain assignment — do NOT use #swapModalImgEl here. The
    // transitionend listener was already removed above (line 593)
    // and the next connectedCallback will re-attach it; routing
    // through the swap helper would double-attach.
    this.#modalImgEl = this.#resolveModalImg()
    this.#btnUnzoomEl = this.#resolveBtnUnzoom()
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue === newValue) return
    this.#handleAttributeChange(name, newValue)
  }

  #handleAttributeChange(name: string, newValue: string | null): void {
    switch (name) {
      case 'zoomed':
        if (newValue == null) this.#doUnzoom()
        else this.#doZoom()
        return
      case 'disabled':
        if (newValue != null) {
          if (this.#modalState !== 'UNLOADED') {
            // Already zoomed — close the modal normally.
            this.#doUnzoom()
          } else if (this.zoomed) {
            // Pending pre-image-load zoom. Without this, `zoomed`
            // stays set forever while #doZoom's deferred retry
            // silently bails on the disabled guard; later clearing
            // `disabled` wouldn't re-trigger. Drop the attribute so
            // the caller sees the dropped intent and can re-issue.
            this.removeAttribute('zoomed')
          }
        }
        return
      case 'label-zoom':
        this.#updateZoomLabel()
        return
      case 'label-unzoom':
        // Only update the fallback unzoom button's label. Consumer-slotted
        // buttons own their own accessible name. The fallback lives at
        // `#modalButtonSlot.children[0]` — if the active button is that
        // element, it's the fallback and we can safely update its label.
        if (this.#btnUnzoomEl === this.#modalButtonSlot.children[0]) {
          this.#btnUnzoomEl.setAttribute('aria-label', this.labelUnzoom)
        }
        return
      case 'zoom-src':
      case 'zoom-srcset':
      case 'zoom-sizes':
      case 'zoom-crossorigin':
        if (this.#modalState !== 'UNLOADED') {
          this.#isZoomImgLoaded = false
          this.#render()
        }
        return
      case 'zoom-margin':
        if (this.#modalState !== 'UNLOADED') this.#render()
    }
  }

  // ---------------------------------------------------------------------------
  // Image discovery
  // ---------------------------------------------------------------------------

  readonly #onSlotChange = (): void => {
    this.#setAndTrackImg()
  }

  readonly #setAndTrackImg = (): void => {
    // Clean up listeners from the previous image element
    const prev = this.#imgEl
    if (prev != null) {
      prev.removeEventListener('load', this.#onImgLoad)
      prev.removeEventListener('click', this.#onImgClick)
    }
    // Source swap invalidates the SVG clone cache.
    this.#svgCloneDirty = true
    this.#cachedSvgClone = null

    const found = this.#findSlottedImage()

    if (found == null) {
      this.#imgEl = null
      this.#notFoundObs?.disconnect()
      this.#notFoundObs = new MutationObserver(this.#setAndTrackImg)
      this.#notFoundObs.observe(this, { childList: true, subtree: true })
      this.#render()
      return
    }

    this.#imgEl = found
    this.#notFoundObs?.disconnect()
    this.#notFoundObs = null

    found.addEventListener('load', this.#onImgLoad)
    found.addEventListener('click', this.#onImgClick)

    if (this.#loadedImgEl == null) this.#onImgLoad()

    // Observe only the current image element. The callback doesn't
    // need to read entry.target — we already track the element via
    // #imgEl, and re-rendering on any size change is enough.
    this.#resizeObs?.disconnect()
    this.#resizeObs = new ResizeObserver(() => {
      this.#render()
    })
    this.#resizeObs.observe(found)

    // Observe the image element for the attributes that actually affect
    // the ghost layout / accessible label. Re-attach on each image swap
    // so the observer tracks the current element, not a stale one.
    // Watching subtree:true here would re-render on every descendant
    // attribute change in CMS-driven containers — wasteful and a
    // potential render storm. `width` / `height` / `style` changes
    // are intentionally NOT in this filter for raster sources; the
    // ResizeObserver above catches layout changes directly, so
    // observing the attributes would just cause a double render.
    //
    // SVG sources need a WIDER net. Any attribute mutation on the
    // source SVG — viewBox, fill, stroke, inline style, presentation
    // attributes, etc. — must invalidate the SVG clone cache,
    // otherwise the cached clone renders a visually stale copy. For
    // SVG we observe all attributes (still no subtree — we don't
    // walk every descendant, we just rebuild on the next render).
    this.#contentObs?.disconnect()
    this.#contentObs = new MutationObserver(() => {
      // An observed attribute mutation on the source image means any
      // cached SVG clone is stale; force a rebuild on the next render.
      this.#svgCloneDirty = true
      this.#render()
    })
    const observerOptions: MutationObserverInit = testSvg(found)
      ? { attributes: true }
      : {
          attributes: true,
          attributeFilter: ['alt', 'src', 'srcset', 'sizes', 'class'],
        }
    this.#contentObs.observe(found, observerOptions)

    this.#render()
  }

  #findSlottedImage(): SupportedImage | null {
    for (const el of this.#slot.assignedElements({ flatten: true })) {
      if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) continue
      if (el.matches(IMAGE_QUERY)) return el as SupportedImage
      const nested = el.querySelector(IMAGE_QUERY)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- matched IMAGE_QUERY
      if (nested != null) return nested as SupportedImage
    }
    return null
  }

  readonly #onImgLoad = (): void => {
    const el = this.#imgEl
    const src = getImgSrc(el)
    if (src == null || src === '') return

    this.#imgLoadGen += 1
    const gen = this.#imgLoadGen

    const img = new Image()
    if (testImg(el)) {
      img.sizes = el.sizes
      img.srcset = el.srcset
      img.crossOrigin = el.crossOrigin
    }

    const done = (): void => {
      // Ignore stale resolutions from a previous image
      if (gen !== this.#imgLoadGen) return
      this.#loadedImgEl = img
      this.#render()
      // If the user pre-set `zoomed` before the image was ready,
      // #doZoom early-returned. Now that the image is loaded, honor
      // the original intent.
      if (this.zoomed && this.#modalState === 'UNLOADED') {
        this.#doZoom()
      }
    }

    const fail = (): void => {
      if (gen !== this.#imgLoadGen) return
      this.dispatchEvent(
        new CustomEvent('image-zoom:error', {
          detail: { src, type: 'load' },
          bubbles: true,
          composed: true,
        }),
      )
    }

    // Wire handlers BEFORE setting src so a synchronous cache hit or
    // an early error reaches them.
    img.onerror = fail
    img.src = src
    img
      .decode()
      .then(done)
      .catch(() => {
        if (testImgLoaded(img)) {
          done()
          return
        }
        img.onload = done
      })
  }

  // ---------------------------------------------------------------------------
  // Zoom / unzoom
  // ---------------------------------------------------------------------------

  #requestZoomChange(zoomed: boolean): void {
    if (this.disabled) return
    if (zoomed && !this.#hasImage()) return

    const event = new CustomEvent('image-zoom:zoom-change', {
      detail: { zoomed },
      bubbles: true,
      composed: true,
      cancelable: true,
    })
    this.dispatchEvent(event)
    if (!event.defaultPrevented) this.zoomed = zoomed
  }

  readonly #onImgClick = (e: Event): void => {
    // Only intercept the click when the zoom would actually fire. When the
    // wrapper is disabled or has no usable image, we behave as if it isn't
    // there and let the click bubble to ancestor handlers (e.g. a card's
    // selection handler). When we DO act, the click is "consumed" by the
    // zoom and must not also trigger surrounding handlers.
    if (this.disabled || !this.#hasImage()) return
    e.stopPropagation()
    this.#requestZoomChange(true)
  }
  readonly #onTriggerClick = (): void => {
    this.#requestZoomChange(true)
  }
  readonly #onSvgUnzoomClick = (): void => {
    this.#requestZoomChange(false)
  }

  readonly #onTriggerSlotChange = (): void => {
    const [assigned] = this.#triggerSlot.assignedElements({ flatten: true })
    const next: HTMLElement =
      assigned instanceof HTMLElement ? assigned : this.#btnZoomEl
    const prev = this.#triggerEl
    if (prev === next) return
    prev.removeEventListener('click', this.#onTriggerClick)
    next.addEventListener('click', this.#onTriggerClick)
    this.#triggerEl = next
    this.#updateZoomLabel()
  }

  /**
   * Resolve the currently-active modal image element. Consumer-provided
   * slotted content takes priority: we look for `[data-rmiz-modal-img]`
   * on the slotted element itself or inside it (to support wrapping
   * layouts like `<figure><img data-rmiz-modal-img>...</figure>`). If
   * no slotted content is present, we fall back to the slot's default
   * content, which is whatever currently lives as `#modalSlot.children[0]`
   * (initially an `<img>`, possibly a `<div>` after SVG handling).
   */
  #resolveModalImg(): HTMLImageElement | HTMLDivElement {
    for (const el of this.#modalSlot.assignedElements({ flatten: true })) {
      if (el instanceof HTMLElement) {
        if (
          el.matches('[data-rmiz-modal-img]') &&
          (el instanceof HTMLImageElement || el instanceof HTMLDivElement)
        ) {
          return el
        }
        const nested = el.querySelector<HTMLImageElement | HTMLDivElement>(
          '[data-rmiz-modal-img]',
        )
        if (nested != null) return nested
      }
    }
    const fallback = this.#modalSlot.children[0]
    if (
      fallback instanceof HTMLImageElement ||
      fallback instanceof HTMLDivElement
    ) {
      return fallback
    }
    throw new Error('image-zoom: modal slot fallback is missing')
  }

  /** Resolve the currently-active unzoom button. */
  #resolveBtnUnzoom(): HTMLButtonElement {
    for (const el of this.#modalButtonSlot.assignedElements({
      flatten: true,
    })) {
      if (el instanceof HTMLButtonElement) return el
    }
    const fallback = this.#modalButtonSlot.children[0]
    if (fallback instanceof HTMLButtonElement) return fallback
    throw new Error('image-zoom: modal-button slot fallback is missing')
  }

  readonly #onModalSlotChange = (): void => {
    const next = this.#resolveModalImg()
    const prev = this.#modalImgEl
    if (prev === next) return
    prev.removeEventListener('transitionend', this.#onTransitionEnd)
    next.addEventListener('transitionend', this.#onTransitionEnd)
    this.#modalImgEl = next
    // The SVG clone cache pointed at the OLD modal element. Any
    // fast-path render after this swap would write width/height
    // onto a detached clone and leave the new modal empty.
    this.#svgCloneDirty = true
    this.#cachedSvgClone = null
    // Re-render so the new modal img picks up the current zoom styles
    if (this.#modalState !== 'UNLOADED') this.#render()
  }

  readonly #onModalButtonSlotChange = (): void => {
    const next = this.#resolveBtnUnzoom()
    const prev = this.#btnUnzoomEl
    if (prev === next) return
    prev.removeEventListener('click', this.#onBtnUnzoomClick)
    next.addEventListener('click', this.#onBtnUnzoomClick)
    this.#btnUnzoomEl = next
    // React wrappers (and other portal-based consumers) cache the
    // unzoom button element from the `btnUnzoom` getter so they can
    // render framework content into it. Tell them the element they
    // cached is stale so they can re-target.
    this.dispatchEvent(
      new CustomEvent('image-zoom:btn-unzoom-change', {
        detail: { button: next },
        bubbles: true,
        composed: true,
      }),
    )
  }

  #doZoom(): void {
    if (this.#modalState !== 'UNLOADED') return
    // #requestZoomChange already checks `disabled` before it dispatches
    // the zoom-change event, but two paths reach #doZoom directly and
    // bypass that guard: attributeChangedCallback('zoomed') and the
    // deferred retry in #onImgLoad.done. Gate both here.
    if (this.disabled) return
    // Guard against opening an empty modal. The attribute path
    // (`el.zoomed = true`, `<image-zoom zoomed>` in initial HTML) lands
    // here without going through #requestZoomChange, so this is the
    // only place the no-image case is caught for that path. We leave
    // the `zoomed` attribute alone and rely on `#onImgLoad`'s done
    // callback to retry once the image is actually ready, so callers
    // can pre-set `zoomed` before the image arrives.
    if (!this.#hasImage()) return
    this.#bodyScrollDisable()
    this.#dialogEl.showModal()
    // The dialog was `display:none` until the line above. The previous
    // (UNLOADED-state) render wrote the source image's initial position
    // and an un-zoomed transform to #modalImgEl, but those styles never
    // got computed because the element wasn't laid out. Force a layout
    // read NOW so the browser captures that un-zoomed state as the
    // CSS transition's "before" frame. The next render (after
    // setModalState) writes the zoomed transform; the browser then sees
    // an actual change and animates. Without this read, both writes
    // collapse into the same task and the open animation is skipped.
    this.#dialogEl.getBoundingClientRect()
    this.#setModalState('LOADING')
  }

  #doUnzoom(): void {
    // Intentionally accepts `LOADING` as a valid starting state, not
    // just `LOADED`: a user clicking to zoom then immediately clicking
    // to unzoom mid-open should interrupt the open animation and
    // reverse into UNLOADING, not wait for the open transition to
    // complete. `UNLOADED` and `UNLOADING` are the only states from
    // which we can't usefully transition to UNLOADING.
    if (this.#modalState === 'UNLOADED' || this.#modalState === 'UNLOADING')
      return
    this.#setModalState('UNLOADING')
  }

  // ---------------------------------------------------------------------------
  // State machine
  // ---------------------------------------------------------------------------

  #setModalState(next: ModalState): void {
    const prev = this.#modalState
    if (prev === next) return
    this.#modalState = next

    if (prev !== 'LOADING' && next === 'LOADING') this.#enterLoading()
    else if (prev !== 'LOADED' && next === 'LOADED') this.#enterLoaded()
    else if (prev !== 'UNLOADING' && next === 'UNLOADING')
      this.#enterUnloading()
    else if (prev !== 'UNLOADED' && next === 'UNLOADED') this.#enterUnloaded()

    this.dispatchEvent(
      new CustomEvent('image-zoom:state-change', {
        detail: { state: next, previous: prev },
        bubbles: true,
        composed: true,
      }),
    )
    this.#render()
  }

  #enterLoading(): void {
    // Hide the source image while the modal is active. The modal image sits
    // at the same viewport position, so the user's view is uninterrupted —
    // but leaving the source visible would show through the overlay at the
    // edges and cause a layout shift on unzoom. Capture the previous
    // inline visibility first so we can restore it exactly on unzoom
    // instead of clobbering an author's inline value.
    if (this.#imgEl != null) {
      this.#prevImgVisibility = this.#imgEl.style.visibility
      this.#imgEl.style.visibility = 'hidden'
    }
    this.#loadZoomImg()
    // Belt-and-suspenders: if `transitionend` never fires on the open
    // transition (e.g. browser misses the event under a heavy load, or a
    // stylesheet writes a duration of 0 for the transform but non-zero
    // for another property that matches our filter), fall back to a
    // timer so we still advance to LOADED and the wheel-to-close /
    // swipe-to-close listeners get activated.
    this.#ensureTransitionEnd()
    window.addEventListener('resize', this.#onResize, { passive: true })
    window.addEventListener('touchstart', this.#onTouchStart, { passive: true })
    window.addEventListener('touchmove', this.#onTouchMove, { passive: true })
    window.addEventListener('touchend', this.#onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', this.#onTouchEnd, { passive: true })
    document.addEventListener('keydown', this.#onKeyDown, true)
  }

  #enterLoaded(): void {
    window.addEventListener('wheel', this.#onWheel, { passive: true })
  }

  #enterUnloading(): void {
    this.#ensureTransitionEnd()
    window.removeEventListener('wheel', this.#onWheel)
    window.removeEventListener('touchstart', this.#onTouchStart)
    window.removeEventListener('touchmove', this.#onTouchMove)
    window.removeEventListener('touchend', this.#onTouchEnd)
    window.removeEventListener('touchcancel', this.#onTouchEnd)
    document.removeEventListener('keydown', this.#onKeyDown, true)
  }

  #enterUnloaded(): void {
    this.#bodyScrollEnable()
    // Restore visibility on the source image. Do this after the unzoom
    // transition has completed so the modal image is visually at the same
    // position as the source when we swap them. Only restore when we
    // actually captured a pre-zoom value — if #prevImgVisibility is
    // null we never entered LOADING (or a previous disconnect already
    // restored it), so leave the current inline style alone. Same
    // semantics as disconnectedCallback's restore path.
    if (this.#imgEl != null && this.#prevImgVisibility !== null) {
      this.#imgEl.style.visibility = this.#prevImgVisibility
    }
    this.#prevImgVisibility = null
    window.removeEventListener('resize', this.#onResize)
    // Invariant: exactly ONE `transitionend` listener stays on the
    // current #modalImgEl at all times while connected. It's attached
    // in connectedCallback, transferred by #swapModalImgEl and
    // #onModalSlotChange on element swaps, and only removed in
    // disconnectedCallback. Do NOT remove it here — without it, the
    // second zoom cycle falls back to the ~50ms timer path and
    // state transitions visibly lag the animation.
    if (this.#dialogEl.open) this.#dialogEl.close()
    this.#shouldRefresh = false
    // Restore focus to whichever trigger is currently active — either the
    // built-in fallback button or the consumer's slotted element. Native
    // <dialog> only auto-restores focus if focus was inside the dialog when
    // it opened from JS, which isn't always the case here.
    this.#triggerEl.focus({ preventScroll: true })
  }

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  readonly #onKeyDown = (e: Event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- event type is guaranteed by addEventListener
    if ((e as KeyboardEvent).key !== 'Escape') return
    // Only intercept Escape if we're actually going to act on it.
    // This avoids swallowing Escape from parent modals when disabled.
    if (this.disabled || this.#modalState === 'UNLOADED') return
    e.preventDefault()
    e.stopPropagation()
    this.#requestZoomChange(false)
  }

  readonly #onWheel = (e: Event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- event type is guaranteed by addEventListener
    const we = e as WheelEvent
    // ctrl+wheel is the browser pinch-zoom gesture — never treat it as
    // an unzoom intent.
    if (we.ctrlKey) return
    // Only dismiss on a predominantly vertical wheel. Horizontal
    // trackpad pans / two-finger side-swipes have |deltaX| >= |deltaY|
    // and must not close the modal. Zero-delta events (some trackpads
    // emit them at rest) are also rejected because `0 <= 0` is true.
    if (Math.abs(we.deltaY) <= Math.abs(we.deltaX)) return
    // Defer the dispatch so any other passive wheel listeners on
    // window (scroll-lock shims, analytics, etc.) finish processing
    // the event before our synthetic `image-zoom:zoom-change` fires.
    // Without this, a listener ordering change could swallow our
    // custom event.
    queueMicrotask(() => {
      this.#requestZoomChange(false)
    })
  }

  readonly #onTouchStart = (e: Event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- event type is guaranteed by addEventListener
    const te = e as TouchEvent
    if (te.touches.length > 1) {
      this.#isScaling = true
      // A single-touch swipe may have been in progress when the
      // second finger landed. Drop the stale Y baseline so that
      // lifting one finger from a pinch doesn't leave us comparing
      // the next single-touch move against a pre-pinch position.
      this.#touchYStart = undefined
      return
    }
    const [t] = te.changedTouches
    if (te.changedTouches.length === 1 && t !== undefined)
      this.#touchYStart = t.screenY
  }

  readonly #onTouchMove = (e: Event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- event type is guaranteed by addEventListener
    const te = e as TouchEvent
    const scale = window.visualViewport?.scale ?? 1
    const [t] = te.changedTouches

    if (
      this.canSwipeToUnzoom &&
      !this.#isScaling &&
      scale <= 1 &&
      this.#touchYStart != null &&
      t !== undefined
    ) {
      // Signed downward delta — swipe-to-unzoom is documented as
      // "swipe DOWN to dismiss". An upward swipe (e.g. the user
      // re-centering a tall image) must not trigger unzoom.
      const delta = t.screenY - this.#touchYStart
      if (delta > this.swipeToUnzoomThreshold) {
        this.#touchYStart = undefined
        this.#requestZoomChange(false)
      }
    }
  }

  readonly #onTouchEnd = (): void => {
    this.#isScaling = false
    this.#touchYStart = undefined
  }

  readonly #onResize = (): void => {
    this.#shouldRefresh = true
    this.#render()
  }

  readonly #onDialogClick = (e: Event): void => {
    // Clicking the modal content area (or the image, or any consumer-
    // slotted child of the modal-content div) closes the dialog. Clicks
    // on the bare overlay margin do NOT close — intentional design.
    // The unzoom button stops propagation in #onBtnUnzoomClick so it
    // never reaches this handler.
    //
    // Identity-comparing `e.target` against the modal-img reference
    // would break for consumer-slotted content: events from light-DOM
    // slotted nodes are retargeted at the slot when caught from inside
    // the shadow tree, so `e.target` would be the slot's host or the
    // wrapping element, never the actual `[data-rmiz-modal-img]`.
    // composedPath() gives us the full traversal across slot boundaries
    // BEFORE retargeting, so we just check whether modal-content sits
    // anywhere in the bubble path between target and dialog.
    const path = e.composedPath()
    const dialogIdx = path.indexOf(this.#dialogEl)
    const inner = dialogIdx === -1 ? path : path.slice(0, dialogIdx)
    if (!inner.includes(this.#modalContentEl)) return
    e.stopPropagation()
    this.#requestZoomChange(false)
  }

  readonly #onDialogClose = (e: Event): void => {
    e.stopPropagation()
    // The dialog's `close` event fires both from user actions and from
    // our own `dialog.close()` call in #enterUnloaded. Skip the redundant
    // zoom-change dispatch when we're already unloaded.
    if (this.#modalState === 'UNLOADED') return
    this.#requestZoomChange(false)
  }

  static readonly #onDialogCancel = (e: Event): void => {
    e.preventDefault()
  }

  readonly #onBtnUnzoomClick = (e: Event): void => {
    e.preventDefault()
    e.stopPropagation()
    this.#requestZoomChange(false)
  }

  // ---------------------------------------------------------------------------
  // Transition end
  // ---------------------------------------------------------------------------

  readonly #onTransitionEnd = (e?: Event): void => {
    // Only respond to the transform transition, not width/height/opacity.
    // The fallback timer passes no event arg and bypasses this filter.
    // Plain Event instances (tests dispatch `new Event('transitionend')`)
    // have no propertyName so they also bypass — that's intentional.
    if (e != null && 'propertyName' in e && e.propertyName !== 'transform') {
      return
    }
    clearTimeout(this.#timeout)
    if (this.#modalState === 'LOADING') this.#setModalState('LOADED')
    else if (this.#modalState === 'UNLOADING') this.#setModalState('UNLOADED')
  }

  #ensureTransitionEnd(): void {
    // Drop any previously scheduled fallback timer. LOADING→UNLOADING
    // rapid toggles would otherwise leave the older timer live; it'd
    // fire harmlessly (state guards reject stale runs) but the extra
    // microtask is wasted work and makes the timer-id semantics
    // undefined.
    clearTimeout(this.#timeout)
    const el = this.#modalImgEl
    // transitionDuration may be a comma-separated list (one per property).
    // Use the largest value so we don't fire the fallback too early.
    const ms = window
      .getComputedStyle(el)
      .transitionDuration.split(',')
      .map(v => {
        const trimmed = v.trim()
        const n = Number.parseFloat(trimmed)
        if (Number.isNaN(n)) return 0
        return trimmed.endsWith('ms') ? n : n * 1000
      })
      .reduce((max, n) => (n > max ? n : max), 0)

    if (ms > 0) {
      this.#timeout = setTimeout(this.#onTransitionEnd, ms + 50)
    }
  }

  // ---------------------------------------------------------------------------
  // Body scroll
  // ---------------------------------------------------------------------------

  #bodyScrollDisable(): void {
    if (this.#hasLockedBody) return
    this.#hasLockedBody = true
    lockBodyScroll()
  }

  #bodyScrollEnable(): void {
    if (!this.#hasLockedBody) return
    this.#hasLockedBody = false
    unlockBodyScroll()
  }

  // ---------------------------------------------------------------------------
  // Zoom image loading
  // ---------------------------------------------------------------------------

  #loadZoomImg(): void {
    if (this.zoomSrc === '') return

    this.#zoomImgLoadGen += 1
    const gen = this.#zoomImgLoadGen
    const src = this.zoomSrc

    const img = new Image()
    img.sizes = this.zoomSizes
    img.srcset = this.zoomSrcset
    if (this.zoomCrossorigin !== '') img.crossOrigin = this.zoomCrossorigin

    const done = (): void => {
      // Ignore stale resolutions from a previous load
      if (gen !== this.#zoomImgLoadGen) return
      this.#isZoomImgLoaded = true
      this.#render()
    }

    const fail = (): void => {
      if (gen !== this.#zoomImgLoadGen) return
      this.dispatchEvent(
        new CustomEvent('image-zoom:error', {
          detail: { src, type: 'load' },
          bubbles: true,
          composed: true,
        }),
      )
    }

    // Wire handlers BEFORE setting src so a synchronous cache hit or
    // an early error reaches them.
    img.onerror = fail
    img.src = src
    img
      .decode()
      .then(done)
      .catch(() => {
        if (testImgLoaded(img)) {
          done()
          return
        }
        img.onload = done
      })
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  #hasImage(): boolean {
    const el = this.#imgEl
    return (
      el !== null &&
      (this.#loadedImgEl !== undefined || testSvg(el)) &&
      window.getComputedStyle(el).display !== 'none'
    )
  }

  #updateZoomLabel(): void {
    // Only update the built-in button's label. If the consumer supplied their
    // own trigger via `slot="trigger"`, they own its accessible name.
    if (this.#triggerEl !== this.#btnZoomEl) return
    const alt = getImgAlt(this.#imgEl)
    const label =
      alt != null && alt !== '' ? `${this.labelZoom}: ${alt}` : this.labelZoom
    this.#btnZoomEl.setAttribute('aria-label', label)
  }

  // ---------------------------------------------------------------------------
  // SVG handling
  // ---------------------------------------------------------------------------

  #handleSvg(): void {
    const imgEl = this.#imgEl
    if (!testSvg(imgEl)) return

    // The modal img element needs to be a <div> for SVG (the cloned SVG
    // gets appended as a child). If it's currently an <img>, swap it.
    if (this.#modalImgEl instanceof HTMLImageElement) {
      const div = document.createElement('div')
      div.setAttribute('data-rmiz-modal-img', '')
      this.#swapModalImgEl(div)
    }

    // Fast path: cached clone is still valid. Just update the
    // width/height inline styles on the existing clone — those change
    // on every resize and we don't want to re-clone the whole SVG for
    // that. The click handler is already attached from the last clone.
    const cached = this.#cachedSvgClone
    if (!this.#svgCloneDirty && cached !== null) {
      cached.style.width = `${this.#styleModalImg.width ?? 0}px`
      cached.style.height = `${this.#styleModalImg.height ?? 0}px`
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- cloneNode of SVGElement
    const svgEl = imgEl.cloneNode(true) as SVGElement
    adjustSvgIDs(svgEl)

    svgEl.style.width = `${this.#styleModalImg.width ?? 0}px`
    svgEl.style.height = `${this.#styleModalImg.height ?? 0}px`
    svgEl.addEventListener('click', this.#onSvgUnzoomClick)

    while (this.#modalImgEl.firstChild != null) {
      this.#modalImgEl.removeChild(this.#modalImgEl.firstChild)
    }
    this.#modalImgEl.appendChild(svgEl)
    this.#cachedSvgClone = svgEl
    this.#svgCloneDirty = false
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  #render(): void {
    this.#renderGhost()
    this.#contentEl.setAttribute(
      'data-rmiz-content',
      this.#modalState === 'UNLOADED' ? '' : 'hidden',
    )
    this.#renderDialog()
  }

  #renderGhost(): void {
    const el = this.#imgEl
    const g = this.#ghostEl
    if (!this.#hasImage() || el == null) {
      g.style.display = 'none'
      return
    }

    const { height, width, top, left } = getStyleGhost(el)
    g.style.display = ''
    setStylePx(g.style, 'height', height)
    setStylePx(g.style, 'width', width)
    setStylePx(g.style, 'top', top)
    setStylePx(g.style, 'left', left)
    this.#updateZoomLabel()
  }

  #renderDialog(): void {
    const el = this.#imgEl
    if (!this.#hasImage() || el == null) return

    const active =
      this.#modalState === 'LOADING' || this.#modalState === 'LOADED'
    this.#styleModalImg = getStyleModalImg({
      hasZoomImg: this.zoomSrc !== '',
      imgSrc: getImgSrc(el),
      isSvg: testSvg(el),
      isZoomed: this.zoomed && active,
      loadedImgEl: this.#loadedImgEl,
      offset: this.zoomMargin,
      shouldRefresh: this.#shouldRefresh,
      targetEl: el,
    })

    const ov =
      this.#modalState === 'UNLOADED' || this.#modalState === 'UNLOADING'
        ? 'hidden'
        : 'visible'
    this.#overlayEl.setAttribute('data-rmiz-modal-overlay', ov)

    if (testSvg(el)) this.#handleSvg()
    else if (testImg(el) || testDiv(el)) this.#renderModalImg(el)
  }

  #renderModalImg(imgEl: SupportedImage): void {
    this.#ensureImgTag()
    const mImg = this.#modalImgEl
    if (!(mImg instanceof HTMLImageElement)) return

    this.#syncModalSrc(imgEl)
    if (this.#isZoomImgLoaded && this.#modalState === 'LOADED') {
      this.#applyZoomAttrs()
    }

    const s = this.#styleModalImg
    applyStyles(mImg, s)
    if (s.height != null) mImg.height = s.height
    if (s.width != null) mImg.width = s.width
  }

  // Ensures #modalImgEl is an HTMLImageElement, replacing a div if needed
  // (e.g. after SVG handling swapped in a <div> container).
  #ensureImgTag(): void {
    if (this.#modalImgEl instanceof HTMLImageElement) return

    const img = document.createElement('img')
    img.setAttribute('data-rmiz-modal-img', '')
    this.#swapModalImgEl(img)
  }

  // Centralized swap for #modalImgEl. Every img↔div swap goes through
  // here so the `transitionend` listener follows the element (attached
  // in connectedCallback on the initial fallback) and the SVG clone
  // cache gets invalidated consistently. Don't touch #modalImgEl
  // directly anywhere else in the class.
  #swapModalImgEl(next: HTMLImageElement | HTMLDivElement): void {
    const prev = this.#modalImgEl
    prev.removeEventListener('transitionend', this.#onTransitionEnd)
    next.addEventListener('transitionend', this.#onTransitionEnd)
    prev.replaceWith(next)
    this.#modalImgEl = next
    this.#svgCloneDirty = true
    this.#cachedSvgClone = null
  }

  #syncModalSrc(imgEl: SupportedImage): void {
    const mImg = this.#modalImgEl
    if (!(mImg instanceof HTMLImageElement)) return

    const alt = getImgAlt(imgEl)
    const src = getImgSrc(imgEl)
    if (alt != null) mImg.alt = alt
    if (src != null) mImg.src = src
    if (testImg(imgEl)) {
      mImg.sizes = imgEl.sizes
      mImg.srcset = imgEl.srcset
      if (imgEl.crossOrigin != null) mImg.crossOrigin = imgEl.crossOrigin
    }
  }

  #applyZoomAttrs(): void {
    const mImg = this.#modalImgEl
    if (!(mImg instanceof HTMLImageElement)) return

    if (this.zoomSrc !== '') mImg.src = this.zoomSrc
    if (this.zoomSrcset !== '') mImg.srcset = this.zoomSrcset
    if (this.zoomSizes !== '') mImg.sizes = this.zoomSizes
    if (this.zoomCrossorigin !== '') mImg.crossOrigin = this.zoomCrossorigin
  }
}

// =============================================================================

export interface ImageZoomChangeEventDetail {
  zoomed: boolean
}
export interface ImageZoomErrorEventDetail {
  src: string
  type: 'load'
}
export interface ImageZoomStateChangeEventDetail {
  state: ModalState
  previous: ModalState
}
export interface ImageZoomBtnUnzoomChangeEventDetail {
  button: HTMLButtonElement
}

declare global {
  interface HTMLElementTagNameMap {
    'image-zoom': ImageZoomElement
  }
  interface HTMLElementEventMap {
    'image-zoom:zoom-change': CustomEvent<ImageZoomChangeEventDetail>
    'image-zoom:error': CustomEvent<ImageZoomErrorEventDetail>
    'image-zoom:state-change': CustomEvent<ImageZoomStateChangeEventDetail>
    'image-zoom:btn-unzoom-change': CustomEvent<ImageZoomBtnUnzoomChangeEventDetail>
  }
}

export type { ModalState }

if (
  typeof customElements !== 'undefined' &&
  customElements.get('image-zoom') == null
) {
  customElements.define('image-zoom', ImageZoomElement)
}
/* eslint-enable max-lines */
