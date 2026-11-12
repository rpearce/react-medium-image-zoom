import { parseNumber, parseSwipe } from './attributes.js'
import type { Gestures, Instance } from './instance.js'

/**
 * The window and document listeners of a zoom, ported line for line from
 * today's handlers. Each modal state adds or removes its share, as
 * handleModalStateChange does.
 */
export function createGestures(inst: Instance): Gestures {
  const host = inst.host
  let isScaling = false
  let touchYStart: number | undefined
  let touchYEnd: number | undefined

  /**
   * Intercept default dialog.close() and use ours so we can animate
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      inst.hooks.request(false, e)
    }
  }

  /**
   * Unzoom on wheel event
   */
  const handleWheel = (e: WheelEvent): void => {
    // ctrlKey indicates pinch-to-zoom on trackpads
    if (e.ctrlKey) return
    if (isScaling) return

    const browserScale = window.visualViewport?.scale ?? 1
    if (browserScale > 1) return

    e.stopPropagation()
    queueMicrotask(() => {
      inst.hooks.request(false, e)
    })
  }

  /**
   * Start tracking the Y-axis but abort if non-scroll
   * gesture is detected (like pinch-to-zoom)
   */
  const handleTouchStart = (e: TouchEvent): void => {
    if (e.touches.length > 1) {
      isScaling = true
      return
    }

    const changedTouches = e.changedTouches
    const changedTouch = changedTouches[0]
    if (changedTouches.length === 1 && changedTouch !== undefined) {
      touchYStart = changedTouch.screenY
    }
  }

  /**
   * If the window isn't browser zoomed,
   * track how far we've moved on the Y-axis
   * and unzoom if we detect a swipe
   */
  const handleTouchMove = (e: TouchEvent): void => {
    const browserScale = window.visualViewport?.scale ?? 1
    const changedTouchMove = e.changedTouches[0]

    if (
      parseSwipe(host.getAttribute('swipe')) === 'unzoom' &&
      !isScaling &&
      browserScale <= 1 &&
      touchYStart != null &&
      changedTouchMove !== undefined
    ) {
      touchYEnd = changedTouchMove.screenY

      const max = Math.max(touchYStart, touchYEnd)
      const min = Math.min(touchYStart, touchYEnd)
      const delta = Math.abs(max - min)

      if (
        delta > parseNumber(host.getAttribute('swipe-to-unzoom-threshold'), 10)
      ) {
        touchYStart = undefined
        touchYEnd = undefined
        inst.hooks.request(false, e)
      }
    }
  }

  /**
   * Reset the Y-axis start and end tracking points
   */
  const handleTouchEnd = (): void => {
    touchYStart = undefined
    touchYEnd = undefined
  }

  /**
   * Reset the Y-axis start and end tracking points
   */
  const handleTouchCancel = (): void => {
    touchYStart = undefined
    touchYEnd = undefined
  }

  /**
   * Force a refresh on resize
   */
  const handleResize = (): void => {
    inst.hooks.resized()
  }

  // What entering UNLOADING removes: wheel, touch and keydown
  const removeZoomed = (): void => {
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    window.removeEventListener('touchcancel', handleTouchCancel)
    document.removeEventListener('keydown', handleKeyDown, true)
  }

  return {
    enter: state => {
      switch (state) {
        case 'LOADING':
          isScaling = false
          window.addEventListener('resize', handleResize, { passive: true })
          window.addEventListener('touchstart', handleTouchStart, {
            passive: true,
          })
          window.addEventListener('touchmove', handleTouchMove, {
            passive: true,
          })
          window.addEventListener('touchend', handleTouchEnd, {
            passive: true,
          })
          window.addEventListener('touchcancel', handleTouchCancel, {
            passive: true,
          })
          document.addEventListener('keydown', handleKeyDown, true)
          break
        case 'LOADED':
          window.addEventListener('wheel', handleWheel, { passive: true })
          break
        case 'UNLOADING':
          removeZoomed()
          break
        case 'UNLOADED':
          window.removeEventListener('resize', handleResize)
          break
      }
    },
    // Teardown: every listener, and the gesture state a fresh instance has
    removeAll: () => {
      removeZoomed()
      window.removeEventListener('resize', handleResize)
      isScaling = false
      touchYStart = undefined
      touchYEnd = undefined
    },
  }
}
