import React, { memo } from 'react'
import Base, { BaseProps } from './Base'

// =============================================================================

export type ControlledProps = BaseProps

export default typeof window !== 'undefined'
  ? memo(Base)
  : (props: ControlledProps) => <>{props.children}</>
