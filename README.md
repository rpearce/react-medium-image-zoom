# react-medium-image-zoom

Accessible image zoom in the style of medium.com. This repository is a pnpm
workspace with two packages:

- [`@rpearce/image-zoom`](./packages/image-zoom/README.md) is `<image-zoom>`,
  a custom element with no dependencies. Use it from plain HTML and
  JavaScript, Vue, Svelte, or anything else that renders HTML.

  ```html
  <link rel="stylesheet" href="…/@rpearce/image-zoom/dist/styles.css" />
  <script type="module" src="…/@rpearce/image-zoom/dist/index.js"></script>
  <image-zoom><img src="small.jpg" alt="A lighthouse" /></image-zoom>
  ```

- [`react-medium-image-zoom`](./packages/react-medium-image-zoom/README.md) is
  the `<Zoom>` component for React. Since v6 it wraps `<image-zoom>`.

  ```jsx
  import Zoom from 'react-medium-image-zoom'
  import 'react-medium-image-zoom/styles.css'
  export const MyImg = () => (
    <Zoom>
      <img src="small.jpg" alt="A lighthouse" />
    </Zoom>
  )
  ```

- [Storybook examples](https://rpearce.github.io/react-medium-image-zoom/) (React)
- [Migrating from v5 to v6](./packages/react-medium-image-zoom/README.md#migrating-from-v5-to-v6)
- [Contributing](./CONTRIBUTING.md)
