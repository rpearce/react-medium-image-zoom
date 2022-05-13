// https://github.com/streamich/react-use/blob/master/src/useEffectOnce.ts

import { EffectCallback, useEffect } from 'react'

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []) // eslint-disable-line
}

export default useEffectOnce
