import { render } from '@testing-library/react'
import React, { createRef } from 'react'
import ControlledActivated from '../source/ControlledActivated'

test('uses pseudo-parent when no parentRef.current', async () => {
  render(
    <ControlledActivated
      closeText="Unzoom image"
      isActive
      onLoad={jest.fn()}
      onUnload={jest.fn()}
      onZoomChange={jest.fn()}
      overlayBgColorEnd="rgba(255, 255, 255, 0.95)"
      overlayBgColorStart="rgba(255, 255, 255, 0)"
      parentRef={createRef<null>()}
      portalEl={document.body}
      scrollableEl={window}
      transitionDuration={300}
      zoomMargin={0}
      zoomZindex={2147483647}
    >
      <img alt="foo" src="foo.jpg" width="500" />
    </ControlledActivated>
  )

  expect(document.body).toMatchSnapshot()
})
