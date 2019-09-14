/* eslint react/prop-types: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import './.storybook/base.css'
import Zoom from './dist/index.esm'
import nzBeach from './static/rod-long-4dcsLxQxSHY-unsplash.jpg'

const imgNZ = { alt: 'New Zealand Beach', src: nzBeach }

const stories = storiesOf('react-medium-image-zoom', module)

stories.addDecorator(withA11y)
stories.addDecorator(withKnobs)

stories.add('with defaults', () => (
  <ImgStory>
    <img src={imgNZ.src} alt={imgNZ.alt} width="500" />
  </ImgStory>
))

const ImgStory = props => {
  return (
    <div>
      <h1>react-medium-image-zoom</h1>
      <section>
        <Zoom {...props} />
      </section>
    </div>
  )
}
