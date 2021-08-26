import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Zoom from '../source'
import testA11y from '../testA11y'

test('is accessible with defaults & <img />', async () => {
  const { getByLabelText } = render(
    <main>
      <Zoom>
        <img alt="foo" src="foo.jpg" width="500" />
      </Zoom>
    </main>
  )
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()
  expect(await testA11y(document.body)).toEqual(true)

  fireEvent.click(openTrigger)

  // should do nothing
  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')
  expect(closeTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()
  expect(await testA11y(document.body)).toEqual(true)
})

test('is accessible with custom open/close text & <img />', async () => {
  const { container, getByLabelText } = render(
    <main>
      <Zoom closeText="Close me" openText="Open me">
        <img alt="foo" src="foo.jpg" width="500" />
      </Zoom>
    </main>
  )
  const openTrigger = getByLabelText('Open me')

  expect(openTrigger).toBeVisible()
  expect(await testA11y(container)).toEqual(true)

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Close me')
  expect(closeTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()
  expect(await testA11y(document.body)).toEqual(true)
})

test('zooms/unzooms with defaults & <img />', () => {
  jest.useFakeTimers()

  const { getByLabelText, getByRole } = render(
    <Zoom>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')
  const modal = getByRole('dialog')

  expect(closeTrigger).toBeVisible()
  expect(document.body).toMatchSnapshot()

  fireEvent.click(closeTrigger)

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})

test('zooms/unzooms with custom open/close text & <img />', async () => {
  jest.useFakeTimers()

  const { getByLabelText, getByRole } = render(
    <Zoom closeText="Close me" openText="Open me">
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Open me')
  expect(openTrigger).toBeVisible()

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Close me')
  const modal = getByRole('dialog')

  expect(closeTrigger).toBeVisible()
  expect(modal).toBeVisible()
  expect(document.body).toMatchSnapshot()

  fireEvent.click(closeTrigger)

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})

test('unzooms using ESC key', () => {
  jest.useFakeTimers()

  const { getByLabelText, getByRole } = render(
    <Zoom>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  fireEvent.click(openTrigger)
  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  expect(document.body).toMatchSnapshot()

  // should do nothing
  fireEvent.keyDown(document, { key: 'ArrowLeft' })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).toBeVisible()
  expect(document.body).toMatchSnapshot()

  fireEvent.keyDown(document, { key: 'Escape' })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()

  fireEvent.click(openTrigger)
  expect(modal).toBeVisible()

  fireEvent.keyDown(document, { keyCode: 27 })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})

test('unzooms on scroll', () => {
  jest.useFakeTimers()

  const { getByLabelText, getByRole } = render(
    <Zoom>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  fireEvent.click(openTrigger)
  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  expect(document.body).toMatchSnapshot()

  act(() => {
    window.dispatchEvent(new Event('scroll', {}))
  })

  act(() => {
    // run scroll again to emulate actual scroll events firing
    window.dispatchEvent(new Event('scroll', {}))
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()
  expect(document.body).toMatchSnapshot()
})

test('passes on original transform style', () => {
  jest.useFakeTimers()

  const { getByLabelText, getByRole } = render(
    <Zoom wrapStyle={{ transform: 'rotate(45deg)' }}>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  expect(document.body).toMatchSnapshot()

  fireEvent.click(openTrigger)
  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  act(() => {
    jest.advanceTimersByTime(300)
  })

  const wrapEl = modal.querySelector<HTMLElement>('[data-rmiz-modal-content]')
  expect(wrapEl?.style?.transform).toContain('rotate(45deg)')

  expect(document.body).toMatchSnapshot()
})

test('renders without browser environment', () => {
  const html = renderToString(
    <Zoom>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )

  document.body.innerHTML = html
  expect(document.body).toMatchSnapshot()
})

test('render with different props', () => {
  const html = renderToString(
    <Zoom
      overlayBgColorEnd="rgba(255, 255, 255, 0.95)"
      overlayBgColorStart="rgba(255, 255, 255, 0)"
      transitionDuration={400}
      wrapElement="span"
      zoomMargin={1}
      zoomZindex={2147483648}
    >
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )

  document.body.innerHTML = html
  expect(document.body).toMatchSnapshot()
})
