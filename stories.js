import React, { useCallback, useState } from 'react'
import useEvent from 'react-use/lib/useEvent'
import { color, number, text } from '@storybook/addon-knobs'
import './.storybook/base.css'
import glenorchyLagoon from './static/glenorchy-lagoon.jpg'
import hobbiton from './static/andres-iga-7XKkJVw1d8c-unsplash-smaller.jpg'
import hookerValleyTrack from './static/roell-de-ram-2DM7eOR5iyc-unsplash-smaller.jpg'
import kea from './static/pablo-heimplatz-PSF2RhUBORs-unsplash-smaller.jpg'
import nvidiaCard from './static/nvidia-card.jpg'
import nzBeach from './static/rod-long-4dcsLxQxSHY-unsplash-smaller.jpg'
import portWaikato from './static/petr-vysohlid-9fqwGqGLUxc-unsplash-smaller.jpg'
import queenstown from './static/omer-faruk-bekdemir-5BuxuWIJF1Q-unsplash-smaller.jpg'
import teAraiPoint from './static/douglas-bagg-wRwa3Z6GtRI-unsplash-smaller.jpg'
import tekapo from './static/tobias-keller-73F4pKoUkM0-unsplash-smaller.jpg'
import thatWanakaTree from './static/laura-smetsers-H-TW2CoNtTk-unsplash-smaller.jpg'

import './dist/styles.css'
import Zoom, { Controlled as ControlledZoom } from './dist/esm'

const imgGlenorchyLagoon = {
  alt: 'Glenorchy lagoon, New Zealand by Robert Pearce',
  src: glenorchyLagoon
}
const imgHobbiton = {
  alt: 'Hobbiton, Matamata, New Zealand by Andres Iga',
  src: hobbiton
}
const imgHookerValleyTrack = {
  alt: 'Hooker Valley Track , New Zealand by Roll de Ram',
  src: hookerValleyTrack
}
const imgKea = {
  alt: `Kea (alpine parrot) in Arthur's Pass, New Zealand by Pablo Heimplatz`,
  src: kea
}
const imgNvidiaCard = {
  alt: 'NVIDIA Graphics Card',
  src: nvidiaCard
}
const imgNzBeach = {
  alt: 'New Zealand Beach by Rod Long',
  src: nzBeach
}
const imgQueenstown = {
  alt: 'Queenstown, New Zealand by Omer Faruk',
  src: queenstown
}
const imgTeAraiPoint = {
  alt: 'Te Arai Point, New Zealand by Douglas Bagg',
  src: teAraiPoint
}
const imgTekapo = {
  alt: 'Lake Tekapo, New Zealand by Tobias Keller',
  src: tekapo
}
const imgThatWanakaTree = {
  alt: 'That Wanaka Tree, New Zealand by Laura Smetsers',
  src: thatWanakaTree
}
const imgPortWaikato = {
  alt: 'Port Waikato, Tuakau, Auckland, New Zealand by Petr Vysohlid',
  src: portWaikato
}

export const Img = () => (
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
      wrapElement={text('Wrapper element', 'div')}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
      zoomZindex={number('Zoom z-index', 2147483647, {
        min: 0,
        max: 2147483647,
        range: true,
        step: 1
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
)

export const Picture = () => (
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
      wrapElement={text('Wrapper element', 'div')}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
      zoomZindex={number('Zoom z-index', 2147483647, {
        min: 0,
        max: 2147483647,
        range: true,
        step: 1
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
)

export const Figure = () => (
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
        wrapElement={text('Wrapper element', 'div')}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        zoomZindex={number('Zoom z-index', 2147483647, {
          min: 0,
          max: 2147483647,
          range: true,
          step: 1
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
)

export const BlueCircleDiv = () => (
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
      wrapElement={text('Wrapper element', 'div')}
      zoomMargin={number('Zoom margin', 0, {
        min: 0,
        max: 500,
        range: true,
        step: 50
      })}
      zoomZindex={number('Zoom z-index', 2147483647, {
        min: 0,
        max: 2147483647,
        range: true,
        step: 1
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
)

export const ImgGalleryBgImages = () => {
  const images = [
    imgGlenorchyLagoon,
    imgThatWanakaTree,
    imgNzBeach,
    imgHobbiton,
    imgHookerValleyTrack,
    imgQueenstown,
    imgTekapo,
    imgPortWaikato,
    imgKea
  ]

  return (
    <div>
      <h1>Image gallery using divs & background images</h1>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {images.map((img, i) => (
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
}

export const ImgGallerySlideshowStyle = () => {
  const images = [
    imgGlenorchyLagoon,
    imgThatWanakaTree,
    imgNzBeach,
    imgHobbiton,
    imgHookerValleyTrack,
    imgQueenstown,
    imgTekapo,
    imgPortWaikato,
    imgKea
  ]
  const [activeIndex, setActiveIndex] = useState(null)

  const handleKeyDown = useCallback(
    e => {
      if (activeIndex === null) {
        return
      }

      if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        setActiveIndex(Math.max(activeIndex - 1, 0))
      } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
        setActiveIndex(Math.min(activeIndex + 1, images.length - 1))
      }
    },
    [activeIndex, images.length]
  )

  useEvent('keydown', handleKeyDown, document)

  return (
    <div>
      <h1>Image gallery and slideshow-style images</h1>
      <p>
        Once you click on an image, use the left and right arrows to navigate
        the images.
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
        {images.map((img, i) => {
          const handleZoomChange = useCallback(
            isZoomed => {
              if (isZoomed) {
                setActiveIndex(i)
                return
              }
              setActiveIndex(null)
            },
            [i]
          )

          return (
            <li
              key={`${i}-${img.src}`}
              style={{ margin: '0 1rem 1rem 0', width: 'calc(33% - 1rem)' }}
            >
              <ControlledZoom
                isZoomed={activeIndex === i}
                onZoomChange={handleZoomChange}
                transitionDuration={0}
                wrapStyle={{ width: '100%' }}
              >
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
              </ControlledZoom>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const ControlledZoomOnLoad = () => {
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
        wrapElement={text('Wrapper element', 'div')}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        zoomZindex={number('Zoom z-index', 2147483647, {
          min: 0,
          max: 2147483647,
          range: true,
          step: 1
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
}

export const ControlledSpecificKeys = () => {
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
        wrapElement={text('Wrapper element', 'div')}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        zoomZindex={number('Zoom z-index', 2147483647, {
          min: 0,
          max: 2147483647,
          range: true,
          step: 1
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
}

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

export const LargerImageSize = () => (
  <div style={{ width: '720px', margin: '0 auto' }}>
    <ImgStory title="Larger image size">
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
        wrapElement={text('Wrapper element', 'div')}
        zoomMargin={number('Zoom margin', 0, {
          min: 0,
          max: 500,
          range: true,
          step: 50
        })}
        zoomZindex={number('Zoom z-index', 2147483647, {
          min: 0,
          max: 2147483647,
          range: true,
          step: 1
        })}
      >
        <img alt={imgNvidiaCard.alt} src={imgNvidiaCard.src} width="100%" />
      </Zoom>
    </ImgStory>
  </div>
)
