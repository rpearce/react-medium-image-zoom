import React from 'react'
import type { SupportedImage } from './types'

// =============================================================================

interface TestElType {
  (type: string, el: unknown): boolean
}

const testElType: TestElType = (type, el) =>
  type === (el as Element)?.tagName?.toUpperCase?.()

export const testDiv = (el: unknown): el is HTMLDivElement | HTMLSpanElement => testElType('DIV', el) || testElType('SPAN', el)
export const testImg = (el: unknown): el is HTMLImageElement => testElType('IMG', el)
export const testImgLoaded = (el: HTMLImageElement) => el.complete && el.naturalHeight !== 0
export const testSvg = (el: unknown): el is SVGElement => testElType('SVG', el)

// =============================================================================

export interface GetScaleToWindow {
  (data: {
    width: number,
    height: number,
    offset: number
  }): number
}

export const getScaleToWindow: GetScaleToWindow = ({ height, offset, width }) => {
  return Math.min(
    (window.innerWidth - offset * 2) / width, // scale X-axis
    (window.innerHeight - offset * 2) / height // scale Y-axis
  )
}

// =============================================================================

export interface GetScaleToWindowMax {
  (data: {
    containerHeight: number,
    containerWidth: number,
    offset: number,
    targetHeight: number,
    targetWidth: number,
  }): number
}

