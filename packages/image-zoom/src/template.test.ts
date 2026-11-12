import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import css from './styles.css?inline'
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

// Every property the zoom-button rules declare, in BUTTON_CSS and in
// styles.css's [data-rmiz-btn-zoom] rules alike. -moz-appearance is left out:
// Chromium doesn't know it (-webkit-appearance is its alias of appearance).
const BUTTON_PROPERTIES = [
  'background-color',
  'border-radius',
  'border',
  'box-shadow',
  'color',
  'height',
  'margin',
  'outline-offset',
  'padding',
  'touch-action',
  'width',
  '-webkit-appearance',
  'appearance',
  // :not(:focus):not(:active)
  'position',
  'clip',
  'clip-path',
  'overflow',
  'pointer-events',
  'white-space',
  // the placement rule
  'inset',
  'cursor',
]

function buttonStyle(el: Element): Record<string, string> {
  const cs = getComputedStyle(el)
  return Object.fromEntries(
    BUTTON_PROPERTIES.map(name => [name, cs.getPropertyValue(name)]),
  )
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

// The button CSS lives twice, in BUTTON_CSS and in styles.css: the two copies
// must not drift apart
it('styles the built-in button exactly as styles.css styles a slotted [data-rmiz-btn-zoom], unfocused and with keyboard focus', async () => {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
  try {
    // The built-in button, and a light-DOM one in the zoom-button slot, as
    // the React wrapper renders it: same containing block, same inheritance
    const builtIn = shadow()
    builtIn.parts.ghost.hidden = false
    const slotted = shadow()
    slotted.parts.ghost.hidden = false
    const light = document.createElement('button')
    light.slot = 'zoom-button'
    light.setAttribute('data-rmiz-btn-zoom', '')
    light.type = 'button'
    slotted.root.host.appendChild(light)

    expect(buttonStyle(light)).toEqual(buttonStyle(builtIn.parts.button))

    await userEvent.tab()
    expect(builtIn.parts.button.matches(':focus-visible')).toBe(true)
    const focusedBuiltIn = buttonStyle(builtIn.parts.button)
    await userEvent.tab()
    expect(light.matches(':focus-visible')).toBe(true)

    expect(buttonStyle(light)).toEqual(focusedBuiltIn)
  } finally {
    style.remove()
  }
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
