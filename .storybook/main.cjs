module.exports = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],
  stories: ['../stories/index.tsx'],
  features: {
    storyStoreV7: true,
  },
}
