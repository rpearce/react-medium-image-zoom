import { Ref, useEffect, useRef } from 'react'
import ImageZoom, { ImageZoomOpts } from '@rpearce/image-zoom'

interface UseImageZoom extends ImageZoomOpts {
  (opts?: ImageZoomOpts): { ref: Ref<HTMLImageElement> }
}

const useImageZoom: UseImageZoom = (opts) => {
  const ref = useRef<HTMLImageElement>(null)
  const savedOpts = useRef<ImageZoomOpts | undefined>(opts)
  const imgZoom = useRef<ImageZoom | null>(null)

  useEffect(() => {
    savedOpts.current = opts

    imgZoom.current?.update(savedOpts.current)
  }, [opts])

  useEffect(() => {
    const el = ref.current

    if (!el) return

    imgZoom.current = new ImageZoom(el, savedOpts.current)

    return (): void => {
      imgZoom.current?.cleanup()
    }
  }, [])

  return { ref }
}

export default useImageZoom
