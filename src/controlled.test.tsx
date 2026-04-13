import React, { act } from 'react'
import ReactDOM from 'react-dom/client'
import { afterEach, describe, it, expect, vi } from 'vitest'

import { Controlled, type ControlledProps } from './controlled.js'

type OnZoomChange = NonNullable<ControlledProps['onZoomChange']>

// =============================================================================
// TESTS
// =============================================================================

describe('Controlled', () => {
  it('shows zoom button when given an image child', async () => {
    const { container } = await renderZoom()

    expect(container.querySelector('[data-rmiz-btn-zoom]')).not.toBeNull()
  })

  it('hides zoom UI when there is no image child', async () => {
    const { container } = await renderZoom({
      children: <span>No image</span>,
    })

    expect(container.querySelector('[data-rmiz-btn-zoom]')).toBeNull()
    expect(getPortalDialog()).toBeNull()
  })

  it('calls onZoomChange(true) when image is clicked', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const { container } = await renderZoom({ onZoomChange })

    act(() => {
      container
        .querySelector('img')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expectCalledWith(onZoomChange, true)
  })

  it('does not call onZoomChange when isDisabled is true', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const { container } = await renderZoom({
      onZoomChange,
      isDisabled: true,
    })

    act(() => {
      container
        .querySelector('img')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onZoomChange).not.toHaveBeenCalled()
  })

  it('does not allow unzoom when isDisabled is true', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoom({ isZoomed: true, onZoomChange, isDisabled: true })

    const modalImg = getPortalModalImg()
    if (modalImg !== null) await fireTransitionEnd(modalImg)
    onZoomChange.mockClear()

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })

    expect(onZoomChange).not.toHaveBeenCalled()
  })

  it('unzooms on Escape key', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })

    expectCalledWith(onZoomChange, false)
  })

  it('unzooms on wheel scroll', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    await act(async () => {
      window.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
      await Promise.resolve()
    })

    expectCalledWith(onZoomChange, false)
  })

  it('does not unzoom on ctrl+wheel (pinch zoom)', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    await act(async () => {
      const event = new WheelEvent('wheel', { bubbles: true })
      Object.defineProperty(event, 'ctrlKey', { value: true })
      window.dispatchEvent(event)
      await Promise.resolve()
    })

    expect(onZoomChange).not.toHaveBeenCalled()
  })

  it('does not unzoom when clicking the overlay (only content/img)', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    const overlay = getPortalOverlay()
    const dialog = getPortalDialog()

    // Click the overlay — target guard should reject this
    act(() => {
      if (overlay !== null && dialog !== null) {
        const event = new MouseEvent('click', { bubbles: true })
        Object.defineProperty(event, 'target', { value: overlay })
        dialog.dispatchEvent(event)
      }
    })
    expect(onZoomChange).not.toHaveBeenCalled()

    // Click the modal content — should trigger unzoom
    const modalContent = getPortalModalContent()
    act(() => {
      if (modalContent !== null && dialog !== null) {
        const event = new MouseEvent('click', { bubbles: true })
        Object.defineProperty(event, 'target', { value: modalContent })
        dialog.dispatchEvent(event)
      }
    })
    expectCalledWith(onZoomChange, false)
  })

  it('prevents native dialog cancel so the component can animate', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    const cancelEvent = new Event('cancel', { cancelable: true })
    act(() => {
      getPortalDialog()?.dispatchEvent(cancelEvent)
    })

    expect(cancelEvent.defaultPrevented).toBe(true)
  })

  it('wheel listener is only active after LOADED (not during LOADING)', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const { rerender } = await renderZoom({ isZoomed: false, onZoomChange })

    await rerender({ isZoomed: true })
    // Now in LOADING — wheel should be ignored
    await act(async () => {
      window.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
      await Promise.resolve()
    })
    expect(onZoomChange).not.toHaveBeenCalled()

    // Transition to LOADED
    const modalImg = getPortalModalImg()
    if (modalImg !== null) await fireTransitionEnd(modalImg)

    // Now wheel should work
    await act(async () => {
      window.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
      await Promise.resolve()
    })
    expectCalledWith(onZoomChange, false)
  })

  it('disables body scroll on zoom and restores it after full unload', async () => {
    document.body.style.overflow = 'auto'
    const { rerender } = await renderZoom({ isZoomed: false })

    await rerender({ isZoomed: true })
    expect(document.body.style.overflow).toBe('hidden')

    const modalImg = getPortalModalImg()
    if (modalImg !== null) await fireTransitionEnd(modalImg)

    await rerender({ isZoomed: false })
    if (modalImg !== null) await fireTransitionEnd(modalImg)

    expect(document.body.style.overflow).toBe('auto')
  })

  it('restores body scroll if unmounted while zoomed', async () => {
    document.body.style.overflow = 'auto'
    const { rerender, unmount } = await renderZoom({ isZoomed: false })

    await rerender({ isZoomed: true })
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('auto')
  })
})

