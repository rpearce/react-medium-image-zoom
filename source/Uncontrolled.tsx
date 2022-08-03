import React, { useState } from 'react'
import { Controlled, ControlledProps } from './Controlled'

// =============================================================================

export type UncontrolledProps =
  Omit<ControlledProps, 'isZoomed' | 'onZoomChange'>

export function Uncontrolled (props: UncontrolledProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return <Controlled {...props} isZoomed={isZoomed} onZoomChange={setIsZoomed} />
}
