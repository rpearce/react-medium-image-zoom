import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import { imgNzBeach, imgTeAraiPoint } from './images'

export default {
  title: '<picture>',
  component: Zoom,
  parameters: {},
} as ComponentMeta<typeof Zoom>

export const Picture: ComponentStory<typeof Zoom> = (props) => (
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
