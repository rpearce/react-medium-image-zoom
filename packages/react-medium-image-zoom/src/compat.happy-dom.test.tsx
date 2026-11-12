// Consumer compatibility baseline: downstream apps test <Zoom> in happy-dom.
// The test passes with no stubs. One stub keeps its output free of warnings:
// - decode: sets a natural size; happy-dom loads no images, so it stays 0 and
//   React warns about NaN sizes
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
  vi.spyOn(HTMLImageElement.prototype, 'decode').mockImplementation(
    async function (this: HTMLImageElement) {
      Object.defineProperty(this, 'naturalWidth', {
        value: 800,
        configurable: true,
      })
      Object.defineProperty(this, 'naturalHeight', {
        value: 600,
        configurable: true,
      })
      await Promise.resolve()
    },
  )
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
