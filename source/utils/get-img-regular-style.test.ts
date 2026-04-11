import { describe, it, expect, afterEach } from 'vitest'
import { getImgRegularStyle } from './get-img-regular-style.js'
import { setWindowDimensions, resetWindowDimensions } from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

describe('getImgRegularStyle', () => {
  describe('scalable src', () => {
    it('scales up when the container fits within the viewport', () => {
      setWindowDimensions(1024, 768)
      const result = getImgRegularStyle({
        containerHeight: 384,
        containerLeft: 100,
        containerTop: 50,
        containerWidth: 512,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 50,
        left: 100,
        width: 1024,
        height: 768,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })

    it('returns scale 1 when the container equals the viewport', () => {
      setWindowDimensions(800, 600)
      const result = getImgRegularStyle({
        containerHeight: 600,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 800,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 600,
        initialTransform: 'translate(0,0) scale(1)',
      })
    })

    it('scales down when the container is larger than the viewport', () => {
      setWindowDimensions(400, 300)
      const result = getImgRegularStyle({
        containerHeight: 600,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 800,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 400,
        height: 300,
        initialTransform: 'translate(0,0) scale(2)',
      })
    })
  })

  describe('non-scalable src with target dimensions', () => {
    it('uses getScaleToWindowMax to compute scale from target dimensions', () => {
      setWindowDimensions(800, 600)
      const result = getImgRegularStyle({
        containerHeight: 150,
        containerLeft: 10,
        containerTop: 20,
        containerWidth: 200,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 20,
        left: 10,
        width: 400,
        height: 300,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('top and left passthrough', () => {
    it('always passes through containerTop and containerLeft directly', () => {
      setWindowDimensions(1024, 768)

      const result1 = getImgRegularStyle({
        containerHeight: 384,
        containerLeft: 250,
        containerTop: 175,
        containerWidth: 512,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result1.top).toBe(175)
      expect(result1.left).toBe(250)

      const result2 = getImgRegularStyle({
        containerHeight: 384,
        containerLeft: -50,
        containerTop: -100,
        containerWidth: 512,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result2.top).toBe(-100)
      expect(result2.left).toBe(-50)
    })
  })

  describe('with offset reducing available space', () => {
    it('computes a smaller scale when offset is applied', () => {
      setWindowDimensions(1000, 600)
      const result = getImgRegularStyle({
        containerHeight: 100,
        containerLeft: 50,
        containerTop: 25,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 100,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 25,
        left: 50,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })
  })

  describe('zero container dimension', () => {
    it('returns scale 1 when containerWidth is 0', () => {
      setWindowDimensions(1024, 768)
      const result = getImgRegularStyle({
        containerHeight: 384,
        containerLeft: 10,
        containerTop: 20,
        containerWidth: 0,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 20,
        left: 10,
        width: 0,
        height: 384,
        initialTransform: 'translate(0,0) scale(1)',
      })
    })

    it('returns scale 1 when containerHeight is 0', () => {
      setWindowDimensions(1024, 768)
      const result = getImgRegularStyle({
        containerHeight: 0,
        containerLeft: 30,
        containerTop: 40,
        containerWidth: 512,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toEqual({
        top: 40,
        left: 30,
        width: 512,
        height: 0,
        initialTransform: 'translate(0,0) scale(1)',
      })
    })
  })
})
