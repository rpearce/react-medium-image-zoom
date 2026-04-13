---
'react-medium-image-zoom': major
---

v6: rewrite around the `@rpearce/image-zoom` web component

The zoom behavior now lives in a framework-agnostic web component
published as `@rpearce/image-zoom`, and this package is a thin React
wrapper around it. The common uncontrolled/controlled API is preserved;
several props have been renamed or replaced by web-component slots and
CSS `::part()` selectors.

**Renamed props**

- `a11yNameButtonZoom` → `labelZoom`
- `a11yNameButtonUnzoom` → `labelUnzoom`

**Removed props** (replaced by lower-level web-component hooks)

- `classDialog` — use `image-zoom::part(modal) { ... }` etc. and the
  `--rmiz-*` CSS custom properties on the host.
- `IconZoom` — slot a trigger with `<button slot="trigger">…</button>`.
- `wrapElement` — the component no longer injects a wrapping element;
  drop the prop.
- `ZoomContent` — slot your modal layout with `slot="modal"`, putting
  `data-rmiz-modal-img` on the element that should receive the zoom
  transform.

**Type change**

- `IconUnzoom` now accepts JSX (`React.ReactNode`) instead of a
  component type (`ElementType`). Pass `<MyIcon />` instead of `MyIcon`.

See the "Migrating From v5 to v6" section in the README for code
examples.
