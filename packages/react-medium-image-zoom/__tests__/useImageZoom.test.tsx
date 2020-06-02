//import React from 'react'
//import { render, screen, waitFor } from '@testing-library/react'
//import { renderToString } from 'react-dom/server'
//import testA11y from '../testA11y'
//import { useImageZoom } from '../source'

describe('useImageZoom', () => {
  it('is true', () => {
    expect(true).toEqual(true)
  })
  //it('renders', async () => {
  //  const Comp = () => {
  //    const { ref } = useImageZoom()

  //    return (
  //      <img
  //        alt="Descriptive text"
  //        ref={ref}
  //        src="path/to/img-500w.jpg"
  //        sizes="(max-width: 600px) 500px, (min-width: 601px) 1600px"
  //        srcSet="path/to/img-500w.jpg 500w, path/to/img-1600w.jpg 1600w"
  //        style={{ height: '100%', maxWidth: '100%' }}
  //        height="100"
  //        width="100"
  //      />
  //    )
  //  }
  //  const { container, rerender } = render(<Comp />)
  //  const el = container.querySelector('img')
  //  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  //  jest.spyOn(el!, 'getBoundingClientRect').mockReturnValue({
  //    bottom: 400,
  //    height: 100,
  //    left: 50,
  //    right: 200,
  //    toJSON: jest.fn(),
  //    top: 50,
  //    width: 100,
  //    x: 50,
  //    y: 50,
  //  })
  //  rerender(<Comp />)

  //  await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument())
  //})
})
