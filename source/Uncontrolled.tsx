import React, { useState } from 'react'
import Base, { BaseProps } from './Base'

// =============================================================================

export type UncontrolledProps =
  Omit<BaseProps, 'isZoomed' | 'onZoomChange'>

function Uncontrolled (props: UncontrolledProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return <Base {...props} isZoomed={isZoomed} onZoomChange={setIsZoomed} />
}

export default typeof window !== 'undefined'
  ? Uncontrolled
  : (props: UncontrolledProps) => <>{props.children}</>
