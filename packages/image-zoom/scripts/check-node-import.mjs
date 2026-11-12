#!/usr/bin/env node

/**
 * Verifies that the package can be imported in Node, where no browser globals
 * (HTMLElement, customElements, document, etc.) exist.
 */

try {
  const mod = await import('../dist/index.js')
  const actual = Object.fromEntries(Object.entries(mod)).tagName
  if (actual !== 'image-zoom') {
    throw new Error(
      `expected tagName 'image-zoom', got ${JSON.stringify(actual)}`,
    )
  }
} catch (err) {
  process.stderr.write(`Node import check failed: ${String(err)}\n`)
  process.exit(1)
}
