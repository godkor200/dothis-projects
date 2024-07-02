import type { Route } from 'next';

type TabList = {
  title: string;
  link: string;
};
// dynamic Route 후 path인데, Route로 타입추론이 안된다.

export const tabList = [
  { title: '요약', link: 'summary' },
  { title: '분석', link: 'analysis' },
  { title: '비교', link: 'comparison' },
  { title: '인사이트', link: 'insight' },
] as const;
