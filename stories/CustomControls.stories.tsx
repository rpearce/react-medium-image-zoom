import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'

import { Controlled as Zoom } from '../source'
import '../source/styles.css'
import './base.css'

import { imgThatWanakaTree } from './images'

const meta: Meta<typeof Zoom> = {
  title: 'Custom Controls',
  component: Zoom,
}

export default meta

// =============================================================================

type Story = StoryFn<typeof Zoom>

export const JAndKZoomUnzoom: Story = props => {
  const [isZoomed, setIsZoomed] = React.useState(false)

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'j' || e.keyCode === 74) {
      setIsZoomed(true)
    } else if (e.key === 'k' || e.keyCode === 75) {
      setIsZoomed(false)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <main aria-label="Story">
      <h1>Custom zoom and unzoom controls</h1>
      <div className="jk mw-600">
        <p>
          Click into this window, then use &quot;j&quot; to zoom and
          &quot;k&quot; to unzoom
        </p>
        <Zoom
          {...props}
          isZoomed={isZoomed}
          onZoomChange={undefined /* do nothing */}
        >
          <img
            alt={imgThatWanakaTree.alt}
            src={imgThatWanakaTree.src}
            width="500"
          />
        </Zoom>
      </div>
    </main>
  )
}
