// toDurationString :: Number -> String
const toDurationString = duration => `${duration}ms`

// @TODO: test
// getScale :: { height      :: Number
//             , innerHeight :: Number
//             , innerWidth  :: Number
//             , width       :: Number
//             , zoomMargin  :: Number
//             }
export const getScale = ({
  height,
  innerHeight,
  innerWidth,
  width,
  zoomMargin
}) => {
  const scaleX = innerWidth / (width + zoomMargin)
  const scaleY = innerHeight / (height + zoomMargin)
  const scale = Math.min(scaleX, scaleY)

  return scale
}

// @TODO: test
// getModalContentStyle :: { height             :: Number
//                         , innerHeight        :: Number
//                         , innerWidth         :: Number
//                         , isLoaded           :: Bool
//                         , isUnloading        :: Bool
//                         , left               :: Number
//                         , originalTransform  :: String
//                         , top                :: Number
//                         , transitionDuration :: Number
//                         , width              :: Number
//                         , zoomMargin         :: Number
//                         }
export const getModalContentStyle = ({
  height,
  innerHeight,
  innerWidth,
  isLoaded,
  isUnloading,
  left,
  originalTransform,
  top,
  transitionDuration,
  width,
  zoomMargin
}) => {
  const transitionDurationString = toDurationString(transitionDuration)

  if (isUnloading) {
    return {
      height,
      left,
      top,
      transform: originalTransform,
      transitionDuration: transitionDurationString,
      width
    }
  }

  if (isLoaded) {
    // Get the the coords for center of the viewport
    const viewportX = innerWidth / 2
    const viewportY = innerHeight / 2

    // Get the coords for center of the parent item
    const childCenterX = left + width / 2
    const childCenterY = top + height / 2

    // Get offset amounts for item coords to be centered on screen
    const translateX = viewportX - childCenterX
    const translateY = viewportY - childCenterY

    // Get amount to scale item
    const scale = getScale({
      height,
      innerWidth,
      innerHeight,
      width,
      zoomMargin
    })

    // Build transform style, including any original transform
    const transform = [
      ...(originalTransform ? [originalTransform] : []),
      `translate3d(${translateX}px, ${translateY}px, 0)`,
      `scale(${scale})`
    ].join(' ')

    return {
      height,
      left,
      top,
      transform,
      transitionDuration: transitionDurationString,
      width
    }
  }

  return {
    height,
    left,
    top,
    transitionDuration: transitionDurationString,
    width
  }
}

// @TODO: test
// getModalOverlayStyle :: { isLoaded            :: Bool
//                         , isUnloading         :: Bool
//                         , overlayBgColorEnd   :: String
//                         , overlayBgColorStart :: String
//                         , transitionDuration  :: Number
//                         }
export const getModalOverlayStyle = ({
  isLoaded,
  isUnloading,
  overlayBgColorEnd,
  overlayBgColorStart,
  transitionDuration
}) => {
  const style = {
    backgroundColor: overlayBgColorStart,
    transitionDuration: toDurationString(transitionDuration)
  }

  if (isLoaded && !isUnloading) {
    style.backgroundColor = overlayBgColorEnd
  }

  return style
}
