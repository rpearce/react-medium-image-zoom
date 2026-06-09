---
'react-medium-image-zoom': patch
---

fix: opening or closing a zoom no longer shifts the page's scroll position, so scroll-driven UI (sticky/condensing headers, scroll-spies, scroll-triggered animations) no longer fires as though the user scrolled #1085
