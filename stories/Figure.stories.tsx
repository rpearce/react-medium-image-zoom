import React from 'react'
import type { Meta } from '@storybook/react-webpack5'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import { imgHobbiton } from './images'

const meta: Meta<typeof Zoom> = {
  title: '<figure>',
  component: Zoom,
}

export default meta

export const Figure = (props) => (
  <main aria-label="Story">
    <h1>{'Zoom an <img /> in a <figure> element'}</h1>
    <div className="mw-600">
      <figure>
        <Zoom {...props}>
          <img alt={imgHobbiton.alt} src={imgHobbiton.src} width="500" />
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
