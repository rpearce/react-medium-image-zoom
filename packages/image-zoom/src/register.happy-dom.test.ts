import { expect, it, vi } from 'vitest'

it('constructs in happy-dom, and a second import is a no-op', async () => {
  await import('./index.js')
  const first = customElements.get('image-zoom')
  expect(first).toBeDefined()
  expect(() => document.createElement('image-zoom')).not.toThrow()
  vi.resetModules()
  await expect(import('./index.js')).resolves.toBeDefined()
  expect(customElements.get('image-zoom')).toBe(first)
})
