// https://github.com/streamich/react-use/blob/master/src/usePrevious.ts

import { useEffect, useRef } from 'react'

export default function usePrevious<T> (state: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}
