import { Ref, useEffect, useRef } from 'react'
import ImageZoom, {
  ImageZoomReturnType,
  ImageZoomUpdateOpts,
} from '@rpearce/image-zoom'

interface UseImageZoom {
  (opts?: ImageZoomUpdateOpts): { ref: Ref<HTMLImageElement> }
}

const useImageZoom: UseImageZoom = (opts) => {
  const ref = useRef<HTMLImageElement>(null)
  const savedOpts = useRef<ImageZoomUpdateOpts | undefined>(opts)
  const imgZoom = useRef<ImageZoomReturnType>()

  useEffect(() => {
    savedOpts.current = opts

    imgZoom.current?.update(savedOpts.current)
  }, [opts])

  useEffect(() => {
    const el = ref.current

    if (!el) return

    imgZoom.current = ImageZoom(savedOpts.current, el)

    if (savedOpts.current?.isZoomed) {
      imgZoom.current?.update(savedOpts.current)
    }

    return (): void => {
      imgZoom.current?.cleanup()
    }
  }, [])

  return { ref }
}

export default useImageZoom
