import type { ModalImgPosition } from './types.js'
import { getScale } from './get-scale.js'

interface GetImgRegularStyle {
  (data: {
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

export const getImgRegularStyle: GetImgRegularStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  const scale = getScale({
    containerHeight,
    containerWidth,
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
