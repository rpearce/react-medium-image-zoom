import type { ModalImgPosition } from './types.js'
import { getScale } from './get-scale.js'
import { parsePosition } from './parse-position.js'

export const computePositionedStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  offset,
  position,
  targetHeight,
  targetWidth,
  visibleHeight,
  visibleWidth,
}: {
  containerHeight: number
  containerLeft: number
  containerTop: number
  containerWidth: number
  hasScalableSrc: boolean
  offset: number
  position: string
  targetHeight: number
  targetWidth: number
  visibleHeight: number
  visibleWidth: number
}): ModalImgPosition => {
  const [posLeft = '50%', posTop = '50%'] = position.split(' ')
  const posX = parsePosition(posLeft, containerWidth - visibleWidth)
  const posY = parsePosition(posTop, containerHeight - visibleHeight)

  const scale = getScale({
    containerHeight: visibleHeight,
    containerWidth: visibleWidth,
    hasScalableSrc,
    offset,
    targetHeight,
    targetWidth,
  })

  return {
    top: containerTop + posY,
    left: containerLeft + posX,
    width: visibleWidth * scale,
    height: visibleHeight * scale,
    initialTransform: `translate(0,0) scale(${1 / scale})`,
  }
}
