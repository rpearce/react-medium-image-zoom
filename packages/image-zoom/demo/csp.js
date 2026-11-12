// A classic script in <head>, so it listens before any stylesheet loads.
const lines = []

const render = () => {
  const out = document.getElementById('violations')
  if (out !== null) {
    out.textContent = lines.length === 0 ? 'no violations' : lines.join('\n')
  }
}

document.addEventListener('securitypolicyviolation', event => {
  lines.push(`${event.violatedDirective}: ${event.blockedURI}`)
  render()
})

window.addEventListener('load', render)
