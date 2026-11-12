export type SupportedImage =
  | HTMLImageElement
  | HTMLDivElement
  | HTMLSpanElement
  | SVGElement

export interface StyleObject {
  height?: number
  left?: number
  top?: number
  transform?: string
  transitionDuration?: string
  width?: number
}

export interface ModalImgPosition {
  top: number
  left: number
  width: number
  height: number
  initialTransform: string
}
