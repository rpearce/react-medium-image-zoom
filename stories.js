/* eslint react/prop-types: 0 */

import React, { useCallback, useState } from 'react'
import useEvent from 'react-use/lib/useEvent'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { color, number, text, withKnobs } from '@storybook/addon-knobs'
import './.storybook/base.css'
import hobbiton from './static/andres-iga-7XKkJVw1d8c-unsplash-smaller.jpg'
import nzBeach from './static/rod-long-4dcsLxQxSHY-unsplash-smaller.jpg'
import teAraiPoint from './static/douglas-bagg-wRwa3Z6GtRI-unsplash-smaller.jpg'
import thatWanakaTree from './static/laura-smetsers-H-TW2CoNtTk-unsplash-smaller.jpg'

import './dist/styles.css'
import Zoom, { Controlled as ControlledZoom } from './dist/cjs'

const imgThatWanakaTree = {
  alt: 'That Wanaka Tree, New Zealand',
  src: thatWanakaTree
}
const imgNzBeach = {
  alt: 'New Zealand Beach',
  src: nzBeach
}
const imgHobbiton = {
  alt: 'Hobbiton, Matamata, New Zealand',
  src: hobbiton
}
const imgTeAraiPoint = {
  alt: 'Te Arai Point, New Zealand',
  src: teAraiPoint
}

const stories = storiesOf('react-medium-image-zoom', module)

stories.addDecorator(withA11y)
stories.addDecorator(withKnobs)

stories.add('with <img />', () => (
  <ImgStory title="Zoom an `img`">
    <Zoom
      closeText={text('Unzoom label', 'Unzoom image')}
      openText={text('Zoom label', 'Zoom image')}
      overlayBgColorEnd={color(
        'Overlay bgColor end',
        'rgba(255, 255, 255, 0.95)'
      )}
      overlayBgColorStart={color(
        'Overlay bgColor start',
        'rgba(255, 255, 255, 0)'
      )}
      transitionDuration={number('Transition duration', 300, {
        min: 0,
        max: 5000,
        range: true,
        step: 100
      })}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
    >
      <img
        alt={imgThatWanakaTree.alt}
        src={imgThatWanakaTree.src}
        style={{ height: '100%', maxWidth: '100%' }}
        width="500"
      />
    </Zoom>
  </ImgStory>
))

stories.add('with <picture />', () => (
  <ImgStory title="Zoom a `picture` element with `img` and `source`">
    <Zoom
      closeText={text('Unzoom label', 'Unzoom image')}
      openText={text('Zoom label', 'Zoom image')}
      overlayBgColorEnd={color(
        'Overlay bgColor end',
        'rgba(255, 255, 255, 0.95)'
      )}
      overlayBgColorStart={color(
        'Overlay bgColor start',
        'rgba(255, 255, 255, 0)'
      )}
      transitionDuration={number('Transition duration', 300, {
        min: 0,
        max: 5000,
        range: true,
        step: 100
      })}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
    >
      <picture>
        <source media="(max-width: 800px)" srcSet={imgTeAraiPoint.src} />
        <img
          alt={imgNzBeach.alt}
          src={imgNzBeach.src}
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      </picture>
    </Zoom>
  </ImgStory>
))

stories.add('with <figure />', () => (
  <ImgStory title="Zoom a `figure` element">
    <figure>
      <Zoom
        closeText={text('Unzoom label', 'Unzoom image')}
        openText={text('Zoom label', 'Zoom image')}
        overlayBgColorEnd={color(
          'Overlay bgColor end',
          'rgba(255, 255, 255, 0.95)'
        )}
        overlayBgColorStart={color(
          'Overlay bgColor start',
          'rgba(255, 255, 255, 0)'
        )}
        transitionDuration={number('Transition duration', 300, {
          min: 0,
          max: 5000,
          range: true,
          step: 100
        })}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
      >
        <img
          alt={imgHobbiton.alt}
          src={imgHobbiton.src}
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      </Zoom>
      <figcaption>Hobbiton</figcaption>
    </figure>
  </ImgStory>
))

