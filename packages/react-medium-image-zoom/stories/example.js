import React, { useRef } from 'react'
import { useImageZoom } from '../source'
import * as notes from './example.md'
import glenorchyLagoon800w from './static/robert-pearce-UwHN0jU_YqQ-unsplash-800w.jpg'
import glenorchyLagoon1600w from './static/robert-pearce-UwHN0jU_YqQ-unsplash-1600w.jpg'
import glenorchyLagoon2500w from './static/robert-pearce-UwHN0jU_YqQ-unsplash-2500w.jpg'
import glenorchyLagoon4928w from './static/robert-pearce-UwHN0jU_YqQ-unsplash-4928w.jpg'

export const Example = () => {
  const ref = useRef()
  const { update } = useImageZoom(ref)

  return (
    <figure>
      <img
        alt="A woman sitting on a bench amongst trees at the end of a boardwalk leading to a pond with mountains in the background"
        ref={ref}
        src={glenorchyLagoon800w}
        srcSet={`${glenorchyLagoon800w} 800w,
                ${glenorchyLagoon1600w} 1600w,
                ${glenorchyLagoon2500w} 2500w,
                ${glenorchyLagoon4928w} 4928w`}
        sizes="(max-width: 600px) 800px,
               (min-width: 601px) 1600px,
               (min-width: 2000px) 2500px,
               (min-width: 2501px) 4928px"
        style={{ maxWidth: '100%' }}
        width="700"
      />
      <figcaption>
        Lagoon in Glenorchy, New Zealand by Robert Pearce
        <a href="https://unsplash.com/photos/UwHN0jU_YqQ">
          Lagoon in Glenorchy Source
        </a>
      </figcaption>
    </figure>
  )
}

export default {
  title: 'Example',
  parameters: { notes },
}
