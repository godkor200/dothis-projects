import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      option: ['S', 'M', 'L'],
      control: 'radio',
    },
    theme: {
      option: ['primary', 'outlined', 'contained'],
      control: 'select',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'S',
    theme: 'primary',
  },

  render: (args) => <Button {...args}>버튼</Button>,
};

export const OutLine: Story = {
  args: {
    size: 'M',
    theme: 'outlined',
  },

  render: (args) => <Button {...args}>버튼</Button>,
};

export const Contain: Story = {
  args: {
    size: 'L',
    theme: 'contained',
  },

  render: (args) => <Button {...args}>버튼</Button>,
};
