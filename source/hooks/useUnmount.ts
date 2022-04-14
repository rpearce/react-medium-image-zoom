// https://github.com/streamich/react-use/blob/master/src/useUnmount.ts

import { useRef } from 'react'
import useEffectOnce from './useEffectOnce'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn)

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}

export default useUnmount
