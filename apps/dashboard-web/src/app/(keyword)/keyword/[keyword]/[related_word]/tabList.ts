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

export const CHANNEL_VIEW_TYPE_TAB_LIST = [
  { title: '추천 유사 채널', link: 'recommended-channels' },
  { title: '구독자의 관심 채널', link: 'subscribers-channels' },
  { title: '전체 채널', link: 'all-channels' },
];

export const CHANNEL_COMPARISON_TAB_LIST = [
  { title: '콘텐츠 비교', link: 'video' },
  { title: '영상 타임라인', link: 'timeline' },
  { title: '활동 성과 비교', link: 'performance' },
];
