// https://github.com/streamich/react-use/blob/master/src/useWindowSize.ts

import { useEffect } from 'react'

import useRafState from './useRafState'

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const isBrowser = typeof window !== 'undefined'

  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  })

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    }
  }, [isBrowser, setState])

  return state
}

export default useWindowSize
