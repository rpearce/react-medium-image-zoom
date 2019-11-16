// @TODO: test
// getScale :: { height      :: Number
//             , innerHeight :: Number
//             , innerWidth  :: Number
//             , width       :: Number
//             , zoomMargin  :: Number
//             }
const getScale = ({ height, innerHeight, innerWidth, width, zoomMargin }) => {
  const scaleX = innerWidth / (width + zoomMargin)
  const scaleY = innerHeight / (height + zoomMargin)
  const scale = Math.min(scaleX, scaleY)

  return scale
}

export default getScale
