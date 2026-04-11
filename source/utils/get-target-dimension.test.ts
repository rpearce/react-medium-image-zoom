import { describe, it, expect } from 'vitest'
import { getTargetDimension } from './get-target-dimension.js'

describe('getTargetDimension', () => {
  it('returns natural when defined and non-zero', () => {
    expect(getTargetDimension({ fallback: 100, natural: 200 })).toBe(200)
  })

  it('returns fallback when natural is undefined', () => {
    expect(getTargetDimension({ fallback: 100, natural: undefined })).toBe(100)
  })

  it('returns fallback when natural is 0', () => {
    expect(getTargetDimension({ fallback: 100, natural: 0 })).toBe(100)
  })

  it('returns natural even when it equals fallback', () => {
    expect(getTargetDimension({ fallback: 300, natural: 300 })).toBe(300)
  })

  it('returns fallback when natural is 0 even if fallback is also 0', () => {
    expect(getTargetDimension({ fallback: 0, natural: 0 })).toBe(0)
  })

  it('handles large numbers correctly', () => {
    expect(getTargetDimension({ fallback: 100, natural: 999999 })).toBe(999999)
  })
})
