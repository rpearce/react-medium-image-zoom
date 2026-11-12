import { afterEach, expect, it } from 'vitest'
import { bodyScrollDisable, bodyScrollEnable } from './scroll-lock.js'

afterEach(() => {
  document.body.style.overflow = ''
  document.body.style.width = ''
})

it('locks with overflow and width only, and restores', () => {
  document.body.style.overflow = 'auto'
  const prev = bodyScrollDisable()
  expect(prev).toEqual({ overflow: 'auto', width: '' })
  expect(document.body.style.overflow).toBe('hidden')
  expect(document.body.style.width).toBe(`${document.body.clientWidth}px`)
  expect(document.body.style.position).toBe('')
  bodyScrollEnable(prev)
  expect(document.body.style.overflow).toBe('auto')
  expect(document.body.style.width).toBe('')
})
