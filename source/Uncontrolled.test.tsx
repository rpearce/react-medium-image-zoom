import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Zoom from '../source'

const ZoomImgTest = () => (
  <Zoom modalLabelText={`Zoom modal`}>
    <img src="foo.jpg" alt="Cat peek a boo" width="500" />
  </Zoom>
)

test('<Uncontrolled /> toggles image view in a modal', async () => {
  const { getByLabelText, getByAltText } = render(<ZoomImgTest />)

  // * open image in modal button
  const openTrigger = getByLabelText('Zoom image')
  expect(openTrigger).toBeVisible()

  fireEvent.click(openTrigger)
  // should do nothing
  fireEvent.click(openTrigger)

  // * close modal using button
  const closeTrigger = getByLabelText('Unzoom image')
  expect(closeTrigger).toBeVisible()

  // * close modal using button
  fireEvent.click(closeTrigger)
  expect(closeTrigger).not.toBeVisible()

  // * open modal
  fireEvent.click(openTrigger)
  const modal = getByLabelText('Zoom modal')
  expect(modal).toBeVisible()

  // * close modal using esc key
  fireEvent.keyDown(modal, {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    charCode: 27,
  })
  expect(modal).not.toBeVisible()

  // * open modal
  fireEvent.click(openTrigger)
  expect(modal).toBeVisible()

  // * mouse down on image to close ( also used for useClickAway )
  // * useClickAway -> https://stackoverflow.com/questions/60424125/cannot-unit-test-useclickaway-with-reacttestutils
  const imgTag = getByAltText('Cat peek a boo')
  fireEvent.mouseDown(imgTag)
  expect(modal).not.toBeVisible()
})
