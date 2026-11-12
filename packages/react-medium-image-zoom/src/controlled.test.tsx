import React, { act } from 'react'
import { createPortal } from 'react-dom'
import ReactDOM from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import {
  afterEach,
  describe,
  it,
  expect,
  type Mock,
  type MockInstance,
  vi,
} from 'vitest'

import type { ImageZoomElement } from '@rpearce/image-zoom'
import css from '../../image-zoom/src/styles.css?inline'
import { Controlled, type ControlledProps } from './controlled.js'
import { mockComputedStyle } from './test-helpers.js'
import { Uncontrolled } from './uncontrolled.js'

type OnZoomChange = NonNullable<ControlledProps['onZoomChange']>
type ZoomContentType = NonNullable<ControlledProps['ZoomContent']>

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

  it('restores body scroll if unmounted while zoomed', async () => {
    document.body.style.overflow = 'auto'
    const { rerender, unmount } = await renderZoom({ isZoomed: false })

    await rerender({ isZoomed: true })
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('auto')
  })

  // Regression: https://github.com/rpearce/react-medium-image-zoom/issues/1085
  // The lock must not use `position: fixed`/`scrollTo`: those zero
  // `window.scrollY` and fire scroll events on lock/unlock that spuriously
  // trigger scroll-position-driven UI on close. `overflow: hidden` alone leaves
  // `window.scrollY` untouched.
  it('locks with overflow only and never scrolls the window', async () => {
    document.body.style.overflow = 'auto'
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(noop)

    try {
      const { rerender } = await renderZoom({ isZoomed: false })

      await rerender({ isZoomed: true })
      expect(document.body.style.overflow).toBe('hidden')
      expect(document.body.style.position).not.toBe('fixed')
      expect(document.body.style.top).toBe('')

      const modalImg = getPortalModalImg()
      if (modalImg !== null) await fireTransitionEnd(modalImg)

      await rerender({ isZoomed: false })
      if (modalImg !== null) await fireTransitionEnd(modalImg)

      // Restored to the original value, and the window was never scrolled.
      expect(document.body.style.overflow).toBe('auto')
      expect(scrollToSpy).not.toHaveBeenCalled()
    } finally {
      scrollToSpy.mockRestore()
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    }
  })

  // Regression: https://github.com/rpearce/react-medium-image-zoom/issues/448
  // When a parent passes an inline `ZoomContent={(props) => ...}` whose
  // function identity changes on every render, the ZoomContent subtree
  // remounts on each parent re-render, which remounts the modalImg.  The
  // transitionend handler must survive that remount, otherwise unzoom gets
  // stuck in UNLOADING, body scroll is never restored, and the dialog is
  // never closed.
  it('unzoom still completes when ZoomContent identity changes each render', async () => {
    document.body.style.overflow = 'auto'
    const { rerender } = await renderZoom({
      isZoomed: false,
      ZoomContent: props => (
        <>
          {props.buttonUnzoom}
          {props.img}
        </>
      ),
    })

    // Zoom in.  This re-render passes a *new* inline ZoomContent function
    // because renderZoom's rerender reconstructs the element each call.
    await rerender({
      isZoomed: true,
      ZoomContent: props => (
        <>
          {props.buttonUnzoom}
          {props.img}
        </>
      ),
    })
    expect(document.body.style.overflow).toBe('hidden')

    const modalImgZoomed = getPortalModalImg()
    if (modalImgZoomed !== null) await fireTransitionEnd(modalImgZoomed)
    expect(getPortalDialog()?.open).toBe(true)

    // Unzoom with *another* new inline ZoomContent.
    await rerender({
      isZoomed: false,
      ZoomContent: props => (
        <>
          {props.buttonUnzoom}
          {props.img}
        </>
      ),
    })

    const modalImgUnzoomed = getPortalModalImg()
    expect(modalImgUnzoomed).not.toBe(modalImgZoomed)
    if (modalImgUnzoomed !== null) await fireTransitionEnd(modalImgUnzoomed)

    expect(document.body.style.overflow).toBe('auto')
    expect(getPortalDialog()?.open).toBe(false)
  })

  it("passes width, height and style to ZoomContent's img", async () => {
    const imgs: Array<React.ReactElement | null> = []
    const ZoomContent: ZoomContentType = props => {
      imgs.push(props.img)
      return (
        <>
          {props.img}
          {props.buttonUnzoom}
        </>
      )
    }

    const first = await renderZoom({ ZoomContent })
    const img = imgs.at(-1)
    if (!React.isValidElement<React.ImgHTMLAttributes<HTMLImageElement>>(img))
      throw new Error('no img element')
    expect(img.type).toBe('img')
    expect(typeof img.props.width).toBe('number')
    expect(typeof img.props.height).toBe('number')
    expect(typeof img.props.style?.transform).toBe('string')
    first.unmount()

    imgs.length = 0
    await renderZoom({
      ZoomContent,
      children: (
        <svg height="150" width="200">
          <rect height="150" width="200" />
        </svg>
      ),
    })
    const svgImg = imgs.at(-1)
    if (!React.isValidElement<React.HTMLAttributes<HTMLDivElement>>(svgImg))
      throw new Error('no img element for the SVG source')
    expect(svgImg.type).toBe('div')
    expect(svgImg.props.style).toBeDefined()
  })

  it('lets a ZoomContent stop the content-click unzoom', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const ZoomContent: ZoomContentType = props => (
      <div
        role="presentation"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {props.img}
        {props.buttonUnzoom}
      </div>
    )
    const { rerender } = await renderZoom({ onZoomChange, ZoomContent })

    await rerender({ isZoomed: true })
    const modalImg = getPortalModalImg()
    if (modalImg === null) throw new Error('no modal img')
    await fireTransitionEnd(modalImg)
    onZoomChange.mockClear()

    act(() => {
      modalImg.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onZoomChange).not.toHaveBeenCalled()
  })

  // As in v5: unzooming by a click on the SVG clone doesn't also click
  // whatever is above <Zoom> (a card that selects, a row that navigates)
  it('keeps a click inside the zoomed SVG from reaching its ancestors', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const onAncestorClick = vi.fn<() => void>()
    const app = (isZoomed: boolean): React.ReactElement => (
      <div role="presentation" onClick={onAncestorClick}>
        <Controlled isZoomed={isZoomed} onZoomChange={onZoomChange}>
          <svg height="150" width="200">
            <circle cx="100" cy="75" r="50" />
          </svg>
        </Controlled>
      </div>
    )
    const { render } = await renderUi(app(false))

    await render(app(true))
    const modalImg = getPortalModalImg()
    if (modalImg === null) throw new Error('no modal img')
    await fireTransitionEnd(modalImg)
    const circle = modalImg.querySelector('svg circle')
    if (circle === null) throw new Error('no circle in the zoomed clone')
    onZoomChange.mockClear()

    act(() => {
      circle.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onZoomChange).toHaveBeenCalledTimes(1)
    expectCalledWith(onZoomChange, false)
    expect(onAncestorClick).not.toHaveBeenCalled()
  })

  it('zooms with a ZoomContent that renders img only while zoomed', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const ZoomContent: ZoomContentType = props => (
      <>
        {props.modalState === 'UNLOADED' ? null : props.img}
        {props.buttonUnzoom}
      </>
    )
    const { container, rerender } = await renderZoom({
      onZoomChange,
      ZoomContent,
    })
    expect(getPortalModalImg()).toBeNull()

    act(() => {
      container
        .querySelector('img')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expectCalledWith(onZoomChange, true)

    // The prop follows the request; the modal img appears with LOADING, and
    // its transition still ends the zoom
    await rerender({ isZoomed: true })
    expect(getPortalDialog()?.open).toBe(true)
    const modalImg = getPortalModalImg()
    if (modalImg === null) throw new Error('no modal img while zoomed')
    await fireTransitionEnd(modalImg)
    expect(getHost(container).state.modalState).toBe('LOADED')
  })

  it('calls onZoomChange(false) from the unzoom button', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    await renderZoomed(onZoomChange)

    act(() => {
      document
        .querySelector('[data-rmiz-btn-unzoom]')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expectCalledWith(onZoomChange, false)
  })

  it('applies zoomMargin and zoomImg changed together with isZoomed', async () => {
    const { container, rerender } = await renderZoom({ isZoomed: false })
    const host = getHost(container)
    const seen: Array<[string, string | null, string | null]> = []
    host.addEventListener('statechange', () => {
      seen.push([
        host.state.modalState,
        host.getAttribute('zoom-margin'),
        host.getAttribute('zoom-src'),
      ])
    })

    await rerender({
      isZoomed: true,
      zoomMargin: 60,
      zoomImg: { src: 'zoom-image.jpg' },
    })

    // The first LOADING report already carries the new values
    expect(seen.find(entry => entry[0] === 'LOADING')).toEqual([
      'LOADING',
      '60',
      'zoom-image.jpg',
    ])

    // ...so the zoom image preloads
    await act(async () => {
      await vi.waitFor(() => {
        if (!host.state.isZoomImgLoaded)
          throw new Error('waiting for the zoom image')
      })
    })
    expect(host.state.isZoomImgLoaded).toBe(true)
  })

  it('swaps zoomImg in at LOADED', async () => {
    const { container, rerender } = await renderZoom({
      isZoomed: false,
      zoomImg: { src: 'zoom-image.jpg' },
    })
    const host = getHost(container)

    await rerender({ isZoomed: true })
    await act(async () => {
      await vi.waitFor(() => {
        if (!host.state.isZoomImgLoaded)
          throw new Error('waiting for the zoom image')
      })
    })
    const modalImg = getPortalModalImg()
    if (modalImg === null) throw new Error('no modal img')
    // Loaded, but still LOADING: the source stays
    expect(modalImg.getAttribute('src')).toMatch(/test-image\.jpg$/)

    await fireTransitionEnd(modalImg)

    expect(getPortalModalImg()?.getAttribute('src')).toBe('zoom-image.jpg')
  })

  it('renders an inline host for wrapElement="span"', async () => {
    // Without styles.css every host would be inline, so load it
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)

    try {
      const { container } = await renderZoom({ wrapElement: 'span' })
      vi.mocked(window.getComputedStyle).mockRestore()

      expect(getComputedStyle(getHost(container)).display).toBe('inline')
    } finally {
      style.remove()
    }
  })

  it('labels the zoom button with the alt text', async () => {
    const { container } = await renderZoom()

    expect(
      container
        .querySelector('[data-rmiz-btn-zoom]')
        ?.getAttribute('aria-label'),
    ).toBe('Expand image: That Wanaka Tree')
  })

  // React 18+ runs componentWillUnmount when Suspense hides a subtree but
  // keeps its DOM. An Escape meanwhile unzooms the element behind React's
  // back, and React's state still says zoomed after the reveal.
  it('still zooms after being hidden by Suspense while zoomed', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const gate = Promise.withResolvers<void>()
    const app = (promise: Promise<void> | null): React.ReactElement => (
      <React.Suspense fallback={<p>Loading</p>}>
        <Uncontrolled onZoomChange={onZoomChange}>
          <img alt="That Wanaka Tree" src="test-image.jpg" />
        </Uncontrolled>
        {promise === null ? null : <Gate promise={promise} />}
      </React.Suspense>
    )
    const { container, render } = await renderUi(app(null))
    const host = getHost(container)
    const img = container.querySelector('img')
    if (img === null) throw new Error('no img')

    // Zoom
    await act(async () => {
      img.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await Promise.resolve()
    })
    const dialog = getPortalDialog()
    const modalImg = getPortalModalImg()
    if (dialog === null || modalImg === null) throw new Error('no modal')
    await fireTransitionEnd(modalImg)
    expect(dialog.open).toBe(true)

    // Hide, then Escape: the wrapper isn't listening, so the element unzooms
    // itself
    await render(app(gate.promise))
    expect(container.textContent).toBe('Loading')
    onZoomChange.mockClear()
    const closed = Promise.withResolvers<void>()
    dialog.addEventListener(
      'close',
      () => {
        closed.resolve()
      },
      { once: true },
    )
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })
    await fireTransitionEnd(modalImg)
    await closed.promise
    expect(onZoomChange).not.toHaveBeenCalled()
    expect([host.zoomed, dialog.open]).toEqual([false, false])

    // Reveal: the element zooms again, to match React's state
    await act(async () => {
      gate.resolve()
      await gate.promise
    })
    expect(container.textContent).not.toContain('Loading')
    expect([host.zoomed, dialog.open]).toEqual([true, true])

    // Zoom still works: Escape unzooms through React's state...
    await act(async () => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
      await Promise.resolve()
    })
    expectCalledWith(onZoomChange, false)
    const closedAgain = Promise.withResolvers<void>()
    dialog.addEventListener(
      'close',
      () => {
        closedAgain.resolve()
      },
      { once: true },
    )
    const modalImgAgain = getPortalModalImg()
    if (modalImgAgain === null) throw new Error('no modal img after reveal')
    await fireTransitionEnd(modalImgAgain)
    // The close requests unzoom once more, which reaches Uncontrolled
    await act(async () => {
      await closedAgain.promise
    })
    expect([host.hasAttribute('zoomed'), dialog.open]).toEqual([false, false])

    // ...and a click on the image zooms again
    onZoomChange.mockClear()
    await act(async () => {
      img.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await Promise.resolve()
    })

    expectCalledWith(onZoomChange, true)
    expect(dialog.open).toBe(true)
  })

  it('keeps dialog id, aria-labelledby and modal img id in step, also after a ZoomContent remount', async () => {
    // A new component each call, so each rerender remounts the content
    const content = (): ZoomContentType =>
      function Content(props) {
        return (
          <>
            {props.img}
            {props.buttonUnzoom}
          </>
        )
      }
    const { rerender } = await renderZoom({ ZoomContent: content() })

    await rerender({ isZoomed: true, ZoomContent: content() })
    const first = getPortalModalImg()
    if (first === null) throw new Error('no modal img')
    await fireTransitionEnd(first)
    expectIdsInStep()

    await rerender({ isZoomed: true, ZoomContent: content() })
    expect(getPortalModalImg()).not.toBe(first)
    expectIdsInStep()
  })

  it('returns focus to the zoom button after unzoom', async () => {
    const onZoomChange = vi.fn<OnZoomChange>()
    const { container, rerender } = await renderZoom({ onZoomChange })
    const button = container.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-zoom]',
    )
    if (button === null) throw new Error('no zoom button')
    // The button's shadow container shows once the element sees the content
    // in its dialog: a batch after it reports the image
    await act(async () => {
      await vi.waitFor(() => {
        button.focus()
        if (document.activeElement !== button)
          throw new Error('waiting for the zoom button to take focus')
      })
    })
    expect(document.activeElement).toBe(button)

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expectCalledWith(onZoomChange, true)
    await rerender({ isZoomed: true })
    const modalImg = getPortalModalImg()
    if (modalImg === null) throw new Error('no modal img')
    await fireTransitionEnd(modalImg)
    expect(getPortalDialog()?.contains(document.activeElement)).toBe(true)

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      )
    })
    expectCalledWith(onZoomChange, false)
    await rerender({ isZoomed: false })
    await fireTransitionEnd(modalImg)

    expect(document.activeElement).toBe(button)
  })

  it('ignores zoomchange from a nested zoom', async () => {
    const outer = vi.fn<OnZoomChange>()
    const inner = vi.fn<OnZoomChange>()
    // The outer image comes first, so each element tracks its own image
    const { container } = await renderZoom({
      onZoomChange: outer,
      children: (
        <>
          <img alt="Outer" src="outer.jpg" />
          <Controlled isZoomed={false} onZoomChange={inner}>
            <img alt="Inner" src="inner.jpg" />
          </Controlled>
        </>
      ),
    })

    act(() => {
      container
        .querySelector('img[alt="Inner"]')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expectCalledWith(inner, true)
    expect(outer).not.toHaveBeenCalled()
  })

  it('passes classDialog to the dialog', async () => {
    await renderZoom({ classDialog: 'custom-dialog' })

    expect(getPortalDialog()?.getAttribute('class')).toBe('custom-dialog')
  })

  // A portal into an iframe (react-frame-component): React creates the host
  // with the frame's document, whose registry doesn't know <image-zoom>, so
  // the host is a plain HTMLElement. As v5 did, show the image without zoom.
  it('renders without zoom UI where <image-zoom> is not defined', () => {
    const frame = document.createElement('iframe')
    document.body.appendChild(frame)
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = ReactDOM.createRoot(container)
    cleanup = () => {
      act(() => {
        root.unmount()
      })
      container.remove()
      frame.remove()
    }
    const frameDoc = frame.contentDocument
    if (frameDoc === null) throw new Error('no frame document')
    expect(frame.contentWindow?.customElements.get('image-zoom')).toBe(
      undefined,
    )

    act(() => {
      root.render(
        createPortal(
          <Controlled isZoomed={false}>
            <img alt="That Wanaka Tree" src="test-image.jpg" />
          </Controlled>,
          frameDoc.body,
        ),
      )
    })

    expect(frameDoc.querySelector('image-zoom img')).not.toBeNull()
    expect(frameDoc.querySelector('[data-rmiz-btn-zoom]')).toBeNull()
  })
})

