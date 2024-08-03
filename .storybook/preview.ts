export const parameters = {
  options: {
    showPanel: false,
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
