import { describe, it, expect } from 'vitest'
import { testDiv, testImg, testImgLoaded, testSvg } from './element-tests.js'

describe('testDiv', () => {
  it('returns true for HTMLDivElement', () => {
    const el = document.createElement('div')
    expect(testDiv(el)).toBe(true)
  })

  it('returns true for HTMLSpanElement', () => {
    const el = document.createElement('span')
    expect(testDiv(el)).toBe(true)
  })

  it('returns false for HTMLImageElement', () => {
    const el = document.createElement('img')
    expect(testDiv(el)).toBe(false)
  })

  it('returns false for SVGElement', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    expect(testDiv(el)).toBe(false)
  })

  it('returns false for null', () => {
    expect(testDiv(null)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(testDiv(undefined)).toBe(false)
  })

  it('returns false for a plain object', () => {
    expect(testDiv({})).toBe(false)
  })

  it('returns false for a string', () => {
    expect(testDiv('div')).toBe(false)
  })
})

describe('testImg', () => {
  it('returns true for HTMLImageElement', () => {
    const el = document.createElement('img')
    expect(testImg(el)).toBe(true)
  })

  it('returns false for HTMLDivElement', () => {
    const el = document.createElement('div')
    expect(testImg(el)).toBe(false)
  })

  it('returns false for null', () => {
    expect(testImg(null)).toBe(false)
  })

  it('returns false for a number', () => {
    expect(testImg(42)).toBe(false)
  })
})

describe('testImgLoaded', () => {
  it('returns true when complete=true and naturalHeight > 0', () => {
    const el = document.createElement('img')
    Object.defineProperty(el, 'complete', { value: true })
    Object.defineProperty(el, 'naturalHeight', { value: 100 })
    expect(testImgLoaded(el)).toBe(true)
  })

  it('returns false when complete=false and naturalHeight > 0', () => {
    const el = document.createElement('img')
    Object.defineProperty(el, 'complete', { value: false })
    Object.defineProperty(el, 'naturalHeight', { value: 100 })
    expect(testImgLoaded(el)).toBe(false)
  })

  it('returns false when complete=true and naturalHeight === 0', () => {
    const el = document.createElement('img')
    Object.defineProperty(el, 'complete', { value: true })
    Object.defineProperty(el, 'naturalHeight', { value: 0 })
    expect(testImgLoaded(el)).toBe(false)
  })

  it('returns false when complete=false and naturalHeight === 0', () => {
    const el = document.createElement('img')
    Object.defineProperty(el, 'complete', { value: false })
    Object.defineProperty(el, 'naturalHeight', { value: 0 })
    expect(testImgLoaded(el)).toBe(false)
  })
})

describe('testSvg', () => {
  it('returns true for SVGElement', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    expect(testSvg(el)).toBe(true)
  })

  it('returns false for HTMLDivElement', () => {
    const el = document.createElement('div')
    expect(testSvg(el)).toBe(false)
  })

  it('returns false for null', () => {
    expect(testSvg(null)).toBe(false)
  })
})
