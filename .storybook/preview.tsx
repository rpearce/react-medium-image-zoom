import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Galleries',
          '<img>',
          '<svg>',
          '<picture>',
          '<figure>',
          'Custom Controls',
        ],
      },
    },
  },
}

export default preview
