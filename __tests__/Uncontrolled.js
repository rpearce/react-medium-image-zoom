import React from 'react'
import axe from 'axe-core'
import { act, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Zoom from '../source'

const testA11y = html =>
  new Promise((resolve, reject) => {
    axe.run(html, {}, (err, { violations }) => {
      if (err) {
        reject(err)
      }
      if (violations.length > 0) {
        reject(violations)
      }
      resolve(true)
    })
  })

test('is accessible with defaults & <img />', async () => {
  const { getByLabelText } = render(
    <Zoom>
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Zoom image')

  expect(openTrigger).toBeVisible()
  expect(await testA11y(document.body)).toEqual(true)

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Unzoom image')

  expect(closeTrigger).toBeVisible()
  expect(await testA11y(document.body)).toEqual(true)
})

test('is accessible with custom open/close text & <img />', async () => {
  const { container, getByLabelText } = render(
    <Zoom closeText="Close me" openText="Open me">
      <img alt="foo" src="foo.jpg" width="500" />
    </Zoom>
  )
  const openTrigger = getByLabelText('Open me')

  expect(openTrigger).toBeVisible()
  expect(await testA11y(container)).toEqual(true)

  fireEvent.click(openTrigger)

  const closeTrigger = getByLabelText('Close me')

  expect(closeTrigger).toBeVisible()
  expect(await testA11y(document.body)).toEqual(true)
})

test('with defaults & <img />', () => {
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
    jest.runAllTimers()
  })

  expect(closeTrigger).not.toBeInTheDocument()
  expect(modal).not.toBeInTheDocument()
})

test('with custom open/close text & <img />', async () => {
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
