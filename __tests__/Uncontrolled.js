import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
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
  expect(await testA11y(document.body)).toEqual(true)

  fireEvent.click(openTrigger)

  // should do nothing
  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')

  expect(closeTrigger).toBeVisible()
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

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')
  const modal = getByRole('dialog')

  expect(closeTrigger).toBeVisible()

  fireEvent.click(closeTrigger)

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
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

  fireEvent.click(closeTrigger)

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
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

  // should do nothing
  fireEvent.keyDown(document, { key: 'ArrowLeft' })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).toBeVisible()

  fireEvent.keyDown(document, { key: 'Escape' })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()

  fireEvent.click(openTrigger)
  expect(modal).toBeVisible()

  fireEvent.keyDown(document, { keyCode: 27 })

  act(() => {
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()
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

  act(() => {
    window.dispatchEvent(new Event('scroll', {}))
  })

  act(() => {
    // run scroll again to emulate actual scroll events firing
    window.dispatchEvent(new Event('scroll', {}))
    jest.advanceTimersByTime(300)
  })

  expect(modal).not.toBeInTheDocument()
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

  fireEvent.click(openTrigger)
  const modal = getByRole('dialog')
  expect(modal).toBeVisible()

  act(() => {
    jest.advanceTimersByTime(300)
  })

  const wrapEl = modal.querySelector('div')
  expect(wrapEl.style.transform).toContain('rotate(45deg)')
})
