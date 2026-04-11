import { describe, it, expect, afterEach } from 'vitest'
import { getDivImgStyle } from './get-div-img-style.js'
import { setWindowDimensions, resetWindowDimensions } from './test-helpers.js'

afterEach(() => {
  resetWindowDimensions()
})

describe('getDivImgStyle', () => {
  describe('backgroundSize: cover', () => {
    it('uses max ratio and positions with 50% 50%', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        containerHeight: 150,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 600,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })
  })

  describe('backgroundSize: contain', () => {
    it('uses min ratio and positions with 50% 50%', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: 'contain',
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 200,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 50,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })
  })

  describe('backgroundSize: auto', () => {
    it('uses natural size directly and computes position offsets', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: 'auto',
        containerHeight: 150,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: -75,
        left: -100,
        width: 800,
        height: 600,
        initialTransform: 'translate(0,0) scale(0.5)',
      })
    })
  })

  describe('explicit backgroundSize', () => {
    it('parses pixel sizes and uses min ratio', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: '100px 75px',
        containerHeight: 150,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 37.5,
        left: 50,
        width: 800,
        height: 600,
        initialTransform: 'translate(0,0) scale(0.125)',
      })
    })

    it('parses percentage sizes relative to container dimensions', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: '50% 50%',
        containerHeight: 150,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 37.5,
        left: 50,
        width: 800,
        height: 600,
        initialTransform: 'translate(0,0) scale(0.125)',
      })
    })
  })

  describe('backgroundPosition variations', () => {
    it('positions at top-left with 0% 0%', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '0% 0%',
        backgroundSize: 'contain',
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 200,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 0,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })

    it('positions at bottom-right with 100% 100%', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '100% 100%',
        backgroundSize: 'contain',
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 200,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 100,
        left: 0,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })

    it('positions with pixel values', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '10px 20px',
        backgroundSize: 'contain',
        containerHeight: 200,
        containerLeft: 0,
        containerTop: 0,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 200,
        targetWidth: 400,
      })

      expect(result).toEqual({
        top: 20,
        left: 10,
        width: 800,
        height: 400,
        initialTransform: 'translate(0,0) scale(0.25)',
      })
    })
  })

  describe('non-zero container offset', () => {
    it('adds containerLeft and containerTop to position', () => {
      setWindowDimensions(800, 600)

      const result = getDivImgStyle({
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        containerHeight: 150,
        containerLeft: 30,
        containerTop: 40,
        containerWidth: 200,
        hasScalableSrc: true,
        offset: 0,
        targetHeight: 300,
        targetWidth: 400,
      })

      expect(result.top).toBe(40)
      expect(result.left).toBe(30)
    })
  })
})
