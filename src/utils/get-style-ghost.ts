import type { SupportedImage, StyleObject } from './types.js'
import { testSvg } from './element-tests.js'

interface GetStyleGhost {
  (imgEl: SupportedImage | null): StyleObject
}

export const getStyleGhost: GetStyleGhost = imgEl => {
  if (imgEl == null) {
    return {}
  }

  if (testSvg(imgEl)) {
    const { parentElement: parentEl } = imgEl
    const rect = imgEl.getBoundingClientRect()

    if (parentEl == null) {
      return {
        height: rect.height,
        left: rect.left,
        width: rect.width,
        top: rect.top,
      }
    } else {
      const parentRect = parentEl.getBoundingClientRect()

      return {
        height: rect.height,
        left: parentRect.left - rect.left,
        top: parentRect.top - rect.top,
        width: rect.width,
      }
    }
  } else {
    return {
      height: imgEl.offsetHeight,
      left: imgEl.offsetLeft,
      width: imgEl.offsetWidth,
      top: imgEl.offsetTop,
    }
  }
}
