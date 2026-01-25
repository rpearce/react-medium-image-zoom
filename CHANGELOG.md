# Changelog

## 5.4.0

### Minor Changes

- 8d950e4: Add support for onZoomChange reporting to Uncontrolled components and include additional argument housing the fired event

### Patch Changes

- 855bc02: ensure open modal has pointer-events to fix 3rd party probs

## 5.3.0

### Minor Changes

- b54ea57: Added `isDisabled` prop; provided `isZoomImgLoaded` for `ZoomContent`

## 5.2.14

### Patch Changes

- d59b9f1: fix crossorigin images not loading when copied

## 5.2.13

### Patch Changes

- 330cd40: fix zooming inside a parent dialog that has a close handler

## 5.2.12

### Patch Changes

- 63388a8: support react@19 and credit edlerd

## 5.2.11

### Patch Changes

- b647071: fixes zooming inside a dialog with click outside behavior

## 5.2.10

### Patch Changes

- 44473b3: include 'use client' directive in esm output

## 5.2.9

### Patch Changes

- 868d0e1: fix unzooming getting stuck in Safari

## [5.2.8] - 2024-07-15

### Fixed

- Safari: Zoomable images make the body extend beyond the content (#627)

## [5.2.7] - 2024-07-08

### Fixed

- flickering after unzooming (#631)

## [5.2.6] - 2024-07-08

### Fixed

- img SVGs with no dimensions not scaling (#629)

## [5.2.5] - 2024-06-22

### Fixed

- Zooming effect breaks when images is clicked while scrolling (#439)

## [5.2.4] - 2024-05-16

### Fixed

- SVG arrows with text disappeared on Zoom (#438, continued again)
  - Note: This is a vexing issue due to all the possible things that can go
    wrong with cloning an SVG element that has HTML IDs inside of it. Hopefully,
    this is the last fix for this issue.

## [5.2.3] - 2024-05-14

### Fixed

- SVG arrows with text disappeared on Zoom (#438, continued)

## [5.2.2] - 2024-05-13

### Fixed

- Accidental non-dev dependency on `@storybook/test` when this lib should have
  zero non-dev dependencies (PR: #563)

## [5.2.1] - 2024-05-13

### Fixed

- Zoomable image breaks on Chrome (#470)

## [5.2.0] - 2024-04-05

### Added

- `canSwipeToUnzoom` and `swipeToUnzoomThreshold` props
  (https://github.com/rpearce/react-medium-image-zoom/pull/472, https://github.com/rpearce/react-medium-image-zoom/pull/510)

## [5.1.11] - 2024-03-26

### Fixed

- Improve iOS pinch-to-zoom experience (#436)

## [5.1.10] - 2024-01-13

### Fixed

- When I deploy to Vercel / Next 13 and I change routes to a page I get
  "DOMException: Failed to execute 'showModal' on 'HTMLDialogElement': The
  element is not in a Document." (#429)

## [5.1.9] - 2023-12-14

### Fixed

- SVG arrows with text disappeared on Zoom (#438)

## [5.1.8] - 2023-08-01

### Fixed

- Fixes for the zoom behaviour and overlay height in iOS Safari (#434)

## [5.1.7] - 2023-07-28

### Fixed

- Esc to exit zoom doesn't work on Safari (#430)

## [5.1.6] - 2023-05-10

### Fixed

- Pressing back button in browser after zooming an image breaks body scroll (#421)

## [5.1.5] - 2023-04-23

### Fixed

- Possibly broke zooming divs where role="img" (#412)

## [5.1.4] - 2023-04-17

### Fixed

- Older browser versions querySelector error (#391)
- Cannot read properties of undefined (reading 'left') with Zoom Component and
  React SVG Component in Docusaurus (#406)
- Warning: NaN is an invalid value for the width css style property. (#375)

## [5.1.3] - 2023-02-25

### Fixed

- Image has already been loaded (https://github.com/rpearce/react-medium-image-zoom/pull/389)

## [5.1.2] - 2022-10-25

### Fixed

- Image is hidden when pressing escape during hiding animation (issue #378)

## [5.1.1] - 2022-10-14

### Fixed

- `zoomMargin` portion of "Neither zoomMargin nor scrollableEl seem to be working
  correctly" (issue #350)
- Clicking on zoomed SVGs doesn't unzoom (issue #369)

## [5.1.0] - 2022-10-11

### Added

- Ability to customize the zoom modal content via `<ZoomContent>` (issue #332)
- Re-added `wrapElement` prop to API; only supports `'div' | 'span'` (issue #356)
- Added a11y support for `prefers-reduced-motion: reduce` (issue #359)
- Added `classDialog` string prop to account for the loss of granular styling
  control over different modals resulting from moving the `<dialog>` rendering
  to a portal

### Changed

- Now rendering `<dialog>` in a portal because of #356
  - For the folx using `.my-class [data-rmiz-modal] {}` to change the `<dialog>`
    styles, please use the `classDialog` prop to pass `my-class` to the
    `<dialog>`. I wish I didn't have to do this, but this is something that
    needs fixing, and I can't justify a new major version just because of this
    new style requirement. The `classDialog` addition (mentioned above) should
    solve this nicely.

### Fixed

- Now using the `wheel` event instead of `scroll` to detect trying to leave the
  modal (issue #350)
- Fixed mobile scrolling experience (related to issue #350)

### Removed

- Removed the broken `scrollableEl` that has arguably not ever worked (issue #350)

## [5.0.3] - 2022-09-19

### Fixed

- Missing class properties transform (#337) (potential issue versions of node
  older than LTS)

## [5.0.2] - 2022-08-22

### Fixed

- Not working with gatsby image plugin (StaticImage) (#347)

## [5.0.1] - 2022-08-04

### Fixed

- React hydration issue (#338)

## [5.0.0] - 2022-08-03

Closes #164, #166, #213, #227, #259, #265, #281, #282

### Added

- Added `IconUnzoom` and `IconZoom` in order to customize the zoom & unzoom buttons
- Added `zoomImg` to provide attributes for an image that should be loaded on zoom
- Added better zooming support for all of the following:
  - `<img />`, including all [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
    values, any [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position),
    and [`loading="lazy"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
  - `<div>` and `<span>` with any [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image),
    [`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size),
    and [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)
  - `<picture>` with `<source />` and `<img />`
  - `<figure>` with `<img />`

### Changed

- Sets `"type": "module"` in `package.json` for ESModule usage
- Renamed `closeText` to `a11yNameButtonUnzoom`
- Renamed `openText` to `a11yNameButtonZoom`
- Images must meet these `querySelector` criteria to be found:
  ```js
  ':is(img, svg, [role="img"], [data-zoom]):not([aria-hidden="true"])'
  ```

### Removed

- Removed `focus-options-polyfill` dependency
- Removed `tslib` dependency
- Removed `overlayBgColorStart` (now specified via CSS: `[data-rmiz-modal-overlay="hidden"]`)
- Removed `overlayBgColorEnd` (now specified via CSS: `[data-rmiz-modal-overlay="visible"]`)
- Removed `portalEl`
- Removed `transitionDuration` (now specified via CSS: `[data-rmiz-modal-overlay]` and `[data-rmiz-modal-img]`)
- Removed `wrapElement`
- Removed `wrapStyle`
- Removed `zoomZIndex`

## [4.4.3] - 2022-05-23

### Fixed

- Reverts setting `"type": "module"` in `package.json` (issue: #322)

## [4.4.2] - 2022-05-22

### Fixed

- Fixes some docs badges

## [4.4.1] - 2022-05-22

### Changed

- Switched project name back to `react-medium-image-zoom` and fixed links
- I'm not even sure it was working, but turned off `sourceMaps: true` in the
  tsconfig
- Moved `AUTHORS` file into `contributors` key in `package.json`
- Added `funding` info to `package.json`

## [4.4.0] - 2022-05-13

### Changed

- Bumped minor version of `tslib` and made sure to actually use it (#306)
- Adds an `aria-label` to the modal to satisfy `axe-core`; note that this is
  still not an accessible component. It will be eventually! (#306)

### Removed

- Removed dependency on `react-use` (#306)

## [4.3.7] - 2022-04-09

### Fixed

- Fix Incompatible types with types/react v18 (#302)

## [4.3.6] - 2022-04-04

### Fixed

- Allow React 18 (#300)

## [4.3.5] - 2021-08-25

### Fixed

- Fix not exporting component props (#287)

## [4.3.4] - 2021-06-15

### Fixed

- Fix `latest` tag not being v4.x :smh:

## [4.3.3] - 2021-03-27

### Fixed

- fixed old links to `/react-medium-image-zoom/` to `/image-zoom/`

## [4.3.2] - 2021-03-27

### Changed

- `react` and `react-dom` `peerDependencies` moved from `>= 16.8.0` to `^16.8.0
|| ^17.0.0`
- upgraded `react-use`

### Fixed

- set all dependencies to use compatibility `^` selectors

## [4.3.1] - 2020-05-26

### Fixed

- `tslib` was listed as dev dependency when it's actually a dependency

## [4.3.0] - 2020-03-11

### Added

- support for passing a `wrapElement` (defaults to `div`)

### Fixed

- adding `wrapElement` support resolves `div` vs `span` issue #236 (thanks to
  @sunknudsen)

## [4.2.0] - 2020-03-07

### Added

- support for typescript (https://github.com/rpearce/react-medium-image-zoom/issues/219 and https://github.com/rpearce/react-medium-image-zoom/issues/220; thanks to @dougg0k and @sunknudsen)

## [4.1.0] - 2020-03-05

### Added

- now providing both unminified and minified UMD builds

### Fixed

- _massively_ reduced build size (#226)
  - [before: `390.7kB` Minified; `118.5kB Minified` + Gzipped](https://bundlephobia.com/result?p=react-medium-image-zoom@4.0.4)
  - [after `18kB` Minified; `5.6kB` Minified + Gzipped](https://bundlephobia.com/result?p=react-medium-image-zoom@4.1.0-alpha.2)
- server-side-rendering (#229)
- webkit 100% width image issue (#222)

### Changed

- CSS styles are now applied using `data-rmiz-<something>` selectors, allowing
  the styles to be imported and overridden
- babel
  - remove `@babel/cli` because it's not being used
  - don't use `@babel/polyfill` for anything; replaced with `@babel/plugin-transform-runtime`

### Removed

- removed `browser` field from package.json b/c bundler confusion
- not including sourcemaps anymore unless that's a specific desire from users

## [4.0.4] - 2020-02-17

- lock down dependencies to specific versions
- upgrade some dev dependencies
- upgrade `react-use`

## [4.0.3] - 2020-02-05

### Changed

- Replace temporary focus-options-polyfill with package now that it's fixed

## [4.0.2] - 2020-02-02

### Changed

- Added CJS & UMD minified builds

## [4.0.1] - 2020-01-22

### Fixed

- resolved prod issue where CSS wasn't included in `sideEffects`

## [4.0.0] - 2020-01-19

Complete rewrite with breaking changes so we can move forward with the project.

Please see the [README.md](./README.md) for the new API and migrating from v3 to
v4.

## [3.1.2] - 2019-10-01

### Fixed

- resolved a few security issues

## [3.1.1] - 2019-06-24

### Fixed

- Support Preact by using `React.Fragment` (PR #152)

## [3.1.0] - 2019-06-19

### Added

- Support for `React.StrictMode` (PR #151)

## [3.0.16] - 2019-04-22

### Fixed

- Fixes JS error when `_allowTabNavigation` is called before image ref (PR #150)

## [3.0.15] - 2018-10-25

### Fixed

- Resolved issue #139 where `zoomMargin` wouldn't accept a number in string
  format

## [3.0.14] - 2018-09-17

### Fixed

- Resolved issue #137 where broken images would continue allowing the component
  to function
- Now ensures an `image` prop's `onLoad` callback is adequately sent to the
  consumer

## [3.0.13] - 2018-07-30

### Fixed

- Resolved issue where we were calculating `imageCenterX` with
  `window.innerWidth` instead of `document.body.clientWidth`
  (PR: https://github.com/rpearce/react-medium-image-zoom/pull/133)

## [3.0.12] - 2018-06-05

### Changed

- Changed shield in README

## [3.0.11] - 2018-05-09

### Fixed

- Resolved [issue #128](https://github.com/rpearce/react-medium-image-zoom/issues/128) where initializing with isZoomed={true} was throwing errors.

## [3.0.10] - 2018-01-19

### Changed

- removed the Firefox check and apply the flicker "fix" to all browsers equally

## [3.0.9] - 2018-01-16

### Fixed

- Resolved Firefox issue where switching an image's `src` attribute causes an obnoxious "flicker" effect (https://github.com/rpearce/react-medium-image-zoom/issues/96)

## [3.0.8] - 2018-01-09

### Changed

- `AUTHORS` file

## [3.0.7] - 2018-01-09

### Added

- `AUTHORS` file (https://github.com/rpearce/react-medium-image-zoom/issues/107)

## [3.0.6] - 2018-01-08

### Fixed

- Fixed issue where quickly, repeatedly triggering the zoom and unzoom actions had some lingering timeout actions that no longer existing on a component, throwing errors in the console (https://github.com/rpearce/react-medium-image-zoom/issues/106)

## [3.0.5] - 2017-12-05

### Fixed

- Fixed issue where hitting the tab key on a zoomed imaged would allow
  an element in behind the image to receive focus. Further actions
  could then be taken on the focused element, causing the DOM to end
  up in undesired states.

## [2.0.7] - 2017-12-05

### Fixed

- Fixed issue where hitting the tab key on a zoomed imaged would allow
  an element in behind the image to receive focus. Further actions
  could then be taken on the focused element, causing the DOM to end
  up in undesired states.

## [3.0.4] - 2017-12-02

### Fixed

- Fixed readme rebase issue

## [3.0.3] - 2017-12-02

### Fixed

- Fixed issue from #89 where `hasAlreadyLoaded` was preventing the `zoomImage` source from displaying when `shouldReplaceImage` was set to `false`.

## [3.0.2] - 2017-11-06

### Fixed

- Includes the keyboard navigation and clicking updates from 2.0.5 and 2.0.6 for React >16

## [2.0.6] - 2017-11-02

### Fixed

- Fixed issue where clicking to open & close a zoomable image resulted in the focusing of that element which could cause the page to scroll it completely into view and leave an outline on the image (aka focus) when it was not accessed via the keyboard.

## [2.0.5] - 2017-11-01

### Fixed

- Fixed issue where updating other image attributes after mounting was not respected; the image was cached in `this.state` when only the `src` should have been.

## [3.0.1] - 2017-10-20

### Fixed

- Now supporting keyboard interaction for accessibility (https://github.com/rpearce/react-medium-image-zoom/issues/70). Classified this as a bug and therefore a patch version.

## [2.0.4] - 2017-10-16

### Fixed

- Now supporting keyboard interaction for accessibility (https://github.com/rpearce/react-medium-image-zoom/issues/70). Classified this as a bug and therefore a patch version.

## [3.0.0] - 2017-10-13

### Added

- support for React v16, making use of such things as its portals concept

### Removed

- support for React less than v16

## [2.0.3] - 2017-09-22

### Fixed

- `shouldRespectMaxDimension` was allowing images that were already rendered at their maximum size to be "zoomed," thus creating the issue where they don't _actually_ zoom and instead just moved to the center of the screen.

## [2.0.2] - 2017-09-21

### Fixed

- Fixed undefined method call (underscore was missing...c'mon eslint)
- Fixed original image not staying hidden until unzoom is complete

## [2.0.1] - 2017-09-21

### Added

- Dev: eslint & prettier for code formatting and double-dhecking

## [2.0.0] - 2017-09-21

### Added

- Changelog (so meta...)
- When in controlled mode (`isZoomed` is provided), the `onUnzoom` callback will fire when the component normally would have closed

### Changed

- Differentiation between controlled & uncontrolled modes (when `isZoomed` is passed vs letting component control itself)

### Removed

- Removed preload functionality

### Fixed

- Support for the component immediately zooming if `isZoomed={true}` is provided on mount
