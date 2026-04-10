import { afterEach, describe, it, expect, vi } from 'vitest'
import { getStyleModalImg } from './utils.js'

describe('getStyleModalImg', () => {
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: 0,
      configurable: true,
      writable: true,
    })

    Object.defineProperty(window, 'innerHeight', {
      value: 0,
      configurable: true,
      writable: true,
    })
  })

  describe('regular path (no loadedImgEl)', () => {
    it('returns base position and transform when not zoomed', () => {
      setupBrowserGlobals({ width: 1024, height: 768 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.top).toBe(100)
      expect(result.left).toBe(50)
      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
      expect(result.transform).toBe('translate(0,0) scale(1)')
    })

    it('centers the image when zoomed', () => {
      setupBrowserGlobals({ width: 1024, height: 768 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: true,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transform).toBe('translate(262px,134px) scale(1)')
    })
  })

  describe('scalable src', () => {
    it('scales SVG to fill viewport', () => {
      setupBrowserGlobals({ width: 400, height: 300 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'image.svg',
        isSvg: true,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 10,
          left: 20,
          width: 200,
          height: 150,
        }),
      })

      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
      expect(result.transform).toBe('translate(0,0) scale(0.5)')
    })

    it('respects offset when scaling SVG', () => {
      setupBrowserGlobals({ width: 400, height: 300 })

      const withoutOffset = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'image.svg',
        isSvg: true,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 10,
          left: 20,
          width: 200,
          height: 150,
        }),
      })

      const withOffset = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'image.svg',
        isSvg: true,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 50,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 10,
          left: 20,
          width: 200,
          height: 150,
        }),
      })

      expect(Number(withOffset.width)).toBeLessThan(Number(withoutOffset.width))
    })

    it('treats hasZoomImg as scalable src', () => {
      setupBrowserGlobals({ width: 400, height: 300 })

      const result = getStyleModalImg({
        hasZoomImg: true,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 10,
          left: 20,
          width: 200,
          height: 150,
        }),
      })

      // Same as SVG: getScaleToWindow = min(400/200, 300/150) = 2
      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
      expect(result.transform).toBe('translate(0,0) scale(0.5)')
    })
  })

  describe('image larger than viewport', () => {
    it('scales down when image exceeds viewport', () => {
      setupBrowserGlobals({ width: 400, height: 300 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 0,
          left: 0,
          width: 800,
          height: 600,
        }),
      })

      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
      expect(result.transform).toBe('translate(0,0) scale(2)')
    })

    it('centers correctly when zoomed with scale < 1', () => {
      setupBrowserGlobals({ width: 400, height: 300 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: true,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 0,
          left: 0,
          width: 800,
          height: 600,
        }),
      })

      expect(result.transform).toBe('translate(0px,0px) scale(1)')
    })
  })

  describe('object-fit path', () => {
    it('computes contain layout with natural dims larger than container', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'contain', objectPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 800,
          naturalHeight: 400,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      expect(result.top).toBe(100)
      expect(result.left).toBe(50)
      expect(result.width).toBe(800)
      expect(result.height).toBe(400)
      expect(result.transform).toBe('translate(0,0) scale(0.5)')
    })

    it('computes cover layout', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'cover', objectPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 800,
          naturalHeight: 400,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 400,
        }),
      })

      expect(result.top).toBe(100)
      expect(result.left).toBe(-150)
      expect(result.width).toBe(800)
      expect(result.height).toBe(400)
      expect(result.transform).toBe('translate(0,0) scale(1)')
    })
  })

  describe('object-fit: none', () => {
    it('positions image at natural size without scaling to fit', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'none', objectPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 800,
          naturalHeight: 400,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      // none: no ratio scaling, position based on overflow
      // posX = 50% of (400 - 800) = -200
      // posY = 50% of (200 - 400) = -100
      expect(result.top).toBe(0)
      expect(result.left).toBe(-150)
    })
  })

  describe('object-fit: scale-down', () => {
    it('behaves like contain when natural dims exceed container', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'scale-down', objectPosition: '50% 50%' },
      )

      const containResult = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 800,
          naturalHeight: 400,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'contain', objectPosition: '50% 50%' },
      )

      const scaleDownResult = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 800,
          naturalHeight: 400,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      expect(scaleDownResult).toStrictEqual(containResult)
    })

    it('behaves like none when natural dims fit within container', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'scale-down', objectPosition: '50% 50%' },
      )

      const scaleDownResult = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 200,
          naturalHeight: 100,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      setupBrowserGlobals(
        { width: 800, height: 600 },
        { objectFit: 'none', objectPosition: '50% 50%' },
      )

      const noneResult = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 200,
          naturalHeight: 100,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 200,
        }),
      })

      expect(scaleDownResult).toStrictEqual(noneResult)
    })
  })

  describe('div background path', () => {
    it('computes cover layout for background image', () => {
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { backgroundSize: 'cover', backgroundPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 400,
          naturalHeight: 300,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('div', {
          top: 100,
          left: 50,
          width: 200,
          height: 150,
        }),
      })

      expect(result.top).toBe(100)
      expect(result.left).toBe(50)
      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
      expect(result.transform).toBe('translate(0,0) scale(0.5)')
    })

    it('computes contain layout for background image', () => {
      // viewport 800x600, container 200x200, natural 400x200
      // contain: ratio = min(200/400, 200/200) = min(0.5, 1) = 0.5
      // Image is narrower than cover would produce
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { backgroundSize: 'contain', backgroundPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 400,
          naturalHeight: 200,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('div', {
          top: 100,
          left: 50,
          width: 200,
          height: 200,
        }),
      })

      // contain uses Math.min, so width constrains
      // ratio = 0.5, scaled natural: 200x100
      // posY = 50% of (200 - 200*0.5) = 50
      expect(result.top).toBe(150)
      expect(result.left).toBe(50)
    })

    it('computes auto layout for background image', () => {
      // backgroundSize=auto uses natural dims directly (no ratio scaling)
      setupBrowserGlobals(
        { width: 800, height: 600 },
        { backgroundSize: 'auto', backgroundPosition: '50% 50%' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 400,
          naturalHeight: 300,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('div', {
          top: 100,
          left: 50,
          width: 200,
          height: 150,
        }),
      })

      // auto: posX = 50% of (200 - 400) = -100, posY = 50% of (150 - 300) = -75
      expect(result.top).toBe(25)
      expect(result.left).toBe(-50)
    })
  })

  describe('natural dimensions from loadedImgEl', () => {
    it('uses natural dimensions when loadedImgEl is provided', () => {
      setupBrowserGlobals({ width: 800, height: 600 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: createLoadedImgEl({
          naturalWidth: 400,
          naturalHeight: 300,
        }),
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 200,
          height: 150,
        }),
      })

      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
    })
  })

  describe('user CSS transform preservation', () => {
    it('appends centered user transform when not zoomed', () => {
      setupBrowserGlobals(
        { width: 1024, height: 768 },
        { transform: 'matrix(-1, 0, 0, 1, 0, 0)' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transform).toBe(
        'translate(0,0) scale(1) translate(200px,150px) matrix(-1, 0, 0, 1, 0, 0) translate(-200px,-150px)',
      )
    })

    it('includes centered user transform when zoomed', () => {
      setupBrowserGlobals(
        { width: 1024, height: 768 },
        { transform: 'matrix(-1, 0, 0, 1, 0, 0)' },
      )

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: true,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transform).toBe(
        'translate(262px,134px) scale(1) translate(200px,150px) matrix(-1, 0, 0, 1, 0, 0) translate(-200px,-150px)',
      )
    })

    it('is a no-op when computed transform is "none"', () => {
      setupBrowserGlobals({ width: 1024, height: 768 }, { transform: 'none' })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transform).toBe('translate(0,0) scale(1)')
    })

    it('is a no-op when computed transform is empty', () => {
      setupBrowserGlobals({ width: 1024, height: 768 }, { transform: '' })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: false,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transform).toBe('translate(0,0) scale(1)')
    })
  })

  describe('shouldRefresh', () => {
    it('sets transitionDuration when zoomed and shouldRefresh', () => {
      setupBrowserGlobals({ width: 1024, height: 768 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: true,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: true,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transitionDuration).toBe('0.01ms')
    })

    it('does not set transitionDuration when not zoomed', () => {
      setupBrowserGlobals({ width: 1024, height: 768 })

      const result = getStyleModalImg({
        hasZoomImg: false,
        imgSrc: 'photo.jpg',
        isSvg: false,
        isZoomed: false,
        loadedImgEl: undefined,
        offset: 0,
        shouldRefresh: true,
        targetEl: createTargetEl('img', {
          top: 100,
          left: 50,
          width: 400,
          height: 300,
        }),
      })

      expect(result.transitionDuration).toBeUndefined()
    })
  })
})

interface MockComputedStyle {
  objectFit: string
  objectPosition: string
  backgroundPosition: string
  backgroundSize: string
  transform: string
}

function setupBrowserGlobals(
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

  Object.defineProperty(window, 'innerWidth', {
    value: viewport.width,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(window, 'innerHeight', {
    value: viewport.height,
    configurable: true,
    writable: true,
  })

  const baseStyle = window.getComputedStyle(document.createElement('div'))

  for (const [key, value] of Object.entries(cs)) {
    Object.defineProperty(baseStyle, key, { value, configurable: true })
  }

  vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)
}

function createTargetEl<K extends 'div' | 'img' | 'span'>(
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

function createLoadedImgEl(dims: {
  naturalWidth: number
  naturalHeight: number
}): HTMLImageElement {
  const el = document.createElement('img')

  Object.defineProperty(el, 'naturalWidth', { value: dims.naturalWidth })
  Object.defineProperty(el, 'naturalHeight', { value: dims.naturalHeight })

  return el
}
