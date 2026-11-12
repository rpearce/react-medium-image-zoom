---
'react-medium-image-zoom': major
---

`<Zoom>` now renders the `<image-zoom>` custom element from `@rpearce/image-zoom`. The props, the exports and every other `[data-rmiz-*]` styling hook are unchanged. The README's "Migrating from v5 to v6" says what to do for each change:

1. **Outer wrapper.** It is now `<image-zoom data-rmiz>` (block by default, inline for `wrapElement="span"`) instead of `<div|span data-rmiz>`. Selectors such as `div[data-rmiz]` stop matching, and the host's attributes (`disabled`, `inline`, `swipe`, `zoom-*`, `custom-content`) match broad selectors such as `[disabled]`.
2. **Ghost.** `[data-rmiz-ghost]` lives in shadow DOM. Rules that select it, or the zoom button through it, stop matching. Style it with `image-zoom::part(ghost)`; its `position` and `pointer-events` are inline.
3. **Content visibility.** `[data-rmiz-content]` no longer gets an inline `visibility`; the image is hidden by visibility inherited from a shadow slot. A page rule for `visibility` on it now wins while zoomed, and happy-dom (probably jsdom too) no longer reports the zoomed image as hidden.
4. **Zoom button.** It is a slotted child of `<image-zoom>`, still `[data-rmiz-btn-zoom]` and still positioned inside the ghost.
5. **Dialog.** The element creates it, still under `[data-rmiz-portal]` with the same attributes. React portals `[data-rmiz-modal-content]` into it, which now has `role="presentation"`. Events whose target is the dialog or its overlay no longer reach `<Zoom>`'s React ancestors.
6. **Events.** The `event` passed to `onZoomChange` is a native `Event` (no `nativeEvent`, no `persist()`) for requests that start in the element and for the unzoom button and content clicks. `ZoomContent`'s `onUnzoom(e)` still passes on what it is given.
7. **`ZoomContent`'s `img`** no longer has `props.id` or `props.onTransitionEnd`. Its `props.style` is frozen, and `props.crossOrigin` is `undefined` where it was `null`.
8. **Timing.** On React 18 and 19, a zoom-button click opens the dialog one task later. The zoom button appears one task after the image loads, which `act` doesn't flush, and becomes visible and focusable one task after React renders it.
9. **Global registration.** Importing the package registers `<image-zoom>`. If another library has already defined `image-zoom`, the import throws.
10. **A dependency.** The package depends on `@rpearce/image-zoom` (ESM); add it next to `react-medium-image-zoom` in Jest `transformIgnorePatterns` or Next.js `transpilePackages` lists. It is larger: about 9.9 kB gzip, up from about 5.4 kB.
11. **Copied stylesheets.** A copy of `styles.css` needs the new `:where(image-zoom…)` rules, and its `[data-rmiz-ghost]` rule is dead.
12. **Test stubs.** A hand-written `ResizeObserver` stub needs an `unobserve` method. The element no longer calls `disconnect`.
