import type { SupportedImage } from './types.js'
import { testImg } from './element-tests.js'

interface GetImgAlt {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgAlt: GetImgAlt = imgEl => {
  if (imgEl !== null) {
    if (testImg(imgEl)) {
      return imgEl.alt
    } else {
      return imgEl.getAttribute('aria-label') ?? undefined
    }
  }
}
