import { afterEach } from 'vitest'

function svgUri(width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#468"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const IMG = svgUri(400, 300)
export const IMG_2 = svgUri(800, 600)

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
 * Collect the events of a type fired on a target
 */
export function record(target: EventTarget, type: string): Event[] {
  const events: Event[] = []
  target.addEventListener(type, event => {
    events.push(event)
  })
  return events
}
