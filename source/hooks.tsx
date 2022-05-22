import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SupportedImage } from './types'

// =============================================================================

export function usePrevious<A> (state: A): A | undefined {
  const ref = useRef<A>()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}

// =============================================================================

export interface UseDOMQueryObserver {
  (query: () => Element | HTMLElement | null | undefined): SupportedImage | undefined
}

export const useDOMQueryObserver: UseDOMQueryObserver = (query) => {
  const [element, setElement] = useState<SupportedImage>()

  // Listen for resizes
  const resizeObserver = useMemo(() => {
    return new ResizeObserver(entries => {
      const entry = entries[0]

      if (entry && entry.target) {
        setElement(entry.target as SupportedImage)
      }
    })
  }, [])

  useLayoutEffect(() => {
    const el = query()

    if (!el) {
      return
    }

    resizeObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
    }
  }, [query, resizeObserver])

  // Listen for DOM changes
  //const mutationObserver = useMemo(() => {
  //  return new MutationObserver(() => {
  //    setElement(element)
  //  })
  //}, [element])

  //useLayoutEffect(() => {
  //  const el = query()

  //  if (!el) {
  //    return
  //  }

  //  mutationObserver.observe(el, { attributes: true, childList: true, subtree: true })

  //  return () => {
  //    mutationObserver.disconnect()
  //  }
  //}, [mutationObserver, query])

  return element
}