stories.add('with blue circle', () => (
  <ImgStory title="Zoom a blue circle `div`, if you want">
    <Zoom
      closeText={text('Unzoom label', 'Unzoom image')}
      openText={text('Zoom label', 'Zoom image')}
      overlayBgColorEnd={color(
        'Overlay bgColor end',
        'rgba(255, 255, 255, 0.95)'
      )}
      overlayBgColorStart={color(
        'Overlay bgColor start',
        'rgba(255, 255, 255, 0)'
      )}
      transitionDuration={number('Transition duration', 300, {
        min: 0,
        max: 5000,
        range: true,
        step: 100
      })}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
    >
      <div
        aria-label="A blue circle"
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: '#0099ff'
        }}
      />
    </Zoom>
  </ImgStory>
))

stories.add('with image gallery using divs & background images', () => {
  const images = [
    imgThatWanakaTree,
    imgNzBeach,
    imgHobbiton,
    imgHobbiton,
    imgThatWanakaTree,
    imgNzBeach,
    imgNzBeach,
    imgHobbiton,
    imgThatWanakaTree
  ]

  return (
    <div>
      <h1>Image gallery using divs & background images</h1>
      <p>
        While this is simply an example of using div elements and
        background-image to accomplish an image gallery, you could easily listen
        for arrow left/right when an item is zoomed and use the controlled
        component to make yourself an animated image gallery that zooms &
        unzooms items appropriately.
      </p>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {images.concat(images, images, images).map((img, i) => (
          <li
            key={i}
            style={{ margin: '0 1rem 1rem 0', width: 'calc(33% - 1rem)' }}
          >
            <Zoom wrapStyle={{ width: '100%' }}>
              <div
                aria-label={img.alt}
                role="img"
                style={{
                  backgroundColor: '#c2c2c2',
                  backgroundImage: `url(${img.src})`,
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  height: '0',
                  paddingBottom: '66%',
                  width: 'calc(100%)'
                }}
              />
            </Zoom>
          </li>
        ))}
      </ul>
    </div>
  )
})

stories.add('with controlled; zooms when image loads', () => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleBtnClick = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <ImgStory title="Controlled Component – zooms when image loads">
      <div>
        <button onClick={handleBtnClick} type="button">
          Zoom image
        </button>
      </div>
      <ControlledZoom
        closeText={text('Unzoom label', 'Unzoom image')}
        openText={text('Zoom label', 'Zoom image')}
        overlayBgColorEnd={color(
          'Overlay bgColor end',
          'rgba(255, 255, 255, 0.95)'
        )}
        overlayBgColorStart={color(
          'Overlay bgColor start',
          'rgba(255, 255, 255, 0)'
        )}
        transitionDuration={number('Transition duration', 300, {
          min: 0,
          max: 5000,
          range: true,
          step: 100
        })}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
      >
        <img
          alt={imgThatWanakaTree.alt}
          onLoad={handleImgLoad}
          src={imgThatWanakaTree.src}
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      </ControlledZoom>
    </ImgStory>
  )
})

stories.add('with controlled; specific keys', () => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleKeyDown = useCallback(e => {
    if (e.key === 'j' || e.keyCode === 74) {
      setIsZoomed(true)
    } else if (e.key === 'k' || e.keyCode === 75) {
      setIsZoomed(false)
    }
  }, [])

  useEvent('keydown', handleKeyDown, document)

  return (
    <ImgStory
      desc="Use `j` to open and `k` to close"
      title="Image zoom using specific keys"
    >
      <ControlledZoom
        closeText={text('Unzoom label', 'Unzoom image')}
        openText={text('Zoom label', 'Zoom image')}
        overlayBgColorEnd={color(
          'Overlay bgColor end',
          'rgba(255, 255, 255, 0.95)'
        )}
        overlayBgColorStart={color(
          'Overlay bgColor start',
          'rgba(255, 255, 255, 0)'
        )}
        transitionDuration={number('Transition duration', 300, {
          min: 0,
          max: 5000,
          range: true,
          step: 100
        })}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        isZoomed={isZoomed}
        onZoomChange={Function.prototype /* do nothing */}
      >
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      </ControlledZoom>
    </ImgStory>
  )
})

