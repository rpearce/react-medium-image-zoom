import { vi } from 'vitest'

export function mockComputedStyle(style: object): void {
  const baseStyle = document.createElement('div').style
  Object.assign(baseStyle, style)

  vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)
}
