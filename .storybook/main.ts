export default {
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  features: {
    interactionsDebugger: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
}
