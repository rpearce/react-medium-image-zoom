import { expect, it, vi } from 'vitest'
import './index.js'
import './styles.css'
import {
  builtInButton,
  flush,
  get,
  ghost,
  idle,
  IMG,
  IMG_2,
  IMG_HTML,
  mount,
  mountZoom,
  ready,
  record,
  until,
} from './test-helpers.js'

it('reports a loaded image and shows the ghost over it', async () => {
  const el = await ready(IMG_HTML)
  const img = el.querySelector('img')!
  expect(el.state).toMatchObject({
    hasImage: true,
    isSvg: false,
    alt: 'A lighthouse',
    src: img.currentSrc,
  })
  expect(ghost(el).hidden).toBe(false)
  expect(ghost(el).getBoundingClientRect()).toMatchObject({
    width: 200,
    height: 150,
  })
})

it.each([
  ['', 'alt="A lighthouse"', 'Expand image: A lighthouse'],
  ['', '', 'Expand image'],
  ['label-zoom="Open"', 'alt="A lighthouse"', 'Open: A lighthouse'],
])('labels the built-in button (%s %s)', async (attr, alt, label) => {
  const el = await ready(
    `<image-zoom ${attr}><img src="${IMG}" ${alt}></image-zoom>`,
  )
  expect(builtInButton(el).getAttribute('aria-label')).toBe(label)
})

it('fires statechange after connect even when nothing changed', () => {
  const el = document.createElement('image-zoom')
  const events = record(el, 'statechange')
  document.body.append(el)
  expect(events).toHaveLength(1)
  el.remove()
})

it('an unloaded <img> at connect keeps the initial snapshot', async () => {
  const el = document.createElement('image-zoom')
  const img = document.createElement('img')
  img.alt = 'x'
  el.append(img)
  const before = el.state
  const events = record(el, 'statechange')
  mount('<div></div>').append(el)
  await idle()
  expect(events).toHaveLength(1)
  expect(el.state).toBe(before)
  expect(before).toMatchObject({
    hasImage: false,
    alt: undefined,
    src: undefined,
  })
})

it('an SVG source is found during connect', () => {
  const el = mountZoom(
    '<image-zoom><svg width="50" height="50"></svg></image-zoom>',
  )
  expect(el.state).toMatchObject({ hasImage: true, isSvg: true })
})

it('finds an image added later as a child, and one nested in an existing child', async () => {
  const a = mountZoom('<image-zoom></image-zoom>')
  a.insertAdjacentHTML('beforeend', `<img src="${IMG}">`)
  await until(a, s => s.hasImage)
  expect(a.state.hasImage).toBe(true)
  const b = mountZoom('<image-zoom><div></div></image-zoom>')
  b.firstElementChild!.insertAdjacentHTML('beforeend', `<img src="${IMG}">`)
  await until(b, s => s.hasImage)
  expect(b.state.hasImage).toBe(true)
})

it('follows display:none', async () => {
  const el = await ready(IMG_HTML)
  const img = el.querySelector('img')!
  img.style.display = 'none'
  await until(el, s => !s.hasImage)
  expect(ghost(el).hidden).toBe(true)
  img.style.display = ''
  await until(el, s => s.hasImage)
  expect(ghost(el).hidden).toBe(false)
})

it('never treats slotted icons or buttons as the image', async () => {
  const el = mountZoom(
    `<image-zoom><svg slot="icon-zoom"></svg><svg slot="icon-unzoom"></svg><button slot="zoom-button"><svg></svg></button></image-zoom>`,
  )
  await flush()
  expect(el.state.hasImage).toBe(false)
})

it('ignores attribute changes on a slotted zoom button', async () => {
  const el = await ready(
    `<image-zoom><img src="${IMG}"><button slot="zoom-button">z</button></image-zoom>`,
  )
  await idle()
  const events = record(el, 'statechange')
  const spy = vi.spyOn(Element.prototype, 'getBoundingClientRect')
  // Every read calls it (hasImage); an <img> source's read never calls the one above
  const styleSpy = vi.spyOn(window, 'getComputedStyle')
  el.querySelector('button')!.setAttribute('aria-label', 'Zoom')
  await idle()
  expect(events).toHaveLength(0)
  expect(spy).not.toHaveBeenCalled()
  expect(styleSpy).not.toHaveBeenCalled()
})

it('repositions the ghost when a sibling is inserted above the image', async () => {
  const el = await ready(IMG_HTML)
  const before = ghost(el).getBoundingClientRect().top
  el.insertAdjacentHTML('afterbegin', '<p style="height:40px;margin:0">x</p>')
  await vi.waitFor(() => {
    expect(ghost(el).getBoundingClientRect().top).toBe(before + 40)
  })
  expect(ghost(el).getBoundingClientRect().top).toBe(before + 40)
})

