import 'focus-options-polyfill'
import React, {
  memo,
  SFC,
  StrictMode,
  useCallback,
  useRef,
  useState
} from 'react'
import ControlledActivated from './ControlledActivated'
import './styles.css'

interface Props {
  children: React.ReactNode
  closeText?: string
  isZoomed: boolean
  onZoomChange?: (value: boolean) => void
  openText?: string
  overlayBgColorEnd?: string
  overlayBgColorStart?: string
  portalEl?: HTMLElement
  scrollableEl?: HTMLElement | Window
  transitionDuration?: number
  wrapElement?: 'div' | 'span'
  wrapStyle?: React.CSSProperties | undefined
  zoomMargin?: number
  zoomZindex?: number
}

const Controlled: SFC<Props> = ({
  children,
  closeText = 'Unzoom image',
  isZoomed: isActive,
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  portalEl,
  onZoomChange,
  openText = 'Zoom image',
  scrollableEl,
  transitionDuration = 300,
  wrapElement = 'div',
  wrapStyle,
  zoomMargin = 0,
  zoomZindex = 2147483647
}: Props) => {
  const [isChildLoaded, setIsChildLoaded] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement | HTMLSpanElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive && onZoomChange) {
        e.preventDefault()
        onZoomChange(true)
      }
    },
    [isActive, onZoomChange]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const wrapType = isChildLoaded ? 'hidden' : 'visible'

  const content = (
    <React.Fragment>
      {children}
      <button
        aria-label={openText}
        data-rmiz-btn-open
        onClick={handleClickTrigger}
        ref={btnRef}
        type="button"
      />
      {typeof window !== 'undefined' && (
        <ControlledActivated
          closeText={closeText}
          isActive={isActive}
          onLoad={handleChildLoad}
          onUnload={handleChildUnload}
          onZoomChange={onZoomChange}
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
        </ControlledActivated>
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

export default memo(Controlled)
