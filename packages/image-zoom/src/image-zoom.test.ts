import { afterEach, describe, it, expect, vi } from 'vitest'

import type { ImageZoomElement } from './image-zoom.js'
import './image-zoom.js'

// =============================================================================
// TESTS
// =============================================================================

describe('ImageZoomElement', () => {
  it('registers the custom element', () => {
    expect(customElements.get('image-zoom')).toBeDefined()
  })

  it('dialog inside shadow DOM can showModal without throwing (de-risk test for portal-free refactor)', () => {
    // Verifies the core assumption behind moving <dialog> out of the
    // document-body portal and into the web component's shadow DOM:
    // showModal() only requires the dialog to be "connected", which
    // per the DOM spec means its shadow-including root is a document.
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    const dialog = document.createElement('dialog')
    shadow.appendChild(dialog)
    document.body.appendChild(host)

    expect(() => {
      dialog.showModal()
    }).not.toThrow()
    expect(dialog.open).toBe(true)

    dialog.close()
    host.remove()
  })

  it('renders shadow DOM with slot and zoom button', async () => {
    const el = await createElement()
    const { shadowRoot } = el

    expect(shadowRoot?.querySelector('slot')).not.toBeNull()
    expect(shadowRoot?.querySelector('[data-rmiz-btn-zoom]')).not.toBeNull()
  })

  it('discovers a slotted image and shows the ghost', async () => {
    const el = await createElement()

    const ghost = el.shadowRoot?.querySelector<HTMLElement>('[data-rmiz-ghost]')
    expect(ghost?.style.display).not.toBe('none')
  })

  it('hides ghost when there is no image child', async () => {
    const el = await createElement({ html: '<span>No image</span>' })

    const ghost = el.shadowRoot?.querySelector<HTMLElement>('[data-rmiz-ghost]')
    expect(ghost?.style.display).toBe('none')
  })

  it('dispatches image-zoom:zoom-change with zoomed=true on image click', async () => {
    const el = await createElement()
    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    el.querySelector('img')?.click()

    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('does not dispatch when disabled', async () => {
    const el = await createElement()
    el.setAttribute('disabled', '')
    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    el.querySelector('img')?.click()

    expect(mock).not.toHaveBeenCalled()
  })

  it('auto-toggles zoomed attribute in uncontrolled mode', async () => {
    const el = await createElement()

    expect(el.zoomed).toBe(false)

    el.querySelector('img')?.click()

    expect(el.zoomed).toBe(true)
  })

  it('does not auto-toggle when preventDefault is called (controlled mode)', async () => {
    const el = await createElement()

    el.addEventListener('image-zoom:zoom-change', e => {
      e.preventDefault()
    })

    el.querySelector('img')?.click()

    expect(el.zoomed).toBe(false)
  })

  it('renders the dialog inside the shadow DOM', async () => {
    const el = await createElement()

    // Dialog lives in shadow DOM now (no portal on document.body). It's
    // always present from construction time, not just when zoomed.
    const dialog = el.shadowRoot?.querySelector('[data-rmiz-modal]')
    expect(dialog).not.toBeNull()
    expect(dialog?.tagName).toBe('DIALOG')

    // And nothing on document.body:
    expect(document.querySelector('[data-rmiz-portal]')).toBeNull()
  })

  it('exposes btnUnzoom as a read-only getter for consumers to customize', async () => {
    const el = await createElement()

    // Dialog + button are part of the shadow DOM template from
    // construction time, so the getter is non-null before any zoom.
    expect(el.btnUnzoom).not.toBeNull()
    expect(el.btnUnzoom.tagName).toBe('BUTTON')
    expect(el.btnUnzoom.getAttribute('data-rmiz-btn-unzoom')).toBe('')
  })

  it('sets explicit role="dialog" and aria-modal="true" on the dialog', async () => {
    // Native <dialog> implies role="dialog" and showModal() implies
    // aria-modal="true" per the HTML spec, but historical screen reader
    // support is inconsistent (older JAWS/NVDA especially). Setting both
    // attributes explicitly is defensive a11y that costs nothing.
    const el = await createElement()

    const dialog = el.shadowRoot?.querySelector('[data-rmiz-modal]')
    expect(dialog?.getAttribute('role')).toBe('dialog')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
  })

  it('exposes the built-in unzoom button with the default label', async () => {
    const el = await createElement()

    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-unzoom]',
    )
    expect(btn).not.toBeNull()
    expect(btn?.getAttribute('aria-label')).toBe('Minimize image')
  })

  it('disables body scroll on zoom and restores on unzoom', async () => {
    document.body.style.overflow = 'auto'
    const el = await createElement()

    el.zoomed = true
    await tick()

    expect(document.body.style.overflow).toBe('hidden')

    el.zoomed = false
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    expect(document.body.style.overflow).toBe('auto')
  })

  it('restores body scroll when removed from DOM while zoomed', async () => {
    document.body.style.overflow = 'auto'
    const el = await createElement()

    el.zoomed = true
    await tick()

    expect(document.body.style.overflow).toBe('hidden')

    el.remove()

    expect(document.body.style.overflow).toBe('auto')
  })

  it('the shadow-DOM dialog goes away with the host on disconnect', async () => {
    const el = await createElement()

    el.zoomed = true
    await tick()

    expect(el.shadowRoot?.querySelector('[data-rmiz-modal]')).not.toBeNull()

    el.remove()

    // Once the host is removed from the document, its shadow DOM is gone
    // too. No portal on document.body to clean up.
    expect(document.querySelector('[data-rmiz-modal]')).toBeNull()
    expect(document.querySelector('[data-rmiz-portal]')).toBeNull()
  })

  it('unzooms on Escape key', async () => {
    const el = await createElement()

    el.zoomed = true
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )

    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(false)
  })

  it('cleans up listeners when the slotted image is replaced', async () => {
    const el = await createElement()
    const oldImg = el.querySelector('img')
    if (oldImg == null) throw new Error('expected initial image')

    // Replace with a new image
    const newImg = document.createElement('img')
    newImg.alt = 'New image'
    newImg.src = 'new-image.jpg'
    Object.defineProperty(newImg, 'currentSrc', {
      value: 'new-image.jpg',
      configurable: true,
    })
    newImg.getBoundingClientRect = (): DOMRect => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
    el.replaceChild(newImg, oldImg)
    await tick()
    newImg.dispatchEvent(new Event('load'))
    await tick()

    // Click the OLD image — it should NOT trigger zoom-change because
    // its listeners were cleaned up
    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    oldImg.click()
    expect(mock).not.toHaveBeenCalled()

    // Click the NEW image — it SHOULD trigger zoom-change
    newImg.click()
    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('does not unzoom on ctrl+wheel (browser zoom gesture)', async () => {
    const el = await createElement()
    el.zoomed = true
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    const wheelEvent = new WheelEvent('wheel', { bubbles: true, deltaY: 10 })
    Object.defineProperty(wheelEvent, 'ctrlKey', { value: true })
    window.dispatchEvent(wheelEvent)
    await tick()

    expect(mock).not.toHaveBeenCalled()
  })

  it('upgradeProperty migrates pre-upgrade instance properties through the setter', async () => {
    // Simulate the pre-upgrade case: an instance property was set on
    // the host element before customElements.define ran (e.g. by
    // framework bindings). Because the element's prototype chain
    // didn't yet have our setter, the value shadows the setter as a
    // plain instance property. connectedCallback's upgradeProperty
    // pattern must rescue it and route it through the setter so the
    // attribute actually gets written.
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    // Forcibly install an instance property that shadows the setter.
    Reflect.defineProperty(el, 'labelZoom', {
      value: 'Pre-upgrade label',
      writable: true,
      configurable: true,
      enumerable: true,
    })
    el.innerHTML = '<img alt="x" src="x.jpg" />'
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    // After connectedCallback runs, the shadowing property has been
    // deleted and re-set through the setter, which calls setAttribute.
    expect(el.getAttribute('label-zoom')).toBe('Pre-upgrade label')
    expect(el.labelZoom).toBe('Pre-upgrade label')
  })

  it('transitionend listener survives zoom → unzoom → zoom cycles', async () => {
    // Regression guard: the listener is attached in connectedCallback
    // and MUST stay attached across the full state cycle. An earlier
    // refactor left a stray removeEventListener in #enterUnloaded that
    // meant the second zoom fell back to the timer path and state
    // transitions lagged ~50ms behind the real animation.
    const el = await createElement()

    // First cycle.
    el.zoomed = true
    await tick()
    expect(el.modalState).toBe('LOADING')
    let modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    expect(el.modalState).toBe('LOADED')
    el.zoomed = false
    modalImg?.dispatchEvent(new Event('transitionend'))
    expect(el.modalState).toBe('UNLOADED')

    // Second cycle — real transitionend events must still advance state.
    el.zoomed = true
    await tick()
    expect(el.modalState).toBe('LOADING')
    modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    // This dispatch should advance LOADING → LOADED immediately. If the
    // listener was torn down, this is a no-op and state stays LOADING
    // until the fallback timer fires.
    modalImg?.dispatchEvent(new Event('transitionend'))
    expect(el.modalState).toBe('LOADED')
  })

  it('uses a consumer-provided modal layout via slot="modal"', async () => {
    // Minimum smoke test for the `modal` slot. The consumer supplies
    // a light-DOM <figure> that wraps the [data-rmiz-modal-img]
    // element; #resolveModalImg should find it, the transitionend
    // listener should bind to it, and clicking the slotted modal img
    // should close the dialog.
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.innerHTML = `
      <img alt="hero" src="hero.jpg" />
      <figure slot="modal">
        <img data-rmiz-modal-img alt="hero" src="hero.jpg" />
        <figcaption>Caption</figcaption>
      </figure>
    `
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }

    const sourceImg = el.querySelector<HTMLImageElement>('img:not([slot])')
    if (sourceImg != null) {
      Object.defineProperty(sourceImg, 'currentSrc', {
        value: 'hero.jpg',
        configurable: true,
      })
      sourceImg.getBoundingClientRect = (): DOMRect => ({
        top: 0,
        left: 0,
        width: 200,
        height: 150,
        right: 200,
        bottom: 150,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      })
    }
    await tick()
    sourceImg?.dispatchEvent(new Event('load'))
    await tick()

    // The active modal img should be the slotted one, not the shadow
    // fallback. We can verify indirectly: opening and closing the
    // dialog should transition via the slotted element.
    el.setAttribute('zoomed', '')
    await tick()
    const dialog = el.shadowRoot?.querySelector<HTMLDialogElement>(
      '[data-rmiz-modal]',
    )
    expect(dialog?.open).toBe(true)

    // The slotted modal img is what the transitionend listener is
    // attached to after #onModalSlotChange ran. Fire transitionend on
    // it and confirm state advances.
    const slottedModalImg =
      el.querySelector<HTMLImageElement>('[data-rmiz-modal-img]')
    slottedModalImg?.dispatchEvent(new Event('transitionend'))
    expect(el.modalState).toBe('LOADED')
  })

  it('dispatches image-zoom:btn-unzoom-change when a consumer swaps the modal-button slot', async () => {
    const el = await createElement()
    const dispatched: HTMLButtonElement[] = []
    el.addEventListener('image-zoom:btn-unzoom-change', e => {
      dispatched.push(e.detail.button)
    })

    // Mount a consumer button into the slot.
    const custom = document.createElement('button')
    custom.setAttribute('slot', 'modal-button')
    custom.id = 'custom-unzoom'
    el.appendChild(custom)
    await tick()

    expect(dispatched).toHaveLength(1)
    expect(dispatched[0]).toBe(custom)
    expect(el.btnUnzoom).toBe(custom)

    // Remove it — button should revert to the fallback and fire again.
    custom.remove()
    await tick()

    expect(dispatched).toHaveLength(2)
    expect(dispatched[1]).not.toBe(custom)
    expect(el.btnUnzoom).toBe(dispatched[1])
  })

  it('invalidates the SVG cache when any SVG attribute mutates (not just class)', async () => {
    // Regression guard for R3#3: the contentObs attribute filter used
    // to be ['alt', 'src', 'srcset', 'sizes', 'class'], which ignored
    // viewBox / fill / stroke / inline style / presentation attributes
    // on SVG sources — leaving the cached clone visually stale. For
    // SVG, we now observe all attributes.
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="red"/></svg>'
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    const svg = el.querySelector('svg')
    if (svg != null) {
      svg.getBoundingClientRect = (): DOMRect => ({
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      })
    }
    await tick()

    el.setAttribute('zoomed', '')
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    const clone1 = modalImg?.firstElementChild

    // Mutate a non-class attribute. Before R3#3 this was a no-op.
    svg?.setAttribute('viewBox', '0 0 200 200')
    await tick()
    const clone2 = modalImg?.firstElementChild
    expect(clone2).not.toBe(clone1)
  })

  it('caches the SVG clone across renders (resize does not re-clone)', async () => {
    // Mount an SVG source and zoom it. Subsequent renders (triggered
    // by resize etc.) must reuse the same cached clone instead of
    // rebuilding it — otherwise large SVGs lag on every tick.
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="red"/></svg>'
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    const svg = el.querySelector('svg')
    if (svg != null) {
      svg.getBoundingClientRect = (): DOMRect => ({
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      })
    }
    await tick()

    el.setAttribute('zoomed', '')
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    const clone1 = modalImg?.firstElementChild
    expect(clone1?.tagName.toLowerCase()).toBe('svg')

    // Fire a resize — force a re-render path that would re-clone if
    // the cache is broken. The clone reference must stay identical.
    window.dispatchEvent(new Event('resize'))
    await tick()
    const clone2 = modalImg?.firstElementChild
    expect(clone2).toBe(clone1)

    // Mutate an attribute on the source SVG — the content observer
    // must mark the cache dirty so the NEXT render rebuilds the clone.
    svg?.setAttribute('class', 'changed')
    await tick()
    const clone3 = modalImg?.firstElementChild
    // A rebuild means a new element reference.
    expect(clone3).not.toBe(clone1)
  })

  it('exposes all advertised CSS parts on the shadow DOM', async () => {
    // Any part name listed in the manifest MUST actually exist on an
    // element in the shadow template, otherwise consumers targeting it
    // from outside via ::part() get nothing silently.
    const el = await createElement()
    const { shadowRoot } = el
    const advertised = [
      'content',
      'ghost',
      'btn-zoom',
      'btn-zoom-icon',
      'modal',
      'modal-overlay',
      'modal-content',
      'modal-img',
      'btn-unzoom',
      'btn-unzoom-icon',
    ]
    for (const part of advertised) {
      const found = shadowRoot?.querySelector(`[part~="${part}"]`)
      expect(found, `missing part "${part}"`).not.toBeNull()
    }
  })

  it('empty label-zoom / label-unzoom falls back to defaults (never produces ": alt")', async () => {
    const el = await createElement()
    el.setAttribute('label-zoom', '')
    el.setAttribute('label-unzoom', '')
    await tick()

    expect(el.labelZoom).toBe('Expand image')
    expect(el.labelUnzoom).toBe('Minimize image')
    const btnZoom = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-zoom]',
    )
    // alt="Test image" is present, so the label should be
    // "Expand image: Test image" — never ": Test image".
    expect(btnZoom?.getAttribute('aria-label')).toBe('Expand image: Test image')
  })

  it('does not attach a document keydown listener while the modal is UNLOADED', async () => {
    // Regression guard: the Escape listener must only be active while
    // the modal is open, not for the lifetime of the element. Two
    // unrelated <image-zoom> instances on the page must not fight for
    // Escape key ownership, and UNLOADED instances must not swallow
    // Escape from an unrelated parent modal.
    const parentPressed = vi.fn()
    const parentListener: EventListener = e => {
      parentPressed(e)
    }
    document.addEventListener('keydown', parentListener)

    const el = await createElement()
    expect(el.modalState).toBe('UNLOADED')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(parentPressed).toHaveBeenCalled()
    document.removeEventListener('keydown', parentListener)
  })

  it('does not unzoom on a predominantly horizontal wheel (trackpad pan)', async () => {
    const el = await createElement()
    el.zoomed = true
    await tick()
    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    // |deltaX| dominates — this is a horizontal pan, not a dismissive scroll.
    window.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, deltaX: 50, deltaY: 5 }),
    )
    await tick()
    expect(mock).not.toHaveBeenCalled()

    // Vertical wheel with no horizontal component MUST still close.
    window.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, deltaY: 50 }),
    )
    await tick()
    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(false)
  })

  it('host is display:block so percentage-width children render correctly', async () => {
    // Regression guard for the DivImageGallery bug: an inline-block
    // host shrink-wraps content, so a child with `width:100%` has no
    // containing block to resolve against and collapses to zero,
    // making the entire gallery invisible. The host must default to
    // `display:block` to match v5's `wrapElement="div"` default.
    const el = document.createElement('image-zoom')
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    const hostStyle = window.getComputedStyle(el)
    expect(hostStyle.display).toBe('block')
  })

  it('zooms a <div role="img"> with a CSS background-image (DivImageGallery path)', async () => {
    // Regression guard for the DivImageGallery story: a light-DOM
    // <div role="img"> with a `background-image:url(...)` must be
    // discoverable and zoomable just like an <img> child.
    //
    // Does NOT call mockBrowserApis — that mock globally replaces
    // getComputedStyle with a single fake style that has no
    // backgroundImage property, which would defeat the whole point
    // of this test. Instead we just stub HTMLImageElement.decode
    // (the one thing happy-dom doesn't implement) and let real
    // computed styles flow through.
    vi.spyOn(HTMLImageElement.prototype, 'decode').mockImplementation(
      async function (this: HTMLImageElement) {
        Object.defineProperty(this, 'naturalWidth', {
          value: 800,
          configurable: true,
        })
        Object.defineProperty(this, 'naturalHeight', {
          value: 600,
          configurable: true,
        })
        await Promise.resolve()
      },
    )

    const el = document.createElement('image-zoom')
    const div = document.createElement('div')
    div.setAttribute('role', 'img')
    div.setAttribute('aria-label', 'Glenorchy Lagoon')
    div.style.backgroundImage = 'url("glenorchy.jpg")'
    div.style.backgroundSize = 'cover'
    div.style.backgroundPosition = '50% 50%'
    div.style.width = '300px'
    div.style.height = '200px'
    div.getBoundingClientRect = (): DOMRect => ({
      top: 0,
      left: 0,
      width: 300,
      height: 200,
      right: 300,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
    el.appendChild(div)
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }

    await tick()
    // Image.decode() is stubbed above; the load should complete on
    // the next microtask tick.
    await tick()

    // The ghost should be visible (the "is this zoomable?" signal).
    const ghost = el.shadowRoot?.querySelector<HTMLElement>('[data-rmiz-ghost]')
    expect(ghost?.style.display).not.toBe('none')

    // Clicking the div should trigger a zoom-change.
    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)
    div.click()
    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('discovers a <div role="img"> that was added AFTER the host was connected', async () => {
    // React-style insertion order: the <image-zoom> element lands in
    // the DOM first (connectedCallback fires with no children), then
    // React commits the div child. The not-found MutationObserver
    // should pick it up and complete the discovery.
    vi.spyOn(HTMLImageElement.prototype, 'decode').mockImplementation(
      async function (this: HTMLImageElement) {
        Object.defineProperty(this, 'naturalWidth', {
          value: 800,
          configurable: true,
        })
        Object.defineProperty(this, 'naturalHeight', {
          value: 600,
          configurable: true,
        })
        await Promise.resolve()
      },
    )

    const el = document.createElement('image-zoom')
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    const div = document.createElement('div')
    div.setAttribute('role', 'img')
    div.setAttribute('aria-label', 'Hobbiton')
    div.style.backgroundImage = 'url("hobbiton.jpg")'
    div.style.backgroundSize = 'cover'
    div.style.width = '300px'
    div.style.height = '200px'
    div.getBoundingClientRect = (): DOMRect => ({
      top: 0,
      left: 0,
      width: 300,
      height: 200,
      right: 300,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
    el.appendChild(div)

    await tick()
    await tick()

    const ghost = el.shadowRoot?.querySelector<HTMLElement>('[data-rmiz-ghost]')
    expect(ghost?.style.display).not.toBe('none')

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)
    div.click()
    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('multiple instances share body scroll lock without conflict', async () => {
    document.body.style.overflow = 'auto'

    const el1 = await createElement()
    const el2 = await createElement()

    const fireTransitionEnd = (el: ImageZoomElement): void => {
      const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
      modalImg?.dispatchEvent(new Event('transitionend'))
    }

    el1.zoomed = true
    await tick()
    expect(document.body.style.overflow).toBe('hidden')

    el2.zoomed = true
    await tick()
    expect(document.body.style.overflow).toBe('hidden')

    // Unzoom el1 — body should still be locked because el2 is zoomed
    el1.zoomed = false
    await tick()
    fireTransitionEnd(el1)
    await tick()
    expect(document.body.style.overflow).toBe('hidden')

    // Unzoom el2 — body should now be restored
    el2.zoomed = false
    await tick()
    fireTransitionEnd(el2)
    await tick()
    expect(document.body.style.overflow).toBe('auto')
  })

  it('dispatches image-zoom:state-change on each transition', async () => {
    const el = await createElement()

    const states: string[] = []
    el.addEventListener('image-zoom:state-change', e => {
      states.push((e as CustomEvent<{ state: string }>).detail.state)
    })

    el.zoomed = true
    await tick()
    expect(states).toContain('LOADING')

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()
    expect(states).toContain('LOADED')

    el.zoomed = false
    await tick()
    expect(states).toContain('UNLOADING')

    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()
    expect(states).toContain('UNLOADED')
  })

  it('auto-unzooms when disabled is set while zoomed', async () => {
    const el = await createElement()
    el.zoomed = true
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    expect(el.modalState).toBe('LOADED')

    el.disabled = true
    await tick()

    expect(el.modalState).toBe('UNLOADING')
  })

  it('exposes modalContentContainer from construction time', async () => {
    // The dialog and its content container live in the shadow DOM from
    // construction. Consumers can rely on modalContentContainer being
    // available from the moment the element is upgraded.
    const el = await createElement()

    expect(
      el.modalContentContainer.getAttribute('data-rmiz-modal-content'),
    ).toBe('')

    el.zoomed = true
    await tick()

    expect(
      el.modalContentContainer.getAttribute('data-rmiz-modal-content'),
    ).toBe('')
  })

  it('property setters reflect to attributes', async () => {
    const el = await createElement()

    el.zoomMargin = 50
    expect(el.getAttribute('zoom-margin')).toBe('50')
    expect(el.zoomMargin).toBe(50)

    el.zoomSrc = 'hd.jpg'
    expect(el.getAttribute('zoom-src')).toBe('hd.jpg')

    el.labelZoom = 'Open photo'
    expect(el.getAttribute('label-zoom')).toBe('Open photo')

    el.canSwipeToUnzoom = false
    expect(el.getAttribute('can-swipe-to-unzoom')).toBe('false')

    el.canSwipeToUnzoom = true
    expect(el.hasAttribute('can-swipe-to-unzoom')).toBe(false)
  })

  it('swipe-to-unzoom only fires on a DOWNWARD swipe past the threshold', async () => {
    const el = await createElement()
    el.zoomed = true
    await tick()
    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    // Upward swipe: 100 → 50 (delta -50) must NOT close.
    dispatchTouchY(window, 'touchstart', 100)
    dispatchTouchY(window, 'touchmove', 50)
    expect(mock).not.toHaveBeenCalled()

    // Release so state resets.
    window.dispatchEvent(new Event('touchend'))

    // Downward swipe past threshold: 100 → 200 (delta +100) MUST close.
    dispatchTouchY(window, 'touchstart', 100)
    dispatchTouchY(window, 'touchmove', 200)
    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(false)
  })

  it('uses a consumer-provided trigger when slot="trigger" is filled', async () => {
    const el = await createElement({
      html: '<img alt="Test image" src="test.jpg" /><button slot="trigger" id="custom-trigger">Zoom in</button>',
    })
    const custom = el.querySelector<HTMLButtonElement>('#custom-trigger')
    expect(custom).not.toBeNull()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    custom?.click()

    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('leaves a consumer-provided trigger aria-label untouched', async () => {
    const el = await createElement({
      html: '<img alt="Dog photo" src="test.jpg" /><button slot="trigger" aria-label="Open my photo">Zoom</button>',
    })
    const custom = el.querySelector<HTMLButtonElement>('button[slot="trigger"]')
    expect(custom?.getAttribute('aria-label')).toBe('Open my photo')

    // Change label-zoom to confirm the built-in label logic doesn't touch it
    el.setAttribute('label-zoom', 'Expand the picture')
    await tick()

    expect(custom?.getAttribute('aria-label')).toBe('Open my photo')
  })

  it('focuses the slotted trigger on unzoom', async () => {
    const el = await createElement({
      html: '<img alt="Test image" src="test.jpg" /><button slot="trigger" id="custom-trigger">Zoom</button>',
    })
    const custom = el.querySelector<HTMLButtonElement>('#custom-trigger')
    if (custom == null) throw new Error('expected custom trigger')

    el.zoomed = true
    await tick()

    const modalImg = el.shadowRoot?.querySelector('[data-rmiz-modal-img]')
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    el.zoomed = false
    await tick()
    modalImg?.dispatchEvent(new Event('transitionend'))
    await tick()

    expect(document.activeElement).toBe(custom)
  })

  it('reverts to the fallback button when the slotted trigger is removed', async () => {
    const el = await createElement({
      html: '<img alt="Test image" src="test.jpg" /><button slot="trigger" id="custom-trigger">Zoom</button>',
    })
    const custom = el.querySelector<HTMLButtonElement>('#custom-trigger')
    custom?.remove()
    await tick()

    // With the slotted trigger gone, the fallback button in the shadow DOM
    // takes over. Verify its click triggers a zoom.
    const fallback = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-zoom]',
    )
    expect(fallback).not.toBeNull()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    fallback?.click()

    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
  })

  it('does not bubble image clicks to a parent click handler', async () => {
    // Wrap <image-zoom> in a parent that listens for clicks (e.g. a
    // selectable card). Clicking the image should trigger the zoom WITHOUT
    // also triggering the parent's handler — the click is "consumed" by the
    // zoom action.
    const { el, parent, parentClickMock } = await createInParent()
    cleanup = () => {
      parent.remove()
    }

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    el.querySelector('img')?.click()

    expect(mock).toHaveBeenCalled()
    expect(parentClickMock).not.toHaveBeenCalled()
  })

  it('does bubble image clicks when disabled (so parents can still handle them)', async () => {
    const { el, parent, parentClickMock } = await createInParent({
      disabled: true,
    })
    cleanup = () => {
      parent.remove()
    }

    el.querySelector('img')?.click()

    // When disabled, the zoom doesn't fire — and the click should bubble
    // normally so the parent can still handle it (the wrapper is a no-op).
    expect(parentClickMock).toHaveBeenCalled()
  })

  it('rewires a slotted trigger after disconnect+reconnect even if the node reference is unchanged', async () => {
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.innerHTML = `
      <img alt="hero" src="hero.jpg" />
      <button id="custom-trigger" slot="trigger">Open</button>
    `
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    const img = el.querySelector<HTMLImageElement>('img:not([slot])')
    if (img != null) {
      Object.defineProperty(img, 'currentSrc', {
        value: 'hero.jpg',
        configurable: true,
      })
      img.getBoundingClientRect = (): DOMRect => ({
        top: 0,
        left: 0,
        width: 200,
        height: 150,
        right: 200,
        bottom: 150,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      })
    }
    await tick()
    img?.dispatchEvent(new Event('load'))
    await tick()

    // Move the host (with the same slotted trigger node) to a different
    // parent — disconnect, then reconnect, with NO change to the slotted
    // assignment. slotchange should NOT fire for the trigger slot in
    // this scenario, so the explicit resolver in connectedCallback is
    // the only thing that re-attaches the click listener.
    const newHost = document.createElement('div')
    document.body.appendChild(newHost)
    newHost.appendChild(el)
    await tick()

    const { handler, mock } = createZoomChangeHandler()
    el.addEventListener('image-zoom:zoom-change', handler)

    const customTrigger = el.querySelector<HTMLButtonElement>('#custom-trigger')
    customTrigger?.click()

    expect(mock).toHaveBeenCalled()
    expect(lastEventDetail(mock).zoomed).toBe(true)
    newHost.remove()
  })

  it('does not allow HTML injection through label-zoom / label-unzoom', async () => {
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    // Try to break out of the aria-label attribute and inject markup.
    el.setAttribute('label-zoom', '"><img src=x onerror=window.__pwn=1>')
    el.setAttribute('label-unzoom', '"><script>window.__pwn=2</script>')
    el.innerHTML = '<img alt="ok" src="x.jpg" />'
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
      Reflect.deleteProperty(window, '__pwn')
    }
    await tick()

    // No injected element should exist anywhere in the shadow tree.
    const injected = el.shadowRoot?.querySelectorAll('img[src="x"], script')
    expect(injected?.length ?? 0).toBe(0)

    // The attempted-injection strings should land verbatim in the
    // aria-label, not be interpreted as markup.
    const btnZoom = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-zoom]',
    )
    const btnUnzoom = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-rmiz-btn-unzoom]',
    )
    expect(btnZoom?.getAttribute('aria-label')).toContain('<img src=x')
    expect(btnUnzoom?.getAttribute('aria-label')).toContain('<script>')
    expect(Reflect.get(window, '__pwn')).toBeUndefined()
  })

  it('drops the pending zoom when disabled is set mid-load', async () => {
    // Scenario: the caller sets zoomed=true BEFORE the image has
    // loaded (so #doZoom bails and the deferred retry is armed in
    // #onImgLoad.done). Then the caller sets disabled=true. When
    // the image finishes loading, the retry must NOT open the modal.
    // AND we must not silently strand the zoomed attribute — drop
    // it so the caller's intent is visible to observers.
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.setAttribute('zoomed', '')
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    // Now flip disabled on — the zoomed attribute should drop.
    el.setAttribute('disabled', '')
    expect(el.zoomed).toBe(false)

    // Wire up the image AFTER — the deferred retry path is dead.
    const img = document.createElement('img')
    img.src = 'x.jpg'
    Object.defineProperty(img, 'currentSrc', {
      value: 'x.jpg',
      configurable: true,
    })
    img.getBoundingClientRect = (): DOMRect => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
    el.appendChild(img)
    await tick()
    img.dispatchEvent(new Event('load'))
    await tick()

    expect(el.modalState).toBe('UNLOADED')
  })

  it('does not open the modal when zoomed is set on a disabled element', async () => {
    const el = await createElement()
    el.setAttribute('disabled', '')
    el.setAttribute('zoomed', '')
    await tick()

    const dialog = el.shadowRoot?.querySelector<HTMLDialogElement>(
      '[data-rmiz-modal]',
    )
    expect(dialog?.open).toBe(false)
    expect(el.modalState).toBe('UNLOADED')
  })

  it('does not open an empty modal when zoomed is set before any image is present', async () => {
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    // Set zoomed BEFORE connection — this lands on
    // attributeChangedCallback at upgrade time with no slotted image.
    el.setAttribute('zoomed', '')
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    const dialog = el.shadowRoot?.querySelector<HTMLDialogElement>(
      '[data-rmiz-modal]',
    )
    expect(dialog?.open).toBe(false)
    expect(el.modalState).toBe('UNLOADED')
    // The attribute is still set so the user's intent is preserved.
    expect(el.zoomed).toBe(true)
  })

  it('honors zoomed=true once a deferred image finally loads', async () => {
    mockBrowserApis()
    const el = document.createElement('image-zoom')
    el.setAttribute('zoomed', '')
    document.body.appendChild(el)
    cleanup = () => {
      el.remove()
    }
    await tick()

    // Now add the image — the deferred zoom should fire after load.
    const img = document.createElement('img')
    img.alt = 'deferred'
    img.src = 'deferred.jpg'
    Object.defineProperty(img, 'currentSrc', {
      value: 'deferred.jpg',
      configurable: true,
    })
    img.getBoundingClientRect = (): DOMRect => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
    el.appendChild(img)
    await tick()
    img.dispatchEvent(new Event('load'))
    await tick()

    const dialog = el.shadowRoot?.querySelector<HTMLDialogElement>(
      '[data-rmiz-modal]',
    )
    expect(dialog?.open).toBe(true)
    expect(el.modalState).not.toBe('UNLOADED')
  })

  it('numeric getters clamp garbage attribute values', async () => {
    const el = await createElement()
    // Manually write bogus attribute values — the setter rejects them
    // but authors can still write arbitrary strings via HTML.
    el.setAttribute('zoom-margin', '-5')
    expect(el.zoomMargin).toBe(0)
    el.setAttribute('zoom-margin', 'nonsense')
    expect(el.zoomMargin).toBe(0)
    el.setAttribute('zoom-margin', 'Infinity')
    expect(el.zoomMargin).toBe(0)
    el.setAttribute('zoom-margin', '42')
    expect(el.zoomMargin).toBe(42)

    el.setAttribute('swipe-to-unzoom-threshold', '-1')
    expect(el.swipeToUnzoomThreshold).toBe(10)
    el.setAttribute('swipe-to-unzoom-threshold', 'junk')
    expect(el.swipeToUnzoomThreshold).toBe(10)
    el.setAttribute('swipe-to-unzoom-threshold', '25')
    expect(el.swipeToUnzoomThreshold).toBe(25)
  })

  it('numeric setters reject invalid values', async () => {
    const el = await createElement()
    el.setAttribute('zoom-margin', '20')

    el.zoomMargin = Number.NaN
    expect(el.getAttribute('zoom-margin')).toBe('20')

    el.zoomMargin = -5
    expect(el.getAttribute('zoom-margin')).toBe('20')

    el.zoomMargin = Number.POSITIVE_INFINITY
    expect(el.getAttribute('zoom-margin')).toBe('20')

    el.zoomMargin = 100
    expect(el.getAttribute('zoom-margin')).toBe('100')
  })
})

