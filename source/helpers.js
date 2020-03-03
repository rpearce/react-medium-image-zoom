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

  if (!isLoaded || isUnloading) {
    const initTransform = [
      `scale(1)`,
      `translate(0, 0)`,
      ...(originalTransform ? [originalTransform] : [])
    ].join(' ')

    return {
      height,
      left,
      top,
      transform: initTransform,
      WebkitTransform: initTransform,
      transitionDuration: transitionDurationString,
      width
    }
  }

  // Get amount to scale item
  const scale = getScale({
    height,
    innerWidth,
    innerHeight,
    width,
    zoomMargin
  })

  // Get the the coords for center of the viewport
  const viewportX = innerWidth / 2
  const viewportY = innerHeight / 2

  // Get the coords for center of the parent item
  const childCenterX = left + width / 2
  const childCenterY = top + height / 2

  // Get offset amounts for item coords to be centered on screen
  const translateX = (viewportX - childCenterX) / scale
  const translateY = (viewportY - childCenterY) / scale

  // Build transform style, including any original transform
  const transform = [
    `scale(${scale})`,
    `translate(${translateX}px, ${translateY}px)`,
    ...(originalTransform ? [originalTransform] : [])
  ].join(' ')

  return {
    height,
    left,
    top,
    transform,
    WebkitTransform: transform,
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
  transitionDuration,
  zoomZindex
}) => {
  const style = {
    backgroundColor: overlayBgColorStart,
    transitionDuration: toDurationString(transitionDuration),
    zIndex: zoomZindex
  }

  if (isLoaded && !isUnloading) {
    style.backgroundColor = overlayBgColorEnd
  }

  return style
}

// @TODO: test
// if parentRef.current is not available yet,
// we can fall back to these defaults
export const pseudoParentEl = {
  getBoundingClientRect: () => ({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }),
  style: {
    transform: null
  }
}
