import { Ref, useCallback, useEffect, useRef } from 'react'
import ImageZoom, {
  ImageZoomReturnType,
  ImageZoomUpdateOpts,
} from '@rpearce/image-zoom'

export interface UseImageZoom {
  (opts?: ImageZoomUpdateOpts): { ref: Ref<HTMLElement> }
}

const useImageZoom: UseImageZoom = (opts) => {
  const ref = useRef<HTMLElement>(null)
  const savedOpts = useRef<ImageZoomUpdateOpts | undefined>(opts)
  const imgZoom = useRef<ImageZoomReturnType>()

  const setup = useCallback(() => {
    const el = ref.current

    if (!el) return

    imgZoom.current = ImageZoom(savedOpts.current, el)

    if (savedOpts.current?.isZoomed) {
      imgZoom.current?.update(savedOpts.current)
    }
  }, [])

  const cleanup = useCallback(() => {
    imgZoom.current?.cleanup()
    imgZoom.current = undefined
  }, [])

  useEffect(() => {
    savedOpts.current = opts
    imgZoom.current?.update(savedOpts.current)
  }, [opts])

  useEffect(() => {
    setup()

    return (): void => {
      cleanup()
    }
  }, [cleanup, setup])

  useEffect(() => {
    if (ref.current) {
      if (!imgZoom.current) {
        setup()
      }
    } else {
      cleanup()
    }
  })

  return { ref }
}

export default useImageZoom
