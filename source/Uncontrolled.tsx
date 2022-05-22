import React, { memo, useState } from 'react'
import Base, { BaseProps } from './Base'

// =============================================================================

export type UncontrolledProps =
  Omit<BaseProps, 'isZoomed' | 'onZoomChange'>

function Uncontrolled (props: UncontrolledProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return <Base {...props} isZoomed={isZoomed} onZoomChange={setIsZoomed} />
}

export default typeof window !== 'undefined'
  ? memo(Uncontrolled)
  : (props: UncontrolledProps) => <>{props.children}</>
