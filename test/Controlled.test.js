import React, { createRef } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Container, { ImageZoom } from '../source/Controlled'

describe('ImageZoom – Controlled', () => {

  describe('container', () => {

    it('renders', () => {
      const wrapper = shallow(
        <Container
        />
      )
      const tree = toJson(wrapper)
      expect(tree).toMatchSnapshot()
    })

    it('handles ref', () => {
      const ref = createRef()
      renderIntoDocument(
        <Container
          ref={ref}
        />
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

  })

  describe('component', () => {

    it('renders, no children', () => {
      const wrapper = shallow(
        <ImageZoom
        />
      )
      const tree = toJson(wrapper)
      expect(tree).toMatchSnapshot()
    })

  })

})
