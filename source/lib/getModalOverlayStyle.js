import toDurationString from './toDurationString'

// @TODO: test
// getModalOverlayStyle :: { isLoaded            :: Bool
//                         , isUnloading         :: Bool
//                         , overlayBgColorEnd   :: String
//                         , overlayBgColorStart :: String
//                         , transitionDuration  :: Number
//                         }
const getModalOverlayStyle = ({
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

export default getModalOverlayStyle
