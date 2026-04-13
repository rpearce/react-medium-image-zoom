const SRC_SVG_REGEX = /\.svg$/i

interface TestHasScalableSrc {
  (data: {
    hasZoomImg: boolean
    imgSrc: string | undefined
    isSvg: boolean
  }): boolean
}

export const testHasScalableSrc: TestHasScalableSrc = ({
  hasZoomImg,
  imgSrc,
  isSvg,
}) =>
  isSvg ||
  imgSrc?.slice(0, 18) === 'data:image/svg+xml' ||
  hasZoomImg ||
  (imgSrc !== undefined && SRC_SVG_REGEX.test(imgSrc))
