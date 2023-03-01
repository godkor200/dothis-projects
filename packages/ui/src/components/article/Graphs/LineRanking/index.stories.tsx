import type { Meta, StoryObj } from '@storybook/react';
import format from 'date-fns/format';

import { LineRanking } from '.';

type Ranking = {
  date: string;
  rank: number;
};

type ParsedRanking = {
  date: Date;
  rank: number;
};
const dateConverter = (ranking: Ranking): ParsedRanking => {
  return {
    date: new Date(ranking.date),
    rank: ranking.rank,
  };
};

const meta = {
  title: 'visx/LineRanking',
  component: LineRanking,
} satisfies Meta<typeof LineRanking>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
  {
    name: 'A',
    rankings: [
      {
        date: '2021-1-1',
        rank: 3,
      },
      {
        date: '2021-1-2',
        rank: 1,
      },
      {
        date: '2021-1-3',
        rank: 2,
      },
    ],
  },

  {
    name: 'B',
    rankings: [
      {
        date: '2021-1-1',
        rank: 1,
      },
      {
        date: '2021-1-2',
        rank: 2,
      },
      {
        date: '2021-1-3',
        rank: 3,
      },
    ],
  },
  {
    name: 'C',
    rankings: [
      {
        date: '2021-1-1',
        rank: 2,
      },
      {
        date: '2021-1-2',
        rank: 3,
      },
      {
        date: '2021-1-3',
        rank: 1,
      },
    ],
  },

  {
    name: 'D',
    rankings: [
      {
        date: '2021-1-1',
        rank: 4,
      },
      {
        date: '2021-1-2',
        rank: 4,
      },
      {
        date: '2021-1-3',
        rank: 4,
      },
    ],
  },
];

const parsedData = data.map((d) => ({
  name: d.name,
  rankings: d.rankings.map(dateConverter),
}));
const myDateFormatter = (d: Date) => format(d, 'yyyy-MM-dd');

export const Sample: Story = {
  args: {
    data: parsedData,
    dateFormatter: myDateFormatter,
    Tooltip: ({ name, data }) => (
      <div>
        <p>{myDateFormatter(data.date)}</p>

        <p>
          <strong>{name}</strong>: {data.rank}위
        </p>
      </div>
    ),
  },
};
