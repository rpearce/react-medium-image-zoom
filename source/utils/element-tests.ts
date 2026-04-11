function isElement(el: unknown): el is Element {
  if (typeof Element === 'undefined') {
    return false
  }
  return el instanceof Element
}

const testElType = (type: string, el: unknown): boolean =>
  isElement(el) && el.tagName.toUpperCase() === type

export const testDiv = (el: unknown): el is HTMLDivElement | HTMLSpanElement =>
  testElType('DIV', el) || testElType('SPAN', el)

export const testImg = (el: unknown): el is HTMLImageElement =>
  testElType('IMG', el)

export const testImgLoaded = (el: HTMLImageElement): boolean =>
  el.complete && el.naturalHeight !== 0

export const testSvg = (el: unknown): el is SVGElement => testElType('SVG', el)
