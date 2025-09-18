import React from 'react'
import type { Meta } from '@storybook/react-webpack5'

import { waitFor, within, userEvent, expect } from 'storybook/test'

import Zoom, { type UncontrolledProps } from '../source'
import '../source/styles.css'
import './base.css'

import {
  imgEarth,
  imgGlenorchyLagoon,
  imgHookerValleyTrack,
  imgKeaLarge,
  imgKeaSmall,
  imgNzMap,
  imgTeAraiPoint,
  imgTekapo,
  imgThatWanakaTree,
} from './images'

const meta: Meta<typeof Zoom> = {
  title: '<img>',
  component: Zoom,
}

export default meta

// =============================================================================

// Modern Fisher-Yates shuffle algo
function shuffle<T extends unknown[]>(xs: T): T {
  const xsClone = structuredClone(xs)

  for (let i = xsClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = xsClone[i]
    xsClone[i] = xsClone[j]
    xsClone[j] = tmp
  }

  return xsClone
}

// =============================================================================

export const Regular = (props: typeof Zoom) => {
  const handleZoomChange = React.useCallback<
    NonNullable<React.ComponentProps<typeof Zoom>['onZoomChange']>
  >((value, { event }) => {
    console.log('handleZoomChange info!', { value, event })
  }, [])

  return (
    <main aria-label="Story">
      <h1>Zooming a regular image</h1>
      <div className="mw-600" style={{ display: 'flex', flexDirection: 'column' }}>
        <Zoom {...props} onZoomChange={handleZoomChange} wrapElement="span">
          <img
            alt={imgThatWanakaTree.alt}
            src={imgThatWanakaTree.src}
            height="320"
            decoding="async"
            loading="lazy"
          />
        </Zoom>
      </div>
    </main>
  )
}

// =============================================================================

export const ZoomMargin = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>Setting a zoomMargin of 45(px)</h1>
    <div className="mw-600">
      <p>
        This example should always be offset from the window by at least 45px
      </p>
      <Zoom {...props} zoomMargin={45}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const SmallPortrait = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>A portrait image with a small width specified</h1>
    <div className="mw-600">
      <p>Small size specifications scale well, too — even on mobile.</p>
      <Zoom {...props}>
        <img
          alt={imgTeAraiPoint.alt}
          src={imgTeAraiPoint.src}
          height="112"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const SVGSource = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>An image with an SVG src</h1>
    <div className="mw-600">
      <Zoom {...props}>
        <img
          alt={imgNzMap.alt}
          src={imgNzMap.src}
          width="150"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const DataSVGSource = () => (
  <main aria-label="Story">
    <h1>
      An image with a <code>data:image/svg+xml</code> <code>src</code>
    </h1>
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

// =============================================================================

export const ProvideZoomImg = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>
      An image with a larger <code>zoomImg</code>
    </h1>
    <div className="mw-600">
      <p>
        When zoomed, the original image will scale to as large as the window
        will allow, and then it will be replaced by an image that is downloaded
        in the background.
      </p>
      <Zoom
        {...props}
        zoomImg={{
          alt: imgKeaLarge.alt,
          src: imgKeaLarge.src,
        }}
      >
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

const CustomZoomContentWithLoader: UncontrolledProps['ZoomContent'] = ({
  img,
  isZoomImgLoaded,
  modalState,
}) => {
  const [
    showLoader,
    setShowLoader,
  ] = React.useState(!isZoomImgLoaded)

  /**
   * Delay the loader so the loading spinner is noticeable
   */
  React.useEffect(() => {
    if (modalState === 'LOADING') {
      setShowLoader(true)
      if (isZoomImgLoaded) {
        setTimeout(() => setShowLoader(false), 1000)
      }
    }
  }, [isZoomImgLoaded, modalState])

  return (
    <>
      {img}
      {showLoader && (
        <div className='zoom-img-loader-wrapper'>
          <div className='zoom-img-loader' />
        </div>
      )}
    </>
  )
}

export const ZoomImgLoader = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>
      ZoomImg with Loading State
    </h1>
    <div className="mw-600">
      <p>
        This example shows how to provide loading feedback when using a high-resolution{' '}
        <code>zoomImg</code>. The <code>ZoomContent</code> component uses the{' '}
        <code>isZoomImgLoaded</code> prop to display a loading spinner while the
        high-resolution image is being downloaded.
      </p>
      <p>
        Here the loading spinner is shown on every zoom, but in a real-world case,
        the browser caches the image, so you&apos;ll only see the loader at first load.
      </p>
      <Zoom
        {...props}
        zoomImg={{
          alt: imgKeaLarge.alt,
          src: imgKeaLarge.src,
        }}
        ZoomContent={CustomZoomContentWithLoader}
      >
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
      <h2>Code</h2>
      <pre>
        <code>
          {`
const CustomZoomContent: UncontrolledProps['ZoomContent'] = ({
  img,
  isZoomImgLoaded,
}) => {
  return (
    <>
      {img}
      {!isZoomImgLoaded && (
        <div className='loader-wrapper'>
          <div className='loader' />
        </div>
      )}
    </>
  )
}

<Zoom
  zoomImg={{
    src: 'higher-res-image.jpg',
  }}
  ZoomContent={CustomZoomContent}
>
  <img src='low-res-image.jpg' width="150" />
</Zoom>
          `}
        </code>
      </pre>
    </div>
  </main>
)

