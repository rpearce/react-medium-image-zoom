import { Ref, useEffect, useRef } from 'react'
import ImageZoom, {
  ImageZoomOpts,
  ImageZoomReturnType,
} from '@rpearce/image-zoom'

interface UseImageZoom extends ImageZoomOpts {
  (opts?: ImageZoomOpts): { ref: Ref<HTMLImageElement> }
}

const useImageZoom: UseImageZoom = (opts) => {
  const ref = useRef<HTMLImageElement>(null)
  const savedOpts = useRef<ImageZoomOpts | undefined>(opts)
  const imgZoom = useRef<ImageZoomReturnType>()

  useEffect(() => {
    savedOpts.current = opts

    imgZoom.current?.update(savedOpts.current)
  }, [opts])

  useEffect(() => {
    const el = ref.current

    if (!el) return

    imgZoom.current = ImageZoom(savedOpts.current, el)

    return (): void => {
      imgZoom.current?.cleanup()
    }
  }, [])

  return { ref }
}

export default useImageZoom
