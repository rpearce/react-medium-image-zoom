import { describe, it, expect, afterEach } from 'vitest'
import { getModalImgTransform } from './get-modal-img-transform.js'
import { setWindowDimensions, resetWindowDimensions } from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

describe('getModalImgTransform', () => {
  describe('not zoomed, no user transform', () => {
    it('returns just initialTransform when userTransform is "none"', () => {
      const result = getModalImgTransform({
        height: 300,
        initialTransform: 'translate(10px,20px) scale(0.5)',
        isZoomed: false,
        left: 50,
        top: 100,
        userTransform: 'none',
        width: 400,
      })

      expect(result).toBe('translate(10px,20px) scale(0.5)')
    })

    it('returns just initialTransform when userTransform is empty string', () => {
      const result = getModalImgTransform({
        height: 300,
        initialTransform: 'translate(10px,20px) scale(0.5)',
        isZoomed: false,
        left: 50,
        top: 100,
        userTransform: '',
        width: 400,
      })

      expect(result).toBe('translate(10px,20px) scale(0.5)')
    })
  })

  describe('not zoomed, with user transform', () => {
    it('returns initialTransform with centered user transform', () => {
      const result = getModalImgTransform({
        height: 300,
        initialTransform: 'translate(10px,20px) scale(0.5)',
        isZoomed: false,
        left: 50,
        top: 100,
        userTransform: 'matrix(-1, 0, 0, 1, 0, 0)',
        width: 400,
      })

      expect(result).toBe(
        'translate(10px,20px) scale(0.5) translate(200px,150px) matrix(-1, 0, 0, 1, 0, 0) translate(-200px,-150px)',
      )
    })
  })

  describe('zoomed, no user transform', () => {
    it('returns translate and scale(1) centered on viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getModalImgTransform({
        height: 300,
        initialTransform: 'translate(10px,20px) scale(0.5)',
        isZoomed: true,
        left: 50,
        top: 100,
        userTransform: 'none',
        width: 400,
      })

      expect(result).toBe('translate(262px,134px) scale(1)')
    })
  })

  describe('zoomed, with user transform', () => {
    it('returns translate, scale(1), and centered user transform', () => {
      setWindowDimensions(1024, 768)

      const result = getModalImgTransform({
        height: 300,
        initialTransform: 'translate(10px,20px) scale(0.5)',
        isZoomed: true,
        left: 50,
        top: 100,
        userTransform: 'matrix(-1, 0, 0, 1, 0, 0)',
        width: 400,
      })

      expect(result).toBe(
        'translate(262px,134px) scale(1) translate(200px,150px) matrix(-1, 0, 0, 1, 0, 0) translate(-200px,-150px)',
      )
    })
  })

  describe('edge cases', () => {
    it('returns translate(0px,0px) when element is centered in viewport', () => {
      // inputs chosen so element center coincides with viewport center
      setWindowDimensions(800, 600)

      const result = getModalImgTransform({
        height: 400,
        initialTransform: 'translate(0px,0px) scale(1)',
        isZoomed: true,
        left: 200,
        top: 100,
        userTransform: 'none',
        width: 400,
      })

      expect(result).toBe('translate(0px,0px) scale(1)')
    })

    it('handles a very large element extending beyond the viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getModalImgTransform({
        height: 2000,
        initialTransform: 'translate(0px,0px) scale(0.25)',
        isZoomed: true,
        left: -500,
        top: -400,
        userTransform: 'none',
        width: 3000,
      })

      expect(result).toBe('translate(-488px,-216px) scale(1)')
    })
  })
})
