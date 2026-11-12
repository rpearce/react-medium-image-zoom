import type { ImageZoomElement } from '../src/index.js'

// modalContent: a caption added once to the built-in modal content. The
// spec's vanilla example, with the narrowing TypeScript needs, inside a
// function because the repo's `module` setting has no top-level await.
async function main(): Promise<void> {
  await customElements.whenDefined('image-zoom')

  const el = document.querySelector<ImageZoomElement>('#tree')
  const template = document.querySelector<HTMLTemplateElement>('#tree-caption')
  const caption = template?.content.firstElementChild?.cloneNode(true)
  if (el === null || !(caption instanceof HTMLElement)) return
  el.modalContent?.append(caption) // once

  const render = (): void => {
    const s = el.state
    const w = s.modalImgStyle.width
    const h = s.modalImgStyle.height
    const hasSize = w !== undefined && h !== undefined
    const wide = hasSize && w / h > innerWidth / innerHeight
    caption.classList.toggle('zoom-caption--loaded', s.modalState === 'LOADED')
    caption.classList.toggle('zoom-caption--bottom', hasSize && wide)
    caption.classList.toggle('zoom-caption--left', hasSize && !wide)
  }

  el.addEventListener('statechange', render)
  render()
}

void main()
