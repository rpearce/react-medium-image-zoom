/* eslint-disable max-lines -- utils module needs to stay in a single file for cohesion */

export type SupportedImage =
  | HTMLImageElement
  | HTMLDivElement
  | HTMLSpanElement
  | SVGElement

export type StyleObject = Record<string, string | number | undefined>

// =============================================================================

function isElement(el: unknown): el is Element {
  return el instanceof Element
}

const testElType = (type: string, el: unknown): boolean =>
  isElement(el) && el.tagName.toUpperCase() === type

export const testDiv = (el: unknown): el is HTMLDivElement | HTMLSpanElement =>
  testElType('DIV', el) || testElType('SPAN', el)

export const testImg = (el: unknown): el is HTMLImageElement =>
  testElType('IMG', el)

export const testImgLoaded = (el: HTMLImageElement): boolean =>
  el.complete && el.naturalHeight !== 0

export const testSvg = (el: unknown): el is SVGElement => testElType('SVG', el)

// =============================================================================

interface GetScaleToWindow {
  (data: { width: number; height: number; offset: number }): number
}

const getScaleToWindow: GetScaleToWindow = ({ height, offset, width }) =>
  Math.min(
    (window.innerWidth - offset * 2) / width, // scale X-axis
    (window.innerHeight - offset * 2) / height, // scale Y-axis
  )

// =============================================================================

interface GetScaleToWindowMax {
  (data: {
    containerHeight: number
    containerWidth: number
    offset: number
    targetHeight: number
    targetWidth: number
  }): number
}

const getScaleToWindowMax: GetScaleToWindowMax = ({
  containerHeight,
  containerWidth,
  offset,
  targetHeight,
  targetWidth,
}) => {
  const scale = getScaleToWindow({
    height: targetHeight,
    offset,
    width: targetWidth,
  })

  const ratio =
    targetWidth > targetHeight
      ? targetWidth / containerWidth
      : targetHeight / containerHeight

  return scale > 1 ? ratio : scale * ratio
}

// =============================================================================

interface GetScale {
  (data: {
    containerHeight: number
    containerWidth: number
    hasScalableSrc: boolean
    offset: number
    targetHeight: number
    targetWidth: number
  }): number
}

