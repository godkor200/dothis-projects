import type { ComponentMeta, ComponentStory } from '@storybook/react';
import LineChart from 'components/article/Graphs/LineChart';
import React from 'react';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Graphs/LineChart',
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

export const Basic: ComponentStory<typeof LineChart> = () => (
  <>
    LineChart
    <LineChart data={data} />
  </>
);

const data = [
  {
    id: 'japan',
    data: [
      {
        x: 'plane',
        y: 68,
      },
      {
        x: 'helicopter',
        y: 171,
      },
      {
        x: 'boat',
        y: 16,
      },
      {
        x: 'train',
        y: 193,
      },
      {
        x: 'subway',
        y: 213,
      },
      {
        x: 'bus',
        y: 268,
      },
      {
        x: 'car',
        y: 251,
      },
      {
        x: 'moto',
        y: 275,
      },
      {
        x: 'bicycle',
        y: 297,
      },
      {
        x: 'horse',
        y: 53,
      },
      {
        x: 'skateboard',
        y: 71,
      },
      {
        x: 'others',
        y: 278,
      },
    ],
  },
  {
    id: 'france',
    data: [
      {
        x: 'plane',
        y: 240,
      },
      {
        x: 'helicopter',
        y: 93,
      },
      {
        x: 'boat',
        y: 14,
      },
      {
        x: 'train',
        y: 102,
      },
      {
        x: 'subway',
        y: 24,
      },
      {
        x: 'bus',
        y: 168,
      },
      {
        x: 'car',
        y: 254,
      },
      {
        x: 'moto',
        y: 254,
      },
      {
        x: 'bicycle',
        y: 129,
      },
      {
        x: 'horse',
        y: 157,
      },
      {
        x: 'skateboard',
        y: 201,
      },
      {
        x: 'others',
        y: 159,
      },
    ],
  },
  {
    id: 'us',
    data: [
      {
        x: 'plane',
        y: 168,
      },
      {
        x: 'helicopter',
        y: 299,
      },
      {
        x: 'boat',
        y: 286,
      },
      {
        x: 'train',
        y: 288,
      },
      {
        x: 'subway',
        y: 18,
      },
      {
        x: 'bus',
        y: 247,
      },
      {
        x: 'car',
        y: 186,
      },
      {
        x: 'moto',
        y: 6,
      },
      {
        x: 'bicycle',
        y: 242,
      },
      {
        x: 'horse',
        y: 78,
      },
      {
        x: 'skateboard',
        y: 168,
      },
      {
        x: 'others',
        y: 36,
      },
    ],
  },
  {
    id: 'germany',
    data: [
      {
        x: 'plane',
        y: 286,
      },
      {
        x: 'helicopter',
        y: 244,
      },
      {
        x: 'boat',
        y: 287,
      },
      {
        x: 'train',
        y: 172,
      },
      {
        x: 'subway',
        y: 70,
      },
      {
        x: 'bus',
        y: 75,
      },
      {
        x: 'car',
        y: 190,
      },
      {
        x: 'moto',
        y: 73,
      },
      {
        x: 'bicycle',
        y: 37,
      },
      {
        x: 'horse',
        y: 217,
      },
      {
        x: 'skateboard',
        y: 267,
      },
      {
        x: 'others',
        y: 37,
      },
    ],
  },
  {
    id: 'norway',
    data: [
      {
        x: 'plane',
        y: 245,
      },
      {
        x: 'helicopter',
        y: 132,
      },
      {
        x: 'boat',
        y: 161,
      },
      {
        x: 'train',
        y: 224,
      },
      {
        x: 'subway',
        y: 21,
      },
      {
        x: 'bus',
        y: 291,
      },
      {
        x: 'car',
        y: 260,
      },
      {
        x: 'moto',
        y: 23,
      },
      {
        x: 'bicycle',
        y: 295,
      },
      {
        x: 'horse',
        y: 241,
      },
      {
        x: 'skateboard',
        y: 201,
      },
      {
        x: 'others',
        y: 299,
      },
    ],
  },
];
