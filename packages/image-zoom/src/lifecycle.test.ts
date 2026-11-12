import { expect, it, vi } from 'vitest'
import './index.js'
import './styles.css'
import { INITIAL_STATE } from './instance.js'
import {
  end,
  fakeTimeouts,
  flush,
  get,
  idle,
  IMG,
  IMG_2,
  IMG_HTML,
  modalImg,
  mount,
  mountZoom,
  open,
  ready,
  record,
  until,
} from './test-helpers.js'

async function wait(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>()
  setTimeout(resolve, ms)
  await promise
}

it.each(['append', 'insertBefore', 'moveBefore'] as const)(
  'a move with %s keeps the zoom',
  async how => {
    if (how === 'moveBefore' && !('moveBefore' in Element.prototype)) return
    const el = await ready(IMG_HTML)
    await open(el)
    const dialog = el.dialog
    const target = mount('<section></section>')
    if (how === 'append') target.append(el)
    else target[how](el, null)
    expect([
      el.parentElement,
      el.state.modalState,
      el.dialog,
      el.dialog?.open,
      document.body.style.overflow,
    ]).toEqual([target, 'LOADED', dialog, true, 'hidden'])
    expect(el.dialog).toBe(dialog) // toEqual compares nodes structurally
  },
)

it('real removal tears down synchronously', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const dialog = el.dialog
  // What each statechange listener sees when it runs
  const seen: Array<[boolean, HTMLDialogElement | null]> = []
  el.addEventListener('statechange', () => {
    seen.push([el.state.hasImage, el.dialog])
  })
  const input = mount('<input>')
  if (!(input instanceof HTMLInputElement)) {
    throw new TypeError('mounted an <input>')
  }
  el.remove()
  input.focus()
  expect([
    document.body.style.overflow,
    dialog?.isConnected,
    el.dialog,
    document.activeElement,
  ]).toEqual(['', false, null, input])
  expect(seen).toEqual([[false, null]])
  expect(el.state).toEqual(INITIAL_STATE)
})

it('teardown reports once even when nothing changed', () => {
  const el = mountZoom('<image-zoom></image-zoom>')
  const events = record(el, 'statechange')
  el.remove()
  expect([events.length, el.state]).toEqual([1, INITIAL_STATE])
})

it('nothing arrives after teardown', async () => {
  const el = await ready(
    `<image-zoom zoom-src="${IMG_2}"><img src="${IMG}"></image-zoom>`,
  )
  el.zoomed = true
  el.remove()
  const states = record(el, 'statechange')
  const changes = record(el, 'zoomchange')
  const e = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true,
    cancelable: true,
  })
  document.body.dispatchEvent(e)
  await flush()
  await wait(50)
  await flush()
  expect([states.length, changes.length, e.defaultPrevented]).toEqual([
    0,
    0,
    false,
  ])
})

it('a window resize after teardown does nothing', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  el.remove()
  const events = record(el, 'statechange')
  const state = el.state
  window.dispatchEvent(new Event('resize'))
  expect(events).toHaveLength(0)
  expect(el.state).toBe(state)
  // Nor does it reach the next zoom as a refresh (its 0.01ms transition)
  document.body.append(el)
  await until(el, s => s.hasImage)
  el.zoomed = true
  expect([el.state.modalState, modalImg(el).style.transitionDuration]).toEqual([
    'LOADING',
    '',
  ])
})

it('a fallback timer armed before removal does not fire into the next zoom', async () => {
  const el = await ready(IMG_HTML)
  fakeTimeouts()
  try {
    el.zoomed = true
    end(el)
    el.zoomed = false // UNLOADING arms the 350 ms fallback
    expect(el.state.modalState).toBe('UNLOADING')
    el.remove()
    document.body.append(el)
    await until(el, s => s.hasImage)
    el.zoomed = true
    vi.advanceTimersByTime(1000)
    expect(el.state.modalState).toBe('LOADING')
  } finally {
    vi.useRealTimers()
  }
})

it('a resize while zoomed does not carry its refresh across a reconnect', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  window.dispatchEvent(new Event('resize'))
  expect(modalImg(el).style.transitionDuration).toBe('0.01ms')
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  el.zoomed = true
  expect([el.state.modalState, modalImg(el).style.transitionDuration]).toEqual([
    'LOADING',
    '',
  ])
})

it('a reconnect loads the source again before it has an image', async () => {
  const el = await ready(IMG_HTML)
  el.remove()
  document.body.append(el)
  expect(el.state.hasImage).toBe(false)
  await until(el, s => s.hasImage)
  expect(el.state.hasImage).toBe(true)
})

it('a source load that completes after teardown is ignored', async () => {
  // A cached src gives the parsed <img> its currentSrc at once, so the
  // source's preload starts at setup and is still decoding at the removal
  const probe = new Image()
  probe.src = IMG
  await probe.decode()
  const el = mountZoom(IMG_HTML)
  expect(get(el, 'img', HTMLImageElement).currentSrc).toBe(IMG)
  el.remove()
  await wait(50)
  document.body.append(el)
  expect(el.state.hasImage).toBe(false)
  await until(el, s => s.hasImage)
  expect(el.state.hasImage).toBe(true)
})

it('a reconnect starts with the zoom image not loaded', async () => {
  const el = await ready(
    `<image-zoom zoom-src="${IMG_2}"><img src="${IMG}"></image-zoom>`,
  )
  await open(el)
  await until(el, s => s.isZoomImgLoaded)
  expect(el.state.isZoomImgLoaded).toBe(true)
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  expect([el.state.modalState, el.state.isZoomImgLoaded]).toEqual([
    'UNLOADED',
    false,
  ])
})

it('a statechange listener that removes an element queued in the same flush leaves it nothing to report', async () => {
  const a = await ready(IMG_HTML)
  const b = await ready(IMG_HTML)
  // The img's own load event preloads it a second time; let that settle so
  // no job of b's is queued ahead of a's
  await idle()
  const events = record(b, 'statechange')
  let atTeardown = Number.NaN
  a.addEventListener(
    'statechange',
    () => {
      b.remove()
      atTeardown = events.length
    },
    { once: true },
  )
  // One content change in each: both jobs run in the same flush, a's first
  const spacer = '<p style="height:40px;margin:0">x</p>'
  a.insertAdjacentHTML('afterbegin', spacer)
  b.insertAdjacentHTML('afterbegin', spacer)
  await flush()
  const afterFlush = events.length
  document.body.append(b)
  // Teardown reports once, nothing reaches b while it is detached, and the
  // first operation after the reconnect reports
  expect([
    atTeardown,
    afterFlush - atTeardown,
    events.length - afterFlush,
  ]).toEqual([1, 0, 1])
})

it('a re-inserted element shows its image and zooms on the next click', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const first = el.dialog
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  const img = get(el, 'img', HTMLImageElement)
  expect(getComputedStyle(img).visibility).toBe('visible')
  expect(el.dialog).toBeInstanceOf(HTMLDialogElement)
  expect(el.dialog).not.toBe(first)
  img.click()
  expect(el.state.modalState).toBe('LOADING')
  el.remove()
})

it('sets :state(found) where supported, and teardown clears it', async () => {
  if (!CSS.supports('selector(:state(found))')) return
  const el = await ready(IMG_HTML)
  expect(el.matches(':state(found)')).toBe(true)
  el.remove()
  expect(el.matches(':state(found)')).toBe(false)
})

it('attribute changes while disconnected do not update', () => {
  const el = document.createElement('image-zoom')
  const events = record(el, 'statechange')
  el.zoomMargin = 5
  el.zoomed = true
  expect(events).toHaveLength(0)
})
