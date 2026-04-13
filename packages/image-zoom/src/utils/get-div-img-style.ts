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
    // Explicit background-size like `100px 75px` or `50% 50%`. When
    // the explicit box doesn't match the source's natural aspect
    // ratio, the browser would stretch the image non-uniformly — but
    // a stretched zoom visual looks wrong, so we approximate with a
    // `contain`-like fit: pick the smaller ratio and preserve the
    // source aspect. For aspect-matching sizes (the common case) the
    // two ratios are equal and this collapses to an exact match.
    const [sizeW = '50%', sizeH = '50%'] = backgroundSize.split(' ')
    const sizeWidth = parsePosition(sizeW, containerWidth)
    const sizeHeight = parsePosition(sizeH, containerHeight)

    const widthRatio = sizeWidth / targetWidth
    const heightRatio = sizeHeight / targetHeight
    const ratio = Math.min(widthRatio, heightRatio)

    return computePositionedStyle({
      ...base,
      visibleWidth: targetWidth * ratio,
      visibleHeight: targetHeight * ratio,
    })
  }
}
