import 'focus-options-polyfill'
import React, {
  memo,
  SFC,
  StrictMode,
  useCallback,
  useRef,
  useState
} from 'react'
import './styles.css'
import UncontrolledActivated from './UncontrolledActivated'

interface Props {
  children: React.ReactNode
  closeText?: string
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  portalEl?: HTMLElement
  scrollableEl?: HTMLElement | Window
  transitionDuration?: number
  wrapElement?: 'div' | 'span'
  wrapStyle?: object
  zoomMargin?: number
  zoomZindex?: number
}

const Uncontrolled: SFC<Props> = ({
  children,
  closeText = 'Unzoom image',
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  portalEl,
  openText = 'Zoom image',
  scrollableEl,
  transitionDuration = 300,
  wrapElement = 'div',
  wrapStyle,
  zoomMargin = 0,
  zoomZindex = 2147483647
}: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isChildLoaded, setIsChildLoaded] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement | HTMLSpanElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        setIsActive(true)
      }
    },
    [isActive]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsActive(false)
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const isExpanded = isActive && isChildLoaded
  const wrapType = isExpanded ? 'hidden' : 'visible'

  const content = (
    <React.Fragment>
      {children}
      <button
        aria-label={openText}
        data-rmiz-btn-open
        onClick={handleClickTrigger}
        ref={btnRef}
      />
      {typeof window !== 'undefined' && isActive && (
        <UncontrolledActivated
          closeText={closeText}
          onLoad={handleChildLoad}
          onUnload={handleChildUnload}
          overlayBgColorEnd={overlayBgColorEnd}
          overlayBgColorStart={overlayBgColorStart}
          parentRef={wrapRef}
          portalEl={portalEl}
          scrollableEl={scrollableEl}
          transitionDuration={transitionDuration}
          zoomMargin={zoomMargin}
          zoomZindex={zoomZindex}
        >
          {children}
        </UncontrolledActivated>
      )}
    </React.Fragment>
  )

  let wrap: React.ReactNode
  if (wrapElement === 'span') {
    wrap = (
      <span
        data-rmiz-wrap={wrapType}
        ref={wrapRef as React.RefObject<HTMLSpanElement>}
        style={wrapStyle}
      >
        {content}
      </span>
    )
  } else {
    wrap = (
      <div
        data-rmiz-wrap={wrapType}
        ref={wrapRef as React.RefObject<HTMLDivElement>}
        style={wrapStyle}
      >
        {content}
      </div>
    )
  }

  return <StrictMode>{wrap}</StrictMode>
}

export default memo(Uncontrolled)
