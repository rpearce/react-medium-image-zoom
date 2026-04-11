interface GetModalImgTransform {
  (data: {
    height: number
    initialTransform: string
    isZoomed: boolean
    left: number
    top: number
    userTransform: string
    width: number
  }): string
}

export const getModalImgTransform: GetModalImgTransform = ({
  height,
  initialTransform,
  isZoomed,
  left,
  top,
  userTransform,
  width,
}) => {
  // Preserve any CSS transform (e.g. scaleX(-1)) on the source element so
  // the modal image matches it. The translates recenter around the element's
  // midpoint to compensate for transform-origin: top-left (set in styles.css).
  let centeredUserTransform = ''

  if (userTransform !== 'none' && userTransform !== '') {
    const halfWidth = width / 2
    const halfHeight = height / 2

    centeredUserTransform = `translate(${halfWidth}px,${halfHeight}px) ${userTransform} translate(${-halfWidth}px,${-halfHeight}px)`
  }

  if (!isZoomed) {
    if (centeredUserTransform === '') return initialTransform
    return `${initialTransform} ${centeredUserTransform}`
  }

  const viewportX = window.innerWidth / 2
  const viewportY = window.innerHeight / 2
  const childCenterX = left + width / 2
  const childCenterY = top + height / 2
  const translateX = viewportX - childCenterX
  const translateY = viewportY - childCenterY

  const base = `translate(${translateX}px,${translateY}px) scale(1)`
  if (centeredUserTransform === '') return base
  return `${base} ${centeredUserTransform}`
}
