// Optional React JSX type augmentation for `<image-zoom>`. Consumers using
// the web component directly inside React JSX should import this once at
// the top of their app entry, OR add it to their tsconfig "types":
//
//     // entry.tsx
//     import '@rpearce/image-zoom/react'
//
//     // tsconfig.json
//     { "compilerOptions": { "types": ["@rpearce/image-zoom/react"] } }
//
// This file is intentionally separate from the main entry so the
// framework-agnostic `@rpearce/image-zoom` package keeps zero runtime deps
// and doesn't pollute the type system for non-React consumers. It is a
// .d.ts file at the package root (not in src/) so the lint rules around
// namespaces (which React's JSX type tree forces us to use) don't apply.

import type { ImageZoomElement } from './dist/image-zoom.js'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'image-zoom': DetailedHTMLProps<
          HTMLAttributes<ImageZoomElement>,
          ImageZoomElement
        >
      }
    }
  }
}
