import type { SupportedImage } from './types.js'
import { testImg } from './element-tests.js'

interface GetImgAlt {
  (imgEl: SupportedImage | null): string | undefined
}

export const getImgAlt: GetImgAlt = imgEl => {
  if (imgEl === null) return undefined
  if (testImg(imgEl)) return imgEl.alt

  const ariaLabel = imgEl.getAttribute('aria-label')
  if (ariaLabel !== null) return ariaLabel

  // Fall back to resolving id refs from aria-labelledby so
  // `<div role="img" aria-labelledby="caption">` produces a useful
  // label for the zoom button.
  const labelledBy = imgEl.getAttribute('aria-labelledby')
  if (labelledBy == null || labelledBy === '') return undefined
  return resolveLabelledBy(imgEl.ownerDocument, labelledBy)
}

function resolveLabelledBy(
  doc: Document,
  labelledBy: string,
): string | undefined {
  const parts: string[] = []
  for (const id of labelledBy.split(/\s+/)) {
    if (id === '') continue
    const ref = doc.getElementById(id)
    if (ref === null) continue
    const trimmed = ref.textContent.trim()
    if (trimmed !== '') parts.push(trimmed)
  }
  return parts.length > 0 ? parts.join(' ') : undefined
}