// =============================================================================
// TEST HELPERS
// =============================================================================

let cleanup: () => void = () => undefined

afterEach(() => {
  cleanup()
  cleanup = () => undefined
  document.body.style.overflow = ''
  document.body.style.width = ''
})

function mockBrowserApis(): void {
  const baseStyle = window.getComputedStyle(document.createElement('div'))

  for (const [key, value] of Object.entries({
    display: 'block',
    transitionDuration: '0.3s',
    objectFit: 'fill',
    objectPosition: '50% 50%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'auto',
    transform: 'none',
  })) {
    Object.defineProperty(baseStyle, key, { value, configurable: true })
  }

  vi.spyOn(window, 'getComputedStyle').mockReturnValue(baseStyle)

  vi.spyOn(HTMLImageElement.prototype, 'decode').mockImplementation(
    async function (this: HTMLImageElement) {
      Object.defineProperty(this, 'naturalWidth', {
        value: 800,
        configurable: true,
      })
      Object.defineProperty(this, 'naturalHeight', {
        value: 600,
        configurable: true,
      })
      await Promise.resolve()
    },
  )
}

async function createElement(
  opts: { html?: string } = {},
): Promise<ImageZoomElement> {
  mockBrowserApis()

  const el = document.createElement('image-zoom')
  el.innerHTML = opts.html ?? '<img alt="Test image" src="test.jpg" />'

  document.body.appendChild(el)

  const img = el.querySelector('img')
  if (img != null) {
    Object.defineProperty(img, 'currentSrc', {
      value: img.src === '' ? 'test.jpg' : img.src,
      configurable: true,
    })
    img.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
  }

  await tick()

  if (img != null) {
    img.dispatchEvent(new Event('load'))
    await tick()
  }

  cleanup = () => {
    el.remove()
  }

  return el
}

