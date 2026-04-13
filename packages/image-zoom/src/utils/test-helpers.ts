import { vi } from 'vitest'

interface MockComputedStyle {
  objectFit: string
  objectPosition: string
  backgroundPosition: string
  backgroundSize: string
  transform: string
}

const { innerWidth: originalInnerWidth, innerHeight: originalInnerHeight } =
  window

export function setWindowDimensions(width: number, height: number): void {
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(window, 'innerHeight', {
    value: height,
    configurable: true,
    writable: true,
  })
}

export function resetWindowDimensions(): void {
  Object.defineProperty(window, 'innerWidth', {
    value: originalInnerWidth,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(window, 'innerHeight', {
    value: originalInnerHeight,
    configurable: true,
    writable: true,
  })
}

export function setupBrowserGlobals(
  viewport: { width: number; height: number },
  computedStyle?: Partial<MockComputedStyle>,
): void {
  const cs: MockComputedStyle = {
    objectFit: 'fill',
    objectPosition: '50% 50%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'auto',
    transform: 'none',
    ...computedStyle,
  }

  setWindowDimensions(viewport.width, viewport.height)

  const baseStyle = window.getComputedStyle(document.createElement('div'))

  for (const [key, value] of Object.entries(cs)) {
    Object.defineProperty(baseStyle, key, { value, configurable: true })
  }

  vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)
}

export function createTargetEl<K extends 'div' | 'img' | 'span'>(
  tagName: K,
  rect: { top: number; left: number; width: number; height: number },
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName)

  el.getBoundingClientRect = (): DOMRect => ({
    ...rect,
    right: rect.left + rect.width,
    bottom: rect.top + rect.height,
    x: rect.left,
    y: rect.top,
    toJSON: () => undefined,
  })

  return el
}

export function createLoadedImgEl(dims: {
  naturalWidth: number
  naturalHeight: number
}): HTMLImageElement {
  const el = document.createElement('img')

  Object.defineProperty(el, 'naturalWidth', { value: dims.naturalWidth })
  Object.defineProperty(el, 'naturalHeight', { value: dims.naturalHeight })

  return el
}