export const getScaleToWindowMax: GetScaleToWindowMax = ({
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

  const ratio = targetWidth > targetHeight
    ? targetWidth / containerWidth
    : targetHeight / containerHeight

  return scale > 1 ? ratio : scale * ratio
}

// =============================================================================

export interface GetScale {
  (data: {
    containerHeight: number,
    containerWidth: number,
    hasScalableSrc: boolean,
    offset: number,
    targetHeight: number,
    targetWidth: number,
  }): number
}

export const getScale: GetScale = ({
  containerHeight,
  containerWidth,
  hasScalableSrc,
  offset,
  targetHeight,
  targetWidth,
}) => {
  if (!containerHeight || !containerWidth) {
    return 1
  }

  return !hasScalableSrc && targetHeight && targetWidth
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

const URL_REGEX = /url(?:\(['"]?)(.*?)(?:['"]?\))/

export interface GetImgSrc {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgSrc: GetImgSrc = (imgEl) => {
  if (imgEl) {
    if (testImg(imgEl)) {
      return imgEl.currentSrc
    } else if (testDiv(imgEl)) {
      const bgImg = window.getComputedStyle(imgEl).backgroundImage

      if (bgImg) {
        return URL_REGEX.exec(bgImg)?.[1]
      }
    }
  }
}

// =============================================================================

export interface GetImgAlt {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgAlt: GetImgAlt = (imgEl) => {
  if (imgEl) {
    if (testImg(imgEl)) {
      return imgEl.alt ?? undefined
    } else {
      return imgEl.getAttribute('aria-label') ?? undefined
    }
  }
}

// =============================================================================

export interface GetImgRegularStyle {
  (data: {
    containerHeight: number,
    containerLeft: number,
    containerTop: number,
    containerWidth: number,
    hasScalableSrc: boolean,
    offset: number,
    targetHeight: number,
    targetWidth: number,
  }): React.CSSProperties
}

export const getImgRegularStyle: GetImgRegularStyle = ({
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

export interface ParsePosition {
  (data: {
    position: string,
    relativeNum: number
  }): number
}

export const parsePosition: ParsePosition = ({ position, relativeNum }) => {
  const positionNum = parseFloat(position)

  return position.endsWith('%')
    ? relativeNum * positionNum / 100
    : positionNum
}

// =============================================================================

export interface GetImgObjectFitStyle {
  (data: {
    containerHeight: number,
    containerLeft: number,
    containerTop: number,
    containerWidth: number,
    hasScalableSrc: boolean,
    objectFit: string,
    objectPosition: string,
    offset: number,
    targetHeight: number,
    targetWidth: number,
  }): React.CSSProperties
}

export const getImgObjectFitStyle: GetImgObjectFitStyle = ({
  containerHeight,
  containerLeft,
  containerTop,
  containerWidth,
  hasScalableSrc,
  objectFit,
  objectPosition,
  offset,
  targetHeight,
  targetWidth,
}) => {
  if (objectFit === 'scale-down') {
    if (targetWidth <= containerWidth && targetHeight <= containerHeight) {
      objectFit = 'none'
    } else {
      objectFit = 'contain'
    }
  }

  if (objectFit === 'cover' || objectFit === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio = objectFit === 'cover'
      ? Math.max(widthRatio, heightRatio)
      : Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = objectPosition.split(' ')
    const posX = parsePosition({ position: posLeft, relativeNum: containerWidth - targetWidth * ratio })
    const posY = parsePosition({ position: posTop, relativeNum: containerHeight - targetHeight * ratio })

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
  } else if (objectFit === 'none') {
    const [posLeft = '50%', posTop = '50%'] = objectPosition.split(' ')
    const posX = parsePosition({ position: posLeft, relativeNum: containerWidth - targetWidth })
    const posY = parsePosition({ position: posTop, relativeNum: containerHeight - targetHeight })

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
  } else if (objectFit === 'fill') {
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

export interface GetDivImgStyle {
  (data: {
    backgroundPosition: string,
    backgroundSize: string,
    containerHeight: number,
    containerLeft: number,
    containerTop: number,
    containerWidth: number,
    hasScalableSrc: boolean,
    offset: number,
    targetHeight: number,
    targetWidth: number,
  }): React.CSSProperties
}

export const getDivImgStyle: GetDivImgStyle = ({
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
}) => {
  if (backgroundSize === 'cover' || backgroundSize === 'contain') {
    const widthRatio = containerWidth / targetWidth
    const heightRatio = containerHeight / targetHeight

    const ratio = backgroundSize === 'cover'
      ? Math.max(widthRatio, heightRatio)
      : Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = backgroundPosition.split(' ')
    const posX = parsePosition({ position: posLeft, relativeNum: containerWidth - targetWidth * ratio })
    const posY = parsePosition({ position: posTop, relativeNum: containerHeight - targetHeight * ratio })

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
    const posX = parsePosition({ position: posLeft, relativeNum: containerWidth - targetWidth })
    const posY = parsePosition({ position: posTop, relativeNum: containerHeight - targetHeight })

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
    const sizeWidth = parsePosition({ position: sizeW, relativeNum: containerWidth })
    const sizeHeight = parsePosition({ position: sizeH, relativeNum: containerHeight })

    const widthRatio = sizeWidth / targetWidth
    const heightRatio = sizeHeight / targetHeight

    // @TODO: something funny is happening with this ratio
    const ratio = Math.min(widthRatio, heightRatio)

    const [posLeft = '50%', posTop = '50%'] = backgroundPosition.split(' ')
    const posX = parsePosition({ position: posLeft, relativeNum: containerWidth - targetWidth * ratio })
    const posY = parsePosition({ position: posTop, relativeNum: containerHeight - targetHeight * ratio })

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

export interface GetStyleModalImg {
  (data: {
    hasZoomImg: boolean,
    imgSrc: string | undefined,
    isSvg: boolean,
    isZoomed: boolean,
    loadedImgEl: HTMLImageElement | undefined,
    offset: number,
    shouldRefresh: boolean,
    targetEl: SupportedImage,
  }): React.CSSProperties
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
}) => {
  const hasScalableSrc =
    isSvg ||
    imgSrc?.slice?.(0, 18) === 'data:image/svg+xml' ||
    hasZoomImg ||
    !!(imgSrc && SRC_SVG_REGEX.test(imgSrc))

  const imgRect = targetEl.getBoundingClientRect()
  const targetElComputedStyle = window.getComputedStyle(targetEl)

  const isDivImg = loadedImgEl != null && testDiv(targetEl)
  const isImgObjectFit = loadedImgEl != null && !isDivImg

  const styleImgRegular = getImgRegularStyle({
    containerHeight: imgRect.height,
    containerLeft: imgRect.left,
    containerTop: imgRect.top,
    containerWidth: imgRect.width,
    hasScalableSrc,
    offset,
    targetHeight: loadedImgEl?.naturalHeight ?? imgRect.height,
    targetWidth: loadedImgEl?.naturalWidth ?? imgRect.width,
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
      targetHeight: loadedImgEl.naturalHeight,
      targetWidth: loadedImgEl.naturalWidth,
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
      targetHeight: loadedImgEl.naturalHeight,
      targetWidth: loadedImgEl.naturalWidth,
    })
    : undefined

  const style = Object.assign(
    {},
    styleImgRegular,
    styleImgObjectFit,
    styleDivImg,
  )

  if (isZoomed) {
    const viewportX = window.innerWidth / 2
    const viewportY = window.innerHeight / 2

    const childCenterX = parseFloat(String(style.left || 0)) + (parseFloat(String(style.width || 0)) / 2)
    const childCenterY = parseFloat(String(style.top || 0)) + (parseFloat(String(style.height || 0)) / 2)

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

export interface GetStyleGhost {
  (imgEl: SupportedImage | null): React.CSSProperties
}

export const getStyleGhost: GetStyleGhost = (imgEl) => {
  if (!imgEl) {
    return {}
  }

  if (testSvg(imgEl)) {
    const parentEl = imgEl.parentElement
    const rect = imgEl.getBoundingClientRect()

    if (parentEl) {
      const parentRect = parentEl.getBoundingClientRect()

      return {
        height: rect.height,
        left: parentRect.left - rect.left,
        top: parentRect.top - rect.top,
        width: rect.width,
      }
    } else {
      return {
        height: rect.height,
        left: rect.left,
        width: rect.width,
        top: rect.top,
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
    const oldId = svgEl.id
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    svgEl.id = newId
  }

  // Update all old IDs to new IDs and store values mapping for later
  svgEl.querySelectorAll('[id]').forEach(el => {
    const oldId = el.id
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    el.id = newId
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
      if (styleEl.textContent) {
        styleEl.textContent = styleEl.textContent.replaceAll(`#${oldId}`, `#${newId}`)
      }
    })
  })
}
