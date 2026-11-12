// Consumer compatibility baseline: downstream apps test <Zoom> in jsdom.
// Each stub below was added after a run failed without it:
// - currentSrc: jsdom loads no images, so it stays '' and no button renders
// - decode: missing in jsdom, and called on mount. It also sets a natural
//   size, which otherwise stays 0 and makes React warn about NaN sizes.
// - ResizeObserver: missing; observe() runs on mount (v5 also called
//   disconnect() on unmount; the element never calls it)
// - HTMLDialogElement showModal: missing, and called on zoom
// close() needs no stub: it runs only once an unzoom ends, which never happens
// here.
// Needed since v6 (the <image-zoom> element), not by v5:
// - ResizeObserver unobserve(): the element shares one observer across
//   instances and unobserves each image at teardown (unmount)
// The wait runs inside act: the element batches image loads in a task of its
// own, which act doesn't flush, so the update that renders the zoom button
// would otherwise land outside act (a warning). It waits for the element's
// state, not the button: React renders nothing until the act scope ends.

import React, { act } from 'react'
import ReactDOM from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import Zoom, { type UncontrolledProps } from './index.js'

type OnZoomChange = NonNullable<UncontrolledProps['onZoomChange']>

beforeEach(() => {
  vi.spyOn(HTMLImageElement.prototype, 'currentSrc', 'get').mockImplementation(
    function (this: HTMLImageElement) {
      return this.src
    },
  )
  HTMLImageElement.prototype.decode = async function (this: HTMLImageElement) {
    Object.defineProperty(this, 'naturalWidth', {
      value: 800,
      configurable: true,
    })
    Object.defineProperty(this, 'naturalHeight', {
      value: 600,
      configurable: true,
    })
    await Promise.resolve()
  }
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = vi.fn<ResizeObserver['observe']>()
      unobserve = vi.fn<ResizeObserver['unobserve']>()
      disconnect = vi.fn<ResizeObserver['disconnect']>()
    },
  )
  HTMLDialogElement.prototype.showModal =
    vi.fn<HTMLDialogElement['showModal']>()
})

let root: ReactDOM.Root | undefined
let container: HTMLDivElement | undefined

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
})

async function render(ui: React.JSX.Element): Promise<void> {
  container = document.createElement('div')
  document.body.appendChild(container)
  const r = ReactDOM.createRoot(container)
  root = r
  await act(async () => {
    r.render(ui)
    await Promise.resolve()
  })
}

it('renders, and a click on the zoom button requests zoom', async () => {
  const onZoomChange = vi.fn<OnZoomChange>()
  await render(
    <Zoom onZoomChange={onZoomChange}>
      <img alt="x" src="x.jpg" />
    </Zoom>,
  )
  await act(async () => {
    await vi.waitFor(() => {
      if (document.querySelector('image-zoom')?.state.hasImage !== true)
        throw new Error('waiting for the image')
    })
  })
  const button = document.querySelector<HTMLButtonElement>(
    '[data-rmiz-btn-zoom]',
  )
  if (button === null) throw new Error('no zoom button')
  // Async act, kept from v5, where the zoom re-render tripped the component's
  // MutationObserver and its setState landed after a sync act() returned (an
  // act warning). With the element nothing lands late: a sync act() would do.
  await act(async () => {
    button.click()
    await Promise.resolve()
  })
  expect(onZoomChange).toHaveBeenCalledWith(
    true,
    expect.objectContaining<{ event: unknown }>({ event: expect.anything() }),
  )
})
