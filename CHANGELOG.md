# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2017-09-21
### Added
- Changelog (so meta...)
- When in controlled mode (`isZoomed` is provided), the `onUnzoom` callback will fire when the component normally would have closed

### Changed
- Differentiation between controlled & uncontrolled modes (when `isZoomed` is passed vs letting component control itself)

### Deprecated
- n/a

### Removed
- Removed preload functionality

### Fixed
- Support for the component immediately zooming if `isZoomed={true}` is provided on mount
