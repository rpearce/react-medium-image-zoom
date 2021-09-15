import { useLayoutEffect, useMemo, useState } from 'react'

export interface UseResizeObserver {
  (query: () => HTMLElement | null | undefined): ResizeObserverEntry | undefined
}

const useResizeObserver: UseResizeObserver = (query) => {
  const [entry, setEntry] = useState<ResizeObserverEntry>()

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(entries => {
      const entrie = entries[0]

      if (entrie) {
        setEntry(entrie)
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

  return entry
}

export default useResizeObserver
