import { ensureContent } from './content.js'
import type { Instance } from './instance.js'
import type { StyleObject } from './utils/types.js'

// Every property getStyleModalImg can return
const STYLE_KEYS = [
  'top',
  'left',
  'width',
  'height',
  'transform',
  'transitionDuration',
] as const

// The dialog-class value last written to each dialog (null: no class)
const writtenClass = new WeakMap<HTMLDialogElement, string | null>()

// The MutationObserver of each custom-content dialog
const observers = new WeakMap<HTMLDialogElement, MutationObserver>()

function setClass(dialog: HTMLDialogElement, value: string | null): void {
  writtenClass.set(dialog, value)
  if (value === null) {
    dialog.removeAttribute('class')
  } else {
    dialog.setAttribute('class', value)
  }
}

/**
 * Find or create a container for the dialog
 */
export function getDialogContainer(): HTMLDivElement {
  const existing = document.querySelector<HTMLDivElement>('[data-rmiz-portal]')

  if (existing !== null) {
    return existing
  }

  const el = document.createElement('div')
  el.setAttribute('data-rmiz-portal', '')
  document.body.appendChild(el)

  return el
}

/**
 * The light-DOM dialog: the overlay, then (built-in content only) the
 * content, appended to the portal. A custom-content dialog gets an observer
 * instead: the consumer adding its content (canZoom) or remounting its modal
 * img updates the element.
 */
export function createDialog(inst: Instance): void {
  const dialog = document.createElement('dialog')
  dialog.setAttribute('data-rmiz-modal', '')
  dialog.setAttribute('role', 'dialog')
  dialog.setAttribute('aria-modal', 'true')
  dialog.id = `rmiz-modal-${inst.id}`
  dialog.setAttribute('aria-labelledby', `rmiz-modal-img-${inst.id}`)
  setClass(dialog, inst.host.getAttribute('dialog-class'))

  const overlay = document.createElement('div')
  overlay.setAttribute('data-rmiz-modal-overlay', 'hidden')
  dialog.appendChild(overlay)

  if (inst.isCustom) {
    // Open: update at once, in the microtask checkpoint right after the
    // consumer's change, so a new modal img is pre-styled before any frame
    // can paint it unstyled. Closed: batched, as a gallery's wrappers insert
    // their content at mount.
    const observer = new MutationObserver(() => {
      if (dialog.open) {
        inst.hooks.refresh()
      } else {
        inst.hooks.queue()
      }
    })
    observer.observe(dialog, { childList: true, subtree: true })
    observers.set(dialog, observer)
  } else {
    dialog.appendChild(ensureContent(inst))
    // Port of handleDialogClick: have a click only unzoom in certain situations
    dialog.addEventListener('click', event => {
      if (event.target === inst.content || event.target === inst.modalImg) {
        event.stopPropagation()
        inst.hooks.request(false, event)
      }
    })
  }

  // Port of handleDialogClose: keep the close from closing a parent modal.
  // `close` is async: one queued by close() just before the dialog was
  // removed (teardown, or hasImage turning false) still fires after the
  // removal, and must not request.
  dialog.addEventListener('close', event => {
    if (dialog !== inst.dialog) return
    event.stopPropagation()
    inst.hooks.request(false, event)
  })

  // Port of handleDialogCancelStatic: prevent the browser from removing the
  // dialog on Escape
  dialog.addEventListener('cancel', event => {
    event.preventDefault()
  })

  // React's onTransitionEnd on the modal img bubbles from its descendants;
  // nothing else in the modal (the overlay, a caption) ends a transition
  dialog.addEventListener('transitionend', event => {
    const target = event.target
    if (
      target instanceof Node &&
      findModalImg(inst)?.contains(target) === true
    ) {
      inst.hooks.transitionEnd()
    }
  })

  getDialogContainer().appendChild(dialog)
  inst.dialog = dialog
  inst.overlay = overlay
}

