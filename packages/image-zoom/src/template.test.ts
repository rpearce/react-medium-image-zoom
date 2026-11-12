import { expect, it } from 'vitest'
import {
  buildShadow,
  createIconCompress,
  createIconEnlarge,
} from './template.js'
import { mount } from './test-helpers.js'

function shadow() {
  const host = mount('<div></div>')
  const root = host.attachShadow({ mode: 'open' })
  return { root, parts: buildShadow(root) }
}

it('builds the tree with DOM calls and no <style> element', () => {
  const { root, parts } = shadow()
  expect(root.querySelector('style')).toBeNull()
  expect(root.adoptedStyleSheets).toHaveLength(1)
  expect([...root.children]).toEqual([parts.slot, parts.ghost])
  expect(
    parts.ghost.matches('div[part="ghost"][data-rmiz-ghost][hidden]'),
  ).toBe(true)
  expect(parts.buttonSlot.name).toBe('zoom-button')
  expect(
    parts.button.matches(
      'button[part="btn-zoom"][data-rmiz-btn-zoom][type="button"]',
    ),
  ).toBe(true)
  expect(
    parts.button.querySelector(
      'slot[name="icon-zoom"] svg[data-rmiz-btn-zoom-icon]',
    ),
  ).not.toBeNull()
})

it('shares one stylesheet between shadow roots', () => {
  expect(shadow().root.adoptedStyleSheets[0]).toBe(
    shadow().root.adoptedStyleSheets[0],
  )
})

it('writes the structural styles inline', () => {
  const { parts } = shadow()
  expect(parts.slot.style.visibility).toBe('visible')
  expect(parts.slot.style.boxSizing).toBe('inherit')
  // The zoom-button slot gets a concrete copy of the host's box-sizing at
  // the first update that finds the image (operation.ts), never `inherit`
  expect(parts.buttonSlot.style.boxSizing).toBe('')
  expect(parts.ghost.style.position).toBe('absolute')
  expect(parts.ghost.style.pointerEvents).toBe('none')
  expect(parts.ghost.style.boxSizing).toBe('inherit')
})

it('styles the built-in button like the global rule', () => {
  const { parts } = shadow()
  parts.ghost.hidden = false
  parts.button.focus()
  const cs = getComputedStyle(parts.button)
  expect([cs.width, cs.height, cs.position, cs.cursor]).toEqual([
    '40px',
    '40px',
    'absolute',
    'zoom-in',
  ])
})

it("default icons match today's paths", () => {
  expect(createIconEnlarge().querySelector('path')?.getAttribute('d')).toMatch(
    /^M 9 1 L 9 2/,
  )
  expect(
    createIconCompress().matches(
      'svg[data-rmiz-btn-unzoom-icon][aria-hidden="true"][focusable="false"]',
    ),
  ).toBe(true)
})
