import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'

import Zoom from 'react-medium-image-zoom'
import '@rpearce/image-zoom/styles.css'
import './base.css'

import { imgThatWanakaTree, imgTeAraiPoint } from './images'

const meta: Meta<typeof Zoom> = {
  title: 'CSS Transform',
  component: Zoom,
}

export default meta

type Story = StoryFn<typeof Zoom>

// =============================================================================

export const MirrorHorizontal: Story = props => (
  <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scaleX(-1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored horizontally, matching the
        original.
      </p>
      <Zoom {...props}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          style={{ transform: 'scaleX(-1)' }}
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const MirrorVertical: Story = props => (
  <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scaleY(-1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored vertically, matching the
        original.
      </p>
      <Zoom {...props}>
        <img
          alt={imgTeAraiPoint.alt}
          src={imgTeAraiPoint.src}
          height="320"
          style={{ transform: 'scaleY(-1)' }}
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const MirrorBoth: Story = props => (
  <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scale(-1, -1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored both horizontally and
        vertically, matching the original.
      </p>
      <Zoom {...props}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          style={{ transform: 'scale(-1, -1)' }}
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)
