# react-medium-image-zoom

[![npm version](https://img.shields.io/npm/v/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom) [![react-medium-image-zoom bundlejs badge](https://deno.bundlejs.com/?q=react-medium-image-zoom&badge=&config={%22esbuild%22:{%22external%22:[%22react%22,%22react-dom%22]}})](https://bundlejs.com/?q=react-medium-image-zoom) [![npm downloads](https://img.shields.io/npm/dm/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom) [![All Contributors](https://img.shields.io/badge/all_contributors-91-orange.svg)](#contributors-)

The original [medium.com-inspired image zooming](https://medium.design/image-zoom-on-medium-24d146fc0c20)
library for [React](https://reactjs.org).

[View the storybook examples](https://rpearce.github.io/react-medium-image-zoom/)
to see various usages.

Features:

* `<img />`, including all [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
  values, any [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position),
  and [`loading="lazy"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
* `<div>` and `<span>` with any [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image),
  [`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size),
  and [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
* `<picture>` with `<source />` and `<img />`
* `<figure>` with `<img />`
* `<svg>`
* [Custom zoom modal content](#custom-zoom-modal-content) (👇)
* Accessibility:
  * JAWS in Chrome, Edge, and Firefox (Windows)
  * NVDA in Chrome, Edge, and Firefox (Windows)
  * VoiceOver in Safari (macOS, iOS)
  * TalkBack in Chrome (Android)
* Supports popular tools:
  * [Gatsby](https://www.gatsbyjs.com) and [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/)
  * [Next.js](https://nextjs.org/docs/api-reference/next/image)
* Zero `dependencies`

Requirements to know about:

* `<dialog>` element ([caniuse dialog](https://caniuse.com/dialog))
* `ResizeObserver` ([caniuse ResizeObserver](https://caniuse.com/mdn-api_resizeobserver))
* Package build target is `ES2021`. If you need to support older environments,
  run this package through your build system.

## Media and Tutorials

* [2024-08-2024 — _React Round Up_ — "Building a Seamless Image Zoom Feature"](https://topenddevs.com/podcasts/react-round-up/episodes/building-a-seamless-image-zoom-feature-rru-265)
* [Build a React.js Image Zoom Feature with react-medium-image-zoom Library and State Management](https://www.youtube.com/watch?v=w24gLJzmXp0)

## Quickstart

```bash
npm install --save react-medium-image-zoom
```

```javascript
import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const MyImg = () => (
  <Zoom>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src="/path/to/thatwanakatree.jpg"
      width="500"
    />
  </Zoom>
)
```

## API

You can pass these options to either the `Uncontrolled` (default) or
`Controlled` components.

```typescript
export interface UncontrolledProps {
  // Accessible label text for when you want to unzoom.
  // Default: 'Minimize image'
  a11yNameButtonUnzoom?: string

  // Accessible label text for when you want to zoom.
  // Default: 'Expand image'
  a11yNameButtonZoom?: string

  // Allow swipe gesture to unzoom.
  // Default: true
  canSwipeToUnzoom?: boolean

  // Your image (required).
  children: ReactNode

  // Custom CSS className to add to the zoomed <dialog>.
  classDialog?: string

  // Provide your own unzoom button icon.
  // Default: ICompress
  IconUnzoom?: ElementType

  // Provide your own zoom button icon.
  // Default: IEnlarge
  IconZoom?: ElementType

  // Disables the zoom/unzoom behavior.
  // Default: false
  isDisabled?: boolean

  // First argument: boolean value of a new zoomed state (Uncontrolled
  // component) or a suggested new state (Controlled component).
  // Second argument: object containing the event that triggered the change.
  // Default: undefined
  onZoomChange?: (
    value: boolean,
    data: { event: React.SyntheticEvent | Event }
  ) => void

  // Swipe gesture threshold after which to unzoom.
  // Default: 10
  swipeToUnzoomThreshold?: number

  // Specify what type of element should be used for
  // internal component usage. This is useful if the
  // image is inside a <p> or <button>, for example.
  // Default: 'div'
  wrapElement?: 'div' | 'span'

  // Provide your own custom modal content component.
  ZoomContent?: (props: {
    img: ReactElement | null;
    buttonUnzoom: ReactElement<HTMLButtonElement>;
    onUnzoom: () => void;
  }) => ReactElement;

  // Higher quality image attributes to use on zoom.
  zoomImg?: ImgHTMLAttributes<HTMLImageElement>

  // Offset in pixels the zoomed image should
  // be from the window's boundaries.
  // Default: 0
  zoomMargin?: number
}
```

You can pass these options to only the `Controlled` component.

```typescript
export interface ControlledProps {
  // ...same as UncontrolledProps

  // Tell the component whether or not it should be zoomed
  // Default: false
  isZoomed: boolean
}
```

## Basic Usage

### Uncontrolled component (default)

Import the component and the CSS, wrap your image with the component, and the
component will handle it's own state.

```javascript
import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// <img />
export const MyImg = () => (
  <Zoom>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src="/path/to/thatwanakatree.jpg"
      width="500"
    />
  </Zoom>
)

// <div>
export const MyDiv = () => (
  <Zoom>
    <div
      aria-label="That Wanaka Tree, New Zealand by Laura Smetsers"
      role="img"
      style={{
        backgroundColor: '#fff',
        backgroundImage: `url("/path/to/thatwanakatree.jpg")`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '0',
        paddingBottom: '56%',
        width: '100%',
      }}
    />
  </Zoom>
)

// <picture>
export const MyPicture = () => (
  <Zoom>
    <picture>
      <source media="(max-width: 800px)" srcSet="/path/to/teAraiPoint.jpg" />
      <img
        alt="A beautiful, serene setting in nature"
        src="/path/to/thatwanakatree.jpg"
        width="500"
      />
    </picture>
  </Zoom>
)

// <figure>
export const MyFigure = () => (
  <figure>
    <Zoom>
      <img
        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
        src="/path/to/thatwanakatree.jpg"
        width="500"
      />
    </Zoom>
    <figcaption>Photo by Laura Smetsers</figcaption>
  </figure>
)
```

### Controlled component

Import the `Controlled` component and the CSS, wrap your image with the
component, and then dictate the `isZoomed` state to the component.

```javascript
import React, { useCallback, useState } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const MyComponent = () => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
      <img
        alt="That wanaka tree, alone in the water near mountains"
        src="/path/to/thatwanakatree.jpg"
        width="500"
      />
    </ControlledZoom>
  )
}

export default MyComponent
```

The `onZoomChange` prop accepts a callback that will receive `true` or `false`
based on events that occur (like click or scroll events) to assist you in
determining when to zoom and unzoom the component.

## Styles

You can import the default styles from `react-medium-image-zoom/dist/styles.css`
and override the values from your code, or you can copy [the styles.css
file](./source/styles.css) and alter it to your liking. The latter is the best
option, given `rem`s should be used instead of `px` to account for different
default browser font sizes, and it's hard for a library to guess at what these
values should be.

An example of customizing the transition duration, timing function, overlay
background color, and unzoom button styles with `:focus-visible` can be found in
this story: https://rpearce.github.io/react-medium-image-zoom/?path=/story/img--custom-modal-styles

### Custom zoom modal content

If you want to customize the zoomed modal experience with a caption, form, or
other set of components, you can do so by providing a custom component to the
`ZoomContent` prop.

[View the live example of custom zoom modal content.](https://rpearce.github.io/react-medium-image-zoom/?path=/story/img--modal-figure-caption)

Below is some example code that demonstrates how to use this feature.

```javascript
export const MyImg = () => (
  <Zoom ZoomContent={CustomZoomContent}>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src="/path/to/thatwanakatree.jpg"
      width="500"
    />
  </Zoom>
)

const CustomZoomContent = ({
  /** Default unzoom button */
  buttonUnzoom,

  /** Current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING */
  modalState,

  /** Your image, prepped for zooming */
  img,

  /** A state to check if the zoom img is loaded (useful for loading state) */
  // isZoomImgLoaded,

  /**
   * A callback to manually unzoom the image and close the modal if you want to
   * use your own buttons or listeners in your custom experience.
   */
  //onUnzoom,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true)
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false)
    }
  }, [modalState])

  const classCaption = isLoaded
    ? 'zoom-caption zoom-caption--loaded'
    : 'zoom-caption'

  return <>
    {buttonUnzoom}

    <figure>
      {img}
      <figcaption className={classCaption}>
        That Wanaka Tree, also known as the Wanaka Willow, is a willow tree
        located at the southern end of Lake Wānaka in the Otago region of New
        Zealand.
        <cite className="zoom-caption-cite">
          Wikipedia, <a className="zoom-caption-link" href="https://en.wikipedia.org/wiki/That_Wanaka_Tree">
            That Wanaka Tree
          </a>
        </cite>
      </figcaption>
    </figure>
  </>
}
```

## Migrating From v4 to v5

Here are the prop changes from `v4` to be aware of:

* `closeText` was renamed to `a11yNameButtonUnzoom`
* `openText` was renamed to `a11yNameButtonZoom`
* `overlayBgColorStart` was removed and is now controlled via the CSS selector `[data-rmiz-modal-overlay="hidden"]`
* `overlayBgColorEnd` was removed and is now controlled via the CSS selector `[data-rmiz-modal-overlay="visible"]`
* `portalEl` was removed, for we are using the `<dialog>` element now
* `transitionDuration` was removed and is now controlled via the CSS selectors `[data-rmiz-modal-overlay]` and `[data-rmiz-modal-img]`
* `wrapElement` was removed then added back in `v5.1.0`
* `wrapStyle` was removed
* `zoomZindex` was removed, for we are using the `<dialog>` element now

And you can now provide `zoomImg` props to specify a different image to load when zooming.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://robertwpearce.com"><img src="https://avatars2.githubusercontent.com/u/592876?v=4?s=40" width="40px;" alt="Robert Pearce"/><br /><sub><b>Robert Pearce</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce" title="Code">💻</a> <a href="#question-rpearce" title="Answering Questions">💬</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce" title="Tests">⚠️</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arpearce" title="Bug reports">🐛</a> <a href="#example-rpearce" title="Examples">💡</a> <a href="#design-rpearce" title="Design">🎨</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Arpearce" title="Reviewed Pull Requests">👀</a> <a href="#ideas-rpearce" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cbothner"><img src="https://avatars1.githubusercontent.com/u/4642599?v=4?s=40" width="40px;" alt="Cameron Bothner"/><br /><sub><b>Cameron Bothner</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner" title="Documentation">📖</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Acbothner" title="Bug reports">🐛</a> <a href="#example-cbothner" title="Examples">💡</a> <a href="#ideas-cbothner" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Acbothner" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jeremybini"><img src="https://avatars2.githubusercontent.com/u/12982155?v=4?s=40" width="40px;" alt="Jeremy Bini"/><br /><sub><b>Jeremy Bini</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=jeremybini" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajeremybini" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ismaywolff.nl"><img src="https://avatars1.githubusercontent.com/u/7355199?v=4?s=40" width="40px;" alt="ismay"/><br /><sub><b>ismay</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aismay" title="Bug reports">🐛</a> <a href="#ideas-ismay" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.qeek.co"><img src="https://avatars0.githubusercontent.com/u/220647?v=4?s=40" width="40px;" alt="Rajit Singh"/><br /><sub><b>Rajit Singh</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arajit" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rsaccon"><img src="https://avatars1.githubusercontent.com/u/16122?v=4?s=40" width="40px;" alt="Roberto Saccon"/><br /><sub><b>Roberto Saccon</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arsaccon" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wtfdaemon"><img src="https://avatars0.githubusercontent.com/u/6598350?v=4?s=40" width="40px;" alt="wtfdaemon"/><br /><sub><b>wtfdaemon</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Awtfdaemon" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshsloat.com"><img src="https://avatars1.githubusercontent.com/u/606159?v=4?s=40" width="40px;" alt="Josh Sloat"/><br /><sub><b>Josh Sloat</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajoshsloat" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=joshsloat" title="Code">💻</a> <a href="#example-joshsloat" title="Examples">💡</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Ajoshsloat" title="Reviewed Pull Requests">👀</a> <a href="#ideas-joshsloat" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=joshsloat" title="Documentation">📖</a> <a href="#design-joshsloat" title="Design">🎨</a> <a href="#question-joshsloat" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aswinckr"><img src="https://avatars1.githubusercontent.com/u/5960217?v=4?s=40" width="40px;" alt="Aswin"/><br /><sub><b>Aswin</b></sub></a><br /><a href="#question-aswinckr" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alexshelkov"><img src="https://avatars3.githubusercontent.com/u/1233347?v=4?s=40" width="40px;" alt="Alex Shelkovskiy"/><br /><sub><b>Alex Shelkovskiy</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aalexshelkov" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://adrian-design.com"><img src="https://avatars1.githubusercontent.com/u/7365629?v=4?s=40" width="40px;" alt="Adrian Bindiu"/><br /><sub><b>Adrian Bindiu</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ASnowsoul" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kendagriff"><img src="https://avatars3.githubusercontent.com/u/110935?v=4?s=40" width="40px;" alt="Kendall Buchanan"/><br /><sub><b>Kendall Buchanan</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Akendagriff" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HippoDippo"><img src="https://avatars2.githubusercontent.com/u/25674779?v=4?s=40" width="40px;" alt="Kaycee"/><br /><sub><b>Kaycee</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=HippoDippo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://shuffle.do"><img src="https://avatars2.githubusercontent.com/u/9633371?v=4?s=40" width="40px;" alt="Anuj"/><br /><sub><b>Anuj</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aoyeanuj" title="Bug reports">🐛</a> <a href="#question-oyeanuj" title="Answering Questions">💬</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ludwigfrank"><img src="https://avatars1.githubusercontent.com/u/10273946?v=4?s=40" width="40px;" alt="Ludwig Frank"/><br /><sub><b>Ludwig Frank</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aludwigfrank" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=ludwigfrank" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/serfgy"><img src="https://avatars2.githubusercontent.com/u/20569525?v=4?s=40" width="40px;" alt="LX"/><br /><sub><b>LX</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aserfgy" title="Bug reports">🐛</a> <a href="#ideas-serfgy" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.rosentomov.com"><img src="https://avatars3.githubusercontent.com/u/5452135?v=4?s=40" width="40px;" alt="Rosen Tomov"/><br /><sub><b>Rosen Tomov</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AbabyPrince" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tommoor.com"><img src="https://avatars2.githubusercontent.com/u/380914?v=4?s=40" width="40px;" alt="Tom Moor"/><br /><sub><b>Tom Moor</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=tommoor" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Atommoor" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jpreynat"><img src="https://avatars2.githubusercontent.com/u/7927876?v=4?s=40" width="40px;" alt="Johan Preynat"/><br /><sub><b>Johan Preynat</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=jpreynat" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajpreynat" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://rahulgaba.com"><img src="https://avatars3.githubusercontent.com/u/7898942?v=4?s=40" width="40px;" alt="Rahul Gaba"/><br /><sub><b>Rahul Gaba</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=rgabs" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Argabs" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/spencerfdavis"><img src="https://avatars3.githubusercontent.com/u/1526292?v=4?s=40" width="40px;" alt="Spencer Davis"/><br /><sub><b>Spencer Davis</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=spencerfdavis" title="Code">💻</a> <a href="#ideas-spencerfdavis" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Aspencerfdavis" title="Reviewed Pull Requests">👀</a> <a href="#design-spencerfdavis" title="Design">🎨</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dnlnvl"><img src="https://avatars2.githubusercontent.com/u/39607648?v=4?s=40" width="40px;" alt="dnlnvl"/><br /><sub><b>dnlnvl</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=dnlnvl" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/madeleineostoja"><img src="https://avatars3.githubusercontent.com/u/6374876?v=4?s=40" width="40px;" alt="Madi"/><br /><sub><b>Madi</b></sub></a><br /><a href="#ideas-madeleineostoja" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/0x6e6562"><img src="https://avatars3.githubusercontent.com/u/14088?v=4?s=40" width="40px;" alt="Ben Hood"/><br /><sub><b>Ben Hood</b></sub></a><br /><a href="#ideas-0x6e6562" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3A0x6e6562" title="Bug reports">🐛</a> <a href="#example-0x6e6562" title="Examples">💡</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3A0x6e6562" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://puthir.in"><img src="https://avatars2.githubusercontent.com/u/45002?v=4?s=40" width="40px;" alt="Navilan"/><br /><sub><b>Navilan</b></sub></a><br /><a href="#ideas-navilan" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/13806"><img src="https://avatars1.githubusercontent.com/u/31736960?v=4?s=40" width="40px;" alt="13806"/><br /><sub><b>13806</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3A13806" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.twitter.com/deadcoder0904"><img src="https://avatars1.githubusercontent.com/u/16436270?v=4?s=40" width="40px;" alt="Akshay Kadam (A2K)"/><br /><sub><b>Akshay Kadam (A2K)</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Adeadcoder0904" title="Bug reports">🐛</a> <a href="#ideas-deadcoder0904" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xerona"><img src="https://avatars0.githubusercontent.com/u/8929085?v=4?s=40" width="40px;" alt="Jake Stewart"/><br /><sub><b>Jake Stewart</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Axerona" title="Bug reports">🐛</a> <a href="#ideas-xerona" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/henrych4"><img src="https://avatars0.githubusercontent.com/u/19466940?v=4?s=40" width="40px;" alt="hhh"/><br /><sub><b>hhh</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ahenrych4" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/davalapar"><img src="https://avatars0.githubusercontent.com/u/41451953?v=4?s=40" width="40px;" alt="@davalapar"/><br /><sub><b>@davalapar</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Adavalapar" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sunknudsen.com"><img src="https://avatars3.githubusercontent.com/u/2117655?v=4?s=40" width="40px;" alt="Sun Knudsen"/><br /><sub><b>Sun Knudsen</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=sunknudsen" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Asunknudsen" title="Bug reports">🐛</a> <a href="#ideas-sunknudsen" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-sunknudsen" title="Examples">💡</a> <a href="#question-sunknudsen" title="Answering Questions">💬</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Asunknudsen" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=sunknudsen" title="Tests">⚠️</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=sunknudsen" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dougg0k.js.org"><img src="https://avatars3.githubusercontent.com/u/10801221?v=4?s=40" width="40px;" alt="Douglas Galdino"/><br /><sub><b>Douglas Galdino</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=dougg0k" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=dougg0k" title="Documentation">📖</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Adougg0k" title="Bug reports">🐛</a> <a href="#ideas-dougg0k" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-dougg0k" title="Examples">💡</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Adougg0k" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=dougg0k" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mohammedfaragallah.herokuapp.com"><img src="https://avatars0.githubusercontent.com/u/14910456?v=4?s=40" width="40px;" alt="Mohammed Faragallah"/><br /><sub><b>Mohammed Faragallah</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AMohammedFaragallah" title="Bug reports">🐛</a> <a href="#ideas-MohammedFaragallah" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-MohammedFaragallah" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://rokoroku.github.io"><img src="https://avatars1.githubusercontent.com/u/5208632?v=4?s=40" width="40px;" alt="Youngrok Kim"/><br /><sub><b>Youngrok Kim</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=rokoroku" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arokoroku" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://nandhae.me"><img src="https://avatars1.githubusercontent.com/u/11366094?v=4?s=40" width="40px;" alt="Nandhagopal Ezhilmaran"/><br /><sub><b>Nandhagopal Ezhilmaran</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Anandhae" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://equinusocio.dev"><img src="https://avatars.githubusercontent.com/u/10454741?v=4?s=40" width="40px;" alt="Mattia Astorino"/><br /><sub><b>Mattia Astorino</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aequinusocio" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://valtism.com"><img src="https://avatars.githubusercontent.com/u/1286001?v=4?s=40" width="40px;" alt="Dan Wood"/><br /><sub><b>Dan Wood</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=valtism" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zacherygentry"><img src="https://avatars.githubusercontent.com/u/14227467?v=4?s=40" width="40px;" alt="Zachery C Gentry"/><br /><sub><b>Zachery C Gentry</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Azacherygentry" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://xmflsct.com/"><img src="https://avatars.githubusercontent.com/u/292204?v=4?s=40" width="40px;" alt="xmflsct"/><br /><sub><b>xmflsct</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Axmflsct" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://supwill.dev/"><img src="https://avatars.githubusercontent.com/u/15272175?v=4?s=40" width="40px;" alt="Will.iam"/><br /><sub><b>Will.iam</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=iamwill123" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=iamwill123" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://Gourav.io"><img src="https://avatars.githubusercontent.com/u/7106086?v=4?s=40" width="40px;" alt="Gourav Goyal"/><br /><sub><b>Gourav Goyal</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=GorvGoyl" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://joshcena.com/"><img src="https://avatars.githubusercontent.com/u/55398995?v=4?s=40" width="40px;" alt="Joshua Chen"/><br /><sub><b>Joshua Chen</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AJosh-Cena" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=Josh-Cena" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/edlerd"><img src="https://avatars.githubusercontent.com/u/1155472?v=4?s=40" width="40px;" alt="David Edler"/><br /><sub><b>David Edler</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aedlerd" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=edlerd" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://rikusen.dev/"><img src="https://avatars.githubusercontent.com/u/19174234?v=4?s=40" width="40px;" alt="rikusen0335"/><br /><sub><b>rikusen0335</b></sub></a><br /><a href="#ideas-rikusen0335" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://surjithctly.in/"><img src="https://avatars.githubusercontent.com/u/1884712?v=4?s=40" width="40px;" alt="Surjith S M"/><br /><sub><b>Surjith S M</b></sub></a><br /><a href="#ideas-surjithctly" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/developergunny"><img src="https://avatars.githubusercontent.com/u/67149898?v=4?s=40" width="40px;" alt="developergunny"/><br /><sub><b>developergunny</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Adevelopergunny" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://uxdkhan.com/"><img src="https://avatars.githubusercontent.com/u/6104751?v=4?s=40" width="40px;" alt="Khan Mohsin"/><br /><sub><b>Khan Mohsin</b></sub></a><br /><a href="#question-m90khan" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/robinmgoudeketting/"><img src="https://avatars.githubusercontent.com/u/56813989?v=4?s=40" width="40px;" alt="Robin Goudeketting"/><br /><sub><b>Robin Goudeketting</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AGoudekettingRM" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/btoro"><img src="https://avatars.githubusercontent.com/u/15056753?v=4?s=40" width="40px;" alt="Botros Toro"/><br /><sub><b>Botros Toro</b></sub></a><br /><a href="#ideas-btoro" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://thedveloper.com/"><img src="https://avatars.githubusercontent.com/u/10765364?v=4?s=40" width="40px;" alt="Christian Guevara"/><br /><sub><b>Christian Guevara</b></sub></a><br /><a href="#question-christianguevara" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/johanbook"><img src="https://avatars.githubusercontent.com/u/13253042?v=4?s=40" width="40px;" alt="Johan Book"/><br /><sub><b>Johan Book</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajohanbook" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dibellopaolo-portfolio-demo-1.rf.gd/"><img src="https://avatars.githubusercontent.com/u/36816681?v=4?s=40" width="40px;" alt="Paolo Di Bello"/><br /><sub><b>Paolo Di Bello</b></sub></a><br /><a href="#ideas-PaoloDiBello" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/remorses"><img src="https://avatars.githubusercontent.com/u/31321188?v=4?s=40" width="40px;" alt="Tommaso De Rossi"/><br /><sub><b>Tommaso De Rossi</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=remorses" title="Documentation">📖</a> <a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aremorses" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lezan"><img src="https://avatars.githubusercontent.com/u/1663016?v=4?s=40" width="40px;" alt="Lezan"/><br /><sub><b>Lezan</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Alezan" title="Bug reports">🐛</a> <a href="#ideas-lezan" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.facebook.com/perma.ban.731/"><img src="https://avatars.githubusercontent.com/u/22921411?v=4?s=40" width="40px;" alt="Ibrahim H. Sluma"/><br /><sub><b>Ibrahim H. Sluma</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AMrLibya" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.foundry376.com/"><img src="https://avatars.githubusercontent.com/u/1037212?v=4?s=40" width="40px;" alt="Ben Gotow"/><br /><sub><b>Ben Gotow</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Abengotow" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Rubon72"><img src="https://avatars.githubusercontent.com/u/16108629?v=4?s=40" width="40px;" alt="Rubon72"/><br /><sub><b>Rubon72</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ARubon72" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wanderingme"><img src="https://avatars.githubusercontent.com/u/15581?v=4?s=40" width="40px;" alt="wanderingme"/><br /><sub><b>wanderingme</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Awanderingme" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://thomas-strobl.com/"><img src="https://avatars.githubusercontent.com/u/557074?v=4?s=40" width="40px;" alt="Thomas Strobl"/><br /><sub><b>Thomas Strobl</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Atom2strobl" title="Bug reports">🐛</a> <a href="#ideas-tom2strobl" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-tom2strobl" title="Examples">💡</a> <a href="#question-tom2strobl" title="Answering Questions">💬</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Atom2strobl" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Songkeys"><img src="https://avatars.githubusercontent.com/u/22665058?v=4?s=40" width="40px;" alt="Songkeys"/><br /><sub><b>Songkeys</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ASongkeys" title="Bug reports">🐛</a> <a href="#ideas-Songkeys" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-Songkeys" title="Examples">💡</a> <a href="#question-Songkeys" title="Answering Questions">💬</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3ASongkeys" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AntoineS92"><img src="https://avatars.githubusercontent.com/u/58309786?v=4?s=40" width="40px;" alt="AntoineS92"/><br /><sub><b>AntoineS92</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AAntoineS92" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/trebua"><img src="https://avatars.githubusercontent.com/u/31652936?v=4?s=40" width="40px;" alt="Sindre Aubert"/><br /><sub><b>Sindre Aubert</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Atrebua" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://radio.syg.ma/"><img src="https://avatars.githubusercontent.com/u/3596230?v=4?s=40" width="40px;" alt="mx"/><br /><sub><b>mx</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ammxdr" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SanderHeling"><img src="https://avatars.githubusercontent.com/u/1461215?v=4?s=40" width="40px;" alt="Sander Heling"/><br /><sub><b>Sander Heling</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ASanderHeling" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zjhch123"><img src="https://avatars.githubusercontent.com/u/12215513?v=4?s=40" width="40px;" alt="Yida Zhang"/><br /><sub><b>Yida Zhang</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Azjhch123" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=zjhch123" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nirhaas"><img src="https://avatars.githubusercontent.com/u/35661734?v=4?s=40" width="40px;" alt="Nir"/><br /><sub><b>Nir</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Anirhaas" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hhatakeyama"><img src="https://avatars.githubusercontent.com/u/5581539?v=4?s=40" width="40px;" alt="hhatakeyama"/><br /><sub><b>hhatakeyama</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ahhatakeyama" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pacocoursey"><img src="https://avatars.githubusercontent.com/u/34928425?v=4?s=40" width="40px;" alt="Paco"/><br /><sub><b>Paco</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Apacocoursey" title="Bug reports">🐛</a> <a href="#ideas-pacocoursey" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LichLord91"><img src="https://avatars.githubusercontent.com/u/8435580?v=4?s=40" width="40px;" alt="LichLord91"/><br /><sub><b>LichLord91</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ALichLord91" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/just-small-potato"><img src="https://avatars.githubusercontent.com/u/68165945?v=4?s=40" width="40px;" alt="just-small-potato"/><br /><sub><b>just-small-potato</b></sub></a><br /><a href="#ideas-just-small-potato" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/walmsles"><img src="https://avatars.githubusercontent.com/u/2704782?v=4?s=40" width="40px;" alt="walmsles"/><br /><sub><b>walmsles</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Awalmsles" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/amkkr"><img src="https://avatars.githubusercontent.com/u/55781271?v=4?s=40" width="40px;" alt="tenshin"/><br /><sub><b>tenshin</b></sub></a><br /><a href="#question-amkkr" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/steven-tey"><img src="https://avatars.githubusercontent.com/u/28986134?v=4?s=40" width="40px;" alt="Steven Tey"/><br /><sub><b>Steven Tey</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Asteven-tey" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://15gifts.com/"><img src="https://avatars.githubusercontent.com/u/112840?v=4?s=40" width="40px;" alt="Sergey"/><br /><sub><b>Sergey</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aeych" title="Bug reports">🐛</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=eych" title="Code">💻</a> <a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=eych" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://diegoazevedo.com.br/"><img src="https://avatars.githubusercontent.com/u/26748277?v=4?s=40" width="40px;" alt="Diego Azevedo"/><br /><sub><b>Diego Azevedo</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=diegoatwa" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FaizanAhmad1122"><img src="https://avatars.githubusercontent.com/u/56729996?v=4?s=40" width="40px;" alt="Faizan Ahmad"/><br /><sub><b>Faizan Ahmad</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AFaizanAhmad1122" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kizeesmack"><img src="https://avatars.githubusercontent.com/u/1277576?v=4?s=40" width="40px;" alt="Kunal L."/><br /><sub><b>Kunal L.</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Akizeesmack" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thiskevinwang"><img src="https://avatars.githubusercontent.com/u/26389321?v=4?s=40" width="40px;" alt="Kevin Wang"/><br /><sub><b>Kevin Wang</b></sub></a><br /><a href="#ideas-thiskevinwang" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://qwq.cat/"><img src="https://avatars.githubusercontent.com/u/20062482?v=4?s=40" width="40px;" alt="u3u"/><br /><sub><b>u3u</b></sub></a><br /><a href="#ideas-u3u" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Au3u" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://honghong.me/"><img src="https://avatars.githubusercontent.com/u/75498339?v=4?s=40" width="40px;" alt="Hong"/><br /><sub><b>Hong</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=tszhong0411" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tshmieldev"><img src="https://avatars.githubusercontent.com/u/58606210?v=4?s=40" width="40px;" alt="Wojciech Rok"/><br /><sub><b>Wojciech Rok</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=tshmieldev" title="Code">💻</a> <a href="#ideas-tshmieldev" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/brew-matija"><img src="https://avatars.githubusercontent.com/u/101182777?v=4?s=40" width="40px;" alt="Matija"/><br /><sub><b>Matija</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Abrew-matija" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.jiayihu.net/"><img src="https://avatars.githubusercontent.com/u/10067273?v=4?s=40" width="40px;" alt="Jiayi Hu"/><br /><sub><b>Jiayi Hu</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajiayihu" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zeitderforschung"><img src="https://avatars.githubusercontent.com/u/54367033?v=4?s=40" width="40px;" alt="Zeit der Forschung"/><br /><sub><b>Zeit der Forschung</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Azeitderforschung" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/andreibarabas"><img src="https://avatars.githubusercontent.com/u/2101405?v=4?s=40" width="40px;" alt="Andrei Barabas"/><br /><sub><b>Andrei Barabas</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aandreibarabas" title="Bug reports">🐛</a> <a href="#ideas-andreibarabas" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://binibeno.hu/"><img src="https://avatars.githubusercontent.com/u/53515381?v=4?s=40" width="40px;" alt="Németh Benedek"/><br /><sub><b>Németh Benedek</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ABinibeno" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/imalfect"><img src="https://avatars.githubusercontent.com/u/77974917?v=4?s=40" width="40px;" alt="iMalFect"/><br /><sub><b>iMalFect</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aimalfect" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://upleveled.io/"><img src="https://avatars.githubusercontent.com/u/1935696?v=4?s=40" width="40px;" alt="Karl Horky"/><br /><sub><b>Karl Horky</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Akarlhorky" title="Bug reports">🐛</a> <a href="#ideas-karlhorky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Akarlhorky" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wener.me/"><img src="https://avatars.githubusercontent.com/u/1777211?v=4?s=40" width="40px;" alt="陈杨文"/><br /><sub><b>陈杨文</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Awenerme" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/napstar-420"><img src="https://avatars.githubusercontent.com/u/100934169?v=4?s=40" width="40px;" alt="Zohaib Khan"/><br /><sub><b>Zohaib Khan</b></sub></a><br /><a href="https://github.com/rpearce/react-medium-image-zoom/commits?author=napstar-420" title="Code">💻</a> <a href="#example-napstar-420" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rdestefa"><img src="https://avatars.githubusercontent.com/u/67760716?v=4?s=40" width="40px;" alt="Ryan DeStefano"/><br /><sub><b>Ryan DeStefano</b></sub></a><br /><a href="#ideas-rdestefa" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/react-medium-image-zoom/pulls?q=is%3Apr+reviewed-by%3Ardestefa" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
