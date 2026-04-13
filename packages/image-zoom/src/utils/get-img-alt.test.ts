import { describe, it, expect } from 'vitest'
import { getImgAlt } from './get-img-alt.js'

describe('getImgAlt', () => {
  it('returns undefined for null input', () => {
    expect(getImgAlt(null)).toBeUndefined()
  })

  describe('img elements', () => {
    it('returns alt text when set', () => {
      const el = document.createElement('img')
      el.alt = 'A photo of a cat'
      expect(getImgAlt(el)).toBe('A photo of a cat')
    })

    it('returns empty string when alt is empty', () => {
      const el = document.createElement('img')
      el.alt = ''
      expect(getImgAlt(el)).toBe('')
    })
  })

  describe('div elements', () => {
    it('returns aria-label when set', () => {
      const el = document.createElement('div')
      el.setAttribute('aria-label', 'A decorative image')
      expect(getImgAlt(el)).toBe('A decorative image')
    })

    it('returns undefined when aria-label is not set', () => {
      const el = document.createElement('div')
      expect(getImgAlt(el)).toBeUndefined()
    })
  })

  describe('span elements', () => {
    it('returns aria-label when set', () => {
      const el = document.createElement('span')
      el.setAttribute('aria-label', 'An icon description')
      expect(getImgAlt(el)).toBe('An icon description')
    })
  })

  describe('empty aria-label', () => {
    it('returns empty string when aria-label is set to empty string', () => {
      const el = document.createElement('div')
      el.setAttribute('aria-label', '')
      expect(getImgAlt(el)).toBe('')
    })
  })

  describe('aria-labelledby fallback', () => {
    it('resolves a single id ref to its text content', () => {
      const el = document.createElement('div')
      el.setAttribute('role', 'img')
      el.setAttribute('aria-labelledby', 'cap')
      const cap = document.createElement('span')
      cap.id = 'cap'
      cap.textContent = 'A dog running'
      document.body.appendChild(el)
      document.body.appendChild(cap)
      try {
        expect(getImgAlt(el)).toBe('A dog running')
      } finally {
        el.remove()
        cap.remove()
      }
    })

    it('joins multiple id refs with a space', () => {
      const el = document.createElement('div')
      el.setAttribute('role', 'img')
      el.setAttribute('aria-labelledby', 'a b')
      const a = document.createElement('span')
      a.id = 'a'
      a.textContent = 'Hello'
      const b = document.createElement('span')
      b.id = 'b'
      b.textContent = 'world'
      document.body.appendChild(el)
      document.body.appendChild(a)
      document.body.appendChild(b)
      try {
        expect(getImgAlt(el)).toBe('Hello world')
      } finally {
        el.remove()
        a.remove()
        b.remove()
      }
    })

    it('prefers aria-label over aria-labelledby', () => {
      const el = document.createElement('div')
      el.setAttribute('aria-label', 'direct')
      el.setAttribute('aria-labelledby', 'missing')
      expect(getImgAlt(el)).toBe('direct')
    })

    it('returns undefined when labelledby ids do not resolve', () => {
      const el = document.createElement('div')
      el.setAttribute('aria-labelledby', 'does-not-exist')
      expect(getImgAlt(el)).toBeUndefined()
    })
  })

  describe('SVG elements', () => {
    it('returns aria-label when set', () => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      el.setAttribute('aria-label', 'A chart illustration')
      expect(getImgAlt(el)).toBe('A chart illustration')
    })

    it('returns undefined when aria-label is not set', () => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      expect(getImgAlt(el)).toBeUndefined()
    })
  })
})