// =============================================================================

export const SmallSrcSize = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>An image with a small size</h1>
    <div className="mw-600">
      <p>
        In order to prevent blurry images, An image won&apos;t scale up larger
        than its natural dimensions.
      </p>
      <Zoom {...props}>
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const CustomModalStyles = (props: typeof Zoom) => {
  return (
    <main aria-label="Story">
      <h1>Custom Modal Styles</h1>
      <div className="mw-600">
        <p>Use CSS to customize the zoom modal styles.</p>
        <p>
          Here, we slow down the transition time and use a different overlay
          color.
        </p>
        <div>
          <Zoom {...props} classDialog="custom-zoom">
            <img
              alt={imgGlenorchyLagoon.alt}
              src={imgGlenorchyLagoon.src}
              width="400"
            />
          </Zoom>
        </div>
        <p>
          The CSS class, <code>custom-zoom</code>, is sent to the component via
          the <code>classDialog</code> string prop. Here are the styles used:
        </p>
        <pre>
          <code>
            {`
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
}

// =============================================================================

export const ZoomImageFromInsideDialog = (props: typeof Zoom) => {
  const refBtn = React.useRef<HTMLButtonElement>(null)
  const refModal = React.useRef<HTMLDialogElement>(null)

  const handleBtnClick = React.useCallback(() => {
    refModal.current?.showModal()
  }, [])

  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        !refBtn.current?.contains(e.target as Element) &&
        !refModal.current?.contains(e.target as Element)
      ) {
        refModal.current?.close()
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <main aria-label="Story">
      <h1>Zoom Image From Inside Dialog</h1>
      <div className="mw-600">
        <button onClick={handleBtnClick} ref={refBtn} type="button">
          Open Modal
        </button>
        <dialog aria-modal="true" ref={refModal}>
          <form method="dialog">
            <button type="submit">Close</button>
          </form>
          <h1>Zooming should work!</h1>
          <div>
            <Zoom {...props}>
              <img
                alt={imgGlenorchyLagoon.alt}
                src={imgGlenorchyLagoon.src}
                width="400"
              />
            </Zoom>
          </div>
        </dialog>
      </div>
    </main>
  )
}
// =============================================================================

export const ModalFigureCaption = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>Modal With Figure And Caption</h1>
    <p>
      If you want more control over the zoom modal&apos;s content, you can pass
      a <code>ZoomContent</code> component
    </p>
    <div className="mw-600">
      <Zoom {...props} ZoomContent={CustomZoomContent}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

const CustomZoomContent: UncontrolledProps['ZoomContent'] = ({
  buttonUnzoom,
  modalState,
  img,
  // isZoomImgLoaded, // Not used in this example
  // onUnzooom, // Not used in this example
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  const imgProps = (img as React.ReactElement<HTMLImageElement>)?.props
  const imgWidth = imgProps?.width
  const imgHeight = imgProps?.height

  const classCaption = React.useMemo(() => {
    const hasWidthHeight = imgWidth != null && imgHeight != null
    const imgRatioLargerThanWindow =
      imgWidth / imgHeight > window.innerWidth / window.innerHeight

    return cx({
      'zoom-caption': true,
      'zoom-caption--loaded': isLoaded,
      'zoom-caption--bottom': hasWidthHeight && imgRatioLargerThanWindow,
      'zoom-caption--left': hasWidthHeight && !imgRatioLargerThanWindow,
    })
  }, [imgWidth, imgHeight, isLoaded])

  React.useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true)
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false)
    }
  }, [modalState])

  return (
    <>
      {buttonUnzoom}

      <figure>
        {img}
        <figcaption className={classCaption}>
          That Wanaka Tree, also known as the Wanaka Willow, is a willow tree
          located at the southern end of Lake Wānaka in the Otago region of New
          Zealand.
          <cite className="zoom-caption-cite">
            Wikipedia,{' '}
            <a
              className="zoom-caption-link"
              href="https://en.wikipedia.org/wiki/That_Wanaka_Tree"
            >
              That Wanaka Tree
            </a>
          </cite>
        </figcaption>
      </figure>
    </>
  )
}

// =============================================================================

interface DelayedImgProps {
  timer: number
  alt: string
  src: string
  width: string
  height: string
};

const DelayedImg = (props: DelayedImgProps) => {
  const { alt, height, src, timer, width } = props

  const stylePlaceholder: React.CSSProperties =
    timer === 0
      ? { opacity: 0, visibility: 'hidden', position: 'absolute' }
      : { opacity: 1 }

  React.useEffect(() => {
    const img = new Image()
    img.src = src
    img.decode()
  }, [src])

  return (
    <div>
      <img /* placeholder */
        alt=""
        aria-hidden="true"
        decoding="async"
        height={height}
        src="data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/9oADAMBAAIQAxAAAAFutLOHXan/xAAaEAACAwEBAAAAAAAAAAAAAAAAEwIDEQES/9oACAEBAAEFAmyxnT3YKhiqxcD/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQISUf/aAAgBAwEBPwFKjNdP/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAERIf/aAAgBAgEBPwHFw//EABcQAQEBAQAAAAAAAAAAAAAAAAAxATL/2gAIAQEABj8Cq6qOUf/EAB0QAQACAgIDAAAAAAAAAAAAAAEAETFBIVFhcYH/2gAIAQEAAT8hLTa9xQK5/MRwq9wB94FrKsV+z//aAAwDAQACAAMAAAAQg+//xAAYEQACAwAAAAAAAAAAAAAAAAAAARFB0f/aAAgBAwEBPxBCxzaP/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAx/9oACAECAQE/EEUAZf/EAB0QAAICAgMBAAAAAAAAAAAAAAERADEhQVGRocH/2gAIAQEAAT8QrTbZUQmHR1CiO0TexMDR5OfZSZbuE1IcAh9n/9k="
        style={stylePlaceholder}
        width={width}
      />
      {timer === 0 && (
        <img
          alt={alt}
          decoding="async"
          loading="lazy"
          src={src}
          width={width}
        />
      )}
    </div>
  )
}

export const DelayedImageRender = (props: typeof Zoom) => {
  const { timer } = useTimer(5000)

  return (
    <main aria-label="Story">
      <h1>A sub-component which delays rendering</h1>
      <div className="mw-600">
        <p>
          This examples simulates an issue caused by the gatsby-plugin-image
          (and potentially others) where the actual image element isn&apos;t
          found on the first render.
        </p>
        <div>
          Image loads in: <span role="timer">{timer / 1000}</span>
        </div>
        <Zoom {...props}>
          <DelayedImg
            timer={timer}
            alt={imgEarth.alt}
            src={imgEarth.src}
            height="200"
            width="400"
          />
        </Zoom>
      </div>
    </main>
  )
}

// =============================================================================

export const DelayedDisplayNone = (props: typeof Zoom) => {
  const { timer } = useTimer(5000)
  const classImg = timer === 0 ? undefined : 'display-none'

  return (
    <main aria-label="Story">
      <h1>
        A delayed <code>display: none;</code> image
      </h1>
      <div className="mw-600">
        <p>
          This examples simulates an image being hidden with CSS and then shown
          after the countdown.
        </p>
        <div>
          Image loads in: <span role="timer">{timer / 1000}</span>
        </div>
        <Zoom {...props}>
          <img
            alt={imgTekapo.alt}
            src={imgTekapo.src}
            className={classImg}
            height="320"
            decoding="async"
            loading="lazy"
          />
        </Zoom>
      </div>
    </main>
  )
}

// =============================================================================

export const CustomButtonIcons = (props: typeof Zoom) => {
  React.useEffect(() => {
    document.body.classList.add('change-icons')

    return () => {
      document.body.classList.remove('change-icons')
    }
  }, [])

  return (
    <main aria-label="Story">
      <h1>An image with custom zoom &amp; unzoom icons</h1>
      <div className="mw-600">
        <p>Press TAB to activate the zoom button</p>
        <div>
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
}

// =============================================================================

export const InlineImage = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>Inline Image</h1>
    <p className="inline">
      This example is of an image that is inline with text.
      <Zoom {...props} wrapElement="span">
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </p>
  </main>
)

// =============================================================================

export const CycleImages = (props: typeof Zoom) => {
  const [img, setImg] = React.useState(imgThatWanakaTree)

  React.useEffect(() => {
    async function runCycle() {
      while (true) {
        await delay(3000)

        setImg(shuffle([
          imgThatWanakaTree,
          imgEarth,
          imgNzMap,
          imgTekapo,
          imgKeaLarge,
          imgTeAraiPoint,
          imgGlenorchyLagoon,
          imgHookerValleyTrack,
        ])[0])
      }
    }

    runCycle()
  }, [])

  return (
    <main aria-label="Story">
      <h1>Cycle through images</h1>
      <p>
        This helps to test the ghost element that positions the button. Press
        Tab to focus the button, then sit and watch it reposition with each new
        image!
      </p>
      <p>
        <Zoom {...props} wrapElement="span">
          <img
            alt={img.alt}
            src={img.src}
            height="320"
            decoding="async"
            loading="lazy"
          />
        </Zoom>
      </p>
    </main>
  )
}

// =============================================================================

export const SwipeToUnzoomDisabled = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>Swipe to Unzoom Disabled</h1>
    <p>
      This example demonstrates preventing swipe gestures from
      unzooming when an image is zoomed. This is best tested on
      a touchscreen device!
    </p>
    <div>
      <Zoom {...props} canSwipeToUnzoom={false}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

export const SwipeToUnzoomThreshold = (props: typeof Zoom) => (
  <main aria-label="Story">
    <h1>Swipe to Unzoom Threshold</h1>
    <p>
      This example demonstrates increasing the threshold
      required for a swipe gesture on a touchscreen device to
      unzoom when an image is zoomed. This is best tested on
      a touchscreen device!
    </p>
    <p>
      The default is <code>10</code> (px), but this example
      is set to <code>200</code> (px); that&apos;s how far
      you&apos;ll have to move your finger across the screen.
    </p>
    <div>
      <Zoom {...props} swipeToUnzoomThreshold={200}>
        <img
          alt={imgThatWanakaTree.alt}
          src={imgThatWanakaTree.src}
          height="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </div>
  </main>
)

// =============================================================================

export const SelectCards = (props: typeof Zoom) => {
  return (
    <main aria-label="Story">
      <h1>Selecting cards and zooming without triggering selection state</h1>
      <div className="mw-600" style={{ display: 'flex', flexDirection: 'column' }}>
        <ul className="cards">
          <CardItem
            alt={imgThatWanakaTree.alt}
            src={imgThatWanakaTree.src}
            zoomProps={props}
          />
          <CardItem
            alt={imgGlenorchyLagoon.alt}
            src={imgGlenorchyLagoon.src}
            zoomProps={props}
          />
        </ul>
      </div>
    </main>
  )
}

function CardItem({
  alt,
  src,
  zoomProps,
}: {
  alt: string,
  src: string,
  zoomProps: typeof Zoom,
}) {
  const [isSelected, setIsSelected] = React.useState(false)

  const handleItemClick = React.useCallback(() => {
    setIsSelected(isSelected => !isSelected)
  }, [])

  const handleInputClick: React.MouseEventHandler<HTMLInputElement> = React.useCallback((e) => {
    e.stopPropagation()
  }, [])

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
    setIsSelected(e.currentTarget.checked)
  }, [])

  const handleZoomChange = React.useCallback<
    NonNullable<React.ComponentProps<typeof Zoom>['onZoomChange']>
  >((value, { event }) => {
    event.stopPropagation()

    console.log(
      'handleZoomChange (after event.stopPropagation())',
      { value, event }
    )
  }, [])

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className="card" onClick={handleItemClick}>
      <label>
        <input
          aria-label="Select item"
          checked={isSelected}
          onChange={handleInputChange}
          onClick={handleInputClick}
          type="checkbox"
        />
      </label>
      <Zoom {...zoomProps} onZoomChange={handleZoomChange} wrapElement="span">
        <img
          alt={alt}
          src={src}
          height="320"
          width="320"
          decoding="async"
          loading="lazy"
        />
      </Zoom>
    </li>
  )
}

// =============================================================================
// INTERACTIONS

export const AutomatedTest = Regular.bind({}, { title: '(Automated Test)' })
AutomatedTest.storyName = '(Automated Test)'
AutomatedTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await waitFor(async () => {
    await expect(
      canvas.getByLabelText(`Expand image: ${imgThatWanakaTree.alt}`)
    ).toBeVisible()
  })

  await delay(1000)

  // TAB to expand button and press ENTER
  await userEvent.tab()
  await userEvent.keyboard('{Enter}', { delay: 1000 })

  await waitFor(async () => {
    const dialog = document.querySelector('dialog')

    if (dialog == null) {
      throw new Error('rmiz automated test failure: cannot find <dialog>')
    }

    await expect(dialog).toHaveAttribute('open')
    await expect(
      dialog.querySelector(`img[alt="${imgThatWanakaTree.alt}"]`)
    ).toBeVisible()
    await expect(
      dialog.querySelector('[aria-label="Minimize image"')
    ).toHaveFocus()
  })

  await delay(1000)

  await userEvent.keyboard('{Escape}', { delay: 1000 })

  await waitFor(async () => {
    await expect(document.querySelector('dialog')).not.toHaveAttribute('open')
    await expect(
      canvas.getByLabelText(`Expand image: ${imgThatWanakaTree.alt}`)
    ).toHaveFocus()
  })
}

// =============================================================================
// HELPERS

const cx = (mods: Record<string, boolean>): string => {
  const cns: string[] = []

  for (const k in mods) {
    if (mods[k]) {
      cns.push(k)
    }
  }

  return cns.join(' ')
}

const delay = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration))

const useTimer = (duration: number) => {
  const [timer, setTimer] = React.useState(duration)

  React.useEffect(() => {
    const interval = setInterval(function () {
      if (timer === 0) {
        clearInterval(this)
      } else {
        setTimer(timer - 1000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  return { timer }
}
