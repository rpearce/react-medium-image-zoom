import { describe, it, expect, afterEach } from 'vitest'
import { getImgObjectFitStyle } from './get-img-object-fit-style.js'
import { setWindowDimensions, resetWindowDimensions } from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

describe('getImgObjectFitStyle', () => {
  describe('contain', () => {
    it('computes correct style for natural 800x400 in 400x200 container', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'contain',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('cover', () => {
    it('computes correct style for natural 800x400 in 400x400 container', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 400,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'cover',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 0,
        left: -200,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(1)',
      })
    })
  })

  describe('none', () => {
    it('computes correct style for natural 800x400 in 400x200 container', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'none',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: -100,
        left: -200,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(1)',
      })
    })
  })

  describe('fill', () => {
    it('computes correct style for natural 400x200 in 200x200 container', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        objectFit: 'fill',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 200,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('scale-down', () => {
    it('behaves like contain when natural dims exceed container', () => {
      // natural 800x400 > container 400x200, so resolvedObjectFit = 'contain'
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'scale-down',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })

    it('behaves like none when natural dims fit within container', () => {
      // natural 200x100 <= container 400x200, so resolvedObjectFit = 'none'
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'scale-down',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 100,
        targetWidth: 200,
      })

      expect(result).toEqual({
        top: 50,
        left: 100,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })
  })

  describe('position variations', () => {
    // All use contain with natural 800x400 in 600x200 container

    it('positions top-left with objectPosition "0% 0%"', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 50,
        containerTop: 30,
        containerWidth: 600,
        hasScalableSrc: true,
        objectFit: 'contain',
        objectPosition: '0% 0%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 30,
        left: 50,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })

    it('positions bottom-right with objectPosition "100% 100%"', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 50,
        containerTop: 30,
        containerWidth: 600,
        hasScalableSrc: true,
        objectFit: 'contain',
        objectPosition: '100% 100%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 30,
        left: 250,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })

    it('positions with pixel values objectPosition "10px 20px"', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 50,
        containerTop: 30,
        containerWidth: 600,
        hasScalableSrc: true,
        objectFit: 'contain',
        objectPosition: '10px 20px',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 50,
        left: 60,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('hasScalableSrc=false (getScaleToWindowMax path)', () => {
    it('computes contain with non-scalable src', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: false,
        objectFit: 'contain',
        objectPosition: '50% 50%',
        offset: 0,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('non-zero offset', () => {
    it('offset reduces scale for contain layout', () => {
      setWindowDimensions(800, 600)

      const result = getImgObjectFitStyle({
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 400,
        hasScalableSrc: true,
        objectFit: 'contain',
        objectPosition: '50% 50%',
        offset: 50,
        targetHeight: 400,
        targetWidth: 800,
      })

      expect(result.width).toBe(700)
      expect(result.height).toBe(350)
    })
  })
})
