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
  // NOTE: For testing crossorigin
  //webpackFinal: async (config) => {
  //  config.devServer = {
  //    headers: {
  //      'Access-Control-Allow-Origin': '*',
  //    },
  //  }
  //  return config
  //},
}
