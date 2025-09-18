import React from 'react'
import type { StoryContext } from '@storybook/react-webpack5'

const BackgroundWrapper = ({
  children,
  context,
}: {
  children: React.ReactNode,
  context: StoryContext,
}) => {
  const bg = context.globals.backgrounds.value ?? 'light'

  return <div className={`bg-${bg}`}>{children}</div>
}

export const decorators = [
  (Story: () => React.JSX.Element, context: StoryContext) => (
    <BackgroundWrapper context={context}>
      <Story />
    </BackgroundWrapper>
  ),
]

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
} as const
