import React from 'react'

import type { ModalState } from './types.js'

/**
 * Wire up wheel, touch/swipe, and keyboard listeners
 * based on the current modal state.
 */
export function useZoomEvents(
  modalState: ModalState,
  onUnzoom: (e: Event) => void,
  canSwipeToUnzoom: boolean,
  swipeToUnzoomThreshold: number,
): void {
  const isScalingRef = React.useRef(false)
  const touchYStartRef = React.useRef<number | undefined>(undefined)
  const touchYEndRef = React.useRef<number | undefined>(undefined)

  const onUnzoomRef = React.useRef(onUnzoom)
  const canSwipeRef = React.useRef(canSwipeToUnzoom)
  const thresholdRef = React.useRef(swipeToUnzoomThreshold)

  React.useEffect(() => {
    onUnzoomRef.current = onUnzoom
    canSwipeRef.current = canSwipeToUnzoom
    thresholdRef.current = swipeToUnzoomThreshold
  })

  // Keyboard + touch: active during LOADING and LOADED
  React.useEffect(() => {
    if (modalState !== 'LOADING' && modalState !== 'LOADED') {
      return
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onUnzoomRef.current(e)
      }
    }

    const handleTouchStart = (e: TouchEvent): void => {
      if (e.touches.length > 1) {
        isScalingRef.current = true
        return
      }

      const { changedTouches } = e
      const [changedTouch] = changedTouches
      if (changedTouches.length === 1 && changedTouch !== undefined) {
        const { screenY } = changedTouch
        touchYStartRef.current = screenY
      }
    }

    const handleTouchMove = (e: TouchEvent): void => {
      const browserScale = window.visualViewport?.scale ?? 1
      const { changedTouches } = e
      const [changedTouchMove] = changedTouches

      if (
        canSwipeRef.current &&
        !isScalingRef.current &&
        browserScale <= 1 &&
        touchYStartRef.current != null &&
        changedTouchMove !== undefined
      ) {
        const { screenY } = changedTouchMove
        touchYEndRef.current = screenY

        const max = Math.max(touchYStartRef.current, touchYEndRef.current)
        const min = Math.min(touchYStartRef.current, touchYEndRef.current)
        const delta = Math.abs(max - min)

        if (delta > thresholdRef.current) {
          touchYStartRef.current = undefined
          touchYEndRef.current = undefined
          onUnzoomRef.current(e)
        }
      }
    }

    const handleTouchEnd = (): void => {
      isScalingRef.current = false
      touchYStartRef.current = undefined
      touchYEndRef.current = undefined
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [modalState])

  // Wheel: only active during LOADED
  React.useEffect(() => {
    if (modalState !== 'LOADED') return

    const handleWheel = (e: WheelEvent): void => {
      if (e.ctrlKey) return

      e.stopPropagation()
      queueMicrotask(() => {
        onUnzoomRef.current(e)
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [modalState])
}
