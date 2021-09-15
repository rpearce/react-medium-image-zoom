export interface GetScaleToWindow {
  (width: number, height: number, offset: number): number
}

const getScaleToWindow: GetScaleToWindow = (width, height, offset) => {
  return Math.min(
    window.innerWidth  / (width  + offset), // scale X-axis
    window.innerHeight / (height + offset)  // scale Y-axis
  )
}

export default getScaleToWindow
