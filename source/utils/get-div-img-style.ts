import type { ModalImgPosition } from './types.js'
import { parsePosition } from './parse-position.js'
import { computePositionedStyle } from './compute-positioned-style.js'

interface GetDivImgStyle {
  (data: {
    backgroundPosition: string
    backgroundSize: string
    containerHeight: number
    containerLeft: number
    containerTop: number
    containerWidth: number
    hasScalableSrc: boolean
    offset: number
    targetHeight: number
    targetWidth: number
  }): ModalImgPosition
}

export const getDivImgStyle: GetDivImgStyle = ({
  backgroundPosition,
  backgroundSize,
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  const base = {
    containerHeight,
    containerLeft,
    containerTop,
    containerWidth,
    hasScalableSrc,
    offset,
    position: backgroundPosition,
    targetHeight,
    targetWidth,
  }

  if (backgroundSize === 'cover' || backgroundSize === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio =
      backgroundSize === 'cover'
        ? Math.max(widthRatio, heightRatio)
        : Math.min(widthRatio, heightRatio)

    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth * ratio,
      visibleHeight: targetHeight * ratio,
    })
  } else if (backgroundSize === 'auto') {
    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth,
      visibleHeight: targetHeight,
    })
  } else {
    const [sizeW = '50%', sizeH = '50%'] = backgroundSize.split(' ')
    const sizeWidth = parsePosition(sizeW, containerWidth)
    const sizeHeight = parsePosition(sizeH, containerHeight)

    const widthRatio = sizeWidth / targetWidth
    const heightRatio = sizeHeight / targetHeight

    // @TODO: something funny is happening with this ratio
    const ratio = Math.min(widthRatio, heightRatio)

    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth * ratio,
      visibleHeight: targetHeight * ratio,
    })
  }
}
