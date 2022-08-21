import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { waitFor, within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import {
  imgGlenorchyLagoon,
  imgHookerValleyTrack,
  imgKeaLarge,
  imgKeaSmall,
  imgNzMap,
  imgTeAraiPoint,
  imgThatWanakaTree,
} from './images'

export default {
  title: '<img>',
  component: Zoom,
  parameters: {},
} as ComponentMeta<typeof Zoom>

export const Regular: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>Zooming a regular image</h1>
    <div className="mw-600">
      <Zoom {...props}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

export const SmallPortrait: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>A portrait image with a small width specified</h1>
    <div className="mw-600">
      <p>Small size specifications scale well, too — even on mobile.</p>
      <Zoom {...props}>
        <img
          alt={imgTeAraiPoint.alt}
          src={imgTeAraiPoint.src}
          height="112"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

export const SVGSource: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>An image with an SVG src</h1>
    <div className="mw-600">
      <Zoom {...props}>
        <img
          alt={imgNzMap.alt}
          src={imgNzMap.src}
          width="150"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

export const DataSVGSource: ComponentStory<typeof Zoom> = () => (
  <main aria-label="Story">
    <h1>An image with a <code>data:image/svg+xml</code> <code>src</code></h1>
    <div className="data-uri-img mw-600">
      <Zoom>
        <img
          alt="Gatsby G Logo"
          src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
        />
      </Zoom>
    </div>
  </main>
)

export const ProvideZoomImg: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>An image with a larger <code>zoomImg</code></h1>
    <div className="mw-600">
      <p>
        When zoomed, the original image will scale to as large as the window will
        allow, and then it will be replaced by an image that is downloaded in the
        background.
      </p>
      <Zoom
        {...props}
        zoomImg={{
          alt: imgKeaLarge.alt,
          src: imgKeaLarge.src,
        }}
      >
        <img
          alt={imgKeaSmall.alt}
          src={imgKeaSmall.src}
          width="150"
        />
      </Zoom>
    </div>
  </main>
)

export const SmallSrcSize: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>An image with a small size</h1>
    <div className="mw-600">
      <p>
        In order to prevent blurry images, An image won&apos;t scale up larger
        than its natural dimensions.
      </p>
      <Zoom {...props}>
        <img
          alt={imgKeaSmall.alt}
          src={imgKeaSmall.src}
          width="150"
        />
      </Zoom>
    </div>
  </main>
)

export const CustomModalStyles: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>Custom Modal Styles</h1>
    <div className="mw-600">
      <p>Use CSS to customize the zoom modal styles.</p>
      <p>Here, we slow down the transition time and use a different overlay color.</p>
      <div className="custom-zoom">
        <Zoom {...props}>
          <img
            alt={imgGlenorchyLagoon.alt}
            src={imgGlenorchyLagoon.src}
            width="400"
          />
        </Zoom>
      </div>
      <p>The CSS to do this:</p>
      <pre>
        <code>{`
.custom-zoom [data-rmiz-modal-overlay],
.custom-zoom [data-rmiz-modal-img] {
  transition-duration: 0.8s;
  transition-timing-function: linear;
}
.custom-zoom [data-rmiz-modal-overlay="hidden"] {
  background-color: rgb(56, 58, 89, 0);
}
.custom-zoom [data-rmiz-modal-overlay="visible"] {
  background-color: rgb(56, 58, 89, 1);
}
.custom-zoom [data-rmiz-btn-unzoom] {
  background-color: #bd93f9;
  color: #000;
}
.custom-zoom [data-rmiz-btn-unzoom]:focus-visible {
  outline-offset: 0.4rem;
  outline: 0.2rem solid #bd93f9;
}
`}
        </code>
      </pre>
    </div>
  </main>
)

export const CustomButtonIcons: ComponentStory<typeof Zoom> = (props) => (
  <main aria-label="Story">
    <h1>An image with custom zoom &amp; unzoom icons</h1>
    <div className="mw-600">
      <p>Press TAB to activate the zoom button</p>
      <div className="change-icons">
        <Zoom {...props} IconZoom={() => <>+</>} IconUnzoom={() => <>-</>}>
          <img
            alt={imgHookerValleyTrack.alt}
            src={imgHookerValleyTrack.src}
            width="400"
          />
        </Zoom>
      </div>
    </div>
  </main>
)

// =============================================================================
// INTERACTIONS

export const WithRegularZoomed = Regular.bind({})
WithRegularZoomed.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(async () => {
    await expect(canvas.getByLabelText(`Expand image: ${imgThatWanakaTree.alt}`)).toBeVisible()
  })

  // TAB to expand button and press ENTER
  await userEvent.tab()
  await userEvent.keyboard('{Enter}', { delay: 1000 })

  await waitFor(async () => {
    await expect(canvas.getByRole('dialog')).toHaveAttribute('open')
    await expect(canvas.getByRole('dialog').querySelector(`img[alt="${imgThatWanakaTree.alt}"]`)).toBeVisible()
    await expect(canvas.getByLabelText('Minimize image')).toHaveFocus()
  })
}