const ImgStory = ({ desc, title, ...props }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {desc && <h2>{desc}</h2>}
      <p>
        Trust fund seitan chia, wolf lomo letterpress Bushwick before they sold
        out. Carles kogi fixie, squid twee Tonx readymade cred typewriter
        scenester locavore kale chips vegan organic. Meggings pug wolf
        Shoreditch typewriter skateboard. McSweeney&apos;s iPhone chillwave,
        food truck direct trade disrupt flannel irony tousled Cosby sweater
        single-origin coffee. Organic disrupt bicycle rights, tattooed messenger
        bag flannel craft beer fashion axe bitters. Readymade sartorial craft
        beer, quinoa sustainable butcher Marfa Echo Park Terry Richardson
        gluten-free flannel retro cred mlkshk banjo. Salvia 90&apos;s art party
        Blue Bottle, PBR&B cardigan 8-bit.
      </p>
      <p>
        Meggings irony fashion axe, tattooed master cleanse Blue Bottle
        stumptown bitters authentic flannel freegan paleo letterpress ugh
        sriracha. Wolf PBR&B art party aesthetic meh cliche. Sartorial before
        they sold out deep v, aesthetic PBR&B craft beer post-ironic synth
        keytar pork belly skateboard pour-over. Tonx cray pug Etsy, gastropub
        ennui wolf ethnic Odd Future viral master cleanse skateboard banjo.
        Pitchfork scenester cornhole, whatever try-hard ethnic banjo +1
        gastropub American Apparel vinyl skateboard Shoreditch seitan. Blue
        Bottle keffiyeh Austin Helvetica art party. Portland ethnic fixie, beard
        retro direct trade ugh scenester Tumblr readymade authentic plaid
        pickled hashtag biodiesel.
      </p>
      {props.children}
      <p>
        Thundercats freegan Truffaut, four loko twee Austin scenester lo-fi
        seitan High Life paleo quinoa cray. Schlitz butcher ethical Tumblr,
        pop-up DIY keytar ethnic iPhone PBR sriracha. Tonx direct trade bicycle
        rights gluten-free flexitarian asymmetrical. Whatever drinking vinegar
        PBR XOXO Bushwick gentrify. Cliche semiotics banjo retro squid Wes
        Anderson. Fashion axe dreamcatcher you probably haven&apos;t heard of
        them bicycle rights. Tote bag organic four loko ethical selfies
        gastropub, PBR fingerstache tattooed bicycle rights.
      </p>
      <p>
        Ugh Portland Austin, distillery tattooed typewriter polaroid pug Banksy
        Neutra keffiyeh. Shoreditch mixtape wolf PBR&B, tote bag dreamcatcher
        literally bespoke Odd Future selfies 90&apos;s master cleanse vegan.
        Flannel tofu deep v next level pickled, authentic Etsy Shoreditch
        literally swag photo booth iPhone pug semiotics banjo. Bicycle rights
        butcher Blue Bottle, actually DIY semiotics Banksy banjo mixtape Austin
        pork belly post-ironic. American Apparel gastropub hashtag,
        McSweeney&apos;s master cleanse occupy High Life bitters wayfarers next
        level bicycle rights. Wolf chia Terry Richardson, pop-up plaid kitsch
        ugh. Butcher +1 Carles, swag selfies Blue Bottle viral.
      </p>
    </div>
  )
}
