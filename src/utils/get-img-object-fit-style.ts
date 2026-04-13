import type { ModalImgPosition } from './types.js'
import { getScale } from './get-scale.js'
import { computePositionedStyle } from './compute-positioned-style.js'

interface GetImgObjectFitStyle {
  (data: {
    containerHeight: number
    containerLeft: number
    containerTop: number
    containerWidth: number
    hasScalableSrc: boolean
    objectFit: string
    objectPosition: string
    offset: number
    targetHeight: number
    targetWidth: number
  }): ModalImgPosition
}

export const getImgObjectFitStyle: GetImgObjectFitStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  objectFit: objectFitParam,
  objectPosition,
  offset,
  targetHeight,
  targetWidth,
}) => {
  let resolvedObjectFit = objectFitParam

  if (resolvedObjectFit === 'scale-down') {
    if (targetWidth <= containerWidth && targetHeight <= containerHeight) {
      resolvedObjectFit = 'none'
    } else {
      resolvedObjectFit = 'contain'
    }
  }

  const base = {
    containerHeight,
    containerLeft,
    containerTop,
    containerWidth,
    hasScalableSrc,
    offset,
    position: objectPosition,
    targetHeight,
    targetWidth,
  }

  if (resolvedObjectFit === 'cover' || resolvedObjectFit === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio =
      resolvedObjectFit === 'cover'
        ? Math.max(widthRatio, heightRatio)
        : Math.min(widthRatio, heightRatio)

    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth * ratio,
      visibleHeight: targetHeight * ratio,
    })
  } else if (resolvedObjectFit === 'none') {
    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth,
      visibleHeight: targetHeight,
    })
  } else {
    // 'fill' — the only remaining valid computed object-fit value.
    // 'scale-down' is normalized to 'contain' or 'none' above;
    // 'cover', 'contain', 'none' are handled earlier.
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight
    const ratio = Math.max(widthRatio, heightRatio)

    const scale = getScale({
      containerHeight: targetHeight * ratio,
      containerWidth: targetWidth * ratio,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop,
      left: containerLeft,
      width: containerWidth * scale,
      height: containerHeight * scale,
      initialTransform: `translate(0,0) scale(${1 / scale})`,
    }
  }
}
