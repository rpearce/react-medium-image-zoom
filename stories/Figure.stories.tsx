import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import { imgHobbiton } from './images'

export default {
  title: '<figure>',
  component: Zoom,
  parameters: {},
} as ComponentMeta<typeof Zoom>

export const Figure: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>{'Zoom an <img /> in a <figure> element'}</h1>
    <div className="mw-600">
      <figure>
        <Zoom {...props}>
          <img
            alt={imgHobbiton.alt}
            src={imgHobbiton.src}
            width="500"
          />
        </Zoom>
        <figcaption>
          <a href="https://www.newzealand.com/in/plan/business/hobbiton-movie-set-tours/">
            Hobbiton
          </a>
        </figcaption>
      </figure>
    </div>
  </main>
)
