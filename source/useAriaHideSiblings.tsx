import { useEffect, useRef } from 'react'
import { usePrevious } from 'react-use'
import forEachSibling from './forEachSibling'

export interface UseAriaHideSiblings {
  (target: Element, isActive: boolean): void
}

type AriaHiddenValue  = 'true' | 'false'
type AriaHiddenTuple  = [Element, AriaHiddenValue]
type AriaHiddenTuples = AriaHiddenTuple[]

const useAriaHideSiblings: UseAriaHideSiblings = (target, isActive) => {
  const prevIsActive       = usePrevious(isActive)
  const ariaHiddenSiblings = useRef<AriaHiddenTuples>([])

  useEffect(() => {
    if (!target) {
      return
    }

    if (!prevIsActive && isActive) {
      forEachSibling(el => {
        if (isIgnoredElement(el)) {
          return
        }

        const ariaHiddenValue = el.getAttribute('aria-hidden')

        if (ariaHiddenValue) {
          ariaHiddenSiblings.current.push([
            el,
            ariaHiddenValue as AriaHiddenValue,
          ])
        }

        el.setAttribute('aria-hidden', 'true')
      }, target)
    } else if (prevIsActive && !isActive) {
      forEachSibling(el => {
        if (isIgnoredElement(el)) {
          return
        }

        el.removeAttribute('aria-hidden')
      }, target)

      ariaHiddenSiblings.current.forEach(([el, ariaHiddenValue]) => {
        el?.setAttribute('aria-hidden', ariaHiddenValue)
      })

      ariaHiddenSiblings.current = []
    }
  }, [isActive, prevIsActive, target])
}

interface IsIgnoredElement {
  (el: Element): boolean
}

const isIgnoredElement: IsIgnoredElement = ({ tagName }) =>
  tagName === 'SCRIPT' || tagName === 'NOSCRIPT' || tagName === 'STYLE'

export default useAriaHideSiblings
