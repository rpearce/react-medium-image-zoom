import React, { useCallback, useEffect, useState } from 'react'
import type { Meta } from '@storybook/react'

import { Controlled as Zoom } from '../source'
import '../source/styles.css'
import './base.css'

import { imgThatWanakaTree } from './images'

const meta: Meta<typeof Zoom> = {
  title: 'Custom Controls',
  component: Zoom,
}

export default meta

export const JAndKZoomUnzoom = (props) => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'j' || e.keyCode === 74) {
      setIsZoomed(true)
    } else if (e.key === 'k' || e.keyCode === 75) {
      setIsZoomed(false)
    }
  }, [])

  useEffect(() => {
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
