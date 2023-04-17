import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../Button/index';
import LayerPopoup from './index';

const meta = {
  title: 'ui/LayerPopoup',
  component: LayerPopoup,
} satisfies Meta<typeof LayerPopoup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TriggerButton: Story = {
  args: {
    Content: {
      children: <div className="width=[320px]">dㅇㄴㅁㅇㅁㄴㅇdd</div>,
    },
    Trigger: {
      asChild: true,
      children: (
        <Button theme="primary" size="small">
          trigger
        </Button>
      ),
    },
  },
};
