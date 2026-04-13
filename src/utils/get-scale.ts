interface GetScaleToWindow {
  (data: { width: number; height: number; offset: number }): number
}

const getScaleToWindow: GetScaleToWindow = ({ height, offset, width }) =>
  Math.min(
    (window.innerWidth - offset * 2) / width, // scale X-axis
    (window.innerHeight - offset * 2) / height, // scale Y-axis
  )

interface GetScaleToWindowMax {
  (data: {
    containerHeight: number
    containerWidth: number
    offset: number
    targetHeight: number
    targetWidth: number
  }): number
}

const getScaleToWindowMax: GetScaleToWindowMax = ({
  containerHeight,
  containerWidth,
  offset,
  targetHeight,
  targetWidth,
}) => {
  const scale = getScaleToWindow({
    height: targetHeight,
    offset,
    width: targetWidth,
  })

  const ratio =
    targetWidth > targetHeight
      ? targetWidth / containerWidth
      : targetHeight / containerHeight

  return scale > 1 ? ratio : scale * ratio
}

interface GetScale {
  (data: {
    containerHeight: number
    containerWidth: number
    hasScalableSrc: boolean
    offset: number
    targetHeight: number
    targetWidth: number
  }): number
}

export const getScale: GetScale = ({
  containerHeight,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  if (containerHeight === 0 || containerWidth === 0) {
    return 1
  }

  return !hasScalableSrc && targetHeight !== 0 && targetWidth !== 0
    ? getScaleToWindowMax({
        containerHeight,
        containerWidth,
        offset,
        targetHeight,
        targetWidth,
      })
    : getScaleToWindow({
        height: containerHeight,
        offset,
        width: containerWidth,
      })
}
