import { describe, it, expect, afterEach } from 'vitest'
import { getScale } from './get-scale.js'
import { setWindowDimensions, resetWindowDimensions } from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

describe('getScale', () => {
  describe('when containerHeight is 0', () => {
    it('returns 1', () => {
      const result = getScale({
        containerHeight: 0,
        containerWidth: 500,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 1000,
        targetWidth: 1000,
      })

      expect(result).toBe(1)
    })
  })

  describe('when containerWidth is 0', () => {
    it('returns 1', () => {
      const result = getScale({
        containerHeight: 500,
        containerWidth: 0,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 1000,
        targetWidth: 1000,
      })

      expect(result).toBe(1)
    })
  })

  describe('scalable src path (hasScalableSrc=true)', () => {
    it('returns scale > 1 when container is smaller than viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 200,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toBe(3.84)
    })

    it('returns scale < 1 when container is larger than viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 1536,
        containerWidth: 2048,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toBe(0.5)
    })

    it('returns 1 when container equals viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 768,
        containerWidth: 1024,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toBe(1)
    })

    it('accounts for offset reducing available viewport space', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 768,
        containerWidth: 1024,
        hasScalableSrc: true,
        offset: 50,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toBe(668 / 768)
    })
  })

  describe('non-scalable src path (hasScalableSrc=false, target dims > 0)', () => {
    it('uses height-based ratio for square target (targetWidth === targetHeight)', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 200,
        containerWidth: 200,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 600,
        targetWidth: 600,
      })

      expect(result).toBe(3)
    })

    it('uses landscape ratio when target is wider than tall', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 150,
        containerWidth: 200,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 600,
        targetWidth: 800,
      })

      expect(result).toBe(4)
    })

    it('uses portrait ratio when target is taller than wide', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 200,
        containerWidth: 150,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 800,
        targetWidth: 600,
      })

      expect(result).toBe(3.84)
    })

    it('returns ratio only when scale > 1 (target fits in viewport with room to spare)', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 100,
        containerWidth: 100,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toBe(4)
    })

    it('returns scale * ratio when scale <= 1 (target exceeds viewport)', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 400,
        containerWidth: 500,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 1600,
        targetWidth: 2000,
      })

      expect(result).toBe(1.92)
    })

    it('returns scale * ratio for portrait target that exceeds viewport', () => {
      setWindowDimensions(1024, 768)

      const result = getScale({
        containerHeight: 500,
        containerWidth: 400,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 2000,
        targetWidth: 1600,
      })

      expect(result).toBe(1.536)
    })
  })

  describe('non-scalable with zero target dimensions falls through to scalable path', () => {
    it('uses getScaleToWindow with container dims when targetHeight is 0', () => {
      setWindowDimensions(1024, 768)

      // hasScalableSrc=false but targetHeight=0, so condition is false
      // falls through to getScaleToWindow with container dims
      const result = getScale({
        containerHeight: 384,
        containerWidth: 512,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 0,
        targetWidth: 800,
      })

      expect(result).toBe(2)
    })

    it('uses getScaleToWindow with container dims when targetWidth is 0', () => {
      setWindowDimensions(1024, 768)

      // hasScalableSrc=false but targetWidth=0, so condition is false
      // falls through to getScaleToWindow with container dims
      const result = getScale({
        containerHeight: 384,
        containerWidth: 512,
        hasScalableSrc: false,
        offset: 0,
        targetHeight: 800,
        targetWidth: 0,
      })

      expect(result).toBe(2)
    })
  })

  describe('offset parameter correctness', () => {
    it('subtracts offset * 2 from both viewport dimensions for scalable src', () => {
      setWindowDimensions(1000, 800)

      const result = getScale({
        containerHeight: 400,
        containerWidth: 500,
        hasScalableSrc: true,
        offset: 100,
        targetHeight: 0,
        targetWidth: 0,
      })

      expect(result).toBe(1.5)
    })

    it('subtracts offset * 2 from viewport dimensions for non-scalable src path', () => {
      setWindowDimensions(1000, 800)

      const result = getScale({
        containerHeight: 400,
        containerWidth: 500,
        hasScalableSrc: false,
        offset: 100,
        targetHeight: 1600,
        targetWidth: 2000,
      })

      expect(result).toBe(1.5)
    })
  })
})
