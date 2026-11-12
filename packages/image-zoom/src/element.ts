import {
  OBSERVED,
  parseBool,
  parseCrossOrigin,
  parseNumber,
  parseSwipe,
} from './attributes.js'
import { type Controller, createController } from './controller.js'
import { buildShadow } from './template.js'
import type { ImageZoomElement, ImageZoomState } from './types.js'

const MARKER = Symbol.for('@rpearce/image-zoom')

type Bool = boolean | null | undefined
type Text = string | null | undefined
type Swipe = 'unzoom' | 'none' | null | undefined

function setBool(el: HTMLElement, name: string, value: Bool): void {
  const present = Boolean(value)
  if (present) {
    el.setAttribute(name, '')
  } else {
    el.removeAttribute(name)
  }
}

function setText(el: HTMLElement, name: string, value: Text): void {
  if (value == null) {
    el.removeAttribute(name)
  } else {
    el.setAttribute(name, value)
  }
}

const isBool = (value: unknown): value is Bool =>
  value == null || typeof value === 'boolean'

const isText = (value: unknown): value is Text =>
  value == null || typeof value === 'string'

const isSwipe = (value: unknown): value is Swipe =>
  value == null || value === 'unzoom' || value === 'none'

/**
 * A property set before the element was defined is an own property that hides
 * the accessor. Take it off the instance and hand its value to `assign`.
 */
function replay(
  el: HTMLElement,
  name: string,
  assign: (value: unknown) => void,
): void {
  if (!Object.hasOwn(el, name)) return
  const value: unknown = Reflect.get(el, name)
  Reflect.deleteProperty(el, name)
  assign(value)
}

/**
 * The upgrade-property pattern, one property at a time; a value of the wrong
 * type is dropped
 */
function upgradeProperties(el: ImageZoomElement): void {
  replay(el, 'zoomed', v => {
    if (isBool(v)) el.zoomed = v
  })
  replay(el, 'disabled', v => {
    if (isBool(v)) el.disabled = v
  })
  replay(el, 'inline', v => {
    if (isBool(v)) el.inline = v
  })
  replay(el, 'customContent', v => {
    if (isBool(v)) el.customContent = v
  })
  replay(el, 'zoomMargin', v => {
    if (typeof v === 'number') el.zoomMargin = v
  })
  replay(el, 'swipeToUnzoomThreshold', v => {
    if (typeof v === 'number') el.swipeToUnzoomThreshold = v
  })
  replay(el, 'labelZoom', v => {
    if (isText(v)) el.labelZoom = v
  })
  replay(el, 'labelUnzoom', v => {
    if (isText(v)) el.labelUnzoom = v
  })
  replay(el, 'dialogClass', v => {
    if (isText(v)) el.dialogClass = v
  })
  replay(el, 'zoomSrc', v => {
    if (isText(v)) el.zoomSrc = v
  })
  replay(el, 'zoomSrcset', v => {
    if (isText(v)) el.zoomSrcset = v
  })
  replay(el, 'zoomSizes', v => {
    if (isText(v)) el.zoomSizes = v
  })
  replay(el, 'zoomCrossOrigin', v => {
    if (isText(v)) el.zoomCrossOrigin = v
  })
  replay(el, 'swipe', v => {
    if (isSwipe(v)) el.swipe = v
  })
}

/**
 * Create the element class. Only call it where customElements exists: the
 * class extends HTMLElement. Every call returns a distinct class.
 */
export function createImageZoomElement(): new () => ImageZoomElement {
  // :state(found) is progressive; the order of these checks matters (spec §2)
  const useStates =
    typeof ElementInternals !== 'undefined' &&
    'states' in ElementInternals.prototype &&
    CSS.supports('selector(:state(found))')

  return class extends HTMLElement implements ImageZoomElement {
    static observedAttributes = OBSERVED
    static [MARKER] = true

    private readonly controller: Controller

    constructor() {
      super()
      const parts = buildShadow(this.attachShadow({ mode: 'open' }))
      const internals = useStates ? this.attachInternals() : undefined
      this.controller = createController(this, parts, internals)
    }

    connectedCallback(): void {
      upgradeProperties(this)
      this.controller.connect()
    }

    disconnectedCallback(): void {
      this.controller.disconnect()
    }

    attributeChangedCallback(name: string): void {
      this.controller.attributeChanged(name)
    }

    get zoomed(): boolean {
      return parseBool(this.getAttribute('zoomed'))
    }

    set zoomed(value: Bool) {
      setBool(this, 'zoomed', value)
    }

    get disabled(): boolean {
      return parseBool(this.getAttribute('disabled'))
    }

    set disabled(value: Bool) {
      setBool(this, 'disabled', value)
    }

    get inline(): boolean {
      return parseBool(this.getAttribute('inline'))
    }

    set inline(value: Bool) {
      setBool(this, 'inline', value)
    }

    get customContent(): boolean {
      return parseBool(this.getAttribute('custom-content'))
    }

    set customContent(value: Bool) {
      setBool(this, 'custom-content', value)
    }

    get zoomMargin(): number {
      return parseNumber(this.getAttribute('zoom-margin'), 0)
    }

    set zoomMargin(value: number) {
      this.setAttribute('zoom-margin', String(value))
    }

    get swipeToUnzoomThreshold(): number {
      return parseNumber(this.getAttribute('swipe-to-unzoom-threshold'), 10)
    }

    set swipeToUnzoomThreshold(value: number) {
      this.setAttribute('swipe-to-unzoom-threshold', String(value))
    }

    get labelZoom(): string {
      return this.getAttribute('label-zoom') ?? 'Expand image'
    }

    set labelZoom(value: Text) {
      setText(this, 'label-zoom', value)
    }

    get labelUnzoom(): string {
      return this.getAttribute('label-unzoom') ?? 'Minimize image'
    }

    set labelUnzoom(value: Text) {
      setText(this, 'label-unzoom', value)
    }

    get dialogClass(): string {
      return this.getAttribute('dialog-class') ?? ''
    }

    set dialogClass(value: Text) {
      setText(this, 'dialog-class', value)
    }

    get zoomSrc(): string {
      return this.getAttribute('zoom-src') ?? ''
    }

    set zoomSrc(value: Text) {
      setText(this, 'zoom-src', value)
    }

    get zoomSrcset(): string {
      return this.getAttribute('zoom-srcset') ?? ''
    }

    set zoomSrcset(value: Text) {
      setText(this, 'zoom-srcset', value)
    }

    get zoomSizes(): string {
      return this.getAttribute('zoom-sizes') ?? ''
    }

    set zoomSizes(value: Text) {
      setText(this, 'zoom-sizes', value)
    }

    get zoomCrossOrigin(): 'anonymous' | 'use-credentials' | null {
      return parseCrossOrigin(this.getAttribute('zoom-crossorigin'))
    }

    set zoomCrossOrigin(value: Text) {
      setText(this, 'zoom-crossorigin', value)
    }

    get swipe(): 'unzoom' | 'none' {
      return parseSwipe(this.getAttribute('swipe'))
    }

    set swipe(value: Swipe) {
      setText(this, 'swipe', value)
    }

    get state(): ImageZoomState {
      return this.controller.state
    }

    get dialog(): HTMLDialogElement | null {
      return this.controller.dialog
    }

    get modalContent(): HTMLElement | null {
      return this.controller.modalContent
    }
  }
}
