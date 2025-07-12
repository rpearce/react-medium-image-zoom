import React, { useCallback, useMemo, useState } from 'react'
import type { Meta } from '@storybook/react-webpack5'

import Zoom from '../source'
import '../source/styles.css'
import './base.css'

import {
  imgGlenorchyLagoon,
  imgHobbiton,
  imgHookerValleyTrack,
  imgKea,
  imgNzBeach,
  imgPortWaikato,
  imgQueenstown,
  imgTekapo,
  imgThatWanakaTree,
} from './images'

const meta: Meta<typeof Zoom> = {
  title: 'Galleries',
  component: Zoom,
}

export default meta

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

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    setObjectFit(data.get('objectFit') as ObjectFit)
    setObjectPosition(data.get('objectPosition') as string)
  }, [])

  return (
    <main aria-label="Story">
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
    </main>
  )
}

export const DivImageGallery = () => {
  const images = useMemo(
    () => [
      imgGlenorchyLagoon,
      imgThatWanakaTree,
      imgNzBeach,
      imgHobbiton,
      imgHookerValleyTrack,
      imgQueenstown,
      imgTekapo,
      imgPortWaikato,
      imgKea,
    ],
    []
  )

  const [bgSize, setBgSize] = useState('cover')
  const [bgPosition, setBgPosition] = useState('50%')
  const [aspectRatio, setAspectRatio] = useState('56%')

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    setBgSize(data.get('backgroundSize') as string)
    setBgPosition(data.get('backgroundPosition') as string)
    setAspectRatio(data.get('aspectRatio') as string)
  }, [])

  return (
    <main aria-label="Story">
      <h1>{'Image gallery using <div>s, background images, and padding'}</h1>
      <form style={{ marginBottom: '3rem' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <code>background-size:</code>
            <input defaultValue={bgSize} name="backgroundSize" type="text" />
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
    </main>
  )
}
