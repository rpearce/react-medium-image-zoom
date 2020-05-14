import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
//import useEvent from 'react-use/lib/useEvent'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { color, number, text, withKnobs } from '@storybook/addon-knobs'
//import glenorchyLagoon from './static/glenorchy-lagoon.jpg'
//import hobbiton from './static/andres-iga-7XKkJVw1d8c-unsplash-smaller.jpg'
//import hookerValleyTrack from './static/roell-de-ram-2DM7eOR5iyc-unsplash-smaller.jpg'
//import kea from './static/pablo-heimplatz-PSF2RhUBORs-unsplash-smaller.jpg'
//import nvidiaCard from './static/nvidia-card.jpg'
//import nzBeach from './static/rod-long-4dcsLxQxSHY-unsplash-smaller.jpg'
//import portWaikato from './static/petr-vysohlid-9fqwGqGLUxc-unsplash-smaller.jpg'
//import queenstown from './static/omer-faruk-bekdemir-5BuxuWIJF1Q-unsplash-smaller.jpg'
//import teAraiPoint from './static/douglas-bagg-wRwa3Z6GtRI-unsplash-smaller.jpg'
//import tekapo from './static/tobias-keller-73F4pKoUkM0-unsplash-smaller.jpg'
import thatWanakaTreeSm from '../../static/laura-smetsers-H-TW2CoNtTk-unsplash-smallest.jpg'
import thatWanakaTree from '../../static/laura-smetsers-H-TW2CoNtTk-unsplash-smaller.jpg'
import thatWanakaTreeLg from '../../static/laura-smetsers-H-TW2CoNtTk-unsplash.jpg'
import '../../.storybook/base.css'
//import '@rpearce/image-zoom/dist/styles.css'
//import Zoom, { Controlled as ControlledZoom, useImageZoom } from './dist/esm'
import { useImageZoom } from './source'

//const imgGlenorchyLagoon = {
//  alt: 'Glenorchy lagoon, New Zealand by Robert Pearce',
//  src: glenorchyLagoon,
//}
//const imgHobbiton = {
//  alt: 'Hobbiton, Matamata, New Zealand by Andres Iga',
//  src: hobbiton,
//}
//const imgHookerValleyTrack = {
//  alt: 'Hooker Valley Track , New Zealand by Roll de Ram',
//  src: hookerValleyTrack,
//}
//const imgKea = {
//  alt: `Kea (alpine parrot) in Arthur's Pass, New Zealand by Pablo Heimplatz`,
//  src: kea,
//}
//const imgNvidiaCard = {
//  alt: 'NVIDIA Graphics Card',
//  src: nvidiaCard,
//}
//const imgNzBeach = {
//  alt: 'New Zealand Beach by Rod Long',
//  src: nzBeach,
//}
//const imgQueenstown = {
//  alt: 'Queenstown, New Zealand by Omer Faruk',
//  src: queenstown,
//}
//const imgTeAraiPoint = {
//  alt: 'Te Arai Point, New Zealand by Douglas Bagg',
//  src: teAraiPoint,
//}
//const imgTekapo = {
//  alt: 'Lake Tekapo, New Zealand by Tobias Keller',
//  src: tekapo,
//}
const imgThatWanakaTree = {
  alt: 'That Wanaka Tree, New Zealand by Laura Smetsers',
  sizes:
    '(max-width: 600px) 500px, (min-width: 601px) 1600px, (min-width: 2000px) 2507px',
  src: thatWanakaTreeSm,
  srcSet: `${thatWanakaTreeSm} 500w, ${thatWanakaTree} 1600w, ${thatWanakaTreeLg} 2507w`,
}
//const imgPortWaikato = {
//  alt: 'Port Waikato, Tuakau, Auckland, New Zealand by Petr Vysohlid',
//  src: portWaikato,
//}

const stories = storiesOf('react-medium-image-zoom', module)

stories.addDecorator(withA11y)
stories.addDecorator(withKnobs)

stories.add('useImageZoom default values', () => {
  const { ref } = useImageZoom()

  return (
    <div>
      <header className="l-constrained">
        <h1>Zoom an image</h1>
      </header>
      <section>
        <div className="l-constrained">
          <p>
            This example showcases an uncontrolled image zoom component that
            uses the <code>useImageZoom</code> react hook. There are some things
            to know about this example:
          </p>
          <ul>
            <li>it is screen reader accessible</li>
            <li>it is keyboard accessible</li>
            <li>
              it uses the <code>srcset</code> and <code>sizes</code> image
              attributes
            </li>
            <li>
              at 600px window width, the image switches to the 500px-wide image,
              and since that is the maximum size that image can be, the zooming
              is disabled
            </li>
            <li>
              at 400px window width, the image switches to full-width, and it is
              also disabled, since it already takes up the full width of the
              screen
            </li>
          </ul>
        </div>
        <div className="l-constrained-fw-sm">
          <img
            alt={imgThatWanakaTree.alt}
            ref={ref}
            src={imgThatWanakaTree.src}
            srcSet={imgThatWanakaTree.srcSet}
            sizes={imgThatWanakaTree.sizes}
            style={{ height: '100%', maxWidth: '100%' }}
            width="500"
          />
        </div>
        <div className="l-constrained">
          <p style={{ marginBottom: '800px' }}>
            The whitespace below exists to aid you in testing the close on
            scroll functionality (click on the image and then scroll).
          </p>
          <p>This is the bottom...</p>
        </div>
      </section>
    </div>
  )
})
