import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import './index.js'
import './styles.css'
import {
  end,
  IMG,
  IMG_HTML,
  mount,
  open,
  ready,
  record,
  until,
  zoomEvents,
} from './test-helpers.js'

const key = (init: KeyboardEventInit) =>
  new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init })
const touch = (type: string, ys: number[]) => {
  const list = ys.map(
    (screenY, identifier) =>
      new Touch({ identifier, target: document.body, screenY }),
  )
  return new TouchEvent(type, {
    touches: list,
    changedTouches: list.slice(0, 1),
  })
}

it('Escape requests unzoom, is prevented, and does not propagate', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  const events = zoomEvents(el)
  const seen = record(document.body, 'keydown')
  const e = key({ key: 'Escape' })
  document.body.dispatchEvent(e)
  expect([
    events.map(x => x.detail.zoomed),
    e.defaultPrevented,
    seen.length,
  ]).toEqual([[false], true, 0])
})

it('wheel unzooms only after LOADED, and never with ctrlKey', async () => {
  const el = await ready(IMG_HTML)
  const events = zoomEvents(el)
  el.zoomed = true
  window.dispatchEvent(new WheelEvent('wheel'))
  await Promise.resolve()
  expect(events).toHaveLength(0)
  end(el)
  window.dispatchEvent(new WheelEvent('wheel', { ctrlKey: true }))
  await Promise.resolve()
  expect(events).toHaveLength(0)
  window.dispatchEvent(new WheelEvent('wheel'))
  await Promise.resolve()
  expect(events.map(x => x.detail.zoomed)).toEqual([false])
})

it.each([
  ['', [100], [120], 1],
  ['swipe-to-unzoom-threshold="50"', [100], [120], 0],
  ['swipe="none"', [100], [120], 0],
  ['', [100, 100], [120, 120], 0],
])(
  'swipe (%s, start %j, move %j) gives %j requests',
  async (attr, start, move, count) => {
    const el = await ready(
      `<image-zoom ${attr}><img src="${IMG}"></image-zoom>`,
    )
    await open(el)
    const events = zoomEvents(el)
    window.dispatchEvent(touch('touchstart', start))
    window.dispatchEvent(touch('touchmove', move))
    expect(events).toHaveLength(count)
  },
)

it('removes its listeners after unzoom', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  el.zoomed = false
  end(el)
  const events = zoomEvents(el)
  const e = key({ key: 'Escape' })
  document.body.dispatchEvent(e)
  window.dispatchEvent(new WheelEvent('wheel'))
  window.dispatchEvent(touch('touchstart', [100]))
  window.dispatchEvent(touch('touchmove', [150]))
  await Promise.resolve()
  expect([e.defaultPrevented, events.length]).toEqual([false, 0])
})

it('removing a zoomed element removes its listeners', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  el.remove()
  const e = key({ key: 'Escape' })
  document.body.dispatchEvent(e)
  expect(e.defaultPrevented).toBe(false)
})

it('forgets a touch start across a teardown', async () => {
  const el = await ready(IMG_HTML)
  await open(el)
  window.dispatchEvent(touch('touchstart', [100]))
  el.remove()
  document.body.append(el)
  await until(el, s => s.hasImage)
  await open(el)
  const events = zoomEvents(el)
  window.dispatchEvent(touch('touchmove', [150]))
  expect(events).toHaveLength(0)
})

// Review Focus 5: a real key press, because a synthetic keydown can't close a dialog natively
it('inside an open outer dialog, Escape unzooms and the outer dialog stays open', async () => {
  const outer = mount(`<dialog>${IMG_HTML}</dialog>`)
  if (!(outer instanceof HTMLDialogElement)) {
    throw new TypeError('the outer element is a <dialog>')
  }
  outer.showModal()
  const el = outer.querySelector('image-zoom')!
  await until(el, s => s.hasImage)
  await open(el)
  await userEvent.keyboard('{Escape}')
  end(el)
  expect([el.state.modalState, el.dialog!.open, outer.open]).toEqual([
    'UNLOADED',
    false,
    true,
  ])
  outer.close()
})
