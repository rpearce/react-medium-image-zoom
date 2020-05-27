# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [4.3.1] - 2020-05-26

### Fixed
* `tslib` was listed as dev dependency when it's actually a dependency

## [4.3.0] - 2020-03-11

### Added
* support for passing a `wrapElement` (defaults to `div`)

### Fixed
* adding `wrapElement` support resolves `div` vs `span` issue #236 (thanks to
  @sunknudsen)

## [4.2.0] - 2020-03-07

### Added
* support for typescript (https://github.com/rpearce/react-medium-image-zoom/issues/219 and https://github.com/rpearce/react-medium-image-zoom/issues/220; thanks to @dougg0k and @sunknudsen)

## [4.1.0] - 2020-03-05

### Added
* now providing both unminified and minified UMD builds

### Fixed
* _massively_ reduced build size (#226)
  * [before: `390.7kB` Minified; `118.5kB Minified` + Gzipped](https://bundlephobia.com/result?p=react-medium-image-zoom@4.0.4)
  * [after `18kB` Minified; `5.6kB` Minified + Gzipped](https://bundlephobia.com/result?p=react-medium-image-zoom@4.1.0-alpha.2)
* server-side-rendering (#229)
* webkit 100% width image issue (#222)

### Changed
* CSS styles are now applied using `data-rmiz-<something>` selectors, allowing
  the styles to be imported and overridden
* babel
  * remove `@babel/cli` because it's not being used
  * don't use `@babel/polyfill` for anything; replaced with `@babel/plugin-transform-runtime`

### Removed
* removed `browser` field from package.json b/c bundler confusion
* not including sourcemaps anymore unless that's a specific desire from users

## [4.0.4] - 2020-02-17

* lock down dependencies to specific versions
* upgrade some dev dependencies
* upgrade `react-use`

## [4.0.3] - 2020-02-05

### Changed
* Replace temporary focus-options-polyfill with package now that it's fixed

## [4.0.2] - 2020-02-02

### Changed
* Added CJS & UMD minified builds

## [4.0.1] - 2020-01-22

### Fixed
* resolved prod issue where CSS wasn't included in `sideEffects`

## [4.0.0] - 2020-01-19

Complete rewrite with breaking changes so we can move forward with the project.

Please see the [README.md](./README.md) for the new API and migrating from v3 to
v4.

## [3.1.2] - 2019-10-01

### Fixed
* resolved a few security issues

## [3.1.1] - 2019-06-24

### Fixed
* Support Preact by using `React.Fragment` (PR #152)

## [3.1.0] - 2019-06-19

### Added
* Support for `React.StrictMode` (PR #151)

## [3.0.16] - 2019-04-22

### Fixed
* Fixes JS error when `_allowTabNavigation` is called before image ref (PR #150)

## [3.0.15] - 2018-10-25

### Fixed
* Resolved issue #139 where `zoomMargin` wouldn't accept a number in string
  format

## [3.0.14] - 2018-09-17

### Fixed
* Resolved issue #137 where broken images would continue allowing the component
  to function
* Now ensures an `image` prop's `onLoad` callback is adequately sent to the
  consumer

## [3.0.13] - 2018-07-30

### Fixed
* Resolved issue where we were calculating `imageCenterX` with
  `window.innerWidth` instead of `document.body.clientWidth`
  (PR: https://github.com/rpearce/react-medium-image-zoom/pull/133)

## [3.0.12] - 2018-06-05

### Changed
* Changed shield in README

## [3.0.11] - 2018-05-09

### Fixed
* Resolved [issue #128](https://github.com/rpearce/react-medium-image-zoom/issues/128) where initializing with isZoomed={true} was throwing errors.

## [3.0.10] - 2018-01-19

### Changed
* removed the Firefox check and apply the flicker "fix" to all browsers equally

## [3.0.9] - 2018-01-16

### Fixed
* Resolved Firefox issue where switching an image's `src` attribute causes an obnoxious "flicker" effect (https://github.com/rpearce/react-medium-image-zoom/issues/96)

## [3.0.8] - 2018-01-09

### Changed
* `AUTHORS` file

## [3.0.7] - 2018-01-09

### Added
* `AUTHORS` file (https://github.com/rpearce/react-medium-image-zoom/issues/107)

## [3.0.6] - 2018-01-08

### Fixed
* Fixed issue where quickly, repeatedly triggering the zoom and unzoom actions had some lingering timeout actions that no longer existing on a component, throwing errors in the console (https://github.com/rpearce/react-medium-image-zoom/issues/106)

## [3.0.5] - 2017-12-05

### Fixed
* Fixed issue where hitting the tab key on a zoomed imaged would allow
an element in behind the image to receive focus. Further actions
could then be taken on the focused element, causing the DOM to end
up in undesired states.

## [2.0.7] - 2017-12-05

### Fixed
* Fixed issue where hitting the tab key on a zoomed imaged would allow
an element in behind the image to receive focus. Further actions
could then be taken on the focused element, causing the DOM to end
up in undesired states.

## [3.0.4] - 2017-12-02

### Fixed
* Fixed readme rebase issue

## [3.0.3] - 2017-12-02

### Fixed
* Fixed issue from #89 where `hasAlreadyLoaded` was preventing the `zoomImage` source from displaying when `shouldReplaceImage` was set to `false`.

## [3.0.2] - 2017-11-06

### Fixed
* Includes the keyboard navigation and clicking updates from 2.0.5 and 2.0.6 for React >16

## [2.0.6] - 2017-11-02

### Fixed
* Fixed issue where clicking to open & close a zoomable image resulted in the focusing of that element which could cause the page to scroll it completely into view and leave an outline on the image (aka focus) when it was not accessed via the keyboard.

## [2.0.5] - 2017-11-01

### Fixed
* Fixed issue where updating other image attributes after mounting was not respected; the image was cached in `this.state` when only the `src` should have been.

## [3.0.1] - 2017-10-20

### Fixed
* Now supporting keyboard interaction for accessibility (https://github.com/rpearce/react-medium-image-zoom/issues/70). Classified this as a bug and therefore a patch version.

## [2.0.4] - 2017-10-16

### Fixed
* Now supporting keyboard interaction for accessibility (https://github.com/rpearce/react-medium-image-zoom/issues/70). Classified this as a bug and therefore a patch version.

## [3.0.0] - 2017-10-13

### Added
* support for React v16, making use of such things as its portals concept

### Removed
* support for React < v16

## [2.0.3] - 2017-09-22

### Fixed
* `shouldRespectMaxDimension` was allowing images that were already rendered at their maximum size to be "zoomed," thus creating the issue where they don't _actually_ zoom and instead just moved to the center of the screen.

## [2.0.2] - 2017-09-21

### Fixed
* Fixed undefined method call (underscore was missing...c'mon eslint)
* Fixed original image not staying hidden until unzoom is complete

## [2.0.1] - 2017-09-21

### Added
* Dev: eslint & prettier for code formatting and double-dhecking

## [2.0.0] - 2017-09-21

### Added
* Changelog (so meta...)
* When in controlled mode (`isZoomed` is provided), the `onUnzoom` callback will fire when the component normally would have closed

### Changed
* Differentiation between controlled & uncontrolled modes (when `isZoomed` is passed vs letting component control itself)

### Removed
* Removed preload functionality

### Fixed
* Support for the component immediately zooming if `isZoomed={true}` is provided on mount
