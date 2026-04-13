/**
 * Deal with cloned SVG ID duplicate issues from https://github.com/rpearce/react-medium-image-zoom/issues/438
 */

// Monotonic counter so each call produces a fresh suffix. Two
// <image-zoom> instances on the page cloning the same source SVG
// would otherwise both use `-zoom`, reintroducing the duplicate-id
// bug this function exists to fix.
let idSuffixCounter = 0

export const adjustSvgIDs = (svgEl: SVGElement): void => {
  idSuffixCounter += 1
  const newIdSuffix = `-zoom-${String(idSuffixCounter)}`

  // SVG attributes that can use `url(#foo)`
  const attrs = [
    'clip-path',
    'fill',
    'mask',
    'marker-start',
    'marker-mid',
    'marker-end',
  ]

  // Map between old IDs and new IDs
  const idMap = new Map<string, string>()

  // Update SVG element's ID, if present
  if (svgEl.hasAttribute('id')) {
    const { id: oldId } = svgEl
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    const svgNode: Element = svgEl
    svgNode.id = newId
  }

  // Update all old IDs to new IDs and store values mapping for later
  svgEl.querySelectorAll('[id]').forEach(el => {
    const { id: oldId } = el
    const newId = oldId + newIdSuffix
    idMap.set(oldId, newId)
    const node: Element = el
    node.id = newId
  })

  // Look for all elements with any url()-referencing attribute in a single
  // query, then update matched attributes
  const urlAttrSelector = attrs.map(attr => `[${attr}]`).join(', ')
  svgEl.querySelectorAll(urlAttrSelector).forEach(el => {
    for (const attr of attrs) {
      const val = el.getAttribute(attr)
      if (val?.startsWith('url(#') === true) {
        const oldId = val.slice(5, -1)
        const newId = idMap.get(oldId)
        if (newId !== undefined) {
          el.setAttribute(attr, `url(#${newId})`)
        }
      }
    }
  })

  // Update any SVG `<style>` elements to update old IDs to new IDs
  svgEl.querySelectorAll('style').forEach(styleEl => {
    const original = styleEl.textContent
    if (original === '') return
    let updated = original
    idMap.forEach((newId, oldId) => {
      updated = updated.replaceAll(`#${oldId}`, `#${newId}`)
    })
    if (updated !== original) {
      const styleNode: HTMLStyleElement = styleEl
      styleNode.textContent = updated
    }
  })
}
