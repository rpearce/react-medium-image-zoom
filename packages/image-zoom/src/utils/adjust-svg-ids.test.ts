import { describe, it, expect } from 'vitest'
import { adjustSvgIDs } from './adjust-svg-ids.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

function createSvg(): SVGSVGElement {
  return document.createElementNS(SVG_NS, 'svg')
}

function createSvgElement(tagName: string): SVGElement {
  return document.createElementNS(SVG_NS, tagName)
}

// Each adjustSvgIDs call picks a fresh suffix so two instances cloning
// the same source SVG never collide. Tests only care that IDs got the
// suffix and that cross-references were updated consistently — the
// exact counter value is an implementation detail.
const SUFFIX = /-zoom-\d+$/

function suffixOf(id: string): string {
  const match = SUFFIX.exec(id)
  if (match === null) throw new Error(`no suffix on "${id}"`)
  return match[0]
}

describe('adjustSvgIDs', () => {
  it('appends a unique -zoom-N suffix to the SVG element own ID', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'my-svg')

    adjustSvgIDs(svg)

    expect(svg.id).toMatch(/^my-svg-zoom-\d+$/)
  })

  it('appends the same suffix to all child elements with IDs in one call', () => {
    const svg = createSvg()
    const rect = createSvgElement('rect')
    rect.setAttribute('id', 'rect1')
    const circle = createSvgElement('circle')
    circle.setAttribute('id', 'circle1')
    svg.appendChild(rect)
    svg.appendChild(circle)

    adjustSvgIDs(svg)

    expect(rect.id).toMatch(/^rect1-zoom-\d+$/)
    expect(circle.id).toMatch(/^circle1-zoom-\d+$/)
    // Same suffix for all elements within a single call.
    expect(suffixOf(rect.id)).toBe(suffixOf(circle.id))
  })

  it('generates unique suffixes across separate calls (regression for two <image-zoom> instances cloning the same source SVG)', () => {
    const a = createSvg()
    a.setAttribute('id', 'shared')
    const b = createSvg()
    b.setAttribute('id', 'shared')

    adjustSvgIDs(a)
    adjustSvgIDs(b)

    expect(a.id).not.toBe(b.id)
    expect(a.id).toMatch(/^shared-zoom-\d+$/)
    expect(b.id).toMatch(/^shared-zoom-\d+$/)
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

    expect(clipPath.id).toMatch(/^clip1-zoom-\d+$/)
    expect(rect.getAttribute('clip-path')).toBe(`url(#${clipPath.id})`)
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

    expect(gradient.id).toMatch(/^grad1-zoom-\d+$/)
    expect(rect.getAttribute('fill')).toBe(`url(#${gradient.id})`)
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

    expect(mask.id).toMatch(/^mask1-zoom-\d+$/)
    expect(rect.getAttribute('mask')).toBe(`url(#${mask.id})`)
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

    expect(gradient.id).toMatch(/^grad1-zoom-\d+$/)
    expect(clipPath.id).toMatch(/^clip1-zoom-\d+$/)
    expect(rect.getAttribute('fill')).toBe(`url(#${gradient.id})`)
    expect(rect.getAttribute('clip-path')).toBe(`url(#${clipPath.id})`)
    expect(suffixOf(gradient.id)).toBe(suffixOf(clipPath.id))
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

    expect(clipPath.id).toMatch(/^myClip-zoom-\d+$/)
    expect(style.textContent).toBe(
      `.cls { clip-path: url(#${clipPath.id}); fill: #${clipPath.id}; }`,
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

    expect(svg.id).toMatch(/^icon-svg-zoom-\d+$/)
    expect(rect.id).toMatch(/^icon-rect-zoom-\d+$/)
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

    expect(marker.id).toMatch(/^arrow-zoom-\d+$/)
    const ref = `url(#${marker.id})`
    expect(line1.getAttribute('marker-start')).toBe(ref)
    expect(line2.getAttribute('marker-mid')).toBe(ref)
    expect(line3.getAttribute('marker-end')).toBe(ref)
  })

  it('does not double-suffix when root SVG has ID alongside children', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'root-svg')
    const rect = createSvgElement('rect')
    rect.setAttribute('id', 'child-rect')
    svg.appendChild(rect)

    adjustSvgIDs(svg)

    expect(svg.id).toMatch(/^root-svg-zoom-\d+$/)
    expect(rect.id).toMatch(/^child-rect-zoom-\d+$/)
  })

  it('handles a <style> element with null textContent without throwing', () => {
    const svg = createSvg()
    svg.setAttribute('id', 'foo')
    const style = document.createElementNS(SVG_NS, 'style')
    // textContent is `null` for a freshly-created element with no children
    expect(style.textContent).toBe('')
    svg.appendChild(style)

    expect(() => {
      adjustSvgIDs(svg)
    }).not.toThrow()
    expect(svg.id).toMatch(/^foo-zoom-\d+$/)
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

    expect(gradient.id).toMatch(/^grad1-zoom-\d+$/)
    expect(rect.getAttribute('fill')).toBe('url(#unrelated)')
  })
})
