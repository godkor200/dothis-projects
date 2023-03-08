import type { Meta, StoryObj } from '@storybook/react';

import AnimatedNumber from '.';

const meta = {
  title: 'ui/AnimatedNumber',
  component: AnimatedNumber,
} satisfies Meta<typeof AnimatedNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    value: 0,
    duration: 1000,
  },
};
