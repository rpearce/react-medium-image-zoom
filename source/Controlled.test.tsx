import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import ControlledZoom from './Controlled'

test('when closed and then open', () => {
  jest.useFakeTimers()

  const handleZoomChange = jest.fn()
  const { getByLabelText, getByRole, rerender } = render(
    <ControlledZoom isZoomed={false} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()

  fireEvent.click(openTrigger)
  expect(handleZoomChange).toHaveBeenLastCalledWith(true)

  rerender(
    <ControlledZoom isZoomed={true} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  expect(document.body).toMatchSnapshot()

  // nothing should happen
  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')
  const modal = getByRole('dialog')
  expect(closeTrigger).toBeVisible()

  fireEvent.click(closeTrigger)
  expect(handleZoomChange).toHaveBeenLastCalledWith(false)

  rerender(
    <ControlledZoom isZoomed={false} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  expect(document.body).toMatchSnapshot()

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})

test('when open and then closed', () => {
  const handleZoomChange = jest.fn()
  const { getByLabelText, getByRole, rerender } = render(
    <ControlledZoom isZoomed={true} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const closeTrigger = getByLabelText('Unzoom image')
  const modal = getByRole('dialog')
  expect(closeTrigger).toBeVisible()

  fireEvent.click(closeTrigger)
  expect(handleZoomChange).toHaveBeenLastCalledWith(false)

  rerender(
    <ControlledZoom isZoomed={false} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  expect(document.body).toMatchSnapshot()

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()

  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()
})

test('sends unzoom message when ESC key pressed', () => {
  const handleZoomChange = jest.fn()
  const { getByRole } = render(
    <ControlledZoom isZoomed={true} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  // should do nothing
  fireEvent.keyDown(document, { key: 'ArrowLeft' })
  expect(handleZoomChange).not.toHaveBeenCalled()

  // just in case
  expect(modal).toBeVisible()

  fireEvent.keyDown(document, { key: 'Escape' })
  expect(handleZoomChange).toHaveBeenLastCalledWith(false)
})

test('sends unzoom message when scrolled', () => {
  const handleZoomChange = jest.fn()
  const { getByRole, rerender } = render(
    <ControlledZoom isZoomed={true} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  expect(handleZoomChange).not.toHaveBeenCalled()

  act(() => {
    window.dispatchEvent(new Event('scroll', {}))
  })

  rerender(
    <ControlledZoom isZoomed={false} onZoomChange={handleZoomChange}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  act(() => {
    // run scroll again to emulate actual scroll events firing
    window.dispatchEvent(new Event('scroll', {}))
    jest.advanceTimersByTime(300)
  })

  expect(handleZoomChange).toHaveBeenLastCalledWith(false)
})

test('custom open/close text', () => {
  const { getByLabelText, rerender } = render(
    <ControlledZoom
      closeText="Close me"
      isZoomed={false}
      onZoomChange={jest.fn()}
      openText="Open me"
    >
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const openTrigger = getByLabelText('Open me')
  expect(openTrigger).toBeVisible()
  expect(document.body).toMatchSnapshot()

  rerender(
    <ControlledZoom
      closeText="Close me"
      isZoomed={true}
      onZoomChange={jest.fn()}
      openText="Open me"
    >
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  const closeTrigger = getByLabelText('Close me')
  expect(closeTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()
})

test('renders without browser environment', () => {
  const html = renderToString(
    <ControlledZoom isZoomed={false} onZoomChange={jest.fn()}>
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  document.body.innerHTML = html
  expect(document.body).toMatchSnapshot()
})

test('renders with different props', () => {
  const html = renderToString(
    <ControlledZoom
      isZoomed={false}
      overlayBgColorEnd="rgba(255, 255, 255, 0.95)"
      overlayBgColorStart="rgba(255, 255, 255, 0)"
      transitionDuration={400}
      wrapElement="span"
      zoomMargin={1}
      zoomZindex={2147483648}
    >
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledZoom>
  )

  document.body.innerHTML = html
  expect(document.body).toMatchSnapshot()
})
