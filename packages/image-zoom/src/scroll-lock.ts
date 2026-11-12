export interface BodyAttrs {
  overflow: string
  width: string
}

export const defaultBodyAttrs: BodyAttrs = {
  overflow: '',
  width: '',
}

/**
 * Disable body scrolling; returns the previous values for bodyScrollEnable
 */
export function bodyScrollDisable(): BodyAttrs {
  const bodyStyle = document.body.style
  const prev: BodyAttrs = {
    overflow: bodyStyle.overflow,
    width: bodyStyle.width,
  }

  // Get clientWidth before changing styles to avoid scrollbar shift
  const clientWidth = document.body.clientWidth

  bodyStyle.overflow = 'hidden'
  bodyStyle.width = `${clientWidth}px`

  return prev
}

/**
 * Enable body scrolling
 */
export function bodyScrollEnable(prev: BodyAttrs): void {
  const bodyStyle = document.body.style
  bodyStyle.width = prev.width
  bodyStyle.overflow = prev.overflow
}
