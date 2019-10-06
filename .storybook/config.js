import { configure } from '@storybook/react'

function loadStories() {
  require('../stories.js')
}

configure(loadStories, module)
