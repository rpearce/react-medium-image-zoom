import React from 'react'

let idCounter = 0

function useZoomIdFallback(): string {
  const [id] = React.useState(() => {
    idCounter += 1
    return `rmiz-${idCounter}`
  })
  return id
}

export const useZoomId =
  typeof React.useId === 'function' ? React.useId : useZoomIdFallback