it('keeps a source inside a visibility:hidden ancestor visible', async () => {
  const wrap = mount(`<div style="visibility:hidden">${IMG_HTML}</div>`)
  const el = wrap.querySelector('image-zoom')!
  await until(el, s => s.hasImage)
  expect(getComputedStyle(el.querySelector('img')!).visibility).toBe('visible')
})

it('keeps sizes under a box-sizing: inherit reset', async () => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(
    'html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img{padding:9px}',
  )
  const previous = document.adoptedStyleSheets
  document.adoptedStyleSheets = [sheet]
  try {
    const el = await ready(
      `<image-zoom><img src="${IMG}" width="100"><button slot="zoom-button">z</button></image-zoom>`,
    )
    expect(el.querySelector('img')!.getBoundingClientRect().width).toBe(100)
    expect(getComputedStyle(el.querySelector('button')!).boxSizing).toBe(
      'border-box',
    )
  } finally {
    document.adoptedStyleSheets = previous
  }
})

it('keeps a slotted zoom button content-box under an inherit reset without border-box', async () => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync('*,*::before,*::after{box-sizing:inherit}')
  const previous = document.adoptedStyleSheets
  document.adoptedStyleSheets = [sheet]
  const button = `<button slot="zoom-button" style="padding:9px;width:40px">z</button>`
  try {
    const el = await ready(
      `<image-zoom><img src="${IMG}" width="100">${button}</image-zoom>`,
    )
    // The same button as a plain child of a <div> on this page
    const baseline = mount(`<div>${button}</div>`).querySelector('button')!
    const slotted = el.querySelector('button')!
    expect(getComputedStyle(el).boxSizing).toBe('content-box')
    expect(getComputedStyle(slotted).boxSizing).toBe(
      getComputedStyle(el).boxSizing,
    )
    expect(slotted.getBoundingClientRect().width).toBe(
      baseline.getBoundingClientRect().width,
    )
  } finally {
    document.adoptedStyleSheets = previous
  }
})

it('writes a concrete box-sizing on the zoom-button slot, and only when it changes', async () => {
  const el = await ready(IMG_HTML)
  await idle()
  const buttonSlot = get(
    el.shadowRoot,
    'slot[name="zoom-button"]',
    HTMLSlotElement,
  )
  expect(['border-box', 'content-box']).toContain(buttonSlot.style.boxSizing)
  const records: MutationRecord[] = []
  const observer = new MutationObserver(list => {
    records.push(...list)
  })
  observer.observe(el.shadowRoot!, {
    attributes: true,
    subtree: true,
    attributeFilter: ['style'],
  })
  const reads = vi.spyOn(Element.prototype, 'getBoundingClientRect')
  el.zoomMargin = 10
  await idle()
  records.push(...observer.takeRecords())
  observer.disconnect()
  // The change ran an update (every read with an image measures the source)
  expect(reads).toHaveBeenCalled()
  expect(records.filter(r => r.target === buttonSlot)).toEqual([])
})

// Review Focus 1–4
it('follows a changed src', async () => {
  const el = await ready(IMG_HTML)
  const img = el.querySelector('img')!
  img.src = IMG_2
  await until(el, s => s.src === img.currentSrc && s.src !== IMG)
  expect(el.state.src).toBe(IMG_2)
})

it('uses currentSrc for <picture>', async () => {
  const el = await ready(
    `<image-zoom><picture><source srcset="${IMG_2}" media="(min-width: 1px)"><img src="${IMG}"></picture></image-zoom>`,
  )
  expect(el.state.src).toBe(el.querySelector('img')!.currentSrc)
  expect(el.state.src).toBe(IMG_2)
})

it('accepts a role="img" div with a background image', async () => {
  const el = await ready(
    `<image-zoom><div role="img" aria-label="Lake" style="width:200px;height:150px;background-image:url('${IMG}')"></div></image-zoom>`,
  )
  expect(el.state).toMatchObject({ hasImage: true, isSvg: false, alt: 'Lake' })
})

it('stays empty for a broken image and recovers when the src is fixed', async () => {
  const rejections = record(window, 'unhandledrejection')
  const el = mountZoom(
    '<image-zoom><img src="data:image/png;base64,AAAA" alt="x"></image-zoom>',
  )
  await flush()
  await flush()
  expect(el.state.hasImage).toBe(false)
  expect(ghost(el).hidden).toBe(true)
  expect(rejections).toHaveLength(0)
  el.querySelector('img')!.src = IMG
  await until(el, s => s.hasImage)
  expect(ghost(el).hidden).toBe(false)
})
