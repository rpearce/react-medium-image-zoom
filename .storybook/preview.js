export const parameters = {
  options: {
    storySort: {
      order: [
        'Introduction',
        'Galleries',
        '*',
        '<img>',
        '*',
        '<svg>',
        '*',
        '<picture>',
        '*',
        '<figure>',
        '*',
        'Custom Controls',
        '*',
      ],
    },
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
}
