import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
//import { renderToString } from 'react-dom/server'
//import testA11y from '../testA11y'
import { useImageZoom } from '../source'

describe('useImageZoom', () => {
  it('is true', () => {
    const Comp = () => {
      const { ref } = useImageZoom()

      return (
        <img
          alt="Descriptive text"
          ref={ref}
          src="path/to/img-500w.jpg"
          srcSet="path/to/img-500w.jpg 500w, path/to/img-1600w.jpg 1600w"
          sizes="(max-width: 600px) 500px, (min-width: 601px) 1600px"
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      )
    }

    const { asFragment } = render(<Comp />)
    expect(asFragment()).toMatchSnapshot()
  })
})
