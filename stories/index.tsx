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
  imgKeaSmall,
  imgKea,
  imgKeaLarge,
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
  zoomImg: undefined,
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
        width="400"
      />
    </Zoom>
    <h2>A portrait image with a small width specified</h2>
    <p>Small widths scale well, too — even on mobile.</p>
    <Zoom {...props}>
      <img
        alt={imgTeAraiPoint.alt}
        src={imgTeAraiPoint.src}
        width="75"
      />
    </Zoom>
    <h2>An image with an SVG src</h2>
    <Zoom {...props}>
      <img
        alt={imgNzMap.alt}
        src={imgNzMap.src}
        width="150"
      />
    </Zoom>
    <h2>An image with a larger <code>zoomImg</code></h2>
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
    <h2>An image with a small size</h2>
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
)

Image.args = defaultArgs
Image.argTypes = defaultArgTypes

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
                loading="lazy"
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

export const Picture = props => (
  <div>
    <h1>{'Zoom an <img /> in a <picture> element with a <source />'}</h1>
    <p>Hint: reduce the window&apos;s width to see a portrait picture, instead.</p>
    <Zoom {...props}>
      <picture>
        <source media="(max-width: 800px)" srcSet={imgTeAraiPoint.src} />
        <img
          alt={imgNzBeach.alt}
          src={imgNzBeach.src}
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
          width="500"
        />
      </Zoom>
      <figcaption>
        <a href="https://www.newzealand.com/in/plan/business/hobbiton-movie-set-tours/">
          Hobbiton
        </a>
      </figcaption>
    </figure>
  </div>
)

Figure.args = defaultArgs
Figure.argTypes = defaultArgTypes

