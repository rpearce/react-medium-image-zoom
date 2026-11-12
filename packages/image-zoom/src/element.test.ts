import { expect, it, vi } from 'vitest'
import { tagName } from './index.js'
import { lateDefine } from './test-helpers.js'

const make = () => document.createElement('image-zoom')

it('is defined with an open shadow root', () => {
  expect(customElements.get(tagName)).toBeDefined()
  expect(make().shadowRoot?.mode).toBe('open')
})

it.each(['zoomed', 'disabled', 'inline'] as const)(
  '%s reflects as a boolean where "false" is false',
  name => {
    const el = make()
    expect(el[name]).toBe(false)
    el[name] = true
    expect(el.getAttribute(name)).toBe('')
    el.setAttribute(name, 'false')
    expect(el[name]).toBe(false)
    el[name] = undefined
    expect(el.hasAttribute(name)).toBe(false)
  },
)

it('customContent reflects custom-content', () => {
  const el = make()
  el.customContent = true
  expect(el.getAttribute('custom-content')).toBe('')
})

it.each([
  ['zoomMargin', 'zoom-margin', 0],
  ['swipeToUnzoomThreshold', 'swipe-to-unzoom-threshold', 10],
] as const)('%s reflects %s with default %j', (prop, attr, fallback) => {
  const el = make()
  expect(el[prop]).toBe(fallback)
  el[prop] = 25
  expect(el.getAttribute(attr)).toBe('25')
  el.setAttribute(attr, '')
  expect(el[prop]).toBe(fallback)
  el.setAttribute(attr, 'Infinity')
  expect(el[prop]).toBe(Number.POSITIVE_INFINITY)
})

it.each([
  ['labelZoom', 'label-zoom', 'Expand image'],
  ['labelUnzoom', 'label-unzoom', 'Minimize image'],
  ['dialogClass', 'dialog-class', ''],
  ['zoomSrc', 'zoom-src', ''],
  ['zoomSrcset', 'zoom-srcset', ''],
  ['zoomSizes', 'zoom-sizes', ''],
] as const)('%s reflects %s with default %j', (prop, attr, fallback) => {
  const el = make()
  expect(el[prop]).toBe(fallback)
  el[prop] = 'x'
  expect(el.getAttribute(attr)).toBe('x')
  el[prop] = null
  expect(el.hasAttribute(attr)).toBe(false)
})

it('zoomCrossOrigin reads like HTMLImageElement.crossOrigin', () => {
  const el = make()
  expect(el.zoomCrossOrigin).toBeNull()
  el.zoomCrossOrigin = 'use-credentials'
  expect(el.getAttribute('zoom-crossorigin')).toBe('use-credentials')
  el.setAttribute('zoom-crossorigin', '')
  expect(el.zoomCrossOrigin).toBe('anonymous')
})

it('swipe is enumerated: only "none" disables', () => {
  const el = make()
  expect(el.swipe).toBe('unzoom')
  el.swipe = 'none'
  expect(el.getAttribute('swipe')).toBe('none')
  el.setAttribute('swipe', 'false')
  expect(el.swipe).toBe('unzoom')
  el.swipe = null
  expect(el.hasAttribute('swipe')).toBe(false)
})

it('the zoomed setter uses setAttribute so a repeated true still notifies', () => {
  const el = make()
  el.setAttribute('zoomed', '')
  const spy = vi.spyOn(el, 'setAttribute')
  el.zoomed = true
  expect(spy).toHaveBeenCalledWith('zoomed', '')
})

it('starts with a frozen initial state and no dialog', () => {
  const el = make()
  expect(Object.isFrozen(el.state)).toBe(true)
  expect(el.state).toMatchObject({
    hasImage: false,
    modalState: 'UNLOADED',
    isZoomImgLoaded: false,
    isSvg: false,
  })
  expect(el.dialog).toBeNull()
})

it('replays properties set before definition', async () => {
  const el = await lateDefine('<x-late></x-late>', node => {
    Object.assign(node, { zoomMargin: 20, swipe: 'none', labelZoom: 'Open' })
  })
  expect([
    el.getAttribute('zoom-margin'),
    el.getAttribute('swipe'),
    el.getAttribute('label-zoom'),
  ]).toEqual(['20', 'none', 'Open'])
  expect(Object.hasOwn(el, 'zoomMargin')).toBe(false)
})

it('has no property that collides with HTMLElement', () => {
  for (const p of [
    'zoomed',
    'zoomMargin',
    'swipe',
    'labelZoom',
    'dialogClass',
    'customContent',
    'state',
    'dialog',
    'modalContent',
  ])
    expect(p in HTMLElement.prototype).toBe(false)
})
