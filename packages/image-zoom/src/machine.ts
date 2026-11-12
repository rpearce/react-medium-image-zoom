import type { Instance } from './instance.js'
import { fallbackMs, findModalImg } from './modal.js'
import { report, update } from './operation.js'
import {
  bodyScrollDisable,
  bodyScrollEnable,
  defaultBodyAttrs,
} from './scroll-lock.js'
import type { ModalState } from './types.js'

/**
 * Port of ensureImgTransitionEnd: end UNLOADING even if transitionend never
 * arrives. A pending timer isn't cleared first, as today (Known oddities).
 */
function startFallback(inst: Instance): void {
  const modalImg = findModalImg(inst)
  if (modalImg === null) return
  const ms = fallbackMs(modalImg)
  if (ms === undefined) return
  inst.fallbackTimer = setTimeout(() => {
    transitionEnd(inst)
  }, ms)
}

/**
 * Enter a state: set it, update, run the state's side effects in the order of
 * today's handleModalStateChange, and only then report. A listener that sets
 * zoomed during the report starts a new operation from a consistent state.
 */
export function enter(inst: Instance, state: ModalState): void {
  inst.modalState = state
  if (state === 'UNLOADED') inst.shouldRefresh = false // one setState today
  update(inst)
  switch (state) {
    case 'LOADING':
      // Task 11: preload the zoom image here
      inst.gestures.enter(state)
      break
    case 'LOADED':
      inst.gestures.enter(state)
      break
    case 'UNLOADING':
      // Reads transitionDuration after update() wrote the UNLOADING style, not
      // the 0.01ms a resize while zoomed leaves
      startFallback(inst)
      inst.gestures.enter(state)
      break
    case 'UNLOADED':
      bodyScrollEnable(inst.prevBodyAttrs)
      inst.prevBodyAttrs = defaultBodyAttrs
      inst.gestures.enter(state)
      inst.dialog?.close()
      break
  }
  report(inst)
}

/**
 * Apply a zoomed change as one operation: update in the current state (as
 * today's prop-change render, so a zoom starts from fresh geometry); for a
 * zoom, scroll lock and showModal() as zoom() does; then enter the state.
 * With no dialog (no image yet) a zoom still locks and enters LOADING.
 */
export function applyZoomed(inst: Instance, zoomed: boolean): void {
  update(inst)
  if (zoomed) {
    inst.prevBodyAttrs = bodyScrollDisable()
    inst.dialog?.showModal()
  }
  enter(inst, zoomed ? 'LOADING' : 'UNLOADING')
}

/**
 * Port of handleImgTransitionEnd: LOADING → LOADED, UNLOADING → UNLOADED
 */
export function transitionEnd(inst: Instance): void {
  clearTimeout(inst.fallbackTimer)
  if (inst.modalState === 'LOADING') {
    enter(inst, 'LOADED')
  } else if (inst.modalState === 'UNLOADING') {
    enter(inst, 'UNLOADED')
  }
}