export const SVG = props => (
  <div>
    <h1>{'Zooming <svg> elements'}</h1>
    <h2>{'An animating square SVG with its width & height set via style'}</h2>
    <figure>
      <Zoom {...props}>
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
      </Zoom>
      <figcaption>
        <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate">
          Animation MDN source
        </a>
      </figcaption>
    </figure>
    <h2>{'A bird SVG on a non-SVG background'}</h2>
    <div
      style={{
        backgroundColor: '#ccebff',
        borderRadius: '0 30px 0 30px',
        padding: '1rem',
        width: '20rem',
        height: 'auto',
      }}
    >
      <Zoom>
        <svg
          aria-label="Outline of a bird"
          role="img"
          viewBox="203.337 154.583 197.077 399.551"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M382.92 542.2c-9.764-18.504-9.496-18.288-14.537-11.773-2.346 3.033-4.813 5.515-5.482 5.515-1.146 0-2.381-5.274-3.749-15.993-.326-2.553-2.368-11.909-4.539-20.795-2.171-8.884-3.947-17.755-3.947-19.713 0-5.187-8.713-32.977-11.055-35.258-1.098-1.068-5.249-2.104-9.227-2.301-6.258-.309-7.674.195-10.506 3.745-1.8 2.257-5.454 5.011-8.12 6.12-6.331 2.636-34.301 27.32-35.628 31.443-.565 1.755-.208 7.019.794 11.697 2.196 10.26.744 15.06-5.986 19.785-4.401 3.091-6.587 2.529-3.192-.818 2.655-2.618 3.638-15.329 1.567-20.26-1.059-2.521-2.457-4.582-3.107-4.582-1.438 0-15.973 14.122-19.175 18.63-1.265 1.781-2.299 2.383-2.299 1.338 0-3.677 4.293-11.697 8.982-16.782 2.607-2.827 4.375-5.722 3.93-6.434-1.133-1.808-12.523-1.623-13.679.221-1.171 1.868-3.838 1.996-3.838.183 0-2.261 7.987-4.643 18.241-5.438 11.055-.858 14.614-3.177 34.988-22.78l11.044-10.628-.046-11.537c-.045-11.305-.16-11.645-5.653-16.704-10.138-9.337-8.35-8.974-35.732-7.271l-25.145 1.563-4.955 5.651-4.955 5.651.924-4.92c.903-4.806.797-4.92-4.587-4.92-5.253 0-13.199 5.064-19.003 12.111-1.663 2.018-1.875 2.018-1.914 0-.075-3.941 5.929-12.126 10.018-13.66 4.691-1.758 3.587-4.506-1.81-4.506-2.111 0-3.473-.583-3.027-1.295s17.413-.958 37.705-.545c30.851.627 36.888.406 36.862-1.354-.017-1.158-4.187-7.555-9.266-14.215-11.746-15.405-23.752-39.382-26.152-52.227-2.618-14.016-2.633-41.653-.027-49.956 6.496-20.695 12.631-38.346 14.702-42.295 4.322-8.24 3.126-13.504-4.76-20.954-8.465-7.997-10.757-7.984-29.315.167-15.287 6.714-18.843 7.754-18.843 5.507 0-1.773 4.448-6.357 16.537-17.042 6.143-5.429 6.492-6.187 6.492-14.078 0-4.587 1.009-10.264 2.242-12.615 2.798-5.335 24.339-22.823 28.114-22.823.72 0 4.721-1.607 8.89-3.572 13.678-6.446 18.768-7.454 33.749-6.681 22.029 1.136 38.123 9.608 49.848 26.24 6.537 9.276 18.056 35.586 18.546 42.366.237 3.292 3.162 11.434 6.497 18.095 15.755 31.461 20.018 50.267 20.074 88.559.046 31.502-1.649 40.68-13.039 70.58-4.748 12.462-6 17.826-6 25.7 0 9.021 3.813 45.038 5.354 50.562.348 1.248 1.043 7.721 1.545 14.381.501 6.66 1.259 13.884 1.685 16.051.425 2.166 1.35 12.708 2.055 23.428 1.91 27.91.58 29.59-9.02 11.4zm4.8-25.18c-.824-3.331-1.937-10.824-2.473-16.652s-2.283-22.177-3.883-36.331c-1.6-14.155-3.365-30.072-3.923-35.372-.879-8.355-2.854-12.956-14.855-34.596-12.692-22.887-21.591-42.298-23.288-50.796-.369-1.853-2.504-8.818-4.742-15.479-5.297-15.758-5.547-33.847-.648-46.929 6.752-18.03 14.971-30.776 29.343-45.511l7.478-7.666-2.163-8.986c-2.478-10.29-12.282-31.084-16.383-34.743-2.614-2.333-2.911-1.991-5.486 6.347-2.913 9.427-3.211 20.345-1.036 37.957.955 7.742.824 12.222-.445 15.199-1.011 2.37-9.133 9.942-18.514 17.261-19.104 14.904-36.065 31.987-40.75 41.041-4.958 9.584-8.874 21.833-11.224 35.113-2.631 14.869-.703 28.211 6.868 47.511 3.939 10.043 7.183 15.161 15.535 24.506l10.555 11.81v13.72c0 11.406.403 13.719 2.39 13.719 2.707 0 10.998-8.393 12.307-12.457 1.033-3.207 5.262-3.608 5.262-.498 0 1.486 2.08 2.333 6.506 2.65 5.812.415 6.862 1.109 9.868 6.521 3.452 6.214 8.831 24.556 10.547 35.967.532 3.531 2.26 11.869 3.841 18.53 1.582 6.661 3.342 15.687 3.91 20.059 1.134 8.706 2.834 9.986 5.525 4.162 3.406-7.373 6.353-4.643 17.969 16.652l2.478 4.542.466-10.598c.23-5.81-.24-13.31-1.06-16.64zm-70.46-259.57c8.086-9.312 13.233-25.08 14.345-43.947 1.056-17.908 2.918-26.446 7.003-32.102 1.749-2.422 2.911-4.67 2.582-4.994-.33-.325-6.795-1.042-14.369-1.595l-13.77-1.004-2.984 5.088c-3.554 6.057-4.399 6.893-12.378 12.229-6.64 4.44-15.773 8.079-17.07 6.799-.441-.435.335-2.959 1.725-5.61 3.479-6.634 2.114-9.112-4.939-8.971-10.112.203-17.733 3.329-21.481 8.813-1.905 2.787-3.034 5.751-2.51 6.587s2.002-.186 3.286-2.271c3.331-5.413 9.781-8.704 17.056-8.704 5.064 0 6.288.538 6.288 2.764 0 5.977-14.439 13.688-22.086 11.796-2.206-.546-3.524-.18-3.564.991-.035 1.022-.541 3.616-1.125 5.765-.903 3.322-.185 4.556 4.797 8.245 3.222 2.386 13.804 11.19 23.515 19.566 30.57 26.37 30.59 26.38 35.66 20.54z" />
        </svg>
      </Zoom>
    </div>
  </div>
)

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
