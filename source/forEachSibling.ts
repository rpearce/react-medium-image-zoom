export interface ForEachSibling {
  (handler: (el: Element) => void, target: Element): void
}

const forEachSibling: ForEachSibling = (handler, target) => {
  const nodes = target.parentNode?.children || []

  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i]

    if (el && el !== target) {
      handler(el)
    }
  }
}

export default forEachSibling