// =============================================================================
// TEST HELPERS
// =============================================================================

function noop(): void {
  // intentional no-op
}

let cleanup: () => void = noop

afterEach(() => {
  cleanup()
  cleanup = noop
})

function mockBrowserApis(): void {
  const baseStyle = window.getComputedStyle(document.createElement('div'))

  for (const [key, value] of Object.entries({
    display: 'block',
    transitionDuration: '0.3s',
    objectFit: 'fill',
    objectPosition: '50% 50%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'auto',
    transform: 'none',
  })) {
    Object.defineProperty(baseStyle, key, { value, configurable: true })
  }

  vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

  // happy-dom's Image never loads, so naturalWidth/Height stay 0 → NaN in
  // style calculations.  Give every decoded Image realistic dimensions.
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
}

function getPortalDialog(): HTMLDialogElement | null {
  return document.querySelector('[data-rmiz-modal]')
}

function getPortalModalImg(): HTMLElement | null {
  return document.querySelector('[data-rmiz-modal-img]')
}

function getPortalOverlay(): HTMLElement | null {
  return document.querySelector('[data-rmiz-modal-overlay]')
}

function getPortalModalContent(): HTMLElement | null {
  return document.querySelector('[data-rmiz-modal-content]')
}

async function fireTransitionEnd(el: Element): Promise<void> {
  await act(async () => {
    el.dispatchEvent(new Event('transitionend'))
    await Promise.resolve()
  })
}

interface RenderResult {
  container: HTMLDivElement
  rerender: (newProps: Partial<ControlledProps>) => Promise<void>
  unmount: () => void
}

async function renderZoom(
  props: Partial<ControlledProps> = {},
): Promise<RenderResult> {
  mockBrowserApis()

  const defaultProps = {
    isZoomed: false as boolean,
    onZoomChange: vi.fn<OnZoomChange>(),
    ...props,
  }

  const children = props.children ?? (
    <img alt="That Wanaka Tree" src="test-image.jpg" />
  )

  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = ReactDOM.createRoot(container)

  act(() => {
    root.render(<Controlled {...defaultProps}>{children}</Controlled>)
  })

  // happy-dom doesn't load images, so currentSrc stays ''.  The component
  // calls getImgSrc which returns undefined when currentSrc is empty,
  // causing it to think there is no image.  Fix that, mock geometry so
  // style calculations don't produce NaN, then fire load to flush the
  // Image.decode → loadedImgEl state update.
  const img = container.querySelector('img')
  if (img !== null) {
    Object.defineProperty(img, 'currentSrc', {
      value: img.src === '' ? 'test-image.jpg' : img.src,
      configurable: true,
    })
    img.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })

    await act(async () => {
      img.dispatchEvent(new Event('load'))
      await Promise.resolve()
    })
  }

  const unmount = (): void => {
    act(() => {
      root.unmount()
    })
    container.remove()
  }

  cleanup = unmount

  return {
    container,
    rerender: async (newProps: Partial<ControlledProps>) => {
      const merged = { ...defaultProps, ...newProps }
      await act(async () => {
        root.render(<Controlled {...merged}>{children}</Controlled>)
        await Promise.resolve()
      })
    },
    unmount,
  }
}

async function renderZoomed(
  onZoomChange: ReturnType<typeof vi.fn<OnZoomChange>>,
): Promise<RenderResult> {
  const result = await renderZoom({ isZoomed: false, onZoomChange })

  await result.rerender({ isZoomed: true })

  const modalImg = getPortalModalImg()
  if (modalImg !== null) await fireTransitionEnd(modalImg)

  onZoomChange.mockClear()
  return result
}

function expectCalledWith(
  fn: ReturnType<typeof vi.fn<OnZoomChange>>,
  value: boolean,
): void {
  expect(fn).toHaveBeenCalled()
  expect(fn.mock.lastCall?.[0]).toBe(value)
  expect(fn.mock.lastCall?.[1]).toHaveProperty('event')
}
