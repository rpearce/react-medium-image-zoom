// Consumer compatibility baseline: downstream apps test <Zoom> in jsdom.
// Each stub below was added after a run failed without it:
// - currentSrc: jsdom loads no images, so it stays '' and no button renders
// - decode: missing in jsdom, and called on mount. It also sets a natural
//   size, which otherwise stays 0 and makes React warn about NaN sizes.
// - ResizeObserver: missing; observe() runs on mount, disconnect() on unmount
// - HTMLDialogElement showModal: missing, and called on zoom
// close() needs no stub: it runs only once an unzoom ends, which never happens
// here.

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
  const button = await vi.waitFor(() => {
    const b = document.querySelector<HTMLButtonElement>('[data-rmiz-btn-zoom]')
    if (b === null) throw new Error('no zoom button yet')
    return b
  })
  // Async act: the zoom re-render trips the component's MutationObserver, whose
  // setState would otherwise land after a sync act() returns (an act warning).
  await act(async () => {
    button.click()
    await Promise.resolve()
  })
  expect(onZoomChange).toHaveBeenCalledWith(
    true,
    expect.objectContaining<{ event: unknown }>({ event: expect.anything() }),
  )
})
