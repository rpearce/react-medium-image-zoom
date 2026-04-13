'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import type { ImageZoomElement } from '@rpearce/image-zoom'
import '@rpearce/image-zoom'
import '@rpearce/image-zoom/react'

// =============================================================================

export interface ControlledProps {
  labelUnzoom?: string
  labelZoom?: string
  canSwipeToUnzoom?: boolean
  children: React.ReactNode
  IconUnzoom?: React.ReactNode
  isDisabled?: boolean
  isZoomed: boolean
  onZoomChange?: (
    value: boolean,
    data: { event: React.SyntheticEvent | Event },
  ) => void
  swipeToUnzoomThreshold?: number
  zoomImg?: React.ImgHTMLAttributes<HTMLImageElement>
  zoomMargin?: number
}

export function Controlled({
  labelUnzoom,
  labelZoom,
  canSwipeToUnzoom,
  children,
  IconUnzoom,
  isDisabled = false,
  isZoomed,
  onZoomChange,
  swipeToUnzoomThreshold,
  zoomImg,
  zoomMargin,
}: ControlledProps): React.JSX.Element {
  const ref = React.useRef<ImageZoomElement>(null)
  const [btnUnzoom, setBtnUnzoom] = React.useState<HTMLButtonElement | null>(
    null,
  )

  // Sync isZoomed prop → zoomed attribute
  React.useEffect(() => {
    const { current: el } = ref
    if (el == null) return

    el.zoomed = isZoomed
  }, [isZoomed])

  // Sync other props → attributes
  React.useEffect(() => {
    const { current: el } = ref
    if (el == null) return

    el.disabled = isDisabled

    syncAttr(el, 'label-zoom', labelZoom)
    syncAttr(el, 'label-unzoom', labelUnzoom)
    syncAttr(
      el,
      'zoom-margin',
      zoomMargin == null ? undefined : String(zoomMargin),
    )
    syncAttr(
      el,
      'swipe-to-unzoom-threshold',
      swipeToUnzoomThreshold == null
        ? undefined
        : String(swipeToUnzoomThreshold),
    )

    if (canSwipeToUnzoom === false) {
      el.setAttribute('can-swipe-to-unzoom', 'false')
    } else {
      el.removeAttribute('can-swipe-to-unzoom')
    }

    syncAttr(el, 'zoom-src', zoomImg?.src)
    syncAttr(el, 'zoom-srcset', zoomImg?.srcSet)
    syncAttr(el, 'zoom-sizes', zoomImg?.sizes)
    syncAttr(el, 'zoom-crossorigin', zoomImg?.crossOrigin)
  }, [
    labelUnzoom,
    labelZoom,
    canSwipeToUnzoom,
    isDisabled,
    swipeToUnzoomThreshold,
    zoomImg,
    zoomMargin,
  ])

  // Bridge zoom-change event → onZoomChange callback (controlled mode).
  // Hold the latest callback in a ref so the listener subscribes once and
  // doesn't churn when callers pass an inline function on every render.
  const onZoomChangeRef = React.useRef(onZoomChange)
  React.useEffect(() => {
    onZoomChangeRef.current = onZoomChange
  })

  React.useEffect(() => {
    const { current: el } = ref
    if (el == null) return

    function handleZoomChange(e: Event): void {
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- image-zoom:zoom-change is always a CustomEvent
      const ce = e as CustomEvent<{ zoomed: boolean }>
      onZoomChangeRef.current?.(ce.detail.zoomed, { event: e })
    }

    el.addEventListener('image-zoom:zoom-change', handleZoomChange)

    return () => {
      el.removeEventListener('image-zoom:zoom-change', handleZoomChange)
    }
  }, [])

  // Capture the unzoom button for the IconUnzoom portal and keep it
  // in sync if the web component's active unzoom button changes
  // (e.g. the consumer dynamically assigns `<button slot="modal-button">`
  // and the slotchange handler inside <image-zoom> picks it up). The
  // web component dispatches `image-zoom:btn-unzoom-change` on every
  // swap, carrying the new element in `detail.button`.
  //
  // IconUnzoom is read through a ref so this effect never re-runs on
  // icon changes — re-running would tear down the portal's managed
  // nodes mid-commit. Icon content updates are handled naturally by
  // React re-rendering the portal.
  const iconUnzoomRef = React.useRef(IconUnzoom)
  React.useEffect(() => {
    iconUnzoomRef.current = IconUnzoom
  })

  React.useEffect(() => {
    const el = ref.current
    if (el == null) return

    function capture(btn: HTMLButtonElement): void {
      if (iconUnzoomRef.current != null) {
        while (btn.firstChild != null) {
          btn.removeChild(btn.firstChild)
        }
      }
      setBtnUnzoom(btn)
    }

    capture(el.btnUnzoom)

    function handleBtnChange(e: Event): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- image-zoom:btn-unzoom-change is always a CustomEvent
      const ce = e as CustomEvent<{ button: HTMLButtonElement }>
      capture(ce.detail.button)
    }

    el.addEventListener('image-zoom:btn-unzoom-change', handleBtnChange)
    return () => {
      el.removeEventListener('image-zoom:btn-unzoom-change', handleBtnChange)
    }
  }, [])

  return (
    <>
      <image-zoom ref={ref}>{children}</image-zoom>
      {btnUnzoom != null && IconUnzoom != null
        ? createPortal(IconUnzoom, btnUnzoom)
        : null}
    </>
  )
}

// =============================================================================

function syncAttr(
  el: HTMLElement,
  name: string,
  value: string | undefined | null,
): void {
  if (value == null || value === '') {
    el.removeAttribute(name)
  } else {
    el.setAttribute(name, value)
  }
}
