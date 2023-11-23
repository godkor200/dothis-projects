import type { Meta, StoryObj } from '@storybook/react';

import Test from './test';

const meta = {
  title: 'test',
  component: Test,
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    name: 'hj',
  },
};
