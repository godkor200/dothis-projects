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

export const accountTabList = [
  { title: '계정 정보', link: 'my-account' },
  { title: '멤버쉽 관리', link: 'plans' },
  { title: '문의하기', link: 'help' },
];
