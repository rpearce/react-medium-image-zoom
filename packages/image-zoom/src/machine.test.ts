import { expect, it, vi } from 'vitest'
import './index.js'
import './styles.css'
import {
  end,
  IMG,
  IMG_HTML,
  lateDefine,
  modalImg,
  open,
  ready,
  record,
  until,
} from './test-helpers.js'
import type { ImageZoomElement } from './types.js'
import {
  resetWindowDimensions,
  setWindowDimensions,
} from './utils/test-helpers.js'

const sourceVisibility = (el: ImageZoomElement) =>
  getComputedStyle(el.querySelector('img')!).visibility
const overlay = (el: ImageZoomElement) =>
  el
    .dialog!.querySelector('[data-rmiz-modal-overlay]')!
    .getAttribute('data-rmiz-modal-overlay')
// Only timeouts: the scheduler's MessageChannel and animation frames stay real
const fakeTimeouts = () =>
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })

it('runs UNLOADED → LOADING → LOADED → UNLOADING → UNLOADED', async () => {
  const el = await ready(IMG_HTML)
  el.zoomed = true
  expect([
    el.state.modalState,
    el.dialog!.open,
    document.body.style.overflow,
    overlay(el),
    sourceVisibility(el),
  ]).toEqual(['LOADING', true, 'hidden', 'visible', 'hidden'])
  end(el)
  expect(el.state.modalState).toBe('LOADED')
  el.zoomed = false
  expect([el.state.modalState, overlay(el), sourceVisibility(el)]).toEqual([
    'UNLOADING',
    'hidden',
    'hidden',
  ])
  end(el)
  expect([
    el.state.modalState,
    el.dialog!.open,
    document.body.style.overflow,
    sourceVisibility(el),
  ]).toEqual(['UNLOADED', false, '', 'visible'])
})

it('does not apply a zoomed attribute present at connect, and the next write zooms', async () => {
  const el = await ready(`<image-zoom zoomed><img src="${IMG}"></image-zoom>`)
  expect([el.zoomed, el.state.modalState, el.dialog!.open]).toEqual([
    true,
    'UNLOADED',
    false,
  ])
  el.zoomed = true
  expect(el.state.modalState).toBe('LOADING')
})

it('ignores zoomed at upgrade and a zoomed property set before definition', async () => {
  const a = await lateDefine(`<x-late zoomed><img src="${IMG}"></x-late>`)
  await until(a, s => s.hasImage)
  const b = await lateDefine(`<x-late><img src="${IMG}"></x-late>`, node => {
    Object.assign(node, { zoomed: true })
  })
  await until(b, s => s.hasImage)
  expect([
    a.state.modalState,
    b.state.modalState,
    b.hasAttribute('zoomed'),
  ]).toEqual(['UNLOADED', 'UNLOADED', true])
})

it('does nothing when the parsed value is unchanged, or goes false after an ignored true', async () => {
  const el = await ready(`<image-zoom zoomed><img src="${IMG}"></image-zoom>`)
  const events = record(el, 'statechange')
  el.setAttribute('zoomed', 'false')
  el.removeAttribute('zoomed')
  expect(events).toHaveLength(0)
  el.setAttribute('zoomed', '')
  end(el)
  const n = events.length
  el.setAttribute('zoomed', 'true')
  expect(events).toHaveLength(n)
})

it('the fallback ends UNLOADING after the duration + 50ms; LOADING has none', async () => {
  const el = await ready(IMG_HTML)
  fakeTimeouts()
  try {
    el.zoomed = true
    vi.advanceTimersByTime(10_000)
    expect(el.state.modalState).toBe('LOADING')
    end(el)
    el.zoomed = false
    vi.advanceTimersByTime(349)
    expect(el.state.modalState).toBe('UNLOADING')
    vi.advanceTimersByTime(1)
    expect(el.state.modalState).toBe('UNLOADED')
  } finally {
    vi.useRealTimers()
  }
})

