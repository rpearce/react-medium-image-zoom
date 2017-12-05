const enterKey = {
  keys: [ 'Enter' ],
  keyCode: 13
}

const tabKey = {
  keys: [ 'Tab' ],
  keyCode: 9
}

const spaceBarKey = {
  keys: [ ' ' ],
  keyCode: 32
}

const escapeKey = {
  keys: [ 'Escape', 'Esc' ],
  keyCode: 27
}

/**
 * Per the MDN, KeyboardEvent.keyCode and KeyboardEvent.which
 * are deprecated. KeyboardEvent.code is not to be used to
 * determine what character corresponds with a key event
 * and is also not supported on Edge. KeyboardEvent.key is the
 * preferred method, but seems less reliable than keyCode given
 * it returns different strings for different browsers; ex: "Escape"
 * in Chrome, but "Esc" in Edge. This function future proofs
 * against deprecation, while still giving preference to the more
 * reliable keyCode.
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
 *
 * KeyMap : { keyCode: Number, keys: [ String ] }
 * isKey : KeyMap -> KeyboardEvent -> Boolean
 */
const isKey = ({ keyCode, keys }) => e =>
  e.keyCode ? e.keyCode === keyCode : keys.indexOf(e.key) !== -1

// is<X>Key : KeyboardEvent -> Boolean
export const isEnterOrSpaceBarKey = e => isKey(enterKey)(e) || isSpaceBarKey(e)
export const isTabKey = isKey(tabKey)
export const isSpaceBarKey = isKey(spaceBarKey)
export const isEscapeKey = isKey(escapeKey)
