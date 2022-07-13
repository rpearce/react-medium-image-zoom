import React from 'react'
import Base, { BaseProps } from './Base'

// =============================================================================

export type ControlledProps = BaseProps

export default typeof window !== 'undefined'
  ? Base
  : (props: ControlledProps) => <>{props.children}</>
