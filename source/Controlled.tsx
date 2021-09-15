import { memo } from 'react'
import Base, { BaseProps } from './Base'

// If we're not in a browser environment,
// there is no need to zoom images.
export default typeof window !== 'undefined'
  ? memo(Base)
  : (props: BaseProps) => props.children