const getScale: GetScale = ({
  containerHeight,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  if (containerHeight === 0 || containerWidth === 0) {
    return 1
  }

  return !hasScalableSrc && targetHeight !== 0 && targetWidth !== 0
    ? getScaleToWindowMax({
        containerHeight,
        containerWidth,
        offset,
        targetHeight,
        targetWidth,
      })
    : getScaleToWindow({
        height: containerHeight,
        offset,
        width: containerWidth,
      })
}

// =============================================================================

const URL_REGEX = /url(?:\(['"]?)(?<url>.*?)(?:['"]?\))/

interface GetImgSrc {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgSrc: GetImgSrc = imgEl => {
  if (imgEl !== null) {
    if (testImg(imgEl)) {
      return imgEl.currentSrc
    } else if (testDiv(imgEl)) {
      const { backgroundImage: bgImg } = window.getComputedStyle(imgEl)

      if (bgImg !== '') {
        return URL_REGEX.exec(bgImg)?.[1]
      }
    }
  }
}

// =============================================================================

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

// =============================================================================

interface GetImgRegularStyle {
  (data: {
    containerHeight: number
    containerLeft: number
    containerTop: number
    containerWidth: number
    hasScalableSrc: boolean
    offset: number
    targetHeight: number
    targetWidth: number
  }): StyleObject
}

const getImgRegularStyle: GetImgRegularStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  const scale = getScale({
    containerHeight,
    containerWidth,
    hasScalableSrc,
    offset,
    targetHeight,
    targetWidth,
  })

  return {
    top: containerTop,
    left: containerLeft,
    width: containerWidth * scale,
    height: containerHeight * scale,
    transform: `translate(0,0) scale(${1 / scale})`,
  }
}

// =============================================================================

interface ParsePosition {
  (data: { position: string; relativeNum: number }): number
}

const parsePosition: ParsePosition = ({ position, relativeNum }) => {
  const positionNum = parseFloat(position)

  return position.endsWith('%')
    ? (relativeNum * positionNum) / 100
    : positionNum
}

// =============================================================================

interface GetImgObjectFitStyle {
  (data: {
    containerHeight: number
    containerLeft: number
    containerTop: number
    containerWidth: number
    hasScalableSrc: boolean
    objectFit: string
    objectPosition: string
    offset: number
    targetHeight: number
    targetWidth: number
  }): StyleObject
}

const getImgObjectFitStyle: GetImgObjectFitStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  objectFit: objectFitParam,
  objectPosition,
  offset,
  targetHeight,
  targetWidth,
  // eslint-disable-next-line complexity -- object-fit style calculation requires handling many layout modes
}) => {
  let resolvedObjectFit = objectFitParam

  if (resolvedObjectFit === 'scale-down') {
    if (targetWidth <= containerWidth && targetHeight <= containerHeight) {
      resolvedObjectFit = 'none'
    } else {
      resolvedObjectFit = 'contain'
    }
  }

  if (resolvedObjectFit === 'cover' || resolvedObjectFit === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio =
      resolvedObjectFit === 'cover'
        ? Math.max(widthRatio, heightRatio)
        : Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = objectPosition.split(' ')
    const posX = parsePosition({
      position: posLeft,
      relativeNum: containerWidth - targetWidth * ratio,
    })
    const posY = parsePosition({
      position: posTop,
      relativeNum: containerHeight - targetHeight * ratio,
    })

    const scale = getScale({
      containerHeight: targetHeight * ratio,
      containerWidth: targetWidth * ratio,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop + posY,
      left: containerLeft + posX,
      width: targetWidth * ratio * scale,
      height: targetHeight * ratio * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  } else if (resolvedObjectFit === 'none') {
    const [posLeft = '50%', posTop = '50%'] = objectPosition.split(' ')
    const posX = parsePosition({
      position: posLeft,
      relativeNum: containerWidth - targetWidth,
    })
    const posY = parsePosition({
      position: posTop,
      relativeNum: containerHeight - targetHeight,
    })

    const scale = getScale({
      containerHeight: targetHeight,
      containerWidth: targetWidth,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop + posY,
      left: containerLeft + posX,
      width: targetWidth * scale,
      height: targetHeight * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  } else if (resolvedObjectFit === 'fill') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight
    const ratio = Math.max(widthRatio, heightRatio)

    const scale = getScale({
      containerHeight: targetHeight * ratio,
      containerWidth: targetWidth * ratio,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      width: containerWidth * scale,
      height: containerHeight * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  } else {
    return {}
  }
}

// =============================================================================

interface GetDivImgStyle {
  (data: {
    backgroundPosition: string
    backgroundSize: string
    containerHeight: number
    containerLeft: number
    containerTop: number
    containerWidth: number
    hasScalableSrc: boolean
    offset: number
    targetHeight: number
    targetWidth: number
  }): StyleObject
}

const getDivImgStyle: GetDivImgStyle = ({
  backgroundPosition,
  backgroundSize,
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
  // eslint-disable-next-line complexity -- div background image style calculation requires handling many layout modes
}) => {
  if (backgroundSize === 'cover' || backgroundSize === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio =
      backgroundSize === 'cover'
        ? Math.max(widthRatio, heightRatio)
        : Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = backgroundPosition.split(' ')
    const posX = parsePosition({
      position: posLeft,
      relativeNum: containerWidth - targetWidth * ratio,
    })
    const posY = parsePosition({
      position: posTop,
      relativeNum: containerHeight - targetHeight * ratio,
    })

    const scale = getScale({
      containerHeight: targetHeight * ratio,
      containerWidth: targetWidth * ratio,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop + posY,
      left: containerLeft + posX,
      width: targetWidth * ratio * scale,
      height: targetHeight * ratio * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  } else if (backgroundSize === 'auto') {
    const [posLeft = '50%', posTop = '50%'] = backgroundPosition.split(' ')
    const posX = parsePosition({
      position: posLeft,
      relativeNum: containerWidth - targetWidth,
    })
    const posY = parsePosition({
      position: posTop,
      relativeNum: containerHeight - targetHeight,
    })

    const scale = getScale({
      containerHeight: targetHeight,
      containerWidth: targetWidth,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop + posY,
      left: containerLeft + posX,
      width: targetWidth * scale,
      height: targetHeight * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  } else {
    const [sizeW = '50%', sizeH = '50%'] = backgroundSize.split(' ')
    const sizeWidth = parsePosition({
      position: sizeW,
      relativeNum: containerWidth,
    })
    const sizeHeight = parsePosition({
      position: sizeH,
      relativeNum: containerHeight,
    })

    const widthRatio = sizeWidth / targetWidth
    const heightRatio = sizeHeight / targetHeight

    // @TODO: something funny is happening with this ratio
    const ratio = Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = backgroundPosition.split(' ')
    const posX = parsePosition({
      position: posLeft,
      relativeNum: containerWidth - targetWidth * ratio,
    })
    const posY = parsePosition({
      position: posTop,
      relativeNum: containerHeight - targetHeight * ratio,
    })

    const scale = getScale({
      containerHeight: targetHeight * ratio,
      containerWidth: targetWidth * ratio,
      hasScalableSrc,
      offset,
      targetHeight,
      targetWidth,
    })

    return {
      top: containerTop + posY,
      left: containerLeft + posX,
      width: targetWidth * ratio * scale,
      height: targetHeight * ratio * scale,
      transform: `translate(0,0) scale(${1 / scale})`,
    }
  }
}

// =============================================================================

const SRC_SVG_REGEX = /\.svg$/i

interface GetStyleModalImg {
  (data: {
    hasZoomImg: boolean
    imgSrc: string | undefined
    isSvg: boolean
    isZoomed: boolean
    loadedImgEl: HTMLImageElement | undefined
    offset: number
    shouldRefresh: boolean
    targetEl: SupportedImage
  }): StyleObject
}

export const getStyleModalImg: GetStyleModalImg = ({
  hasZoomImg,
  imgSrc,
  isSvg,
  isZoomed,
  loadedImgEl,
  offset,
  shouldRefresh,
  targetEl,
  // eslint-disable-next-line complexity -- modal image style calculation requires handling many layout combinations
}) => {
  const hasScalableSrc =
    isSvg ||
    imgSrc?.slice(0, 18) === 'data:image/svg+xml' ||
    hasZoomImg ||
    (imgSrc !== undefined && SRC_SVG_REGEX.test(imgSrc))

  const imgRect = targetEl.getBoundingClientRect()
  const targetElComputedStyle = window.getComputedStyle(targetEl)

  const isDivImg = loadedImgEl != null && testDiv(targetEl)
  const isImgObjectFit = loadedImgEl != null && !isDivImg

  const targetHeight =
    loadedImgEl != null && loadedImgEl.naturalHeight !== 0
      ? loadedImgEl.naturalHeight
      : imgRect.height
  const targetWidth =
    loadedImgEl != null && loadedImgEl.naturalWidth !== 0
      ? loadedImgEl.naturalWidth
      : imgRect.width

  const styleImgRegular = getImgRegularStyle({
    containerHeight: imgRect.height,
    containerLeft: imgRect.left,
    containerTop: imgRect.top,
    containerWidth: imgRect.width,
    hasScalableSrc,
    offset,
    targetHeight,
    targetWidth,
  })

  const styleImgObjectFit = isImgObjectFit
    ? getImgObjectFitStyle({
        containerHeight: imgRect.height,
        containerLeft: imgRect.left,
        containerTop: imgRect.top,
        containerWidth: imgRect.width,
        hasScalableSrc,
        objectFit: targetElComputedStyle.objectFit,
        objectPosition: targetElComputedStyle.objectPosition,
        offset,
        targetHeight,
        targetWidth,
      })
    : undefined

  const styleDivImg = isDivImg
    ? getDivImgStyle({
        backgroundPosition: targetElComputedStyle.backgroundPosition,
        backgroundSize: targetElComputedStyle.backgroundSize,
        containerHeight: imgRect.height,
        containerLeft: imgRect.left,
        containerTop: imgRect.top,
        containerWidth: imgRect.width,
        hasScalableSrc,
        offset,
        targetHeight,
        targetWidth,
      })
    : undefined

  const style: StyleObject = {
    ...styleImgRegular,
    ...styleImgObjectFit,
    ...styleDivImg,
  }

  if (isZoomed) {
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2

    const childCenterX =
      parseFloat(String(style.left ?? 0)) +
      parseFloat(String(style.width ?? 0)) / 2
    const childCenterY =
      parseFloat(String(style.top ?? 0)) +
      parseFloat(String(style.height ?? 0)) / 2

    const translateX = viewportX - childCenterX
    const translateY = viewportY - childCenterY

    // For scenarios like resizing the browser window
    if (shouldRefresh) {
      style.transitionDuration = '0.01ms'
    }

    style.transform = `translate(${translateX}px,${translateY}px) scale(1)`
  }

  return style
}

// =============================================================================

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

// =============================================================================

/**
 * Deal with cloned SVG ID duplicate issues from https://github.com/rpearce/react-medium-image-zoom/issues/438
 */
export const adjustSvgIDs = (svgEl: SVGElement): void => {
  const newIdSuffix = '-zoom'

  // SVG attributes that can use `url(#foo)`
  const attrs = [
    'clip-path',
    'fill',
    'mask',
    'marker-start',
    'marker-mid',
    'marker-end',
  ]

  // Map between old IDs and new IDs
  const idMap = new Map()

  // Update SVG element's ID, if present
  if (svgEl.hasAttribute('id')) {
    const { id: oldId } = svgEl
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    const svgNode: Element = svgEl
    svgNode.id = newId
  }

  // Update all old IDs to new IDs and store values mapping for later
  svgEl.querySelectorAll('[id]').forEach(el => {
    const { id: oldId } = el
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    const node: Element = el
    node.id = newId
  })

  idMap.forEach((newId, oldId) => {
    const urlOldID = `url(#${oldId})`
    const urlNewID = `url(#${newId})`
    const attrsQuery = attrs.map(attr => `[${attr}="${urlOldID}"]`).join(', ')

    // Look for all SVG attributes that can use `url(#foo)` in a single query,
    // find the attribute(s) affected, and update them
    svgEl.querySelectorAll(attrsQuery).forEach(usedEl => {
      attrs.forEach(attr => {
        if (usedEl.getAttribute(attr) === urlOldID) {
          usedEl.setAttribute(attr, urlNewID)
        }
      })
    })
  })

  // Update any SVG `<style>` elements to update old IDs to new IDs
  svgEl.querySelectorAll('style').forEach(styleEl => {
    idMap.forEach((newId, oldId) => {
      const { textContent } = styleEl
      if (textContent !== '') {
        const styleNode: HTMLStyleElement = styleEl
        styleNode.textContent = textContent.replaceAll(`#${oldId}`, `#${newId}`)
      }
    })
  })
}
