export interface ShadowParts {
  slot: HTMLSlotElement
  ghost: HTMLDivElement
  buttonSlot: HTMLSlotElement
  button: HTMLButtonElement
}

const SVG_NS = 'http://www.w3.org/2000/svg'

const BUTTON_CSS = `[part="btn-zoom"] {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  color: #fff;
  height: 40px;
  margin: 0;
  outline-offset: 2px;
  padding: 9px;
  touch-action: manipulation;
  width: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
[part="btn-zoom"]:not(:focus):not(:active) {
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  pointer-events: none;
  white-space: nowrap;
  width: 1px;
}
[part="btn-zoom"] {
  position: absolute;
  inset: 10px 10px auto auto;
  cursor: zoom-in;
}
`

let sharedSheet: CSSStyleSheet | undefined

function supportsConstructed(): boolean {
  return (
    'adoptedStyleSheets' in Document.prototype &&
    'replaceSync' in CSSStyleSheet.prototype
  )
}

function applyStyles(root: ShadowRoot): void {
  if (supportsConstructed()) {
    if (sharedSheet === undefined) {
      sharedSheet = new CSSStyleSheet()
      sharedSheet.replaceSync(BUTTON_CSS)
    }
    root.adoptedStyleSheets = [sharedSheet]
    return
  }
  const style = document.createElement('style')
  style.textContent = BUTTON_CSS
  root.appendChild(style)
}

function createIcon(marker: string, pathData: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute(marker, '')
  svg.setAttribute('fill', 'currentColor')
  svg.setAttribute('focusable', 'false')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('xmlns', SVG_NS)
  const path = document.createElementNS(SVG_NS, 'path')
  path.setAttribute('d', pathData)
  svg.appendChild(path)
  return svg
}

export function createIconEnlarge(): SVGSVGElement {
  return createIcon(
    'data-rmiz-btn-zoom-icon',
    'M 9 1 L 9 2 L 12.292969 2 L 2 12.292969 L 2 9 L 1 9 L 1 14 L 6 14 L 6 13 L 2.707031 13 L 13 2.707031 L 13 6 L 14 6 L 14 1 Z',
  )
}

export function createIconCompress(): SVGSVGElement {
  return createIcon(
    'data-rmiz-btn-unzoom-icon',
    'M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z',
  )
}

export function buildShadow(root: ShadowRoot): ShadowParts {
  applyStyles(root)

  const slot = document.createElement('slot')
  slot.style.visibility = 'visible'
  slot.style.boxSizing = 'inherit'

  const ghost = document.createElement('div')
  ghost.setAttribute('part', 'ghost')
  ghost.setAttribute('data-rmiz-ghost', '')
  ghost.hidden = true
  ghost.style.position = 'absolute'
  ghost.style.pointerEvents = 'none'
  ghost.style.boxSizing = 'inherit'

  const buttonSlot = document.createElement('slot')
  buttonSlot.name = 'zoom-button'
  buttonSlot.style.boxSizing = 'inherit'

  const button = document.createElement('button')
  button.setAttribute('part', 'btn-zoom')
  button.setAttribute('data-rmiz-btn-zoom', '')
  button.type = 'button'

  const iconSlot = document.createElement('slot')
  iconSlot.name = 'icon-zoom'
  iconSlot.appendChild(createIconEnlarge())
  button.appendChild(iconSlot)

  buttonSlot.appendChild(button)
  ghost.appendChild(buttonSlot)
  root.append(slot, ghost)

  return { slot, ghost, buttonSlot, button }
}
