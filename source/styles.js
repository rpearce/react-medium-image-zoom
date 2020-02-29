export const wrap = {
  position: 'relative',
  display: 'inline-flex'
}

export const wrapHidden = {
  composes: 'wrap',
  visibility: 'hidden'
}

export const btn = {
  cursor: 'zoom-in',
  outline: 'none'
}

export const trigger = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',

  /* reset styles */
  margin: 0,
  padding: 0,
  border: 'none',
  borderRadius: 0,
  font: 'inherit',
  color: 'inherit',
  background: 'none',
  appearance: 'none'
}

export const overlay = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transitionProperty: 'background-color'
}

export const btnActivated = {
  cursor: 'zoom-out'
}

export const content = {
  position: 'absolute',
  transitionProperty: 'transform',
  transformOrigin: 'center center'
}
