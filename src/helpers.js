export const createPortalContainer = tag => {
  const portal = document.createElement(tag)
  document.body.appendChild(portal)
  return portal
}

export const removePortalContainer = portal => {
  document.body.removeChild(portal)
}

export const fetchImage = (image, cb) => {
  const { src, srcSet, sizes } = image
  const img = new Image()
  const onLoad = () => {
    cb(img)

    /**
     * If using srcset, future resize events can trigger
     * additional onload events to fire.
     * Remove listener after first load
     */
    img.removeEventListener('load', onLoad)
  }
  img.addEventListener('load', onLoad)
  img.src = src
  if (srcSet) img.srcset = srcSet
  if (sizes) img.sizes = sizes
}

/**
 * Figure out how much to scale based
 * solely on no maxing out the browser
 */
export const getScale = ({ width, height, zoomMargin }) => {
  const scaleX = window.innerWidth / (width + zoomMargin)
  const scaleY = window.innerHeight / (height + zoomMargin)
  return Math.min(scaleX, scaleY)
}

/**
 * Figure out how much to scale so you're
 * not larger than the original image
 */
export const getMaxDimensionScale = ({
  width,
  height,
  naturalWidth,
  naturalHeight,
  zoomMargin
}) => {
  const scale = getScale({
    width: naturalWidth,
    height: naturalHeight,
    zoomMargin
  })
  const ratio =
    naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height
  return scale > 1 ? ratio : scale * ratio
}

export const isMaxDimension = img =>
  img.clientWidth >= img.naturalWidth || img.clientHeight >= img.naturalHeight
