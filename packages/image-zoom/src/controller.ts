import { parseBool } from './attributes.js'
import { type Gestures, type Instance, INITIAL_STATE } from './instance.js'
import { applyZoomed, transitionEnd } from './machine.js'
import { removeDialog } from './modal.js'
import { createJob, report, update } from './operation.js'
import { schedule, unschedule } from './scheduler.js'
import { bodyScrollEnable, defaultBodyAttrs } from './scroll-lock.js'
import { track, untrack } from './source.js'
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
 * 12 random hex characters, as setId does today
 */
function randomId(): string {
  const gen4 = (): string => Math.random().toString(16).slice(-4)
  return gen4() + gen4() + gen4()
}

/**
 * Until listeners.ts (Task 10): only `resize` on window, added on entering
 * LOADING and removed on entering UNLOADED, as handleModalStateChange does
 */
function resizeGestures(onResize: () => void): Gestures {
  return {
    enter: state => {
      if (state === 'LOADING') {
        window.addEventListener('resize', onResize, { passive: true })
      } else if (state === 'UNLOADED') {
        window.removeEventListener('resize', onResize)
      }
    },
    removeAll: () => {
      window.removeEventListener('resize', onResize)
    },
  }
}

function setUp(inst: Instance): void {
  if (inst.isSetUp) return
  inst.isSetUp = true
  inst.isCustom = parseBool(inst.host.getAttribute('custom-content'))
  track(inst)
  inst.hooks.refresh()
}

/**
 * Undo setup when the host is really gone. Every task that adds a listener,
 * observer, timer, lock or piece of state adds its removal here.
 */
function teardown(inst: Instance): void {
  if (inst.modalState !== 'UNLOADED') {
    bodyScrollEnable(inst.prevBodyAttrs)
    inst.prevBodyAttrs = defaultBodyAttrs
  }
  untrack(inst)
  unschedule(inst.job)
  clearTimeout(inst.fallbackTimer)
  inst.gestures.removeAll()
  // The dialog's transitionend listener leaves with it; built-in content
  // stays in inst.content
  removeDialog(inst)
  inst.generation += 1
  inst.imgEl = null
  inst.loadedImgEl = undefined
  inst.modalState = 'UNLOADED'
  inst.appliedZoomed = false
  inst.shouldRefresh = false
  inst.isSetUp = false
  inst.mustReport = true
}

/**
 * Everything the element does beyond reflecting attributes. An operation is
 * read → write → side effects → report; `job` lets the scheduler batch it.
 */
export function createController(
  host: HTMLElement,
  parts: ShadowParts,
  internals: ElementInternals | undefined,
): Controller {
  const inst: Instance = {
    host,
    parts,
    internals,
    id: randomId(),
    hooks: {
      request: () => {}, // requests arrive in Task 10
      queue: () => {
        schedule(inst.job)
      },
      refresh: () => {
        update(inst)
        report(inst)
      },
      resized: () => {
        inst.shouldRefresh = true
        inst.hooks.refresh()
      },
      transitionEnd: () => {
        transitionEnd(inst)
      },
    },
    job: createJob(() => inst),
    gestures: resizeGestures(() => {
      inst.hooks.resized()
    }),
    isSetUp: false,
    generation: 0,
    isCustom: false,
    mustReport: true,
    appliedZoomed: false,
    modalState: 'UNLOADED',
    shouldRefresh: false,
    isZoomImgLoaded: false,
    prevBodyAttrs: defaultBodyAttrs,
    fallbackTimer: undefined,
    imgEl: null,
    loadedImgEl: undefined,
    dialog: null,
    overlay: null,
    content: null,
    modalImg: null,
    btnUnzoom: null,
    writtenStyle: {},
    styled: new WeakSet(),
    state: INITIAL_STATE,
    reportedState: undefined,
    reportedDialog: undefined,
  }

  return {
    get state() {
      return inst.state
    },
    get dialog() {
      return inst.dialog
    },
    modalContent: null,
    connect: () => {
      setUp(inst)
    },
    disconnect: () => {
      if (host.isConnected) return // a move, not a removal
      teardown(inst)
    },
    attributeChanged: name => {
      if (!inst.isSetUp) return
      if (name !== 'zoomed') {
        inst.hooks.refresh()
        return
      }
      // Applied only when the parsed value differs from the last one applied,
      // which is false at every setup: an attribute present then is ignored
      const zoomed = parseBool(host.getAttribute('zoomed'))
      if (zoomed === inst.appliedZoomed) return
      inst.appliedZoomed = zoomed
      applyZoomed(inst, zoomed)
    },
  }
}
