import type { ImageZoomElement } from '../src/index.js'

// custom-content: the page renders the modal content itself. The spec's
// vanilla example, with the narrowing TypeScript needs, inside a function
// because the repo's `module` setting has no top-level await.
async function main(): Promise<void> {
  await customElements.whenDefined('image-zoom')
  const el = document.querySelector<ImageZoomElement>(
    'image-zoom[custom-content]',
  )
  if (el === null) return

  const render = (): void => {
    const dialog = el.dialog
    if (dialog === null) return
    let content = dialog.querySelector('[data-rmiz-modal-content]')
    if (content === null) {
      content = document.createElement('div')
      content.setAttribute('data-rmiz-modal-content', '')
      content.innerHTML =
        '<figure><img data-rmiz-modal-img><figcaption>Rendered by the page</figcaption></figure>' +
        '<button type="button" data-rmiz-btn-unzoom aria-label="Minimize image">×</button>'
      content.addEventListener('click', e => {
        if (
          e.target === content ||
          (e.target instanceof Element &&
            e.target.matches('[data-rmiz-modal-img], [data-rmiz-btn-unzoom]'))
        ) {
          el.zoomed = false
        }
      })
      dialog.append(content)
    }
    const img = content.querySelector('[data-rmiz-modal-img]')
    if (img instanceof HTMLImageElement) {
      img.alt = el.state.alt ?? ''
      img.src = el.state.src ?? ''
    }
  }

  el.addEventListener('statechange', render)
  render()
}

void main()
