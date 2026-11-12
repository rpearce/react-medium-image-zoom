import { INITIAL_STATE } from './instance.js'
import type { ShadowParts } from './template.js'
import type { ImageZoomState } from './types.js'

export interface Controller {
  readonly state: ImageZoomState
  readonly dialog: HTMLDialogElement | null
  readonly modalContent: HTMLElement | null
  connect: () => void
  disconnect: () => void
  attributeChanged: (name: string) => void
}

/**
 * Everything the element does beyond reflecting attributes. A stub for now:
 * the initial state, no dialog, and lifecycle hooks that do nothing.
 */
export function createController(
  _host: HTMLElement,
  _parts: ShadowParts,
  _internals: ElementInternals | undefined,
): Controller {
  return {
    state: INITIAL_STATE,
    dialog: null,
    modalContent: null,
    connect: () => {},
    disconnect: () => {},
    attributeChanged: () => {},
  }
}
