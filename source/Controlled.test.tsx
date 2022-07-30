describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('google')
  })
})

//import React from 'react'
//import userEvent from '@testing-library/user-event'
//import { act, render, waitFor } from '@testing-library/react'
//import { Controlled as Zoom } from '../source'

//test('The happy path', async () => {
//  const user = userEvent.setup()

//  const { rerender } = render(
//    <Zoom isZoomed={false}>
//      <img alt="foo" src="foo.jpg" width="500" />
//    </Zoom>
//  )

//  await waitFor(() => {
//    // Zoom button should be present
//    expect(findBtnZoom()).toBeVisible()

//    // Dialog overlay should be marked as hidden
//    expect(findModalOverlay('hidden')).toBeInTheDocument()
//  })

//  await act(async () => {
//    await user.click(findBtnZoom())
//  })

//  rerender(
//    <Zoom isZoomed={true}>
//      <img alt="foo" src="foo.jpg" width="500" />
//    </Zoom>
//  )

//  await waitFor(() => {
//    // Dialog overlay should be marked as visible
//    expect(findModalOverlay('visible')).toBeInTheDocument()

//    // Unzoom button should be present
//    expect(findBtnUnzoom()).toBeInTheDocument()
//  })
//})

//const q = (query: string) => document.querySelector(query)

//const findBtnZoom = () =>
//  q('[aria-label="Expand image: foo"]') as HTMLButtonElement

//const findBtnUnzoom = () =>
//  q('[aria-label="Minimize image"]') as HTMLButtonElement

//const findModalOverlay = (state: 'hidden' | 'visible') =>
//  q(`[data-rmiz-modal-overlay="${state}"]`) as HTMLDivElement

////const findOpenDialog = () => q('dialog') as HTMLDialogElement
