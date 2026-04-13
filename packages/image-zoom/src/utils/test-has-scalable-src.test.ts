import { describe, it, expect } from 'vitest'
import { testHasScalableSrc } from './test-has-scalable-src.js'

describe('testHasScalableSrc', () => {
  it('returns true when isSvg is true regardless of other params', () => {
    expect(
      testHasScalableSrc({ hasZoomImg: false, imgSrc: undefined, isSvg: true }),
    ).toBe(true)
  })

  it('returns true for data:image/svg+xml URI', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'data:image/svg+xml,<svg></svg>',
        isSvg: false,
      }),
    ).toBe(true)
  })

  it('returns true for data:image/svg+xml;base64 URI', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
        isSvg: false,
      }),
    ).toBe(true)
  })

  it('returns true when hasZoomImg is true regardless of other params', () => {
    expect(
      testHasScalableSrc({ hasZoomImg: true, imgSrc: undefined, isSvg: false }),
    ).toBe(true)
  })

  it('returns true for .svg file extension', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/image.svg',
        isSvg: false,
      }),
    ).toBe(true)
  })

  it('returns true for .SVG file extension (case insensitive)', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/image.SVG',
        isSvg: false,
      }),
    ).toBe(true)
  })

  it('returns false for regular jpg', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/photo.jpg',
        isSvg: false,
      }),
    ).toBe(false)
  })

  it('returns false for regular png', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/photo.png',
        isSvg: false,
      }),
    ).toBe(false)
  })

  it('returns false when all conditions are false and imgSrc is undefined', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: undefined,
        isSvg: false,
      }),
    ).toBe(false)
  })

  it('returns false for .svgz extension', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/image.svgz',
        isSvg: false,
      }),
    ).toBe(false)
  })

  it('returns false for .svg with query params since regex requires .svg at end', () => {
    expect(
      testHasScalableSrc({
        hasZoomImg: false,
        imgSrc: 'https://example.com/image.svg?v=1',
        isSvg: false,
      }),
    ).toBe(false)
  })
})
