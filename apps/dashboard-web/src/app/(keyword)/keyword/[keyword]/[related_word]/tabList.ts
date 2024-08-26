import type { Route } from 'next';

type TabList = {
  title: string;
  link: string;
};
// dynamic Route 후 path인데, Route로 타입추론이 안된다.

export const tabList = [
  // { title: '요약', link: 'summary' },
  { title: '분석', link: 'analysis' },
  { title: '비교', link: 'comparison' },
  { title: '인사이트', link: 'insight' },
] as const;

export const channelTabList = [
  { title: '개요', link: 'summary' },
  { title: '채널 분석', link: 'channel-analysis' },
  { title: '경쟁 분석', link: 'competitive-analysis' },
  { title: '영상 진단', link: 'video-assessment' },
];