/**
 * Remove the dialog and disconnect its observer. Built-in content leaves with
 * it and stays in inst.content for the next dialog.
 */
export function removeDialog(inst: Instance): void {
  const dialog = inst.dialog
  if (dialog !== null) {
    observers.get(dialog)?.disconnect()
    dialog.remove()
  }
  inst.dialog = null
  inst.overlay = null
}

/**
 * Update model step 3: drop the dialog observer's records of the element's
 * own writes (the SVG clone), so they never queue another update
 */
export function discardOwnRecords(inst: Instance): void {
  if (inst.dialog !== null) observers.get(inst.dialog)?.takeRecords()
}

/**
 * Follow dialog-class, writing only when it differs from what was last
 * written to this dialog. As with React's className diff, a class a consumer
 * adds survives until dialog-class itself changes.
 */
export function writeDialogClass(inst: Instance): void {
  const dialog = inst.dialog
  if (dialog === null) return
  const value = inst.host.getAttribute('dialog-class')
  if (writtenClass.get(dialog) !== value) setClass(dialog, value)
}

/**
 * The element's own modal img, or with custom content the dialog's
 * [data-rmiz-modal-img] as it is now: never cached, so a remount is found
 */
export function findModalImg(inst: Instance): HTMLElement | null {
  if (!inst.isCustom) return inst.modalImg
  const found = inst.dialog?.querySelector('[data-rmiz-modal-img]')
  return found instanceof HTMLElement ? found : null
}

/**
 * Whether a zoom request can proceed: an image (`found`) and, with custom
 * content, the consumer's [data-rmiz-modal-content] in the dialog. The modal
 * img may come later.
 */
export function canZoom(inst: Instance, found: boolean): boolean {
  return (
    found &&
    (!inst.isCustom ||
      inst.dialog?.querySelector('[data-rmiz-modal-content]') != null)
  )
}

/**
 * First sighting (#448): while the dialog is open, a modal img the element
 * hasn't styled yet gets the last written style before the read step, so the
 * read computes it and the write transitions from it
 */
export function preStyle(inst: Instance): void {
  if (inst.dialog?.open !== true) return
  const node = findModalImg(inst)
  if (node === null || inst.styled.has(node)) return
  writeModalImg(inst, inst.writtenStyle)
}

const cssValue = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value

/**
 * Write the modal img's geometry one CSSOM property at a time, removing what
 * an earlier call wrote and this style lacks; other inline styles survive.
 * An <img> also gets unrounded width/height attributes and its id. The style
 * is recorded even with no modal img, so one that first appears while zoomed
 * is pre-styled zoomed, as React renders a late img with the current style.
 */
export function writeModalImg(inst: Instance, style: StyleObject): void {
  const node = findModalImg(inst)
  if (node === null) {
    inst.writtenStyle = style
    return
  }

  for (const key of STYLE_KEYS) {
    const value = style[key]
    if (value !== undefined) {
      node.style[key] = cssValue(value)
    } else if (inst.writtenStyle[key] !== undefined) {
      node.style[key] = ''
    }
  }

  if (node instanceof HTMLImageElement) {
    for (const name of ['width', 'height'] as const) {
      const n = style[name]
      if (n === undefined) {
        node.removeAttribute(name)
      } else {
        node.setAttribute(name, String(n))
      }
    }
    node.id = `rmiz-modal-img-${inst.id}`
  }

  inst.writtenStyle = style
  inst.styled.add(node)
}

/**
 * Port of ensureImgTransitionEnd's parse: the modal img's computed
 * transitionDuration (the first entry of a list) in ms, plus 50; undefined,
 * so no fallback timer, for 0 or NaN. Safari can fire transitionend late.
 */
export function fallbackMs(modalImg: Element): number | undefined {
  const td = getComputedStyle(modalImg).transitionDuration
  const tdFloat = parseFloat(td)
  if (tdFloat === 0 || Number.isNaN(tdFloat)) return undefined
  return tdFloat * (td.endsWith('ms') ? 1 : 1000) + 50
}
