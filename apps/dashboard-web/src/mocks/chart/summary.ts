type Summary = SummaryItem[];

export interface SummaryItem {
  title: string;
  content: string;
}

export const SUMMARY: Summary = [
  { title: '키워드', content: '먹방' },
  { title: '기대 조회 수', content: '17.51배' },
  { title: '경쟁 강도', content: '아주 좋음 😄' },
];
