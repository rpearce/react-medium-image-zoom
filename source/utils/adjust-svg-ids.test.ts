import { describe, it, expect } from 'vitest'
import { adjustSvgIDs } from './adjust-svg-ids.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

function createSvg(): SVGSVGElement {
  return document.createElementNS(SVG_NS, 'svg')
}

function createSvgElement(tagName: string): SVGElement {
  return document.createElementNS(SVG_NS, tagName)
}

describe('adjustSvgIDs', () => {
  it('appends -zoom to the SVG element own ID', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'my-svg')

    adjustSvgIDs(svg)

    expect(svg.id).toBe('my-svg-zoom')
  })

  it('appends -zoom to all child elements with IDs', () => {
    const svg = createSvg()
    const rect = createSvgElement('rect')
    rect.setAttribute('id', 'rect1')
    const circle = createSvgElement('circle')
    circle.setAttribute('id', 'circle1')
    svg.appendChild(rect)
    svg.appendChild(circle)

    adjustSvgIDs(svg)

    expect(rect.id).toBe('rect1-zoom')
    expect(circle.id).toBe('circle1-zoom')
  })

  it('updates clip-path url() references', () => {
    const svg = createSvg()
    const clipPath = createSvgElement('clipPath')
    clipPath.setAttribute('id', 'clip1')
    const rect = createSvgElement('rect')
    rect.setAttribute('clip-path', 'url(#clip1)')
    svg.appendChild(clipPath)
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(clipPath.id).toBe('clip1-zoom')
    expect(rect.getAttribute('clip-path')).toBe('url(#clip1-zoom)')
  })

  it('updates fill url() references', () => {
    const svg = createSvg()
    const gradient = createSvgElement('linearGradient')
    gradient.setAttribute('id', 'grad1')
    const rect = createSvgElement('rect')
    rect.setAttribute('fill', 'url(#grad1)')
    svg.appendChild(gradient)
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(gradient.id).toBe('grad1-zoom')
    expect(rect.getAttribute('fill')).toBe('url(#grad1-zoom)')
  })

  it('updates mask url() references', () => {
    const svg = createSvg()
    const mask = createSvgElement('mask')
    mask.setAttribute('id', 'mask1')
    const rect = createSvgElement('rect')
    rect.setAttribute('mask', 'url(#mask1)')
    svg.appendChild(mask)
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(mask.id).toBe('mask1-zoom')
    expect(rect.getAttribute('mask')).toBe('url(#mask1-zoom)')
  })

  it('handles multiple IDs and cross-references', () => {
    const svg = createSvg()

    const gradient = createSvgElement('linearGradient')
    gradient.setAttribute('id', 'grad1')

    const clipPath = createSvgElement('clipPath')
    clipPath.setAttribute('id', 'clip1')

    const rect = createSvgElement('rect')
    rect.setAttribute('fill', 'url(#grad1)')
    rect.setAttribute('clip-path', 'url(#clip1)')

    svg.appendChild(gradient)
    svg.appendChild(clipPath)
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(gradient.id).toBe('grad1-zoom')
    expect(clipPath.id).toBe('clip1-zoom')
    expect(rect.getAttribute('fill')).toBe('url(#grad1-zoom)')
    expect(rect.getAttribute('clip-path')).toBe('url(#clip1-zoom)')
  })

  it('updates style element text content with new IDs', () => {
    const svg = createSvg()
    const defs = createSvgElement('defs')
    const clipPath = createSvgElement('clipPath')
    clipPath.setAttribute('id', 'myClip')
    defs.appendChild(clipPath)

    const style = document.createElementNS(SVG_NS, 'style')
    style.textContent = '.cls { clip-path: url(#myClip); fill: #myClip; }'

    svg.appendChild(defs)
    svg.appendChild(style)

    adjustSvgIDs(svg)

    expect(clipPath.id).toBe('myClip-zoom')
    expect(style.textContent).toBe(
      '.cls { clip-path: url(#myClip-zoom); fill: #myClip-zoom; }',
    )
  })

  it('does nothing when SVG has no IDs', () => {
    const svg = createSvg()
    const rect = createSvgElement('rect')
    rect.setAttribute('width', '100')
    rect.setAttribute('height', '100')
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(svg.id).toBe('')
    expect(rect.getAttribute('width')).toBe('100')
    expect(rect.getAttribute('height')).toBe('100')
  })

  it('handles SVG with ID but no url() references', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'icon-svg')
    const rect = createSvgElement('rect')
    rect.setAttribute('id', 'icon-rect')
    rect.setAttribute('fill', 'red')
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(svg.id).toBe('icon-svg-zoom')
    expect(rect.id).toBe('icon-rect-zoom')
    expect(rect.getAttribute('fill')).toBe('red')
  })

  it('updates marker-start, marker-mid, and marker-end url() references', () => {
    const svg = createSvg()
    const marker = createSvgElement('marker')
    marker.setAttribute('id', 'arrow')

    const line1 = createSvgElement('line')
    line1.setAttribute('marker-start', 'url(#arrow)')

    const line2 = createSvgElement('line')
    line2.setAttribute('marker-mid', 'url(#arrow)')

    const line3 = createSvgElement('line')
    line3.setAttribute('marker-end', 'url(#arrow)')

    svg.appendChild(marker)
    svg.appendChild(line1)
    svg.appendChild(line2)
    svg.appendChild(line3)

    adjustSvgIDs(svg)

    expect(marker.id).toBe('arrow-zoom')
    expect(line1.getAttribute('marker-start')).toBe('url(#arrow-zoom)')
    expect(line2.getAttribute('marker-mid')).toBe('url(#arrow-zoom)')
    expect(line3.getAttribute('marker-end')).toBe('url(#arrow-zoom)')
  })

  it('does not double-suffix when root SVG has ID alongside children', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'root-svg')
    const rect = createSvgElement('rect')
    rect.setAttribute('id', 'child-rect')
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(svg.id).toBe('root-svg-zoom')
    expect(rect.id).toBe('child-rect-zoom')
  })

  it('does not modify elements without matching url() values', () => {
    const svg = createSvg()
    const gradient = createSvgElement('linearGradient')
    gradient.setAttribute('id', 'grad1')
    const rect = createSvgElement('rect')
    rect.setAttribute('fill', 'url(#unrelated)')
    svg.appendChild(gradient)
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(gradient.id).toBe('grad1-zoom')
    expect(rect.getAttribute('fill')).toBe('url(#unrelated)')
  })
})
