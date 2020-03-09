import axe from 'axe-core'

const testA11y = (html: axe.ElementContext): Promise<boolean> =>
  new Promise((resolve, reject) => {
    axe.run(html, {}, (err, { violations }) => {
      if (err) {
        reject(err)
      } else if (violations.length > 0) {
        reject(violations)
      } else {
        resolve(true)
      }
    })
  })

export default testA11y
