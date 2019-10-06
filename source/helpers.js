import { useEffect, useState } from 'react'

const btnStyle =
  'margin:0;' +
  'padding:0;' +
  'border:none;' +
  'border-radius:0;' +
  'font:inherit;' +
  'color:inherit;' +
  'background:none;' +
  'appearance:none;' +
  '-webkit-appearance:none;' +
  'cursor:zoom-out;'

const items = {}

// unzoom :: String -> String
export const unzoom = id => {
  if (cacheContains(id)) {
    removePortalContainer(items[id])
    return cleanup(id)
  }

  return id
}

const getSize = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  outerHeight: window.outerHeight,
  outerWidth: window.outerWidth
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize())
  const handleResize = () => setWindowSize(getSize())

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

// zoom :: (Node, String, Node) -> Node
export const zoom = (containerEl, id, el) => {
  const newEl = el.cloneNode(true)
  const portalEl = createPortalContainer('div', id)
  const wrapEl = document.createElement('div')
  const btnEl = document.createElement('button')

  btnEl.style = btnStyle
  btnEl.addEventListener('click', e => {
    e.preventDefault()

    if (cacheContains(id)) {
      unzoom(id)
    }
  })
  btnEl.appendChild(newEl)
  wrapEl.appendChild(btnEl)
  portalEl.appendChild(wrapEl)
  containerEl.appendChild(portalEl)

  cache(id, portalEl)

  return items[id]
}

// cache :: String -> Node -> String
export const cache = (id, el) => {
  items[id] = el
  return id
}

// cacheContainer :: String -> Bool
const cacheContains = id => !!items[id]

// cleanup :: String -> String
export const cleanup = id => {
  delete items[id]
  return id
}

// createPortalContainer :: (String, String) -> Node
const createPortalContainer = (tag, id) => {
  const portal = document.createElement(tag)
  portal.setAttribute('id', id)
  document.body.appendChild(portal)
  return portal
}

// removePortalContainer :: Node -> Bool
const removePortalContainer = portal => {
  document.body.removeChild(portal)
  return true
}
