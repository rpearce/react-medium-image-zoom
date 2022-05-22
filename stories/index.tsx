import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Zoom, { Controlled as ControlledZoom } from '../source'
import '../source/styles.css'
import './base.css'

import {
  imgGlenorchyLagoon,
  imgHobbiton,
  imgHookerValleyTrack,
  imgKea,
  imgNzBeach,
  imgNzMap,
  imgPortWaikato,
  imgQueenstown,
  imgTeAraiPoint,
  imgTekapo,
  imgThatWanakaTree,
} from './images'

export default {
  title: 'Zoom',
  component: Zoom,
  parameters: {},
}

const defaultArgs = {
  a11yNameButtonUnzoom: 'Minimize image',
  a11yNameButtonZoom: 'Expand image',
  zoomMargin: 0,
}

const defaultArgTypes = {
  zoomMargin: {
    control: {
      type: 'range',
      min: 0,
      max: 500,
      step: 50,
    },
  },
}

export const Image = props => (
  <div>
    <h1>{'Zooming <img /> elements'}</h1>
    <h2>A regular image</h2>
    <Zoom {...props}>
      <img
        alt={imgThatWanakaTree.alt}
        src={imgThatWanakaTree.src}
        style={{ height: '100%', maxWidth: '100%' }}
        width="400"
      />
    </Zoom>
    <h2>A portrait image with a small width</h2>
    <p>Small widths scale well, too — even on mobile.</p>
    <Zoom {...props}>
      <img
        alt={imgTeAraiPoint.alt}
        src={imgTeAraiPoint.src}
        style={{ height: '100%', maxWidth: '100%' }}
        width="75"
      />
    </Zoom>
    <h2>An image with an SVG src</h2>
    <Zoom {...props}>
      <img
        alt={imgNzMap.alt}
        src={imgNzMap.src}
        style={{ height: '100%', maxWidth: '100%' }}
        width="150"
      />
    </Zoom>
  </div>
)

Image.args = defaultArgs
Image.argTypes = defaultArgTypes

export const Picture = props => (
  <div>
    <h1>{'Zoom an <img /> in a <picture> element with a <source />'}</h1>
    <Zoom {...props}>
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
  </div>
)

Picture.args = defaultArgs
Picture.argTypes = defaultArgTypes

export const Figure = props => (
  <div>
    <h1>{'Zoom an <img /> in a <figure> element'}</h1>
    <figure>
      <Zoom {...props}>
        <img
          alt={imgHobbiton.alt}
          src={imgHobbiton.src}
          style={{ height: '100%', maxWidth: '100%' }}
          width="500"
        />
      </Zoom>
      <figcaption>Hobbiton</figcaption>
    </figure>
  </div>
)

Figure.args = defaultArgs
Figure.argTypes = defaultArgTypes

