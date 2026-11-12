export function parseBool(value: string | null): boolean {
  return value !== null && value !== 'false'
}

export function parseNumber(value: string | null, fallback: number): number {
  if (value === null || value === '') return fallback
  const n = Number(value)
  return Number.isNaN(n) ? fallback : n
}

export function parseSwipe(value: string | null): 'unzoom' | 'none' {
  return value === 'none' ? 'none' : 'unzoom'
}

export function parseCrossOrigin(
  value: string | null,
): 'anonymous' | 'use-credentials' | null {
  if (value === null) return null
  return value === 'use-credentials' ? 'use-credentials' : 'anonymous'
}

export const OBSERVED: readonly string[] = [
  'zoomed',
  'zoom-margin',
  'zoom-src',
  'zoom-srcset',
  'zoom-sizes',
  'zoom-crossorigin',
  'label-zoom',
  'label-unzoom',
  'dialog-class',
]
