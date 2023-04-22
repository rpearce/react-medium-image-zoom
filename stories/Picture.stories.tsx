import React from 'react'
import type { Meta } from '@storybook/react'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import { imgNzBeach, imgTeAraiPoint } from './images'

const meta: Meta<typeof Zoom> = {
  title: '<picture>',
  component: Zoom,
}

export default meta

export const Picture = (props) => (
  <main aria-label="Story">
    <h1>{'Zoom an <img /> in a <picture> element with a <source />'}</h1>
    <div className="mw-600">
      <p>Hint: reduce the window&apos;s width to see a portrait picture, instead.</p>
      <Zoom {...props}>
        <picture>
          <source media="(max-width: 800px)" srcSet={imgTeAraiPoint.src} />
          <img
            alt={imgNzBeach.alt}
            src={imgNzBeach.src}
            width="500"
          />
        </picture>
      </Zoom>
    </div>
  </main>
)
