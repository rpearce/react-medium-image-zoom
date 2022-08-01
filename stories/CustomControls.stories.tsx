import React, { useCallback, useEffect, useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Controlled as Zoom } from '../source'
import '../source/styles.css'
import './base.css'

import { imgThatWanakaTree } from './images'

export default {
  title: 'Custom Controls',
  component: Zoom,
  parameters: {},
} as ComponentMeta<typeof Zoom>

export const JAndKZoomUnzoom: ComponentStory<typeof Zoom> = (props) => {
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
    <div>
      <h1>Custom zoom and unzoom controls</h1>
      <div className="jk mw-600">
        <p>Click into this window, then use &quot;j&quot; to zoom and &quot;k&quot; to unzoom</p>
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
    </div>
  )
}
