import getScaleToWindow from './getScaleToWindow'

export interface GetScaleToWindowMax {
  (
    width: number,
    naturalWidth: number,
    height: number,
    naturalHeight: number,
    offset: number
  ): number
}

const getScaleToWindowMax: GetScaleToWindowMax = (
  width,
  naturalWidth,
  height,
  naturalHeight,
  offset
) => {
  const scale = getScaleToWindow(naturalWidth, naturalHeight, offset)

  const ratio = naturalWidth > naturalHeight
    ? naturalWidth  / width
    : naturalHeight / height

  return scale > 1 ? ratio : scale * ratio
}

export default getScaleToWindowMax
