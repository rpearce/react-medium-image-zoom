import React from 'react'

interface BodyAttrs {
  overflow: string
  width: string
}

const defaultBodyAttrs: BodyAttrs = {
  overflow: '',
  width: '',
}

/**
 * Manage body scroll lock. Only the locked branch returns a cleanup
 * function, which handles both the isLocked→false transition and
 * unmount-while-locked.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  const prevBodyAttrsRef = React.useRef(defaultBodyAttrs)

  React.useEffect(() => {
    if (!isLocked) return

    prevBodyAttrsRef.current = {
      overflow: document.body.style.overflow,
      width: document.body.style.width,
    }

    const {
      body: { clientWidth },
    } = document

    document.body.style.overflow = 'hidden'
    document.body.style.width = `${clientWidth}px`

    return () => {
      const {
        current: { overflow, width },
      } = prevBodyAttrsRef
      document.body.style.width = width
      document.body.style.overflow = overflow
      prevBodyAttrsRef.current = defaultBodyAttrs
    }
  }, [isLocked])
}
