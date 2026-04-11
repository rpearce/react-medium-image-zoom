import { describe, it, expect, vi } from 'vitest'
import { getImgSrc } from './get-img-src.js'

describe('getImgSrc', () => {
  it('returns undefined for null input', () => {
    expect(getImgSrc(null)).toBeUndefined()
  })

  describe('img elements', () => {
    it('returns currentSrc when it is a non-empty string', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'currentSrc', {
        value: 'http://example.com/photo.jpg',
        configurable: true,
      })

      expect(getImgSrc(img)).toBe('http://example.com/photo.jpg')
    })

    it('returns undefined when currentSrc is empty string', () => {
      const img = document.createElement('img')
      Object.defineProperty(img, 'currentSrc', {
        value: '',
        configurable: true,
      })

      expect(getImgSrc(img)).toBeUndefined()
    })
  })

  describe('div elements', () => {
    it('returns URL from url(path/to/image.jpg) background-image', () => {
      const div = document.createElement('div')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: 'url(path/to/image.jpg)',
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(div)).toBe('path/to/image.jpg')
    })

    it('returns URL from url with single quotes', () => {
      const div = document.createElement('div')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: "url('path/to/image.jpg')",
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(div)).toBe('path/to/image.jpg')
    })

    it('returns URL from url with double quotes', () => {
      const div = document.createElement('div')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: 'url("path/to/image.jpg")',
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(div)).toBe('path/to/image.jpg')
    })

    it('returns undefined when backgroundImage is empty string', () => {
      const div = document.createElement('div')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: '',
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(div)).toBeUndefined()
    })

    it('returns undefined when backgroundImage is "none" (browser default)', () => {
      const div = document.createElement('div')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: 'none',
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(div)).toBeUndefined()
    })
  })

  describe('span elements', () => {
    it('returns URL from background-image', () => {
      const span = document.createElement('span')
      const baseStyle = window.getComputedStyle(document.createElement('div'))
      Object.defineProperty(baseStyle, 'backgroundImage', {
        value: 'url(photo.jpg)',
        configurable: true,
      })
      vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

      expect(getImgSrc(span)).toBe('photo.jpg')
    })
  })

  describe('SVG elements', () => {
    it('returns undefined for SVG element', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

      expect(getImgSrc(svg)).toBeUndefined()
    })
  })
})
