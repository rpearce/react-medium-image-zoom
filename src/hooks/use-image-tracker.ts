import React from 'react'

import type { StyleObject, SupportedImage } from '../utils/types.js'
import { testImg, testImgLoaded } from '../utils/element-tests.js'
import { getImgSrc } from '../utils/get-img-src.js'
import { getStyleGhost } from '../utils/get-style-ghost.js'

const IMAGE_QUERY = ['img', 'svg', '[role="img"]', '[data-zoom]']
  .map(x => `${x}:not([aria-hidden="true"])`)
  .join(',')

export interface ImageTrackerResult {
  imgEl: SupportedImage | null
  loadedImgEl: HTMLImageElement | undefined
  styleGhost: StyleObject
}

/**
 * Find and track the image element within the content ref.
 * Keeps an internal ref for effect callbacks (stale-closure
 * avoidance) but exposes imgEl as state so consumers and the
 * render body can read it safely.
 */
export function useImageTracker(
  contentRef: React.RefObject<HTMLDivElement | null>,
): ImageTrackerResult {
  const imgElRef = React.useRef<SupportedImage | null>(null)
  const [imgEl, setImgEl] = React.useState<SupportedImage | null>(null)
  const [loadedImgEl, setLoadedImgEl] = React.useState<
    HTMLImageElement | undefined
  >(undefined)
  const [styleGhost, setStyleGhost] = React.useState<StyleObject>({})

  React.useEffect(() => {
    const { current: contentEl } = contentRef

    if (contentEl == null) return

    let contentChangeObserver: MutationObserver | null = null
    let contentNotFoundChangeObserver: MutationObserver | null = null
    let imgElResizeObserver: ResizeObserver | null = null
    let currentImgEl: SupportedImage | null = null

    const handleImgLoad = (): void => {
      const { current: el } = imgElRef
      const imgSrc = getImgSrc(el)

      if (imgSrc == null || imgSrc === '') return

      const img = new Image()

      if (testImg(el)) {
        const { sizes, srcset, crossOrigin } = el
        img.sizes = sizes
        img.srcset = srcset
        img.crossOrigin = crossOrigin
      }

      img.src = imgSrc

      const setLoaded = (): void => {
        setLoadedImgEl(img)
        setStyleGhost(getStyleGhost(imgElRef.current))
      }

      img
        .decode()
        .then(setLoaded)
        .catch(() => {
          if (testImgLoaded(img)) {
            setLoaded()
            return
          }
          img.onload = setLoaded
        })
    }

    const setAndTrackImg = (): void => {
      const foundImg = contentEl.querySelector(
        IMAGE_QUERY,
      ) as SupportedImage | null

      if (foundImg == null) {
        imgElRef.current = null
        setImgEl(null)

        if (contentNotFoundChangeObserver == null) {
          contentNotFoundChangeObserver = new MutationObserver(setAndTrackImg)
          contentNotFoundChangeObserver.observe(contentEl, {
            childList: true,
            subtree: true,
          })
        }

        return
      }

      imgElRef.current = foundImg
      setImgEl(foundImg)
      currentImgEl = foundImg

      contentNotFoundChangeObserver?.disconnect()
      contentNotFoundChangeObserver = null

      foundImg.addEventListener('load', handleImgLoad)

      handleImgLoad()

      imgElResizeObserver = new ResizeObserver(entries => {
        const [entry] = entries

        if (entry?.target !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- ResizeObserver target is always a SupportedImage here
          const target = entry.target as SupportedImage
          imgElRef.current = target
          setImgEl(target)
          currentImgEl = target
          setStyleGhost(getStyleGhost(target))
        }
      })

      imgElResizeObserver.observe(foundImg)

      if (contentChangeObserver == null) {
        contentChangeObserver = new MutationObserver(() => {
          setStyleGhost(getStyleGhost(imgElRef.current))
        })

        contentChangeObserver.observe(contentEl, {
          attributes: true,
          childList: true,
          subtree: true,
        })
      }
    }

    setAndTrackImg()

    return () => {
      contentChangeObserver?.disconnect()
      contentNotFoundChangeObserver?.disconnect()
      imgElResizeObserver?.disconnect()
      currentImgEl?.removeEventListener('load', handleImgLoad)
    }
  }, [contentRef])

  return { imgEl, loadedImgEl, styleGhost }
}