interface InParentResult {
  el: ImageZoomElement
  parent: HTMLDivElement
  parentClickMock: ReturnType<typeof vi.fn>
}

async function createInParent(
  opts: { disabled?: boolean } = {},
): Promise<InParentResult> {
  mockBrowserApis()

  const parent = document.createElement('div')
  const parentClickMock = vi.fn()
  const parentClick: EventListener = e => {
    parentClickMock(e)
  }
  parent.addEventListener('click', parentClick)
  document.body.appendChild(parent)

  const el = document.createElement('image-zoom')
  if (opts.disabled === true) el.setAttribute('disabled', '')
  el.innerHTML = '<img alt="Test image" src="test.jpg" />'
  parent.appendChild(el)

  const img = el.querySelector('img')
  if (img != null) {
    Object.defineProperty(img, 'currentSrc', {
      value: 'test.jpg',
      configurable: true,
    })
    img.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 200,
      height: 150,
      right: 200,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    })
  }

  await tick()
  img?.dispatchEvent(new Event('load'))
  await tick()

  return { el, parent, parentClickMock }
}

interface ZoomChangeDetail {
  zoomed: boolean
}

function createZoomChangeHandler(): {
  handler: EventListener
  mock: ReturnType<typeof vi.fn>
} {
  const mock = vi.fn()
  const handler: EventListener = e => {
    mock(e)
  }
  return { handler, mock }
}

function lastEventDetail(mock: ReturnType<typeof vi.fn>): ZoomChangeDetail {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- extracting CustomEvent from mock args
  const event = mock.mock.lastCall?.[0] as CustomEvent<ZoomChangeDetail>
  return event.detail
}

async function tick(): Promise<void> {
  // eslint-disable-next-line promise/avoid-new -- setTimeout doesn't return a promise
  await new Promise<void>(resolve => {
    setTimeout(resolve, 0)
  })
}

function dispatchTouchY(
  target: EventTarget,
  type: 'touchstart' | 'touchmove' | 'touchend',
  y: number,
): void {
  const touch = { screenY: y }
  const event = new Event(type, { bubbles: true })
  Object.defineProperty(event, 'touches', { value: [touch] })
  Object.defineProperty(event, 'changedTouches', { value: [touch] })
  target.dispatchEvent(event)
}
