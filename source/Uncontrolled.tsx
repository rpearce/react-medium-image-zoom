import React from 'react'
import { Controlled, ControlledProps } from './Controlled'

// =============================================================================

export type UncontrolledProps =
  Omit<ControlledProps, 'isZoomed'>

export function Uncontrolled ({ onZoomChange, ...props }: UncontrolledProps) {
  const [isZoomed, setIsZoomed] = React.useState(false)

  const handleZoomChange = React.useCallback((
    value: boolean,
    { event }: { event: React.SyntheticEvent | Event }
  ) => {
    setIsZoomed(value)
    onZoomChange?.(value, { event })
  }, [onZoomChange])

  return <Controlled {...props} isZoomed={isZoomed} onZoomChange={handleZoomChange} />
}
