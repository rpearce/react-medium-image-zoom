import { describe, it, expect } from 'vitest'
import { parsePosition } from './parse-position.js'

describe('parsePosition', () => {
  describe('percentage values', () => {
    it('returns 100 for 50% of 200', () => {
      expect(parsePosition('50%', 200)).toBe(100)
    })

    it('returns 0 for 0% of 200', () => {
      expect(parsePosition('0%', 200)).toBe(0)
    })

    it('returns 200 for 100% of 200', () => {
      expect(parsePosition('100%', 200)).toBe(200)
    })

    it('returns 100 for 25% of 400', () => {
      expect(parsePosition('25%', 400)).toBe(100)
    })

    it('returns -50 for 50% of -100', () => {
      expect(parsePosition('50%', -100)).toBe(-50)
    })

    it('returns 0 for 50% of 0', () => {
      expect(parsePosition('50%', 0)).toBe(0)
    })
  })

  describe('pixel values', () => {
    it('returns 100 for 100px regardless of relativeNum', () => {
      expect(parsePosition('100px', 999)).toBe(100)
    })

    it('returns 0 for 0px', () => {
      expect(parsePosition('0px', 500)).toBe(0)
    })

    it('returns -50 for -50px', () => {
      expect(parsePosition('-50px', 500)).toBe(-50)
    })

    it('returns 42.5 for 42.5px', () => {
      expect(parsePosition('42.5px', 500)).toBe(42.5)
    })
  })

  describe('edge cases', () => {
    it('returns 50 for a unitless value', () => {
      expect(parsePosition('50', 200)).toBe(50)
    })

    it('returns 99.99 for 33.33% of 300', () => {
      expect(parsePosition('33.33%', 300)).toBe(99.99)
    })
  })
})
