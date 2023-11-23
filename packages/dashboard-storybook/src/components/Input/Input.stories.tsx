import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      defaultValue: '라벨',
      description: '입력할 정보의 이름을 명시합니다.',
      control: { type: 'text' },
    },
    placeholder: {
      defaultValue: '정보를 입력해주세요.',
      description: '입력할 정보의 특징을 명시합니다.',
      control: { type: 'text' },
    },
    description: {
      defaultValue: '설명을 입력해주세요.',
      description: '입력할 정보의 설명을 명시합니다.',
      control: { type: 'text' },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: '',
    placeholder: '정보를 입력해주세요.',
    description: '',
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '라벨',
  },
  render: (args) => <Input {...args} />,
};

export const WithDescription: Story = {
  args: {
    description: '설명을 입력해주세요.',
  },
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Input {...args} />,
};
