import React, { FC, ReactNode, memo, useState } from 'react'
import Base from './Base'

export interface UncontrolledProps {
	children: ReactNode
	closeText?: string
	modalLabelText?: string
	openText?: string
	overlayBgColorEnd?: string
	overlayBgColorStart?: string
	scrollableEl?: HTMLElement | Window
	transitionDuration?: number
	zoomMargin?: number
}

const Uncontrolled: FC<UncontrolledProps> = (props: UncontrolledProps) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return <Base {...props} isZoomed={isZoomed} onZoomChange={setIsZoomed} />
}

// If we're not in a browser environment,
// there is no need to zoom images.
export default typeof window !== 'undefined'
  ? memo(Uncontrolled)
  : (props: UncontrolledProps) => <>{props.children}</>
