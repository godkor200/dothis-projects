import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from '@/components/ui/Button/Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Basic: ComponentStory<typeof Button> = () => (
  <>
    <h1>primary</h1>
    <Button theme="primary" h={40} p={12}>
      Button
    </Button>

    <h2>primaryOutline</h2>
    <Button theme="primaryOutline" h={40} p={12}>
      Button
    </Button>
    <h2>white</h2>
    <Button theme="white" h={40} p={12}>
      Button
    </Button>
  </>
);
