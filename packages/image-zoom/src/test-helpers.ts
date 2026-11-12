import { afterEach } from 'vitest'
import { createImageZoomElement } from './element.js'
import type { ImageZoomElement, ImageZoomState } from './types.js'

function svgUri(width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#468"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const IMG = svgUri(400, 300)
export const IMG_2 = svgUri(800, 600)
export const IMG_HTML = `<image-zoom><img src="${IMG}" alt="A lighthouse" width="200"></image-zoom>`

const mounted: Element[] = []

afterEach(() => {
  for (const node of mounted.splice(0)) {
    node.remove()
  }
})

/**
 * Parse markup into a node appended to document.body; removed after each test
 */
export function mount(markup: string): HTMLElement {
  const holder = document.createElement('div')
  holder.innerHTML = markup
  const el = holder.firstElementChild
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('mount: markup must start with an element')
  }
  document.body.appendChild(el)
  mounted.push(el)
  return el
}

/**
 * Resolve after the scheduler's next flush. Messages on message channels are
 * delivered in the order posted, so a message posted from a timeout callback
 * arrives after a flush posted before that timeout fired.
 */
export async function flush(): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>()
  setTimeout(() => {
    const channel = new MessageChannel()
    channel.port1.onmessage = (): void => {
      channel.port1.close()
      resolve()
    }
    channel.port2.postMessage(null)
  }, 0)
  await promise
}

async function frame(): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>()
  requestAnimationFrame(() => {
    resolve()
  })
  await promise
}

/**
 * Two animation frames, then flush(): observers have delivered and whatever
 * they queued has run
 */
export async function idle(): Promise<void> {
  await frame()
  await frame()
  await flush()
}

/**
 * Resolve when the element's state passes the test: at once, or on a later
 * statechange. Reject after 2 s so a wrong expectation fails instead of hanging.
 */
export async function until(
  el: ImageZoomElement,
  test: (s: ImageZoomState) => boolean,
): Promise<void> {
  if (test(el.state)) return
  const { promise, resolve, reject } = Promise.withResolvers<void>()
  const check = (): void => {
    if (test(el.state)) {
      resolve()
    }
  }
  const timer = setTimeout(() => {
    reject(new Error('until: no matching statechange within 2 s'))
  }, 2000)
  el.addEventListener('statechange', check)
  try {
    await promise
  } finally {
    clearTimeout(timer)
    el.removeEventListener('statechange', check)
  }
}

function isImageZoom(node: Element): node is ImageZoomElement {
  const registered = customElements.get('image-zoom')
  return registered !== undefined && node instanceof registered
}

/**
 * mount(), narrowed: the markup's root must be an upgraded <image-zoom>
 */
export function mountZoom(markup: string): ImageZoomElement {
  const el = mount(markup)
  if (!isImageZoom(el)) {
    throw new TypeError('mountZoom: markup must start with <image-zoom>')
  }
  return el
}

/**
 * Mount markup whose root is an <image-zoom>, and wait until it has an image
 */
export async function ready(markup: string): Promise<ImageZoomElement> {
  const el = mountZoom(markup)
  await until(el, s => s.hasImage)
  return el
}

/**
 * The element's modal img: el.dialog's [data-rmiz-modal-img]
 */
export function modalImg(el: ImageZoomElement): HTMLElement {
  const found = el.dialog?.querySelector('[data-rmiz-modal-img]')
  if (!(found instanceof HTMLElement)) {
    throw new TypeError('modalImg: no [data-rmiz-modal-img] in el.dialog')
  }
  return found
}

export function ghost(el: ImageZoomElement): HTMLElement {
  const found = el.shadowRoot?.querySelector('[data-rmiz-ghost]')
  if (!(found instanceof HTMLElement)) {
    throw new TypeError('ghost: no [data-rmiz-ghost] in the shadow root')
  }
  return found
}

export function builtInButton(el: ImageZoomElement): HTMLButtonElement {
  const found = el.shadowRoot?.querySelector('[data-rmiz-btn-zoom]')
  if (!(found instanceof HTMLButtonElement)) {
    throw new TypeError(
      'builtInButton: no [data-rmiz-btn-zoom] in the shadow root',
    )
  }
  return found
}

let lateCount = 0

/**
 * Mount markup whose root is the literal tag `x-late` under a fresh tag name,
 * so the element is in the document but undefined; run `before` on it, then
 * define that name and resolve with the upgraded element
 */
export async function lateDefine(
  markup: string,
  before?: (el: HTMLElement) => void,
): Promise<ImageZoomElement> {
  lateCount += 1
  const name = `x-late-${lateCount}`
  const node = mount(markup.replaceAll('x-late', name))
  before?.(node)
  const Late = createImageZoomElement()
  customElements.define(name, Late)
  await customElements.whenDefined(name)
  if (!(node instanceof Late)) {
    throw new TypeError(`lateDefine: <${name}> did not upgrade`)
  }
  return node
}

/**
 * Collect the events of a type fired on a target
 */
export function record(target: EventTarget, type: string): Event[] {
  const events: Event[] = []
  target.addEventListener(type, event => {
    events.push(event)
  })
  return events
}
