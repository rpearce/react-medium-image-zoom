---
'react-medium-image-zoom': patch
---

stop publishing test files in dist/ — the build's exclude pattern only matched `.ts`, so `controlled.test.tsx` was compiled into the published package
