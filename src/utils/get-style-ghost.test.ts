import { describe, it, expect } from 'vitest'
import { getStyleGhost } from './get-style-ghost.js'

describe('getStyleGhost', () => {
  it('returns an empty object for null input', () => {
    const result = getStyleGhost(null)
    expect(result).toEqual({})
  })

  describe('SVG element without parent', () => {
    it('returns height, left, width, top from getBoundingClientRect', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.getBoundingClientRect = () => ({
        top: 10,
        left: 20,
        width: 100,
        height: 50,
        right: 120,
        bottom: 60,
        x: 20,
        y: 10,
        toJSON: () => undefined,
      })

      const result = getStyleGhost(svg)

      expect(result).toEqual({
        height: 50,
        left: 20,
        width: 100,
        top: 10,
      })
    })
  })

  describe('SVG element with parent', () => {
    it('returns height, width from SVG rect and left/top as parent minus SVG offsets', () => {
      const parent = document.createElement('div')
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      parent.appendChild(svg)

      svg.getBoundingClientRect = () => ({
        top: 30,
        left: 40,
        width: 200,
        height: 150,
        right: 240,
        bottom: 180,
        x: 40,
        y: 30,
        toJSON: () => undefined,
      })

      parent.getBoundingClientRect = () => ({
        top: 50,
        left: 60,
        width: 300,
        height: 250,
        right: 360,
        bottom: 300,
        x: 60,
        y: 50,
        toJSON: () => undefined,
      })

      const result = getStyleGhost(svg)

      expect(result).toEqual({
        height: 150,
        left: 60 - 40, // parentLeft - svgLeft = 20
        top: 50 - 30, // parentTop - svgTop = 20
        width: 200,
      })
    })
  })

  describe('non-SVG img element', () => {
    it('returns offsetHeight, offsetLeft, offsetWidth, offsetTop', () => {
      const img = document.createElement('img')

      Object.defineProperty(img, 'offsetHeight', {
        value: 300,
        configurable: true,
      })
      Object.defineProperty(img, 'offsetLeft', {
        value: 15,
        configurable: true,
      })
      Object.defineProperty(img, 'offsetWidth', {
        value: 400,
        configurable: true,
      })
      Object.defineProperty(img, 'offsetTop', { value: 25, configurable: true })

      const result = getStyleGhost(img)

      expect(result).toEqual({
        height: 300,
        left: 15,
        width: 400,
        top: 25,
      })
    })
  })

  describe('non-SVG div element', () => {
    it('returns offsetHeight, offsetLeft, offsetWidth, offsetTop', () => {
      const div = document.createElement('div')

      Object.defineProperty(div, 'offsetHeight', {
        value: 500,
        configurable: true,
      })
      Object.defineProperty(div, 'offsetLeft', { value: 5, configurable: true })
      Object.defineProperty(div, 'offsetWidth', {
        value: 600,
        configurable: true,
      })
      Object.defineProperty(div, 'offsetTop', { value: 10, configurable: true })

      const result = getStyleGhost(div)

      expect(result).toEqual({
        height: 500,
        left: 5,
        width: 600,
        top: 10,
      })
    })
  })
})
