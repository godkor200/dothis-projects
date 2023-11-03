import type { Meta, StoryObj } from '@storybook/react';

import type { TachometerGraphProps } from '.';
import { TachometerGraph } from '.';
import { defaultPercentValueInfo } from './utils';

const meta = {
  title: 'visx/TachometerGraph',
  component: TachometerGraph,
} satisfies Meta<typeof TachometerGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

const data: TachometerGraphProps['data'] = [
  { color: '#ff0000', label: '매우 높음' },
  { color: '#ff9900', label: '높음' },
  { color: '#ffc000', label: '보통' },
  { color: '#92d050', label: '낮음' },
  { color: '#00b050', label: '매우 낮음' },
];

const valueInfo: TachometerGraphProps['valueInfo'] = {
  ...defaultPercentValueInfo,
  maxLabel: '좋음',
  minLabel: '나쁨',
};

export const Sample: Story = {
  args: {
    data,
    valueInfo,
    value: 0,
  },
};
