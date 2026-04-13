import type { SupportedImage } from './types.js'
import { testImg, testDiv } from './element-tests.js'

const URL_REGEX = /url(?:\(['"]?)(?<url>.*?)(?:['"]?\))/

interface GetImgSrc {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgSrc: GetImgSrc = imgEl => {
  if (imgEl !== null) {
    if (testImg(imgEl)) {
      return imgEl.currentSrc === '' ? undefined : imgEl.currentSrc
    } else if (testDiv(imgEl)) {
      const { backgroundImage: bgImg } = window.getComputedStyle(imgEl)

      if (bgImg !== '') {
        return URL_REGEX.exec(bgImg)?.[1]
      }
    }
  }
}