describe('Controlled with server markup and StrictMode', () => {
  it('hydrates server markup, then zooms on a click', async () => {
    const h = await hydrateUi(
      <Uncontrolled>
        <img alt="That Wanaka Tree" src="test-image.jpg" />
      </Uncontrolled>,
      false,
    )
    expect(h.foundFirst).toBe(false)
    const img = h.container.querySelector('img')
    if (img === null) throw new Error('no img')

    await click(img)

    expect(getPortalDialog()?.open).toBe(true)
    expect(h.onRecoverableError).not.toHaveBeenCalled()
    expect(h.consoleError).not.toHaveBeenCalled()
  })

  it('hydrates server markup after the element found its image, then zooms on a click', async () => {
    const h = await hydrateUi(
      <Uncontrolled>
        <img alt="That Wanaka Tree" src="test-image.jpg" />
      </Uncontrolled>,
      true,
    )
    expect(h.foundFirst).toBe(true)
    const img = h.container.querySelector('img')
    if (img === null) throw new Error('no img')

    await click(img)

    expect(getPortalDialog()?.open).toBe(true)
    expect(h.onRecoverableError).not.toHaveBeenCalled()
    expect(h.consoleError).not.toHaveBeenCalled()
  })

  it('hydrates a zoomed, disabled Controlled with an SVG source', async () => {
    const h = await hydrateUi(
      <Controlled
        canSwipeToUnzoom={false}
        classDialog="custom-dialog"
        isDisabled
        isZoomed
        wrapElement="span"
        zoomImg={{ src: 'zoom-image.jpg' }}
      >
        <svg
          aria-label="A circle"
          height="100"
          role="img"
          viewBox="0 0 10 10"
          width="100"
        >
          <circle cx="5" cy="5" r="4" />
        </svg>
      </Controlled>,
      true,
    )
    expect(h.foundFirst).toBe(true)
    const ghost = getHost(h.container).shadowRoot?.querySelector(
      '[data-rmiz-ghost]',
    )
    if (!(ghost instanceof HTMLElement)) throw new Error('no ghost')

    // The zoom button shows once the element sees the hydrated content
    await act(async () => {
      await vi.waitFor(() => {
        if (ghost.hidden !== false)
          throw new Error('waiting for the zoom button')
      })
    })

    expect(ghost.hidden).toBe(false)
    expect(getPortalDialog()?.getAttribute('class')).toBe('custom-dialog')
    expect(h.onRecoverableError).not.toHaveBeenCalled()
    expect(h.consoleError).not.toHaveBeenCalled()
  })

  it('zooms and unzooms twice in StrictMode, and unlocks scrolling at unmount', async () => {
    document.body.style.overflow = 'auto'
    const { container, unmount } = await renderUi(
      <React.StrictMode>
        <Uncontrolled>
          <img alt="That Wanaka Tree" src="test-image.jpg" />
        </Uncontrolled>
      </React.StrictMode>,
    )
    const button = container.querySelector('[data-rmiz-btn-zoom]')
    const img = container.querySelector('img')
    if (button === null || img === null) throw new Error('no zoom button')

    await zoomAndUnzoom(button)
    await zoomAndUnzoom(img)
    expect(document.querySelectorAll('[data-rmiz-modal]')).toHaveLength(1)
    expect(document.querySelectorAll('[data-rmiz-modal-content]')).toHaveLength(
      1,
    )

    await click(img)
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
  mockComputedStyle({
    display: 'block',
    transitionDuration: '0.3s',
    objectFit: 'fill',
    objectPosition: '50% 50%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'auto',
    transform: 'none',
  })

  // test-image.jpg doesn't exist, so an Image never loads and
  // naturalWidth/Height stay 0 → NaN in style calculations.  Give every
  // decoded Image realistic dimensions.
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
    el.dispatchEvent(new Event('transitionend', { bubbles: true }))
    await Promise.resolve()
  })
}

function getHost(container: HTMLElement): ImageZoomElement {
  const host = container.querySelector('image-zoom')
  if (host === null) throw new Error('no <image-zoom>')
  return host
}

/**
 * Suspends until `promise` settles
 */
function Gate(props: { promise: Promise<void> }): null {
  React.use(props.promise)
  return null
}

/**
 * test-image.jpg never loads.  Pin currentSrc, which getImgSrc reads (an
 * empty one means no image), mock geometry so style calculations don't
 * produce NaN, then fire load and wait until each image's element reports
 * it: the element batches image loads in a task of its own, which act
 * doesn't flush.
 */
async function loadImages(imgs: HTMLImageElement[]): Promise<void> {
  if (imgs.length === 0) return

  for (const img of imgs) {
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
  }

  await act(async () => {
    for (const img of imgs) {
      img.dispatchEvent(new Event('load'))
    }
    await vi.waitFor(() => {
      if (imgs.some(img => img.closest('image-zoom')?.state.hasImage !== true))
        throw new Error('waiting for the image')
    })
  })
}

interface UiResult {
  container: HTMLDivElement
  render: (ui: React.ReactElement) => Promise<void>
  unmount: () => void
}

/**
 * Mount any tree, then load every <img> in it
 */
async function renderUi(ui: React.ReactElement): Promise<UiResult> {
  mockBrowserApis()

  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = ReactDOM.createRoot(container)

  act(() => {
    root.render(ui)
  })

  await loadImages([...container.querySelectorAll('img')])

  const unmount = (): void => {
    act(() => {
      root.unmount()
    })
    container.remove()
  }

  cleanup = unmount

  return {
    container,
    render: async (next: React.ReactElement) => {
      await act(async () => {
        root.render(next)
        await Promise.resolve()
      })
    },
    unmount,
  }
}

interface RenderResult {
  container: HTMLDivElement
  rerender: (newProps: Partial<ControlledProps>) => Promise<void>
  unmount: () => void
}

async function renderZoom(
  props: Partial<ControlledProps> = {},
): Promise<RenderResult> {
  const defaultProps = {
    isZoomed: false as boolean,
    onZoomChange: vi.fn<OnZoomChange>(),
    ...props,
  }

  const children = props.children ?? (
    <img alt="That Wanaka Tree" src="test-image.jpg" />
  )

  const result = await renderUi(
    <Controlled {...defaultProps}>{children}</Controlled>,
  )

  return {
    container: result.container,
    rerender: async (newProps: Partial<ControlledProps>) => {
      const merged = { ...defaultProps, ...newProps }
      await result.render(<Controlled {...merged}>{children}</Controlled>)
    },
    unmount: result.unmount,
  }
}

type OnRecoverableError = NonNullable<
  ReactDOM.HydrationOptions['onRecoverableError']
>

interface HydrateResult {
  container: HTMLDivElement
  // Whether the element had found its image when hydration began
  foundFirst: boolean
  onRecoverableError: Mock<OnRecoverableError>
  consoleError: MockInstance<typeof console.error>
}

/**
 * Server-render `ui` and insert the markup, where each <image-zoom> upgrades
 * and starts tracking its image. With `findFirst`, the element finds its
 * images before hydration, otherwise after it. console.error is stubbed
 * throughout, so a test can expect that it never ran.
 */
async function hydrateUi(
  ui: React.ReactElement,
  findFirst: boolean,
): Promise<HydrateResult> {
  mockBrowserApis()
  const consoleError = vi.spyOn(console, 'error').mockImplementation(noop)
  const onRecoverableError = vi.fn<OnRecoverableError>()

  const container = document.createElement('div')
  document.body.appendChild(container)
  container.innerHTML = renderToString(ui)
  const imgs = [...container.querySelectorAll('img')]
  if (findFirst) await loadImages(imgs)
  const foundFirst = getHost(container).state.hasImage

  let root: ReactDOM.Root | null = null
  act(() => {
    root = ReactDOM.hydrateRoot(container, ui, { onRecoverableError })
  })
  cleanup = () => {
    act(() => {
      root?.unmount()
    })
    container.remove()
  }

  if (!findFirst) await loadImages(imgs)
  return { container, foundFirst, onRecoverableError, consoleError }
}

async function click(el: Element): Promise<void> {
  await act(async () => {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Promise.resolve()
  })
}

/**
 * Zoom with a click on `trigger` and end the transition, then unzoom with
 * Escape, end that transition and wait for the dialog's close, whose unzoom
 * request reaches Uncontrolled
 */
async function zoomAndUnzoom(trigger: Element): Promise<void> {
  await click(trigger)
  const dialog = getPortalDialog()
  const modalImg = getPortalModalImg()
  if (dialog === null || modalImg === null) throw new Error('no modal')
  await fireTransitionEnd(modalImg)
  expect(dialog.open).toBe(true)

  const closed = Promise.withResolvers<void>()
  dialog.addEventListener(
    'close',
    () => {
      closed.resolve()
    },
    { once: true },
  )
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
  })
  await fireTransitionEnd(modalImg)
  await act(async () => {
    await closed.promise
  })
  expect(dialog.open).toBe(false)
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

/**
 * The dialog's id and aria-labelledby, and the modal img's id, all name the
 * same instance
 */
function expectIdsInStep(): void {
  const dialog = getPortalDialog()
  const modalImgId = getPortalModalImg()?.id ?? ''
  expect(modalImgId).toMatch(/^rmiz-modal-img-./)
  expect(dialog?.getAttribute('aria-labelledby')).toBe(modalImgId)
  expect(dialog?.id).toBe(modalImgId.replace('rmiz-modal-img-', 'rmiz-modal-'))
}
