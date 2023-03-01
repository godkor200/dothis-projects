import type { Meta, StoryObj } from '@storybook/react';

import AnimatedNumber from '.';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ui/AnimatedNumber',
  component: AnimatedNumber,
} as Meta<typeof AnimatedNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    value: 0,
  },
};
