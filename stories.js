/* eslint react/prop-types: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import './.storybook/base.css'
import ImgZoom from './dist/index.esm'

const stories = storiesOf('react-medium-image-zoom', module)

stories.addDecorator(withA11y)
stories.addDecorator(withKnobs)

stories.add('with defaults', () => <ImgZoomStory />)

const ImgZoomStory = props => {
  return (
    <div>
      <h1>react-medium-image-zoom</h1>
      <section>
        <ImgZoom {...props} />
      </section>
    </div>
  )
}