it('refreshes on resize while zoomed, and the next unzoom keeps the full fallback', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = record(el, 'statechange')
  try {
    setWindowDimensions(900, 500)
    window.dispatchEvent(new Event('resize'))
    expect(modalImg(el).style.transitionDuration).toBe('0.01ms')
    expect(events).toHaveLength(1)
    fakeTimeouts()
    el.zoomed = false
    vi.advanceTimersByTime(100)
    expect(el.state.modalState).toBe('UNLOADING')
    vi.advanceTimersByTime(250)
    expect(el.state.modalState).toBe('UNLOADED')
  } finally {
    vi.useRealTimers()
    resetWindowDimensions()
  }
})

it('removes the 0.01ms transition it wrote once the unzoom starts', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  window.dispatchEvent(new Event('resize'))
  expect(modalImg(el).style.transitionDuration).toBe('0.01ms')
  el.zoomed = false
  expect([el.state.modalState, modalImg(el).style.transitionDuration]).toEqual([
    'UNLOADING',
    '',
  ])
})

it('refreshes the unzoomed style before zooming (window resized while unzoomed)', async () => {
  const el = await ready(IMG_HTML)
  const stale = modalImg(el).style.transform
  setWindowDimensions(640, 500)
  try {
    let atOpen = '' // `beforetoggle` fires synchronously inside showModal(), before the zoomed style is written
    el.dialog!.addEventListener('beforetoggle', () => {
      atOpen = modalImg(el).style.transform
    })
    el.zoomed = true
    expect(atOpen).not.toBe(stale)
    expect(atOpen).toMatch(/scale\(/)
  } finally {
    resetWindowDimensions()
  }
})

it('only the modal img subtree ends a transition', async () => {
  const el = await ready(IMG_HTML)
  el.zoomed = true
  el.dialog!.querySelector('[data-rmiz-modal-overlay]')!.dispatchEvent(
    new Event('transitionend', { bubbles: true }),
  )
  el.dialog!.querySelector('[data-rmiz-btn-unzoom]')!.dispatchEvent(
    new Event('transitionend', { bubbles: true }),
  )
  expect(el.state.modalState).toBe('LOADING')
})

it('dispatches statechange after the side effects', async () => {
  const el = await ready(IMG_HTML)
  const seen: string[] = []
  el.addEventListener('statechange', () =>
    seen.push(
      `${el.state.modalState}:${String(el.dialog!.open)}:${document.body.style.overflow}`,
    ),
  )
  el.zoomed = true
  end(el)
  el.zoomed = false
  end(el)
  expect(seen).toEqual([
    'LOADING:true:hidden',
    'LOADED:true:hidden',
    'UNLOADING:true:hidden',
    'UNLOADED:false:',
  ])
})

it('a listener that unzooms on LOADING leaves nothing behind', async () => {
  const el = await ready(IMG_HTML)
  el.addEventListener('statechange', () => {
    if (el.state.modalState === 'LOADING') el.zoomed = false
  })
  el.zoomed = true
  end(el)
  expect([
    el.state.modalState,
    el.dialog!.open,
    document.body.style.overflow,
  ]).toEqual(['UNLOADED', false, ''])
  expect(
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }),
    ),
  ).toBe(true)
})

it('a listener that re-zooms on UNLOADED ends zoomed and consistent', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  let again = true
  el.addEventListener('statechange', () => {
    if (el.state.modalState === 'UNLOADED' && again) {
      again = false
      el.zoomed = true
    }
  })
  el.zoomed = false
  end(el)
  expect([
    el.state.modalState,
    el.dialog!.open,
    document.body.style.overflow,
  ]).toEqual(['LOADING', true, 'hidden'])
})

it('a listener that zooms another element on UNLOADED leaves the page unlocked at the end', async () => {
  const a = await ready(IMG_HTML)
  const b = await ready(IMG_HTML)
  await open(a)
  a.addEventListener('statechange', () => {
    if (a.state.modalState === 'UNLOADED') b.zoomed = true
  })
  a.zoomed = false
  end(a)
  expect(b.state.modalState).toBe('LOADING')
  end(b)
  b.zoomed = false
  end(b)
  expect(document.body.style.overflow).toBe('')
})
