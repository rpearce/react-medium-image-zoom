import React from 'react'

import { storiesOf } from '@storybook/react'

import Controlled from './Controlled'
import DefaultStyles from './DefaultStyles'
import DisableOnError from './DisableOnError'
import ShouldHandleZoom from './ShouldHandleZoom'
import ShouldReplaceImage from './ShouldReplaceImage'
import ShouldRespectMaxDimension from './ShouldRespectMaxDimension'
import ShouldRespectTabIndex from './ShouldRespectTabIndex'
import Uncontrolled from './Uncontrolled'
import Welcome from './Welcome'
import ZoomImage from './ZoomImage'
import ZoomOnLoad from './ZoomOnLoad'

storiesOf('react-medium-image-zoom', module)
  .add('README', () => <Welcome />)
  .add('Uncontrolled (isZoomed absent)', () => <Uncontrolled />)
  .add('Controlled (isZoomed present)', () => <Controlled />)
  .add('Providing defaultStyles', () => <DefaultStyles />)
  .add('Conditionally allow/disallow zoom capability', () =>
    <ShouldHandleZoom />
  )
  .add('Provide a zoomImage', () => <ZoomImage />)
  .add('Prevent replacing original image with zoomImage', () =>
    <ShouldReplaceImage />
  )
  .add("Respect image's maximum dimensions", () =>
    <ShouldRespectMaxDimension />
  )
  .add("Respect image's tab index", () => <ShouldRespectTabIndex />)
  .add('Zoom on load', () => <ZoomOnLoad />)
  .add('Deactivate on load error', () => <DisableOnError />)
