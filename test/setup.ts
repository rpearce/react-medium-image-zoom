import { afterEach } from 'vitest'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

afterEach(() => {
  // Remove the portal container that the component lazily creates
  document.querySelector('[data-rmiz-portal]')?.remove()

  // Restore body styles that the component mutates for scroll locking
  document.body.style.overflow = ''
  document.body.style.width = ''
})