export const SVG = props => (
  <div>
    <h1>{'Zooming an <svg> element'}</h1>
    <Zoom {...props}>
      <figure>
        <svg
          aria-label="SVG animating from a circle to a square and back again on repeat"
          role="img"
          style={{ width: '10rem', height: '10rem' }}
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="10" height="10">
            <animate attributeName="rx" values="0;5;0" dur="10s" repeatCount="indefinite" />
          </rect>
        </svg>
        <figcaption>
          <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate">
            Animation MDN source
          </a>
        </figcaption>
      </figure>
    </Zoom>
  </div>
)

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export const ImageGallery = () => {
  const images = [
    imgGlenorchyLagoon,
    imgThatWanakaTree,
    imgNzBeach,
    imgHobbiton,
    imgHookerValleyTrack,
    imgQueenstown,
    imgTekapo,
    imgPortWaikato,
    imgKea,
  ]

  const [objectFit, setObjectFit] = useState('cover' as ObjectFit)
  const [objectPosition, setObjectPosition] = useState('50% 50%')

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    setObjectFit(data.get('objectFit') as ObjectFit)
    setObjectPosition(data.get('objectPosition') as string)
  }, [])

  return (
    <div>
      <h1>{'Image gallery using <img />, object-fit, & object-position'}</h1>
      <form style={{ marginBottom: '3rem' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>object-fit:</code>
            <select defaultValue={objectFit} name="objectFit">
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="none">none</option>
              <option value="scale-down">scale-down</option>
              <option value="fill">fill</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>object-position:</code>
            <input
              defaultValue={objectPosition}
              name="objectPosition"
              type="text"
            />
          </label>
        </div>
        <button type="submit">Apply changes</button>
      </form>
      <ul /* eslint-disable-line jsx-a11y/no-redundant-roles */
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 2fr',
          gridGap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
        role="list"
      >
        {images.map((img, i) => (
          <li /* eslint-disable-line jsx-a11y/no-redundant-roles */
            key={i}
            role="listitem"
          >
            <Zoom>
              <img
                alt={img.alt}
                src={img.src}
                style={{ objectFit, objectPosition, width: '100%' }}
                width="250"
                height="500"
              />
            </Zoom>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const DivImageGallery = () => {
  const images = useMemo(() => [
    imgGlenorchyLagoon,
    imgThatWanakaTree,
    imgNzBeach,
    imgHobbiton,
    imgHookerValleyTrack,
    imgQueenstown,
    imgTekapo,
    imgPortWaikato,
    imgKea,
  ], [])

  const [bgSize, setBgSize] = useState('cover')
  const [bgPosition, setBgPosition] = useState('50%')
  const [aspectRatio, setAspectRatio] = useState('56%')

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    setBgSize(data.get('backgroundSize') as string)
    setBgPosition(data.get('backgroundPosition') as string)
    setAspectRatio(data.get('aspectRatio') as string)
  }, [])

  return (
    <div>
      <h1>{'Image gallery using <div>s, background images, and padding'}</h1>
      <form style={{ marginBottom: '3rem' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>background-size:</code>
            <input
              defaultValue={bgSize}
              name="backgroundSize"
              type="text"
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>background-position:</code>
            <input
              defaultValue={bgPosition}
              name="backgroundPosition"
              type="text"
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>aspect ratio:</code>
            <select defaultValue={aspectRatio} name="aspectRatio">
              <option value="56%">16:9</option>
              <option value="75%">4:3</option>
              <option value="33%">3:1</option>
              <option value="100%">1:1</option>
            </select>
          </label>
        </div>
        <button type="submit">Apply changes</button>
      </form>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {images.map((img, i) => (
          <li
            key={i}
            style={{ margin: '0 1rem 1rem 0', width: 'calc(33% - 1rem)' }}
          >
            <Zoom>
              <div
                aria-label={img.alt}
                role="img"
                style={{
                  backgroundColor: '#fff',
                  backgroundImage: `url(${img.src})`,
                  backgroundPosition: bgPosition,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: bgSize,
                  height: '0',
                  paddingBottom: aspectRatio,
                  width: '100%',
                }}
              />
            </Zoom>
          </li>
        ))}
      </ul>
    </div>
  )
}

//export const GallerySlideshow = () => {
//  const images = [
//    imgGlenorchyLagoon,
//    imgThatWanakaTree,
//    imgNzBeach,
//    imgHobbiton,
//    imgHookerValleyTrack,
//    imgQueenstown,
//    imgTekapo,
//    imgPortWaikato,
//    imgKea,
//  ]
//  const [activeIndex, setActiveIndex] = useState(null)

//  const handleKeyDown = useCallback(
//    e => {
//      if (activeIndex === null) {
//        return
//      }

//      if (e.key === 'ArrowLeft' || e.keyCode === 37) {
//        setActiveIndex(Math.max(activeIndex - 1, 0))
//      } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
//        setActiveIndex(Math.min(activeIndex + 1, images.length - 1))
//      }
//    },
//    [activeIndex, images.length]
//  )

//  useEffect(() => {
//    document.addEventListener('keydown', handleKeyDown)

//    return () => {
//      document.removeEventListener('keydown', handleKeyDown)
//    }
//  }, [handleKeyDown])

//  return (
//    <div>
//      <h1>Image gallery and slideshow-style images</h1>
//      <p>
//        Once you click on an image, use the left and right arrows to navigate
//        the images.
//      </p>
//      <ul
//        style={{
//          display: 'flex',
//          flexWrap: 'wrap',
//          listStyle: 'none',
//          margin: 0,
//          padding: 0,
//        }}
//      >
//        {images.map((img, i) => {
//          const handleZoomChange = isZoomed => {
//            if (isZoomed) {
//              setActiveIndex(i)
//            } else {
//              setActiveIndex(null)
//            }
//          }

//          return (
//            <li
//              key={`${i}-${img.src}`}
//              style={{ margin: '0 1rem 1rem 0', width: 'calc(33% - 1rem)' }}
//            >
//              <ControlledZoom
//                isZoomed={activeIndex === i}
//                onZoomChange={handleZoomChange}
//                transitionDuration={0}
//                wrapStyle={{ width: '100%' }}
//              >
//                <div
//                  aria-label={img.alt}
//                  role="img"
//                  style={{
//                    backgroundColor: '#c2c2c2',
//                    backgroundImage: `url(${img.src})`,
//                    backgroundPosition: 'center center',
//                    backgroundRepeat: 'no-repeat',
//                    backgroundSize: 'cover',
//                    height: '0',
//                    paddingBottom: '66%',
//                    width: '100%',
//                  }}
//                />
//              </ControlledZoom>
//            </li>
//          )
//        })}
//      </ul>
//    </div>
//  )
//}

export const SpecificKeys = props => {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleKeyDown = useCallback(e => {
    if (e.key === 'j' || e.keyCode === 74) {
      setIsZoomed(true)
    } else if (e.key === 'k' || e.keyCode === 75) {
      setIsZoomed(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div>
      <h1>{'Controlled component - use "j" to open and "k" to close'}</h1>
      <ControlledZoom
        {...props}
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
    </div>
  )
}

SpecificKeys.args = defaultArgs
SpecificKeys.argTypes = defaultArgTypes

export const ZoomOnLoad = props => {
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
    <div>
      <h1>{'Controlled component – zooms when image loads'}</h1>
      <div>
        <button onClick={handleBtnClick} type="button">
          Zoom image
        </button>
      </div>
      <ControlledZoom
        {...props}
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
    </div>
  )
}

ZoomOnLoad.args = defaultArgs
ZoomOnLoad.argTypes = defaultArgTypes

//export const LargerImageSize = props => (
//  <div style={{ width: '720px', margin: '0 auto' }}>
//    <ImgStory title="Larger image size">
//      <Zoom {...props}>
//        <img alt={imgNvidiaCard.alt} src={imgNvidiaCard.src} width="100%" />
//      </Zoom>
//    </ImgStory>
//  </div>
//)

//LargerImageSize.args = defaultArgs
//LargerImageSize.argTypes = defaultArgTypes
