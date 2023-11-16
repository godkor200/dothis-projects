'use client';

import { useMemo } from 'react';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useKeyword from '@/hooks/user/useKeyword';
import { averageViews, formatToLineGraph } from '@/utils/contents/dailyview';

interface Props {
  expectedView: number;
}

const AnalysisWidgetList = ({ expectedView }: Props) => {
  const { hashKeywordList } = useKeyword();

  const analysisData = [
    {
      title: '키워드',
      content: hashKeywordList[0],
    },
    {
      title: '기대 조회 수',
      content: `${expectedView}배`,
    },
    { title: '경쟁 강도', content: '아주 좋음 😄' },
  ];

  return (
    <ul className="flex gap-[22px]">
      {analysisData.map(({ title, content }) => (
        <AnalysisWidgetItem key={title} title={title} content={content} />
      ))}
    </ul>
  );
};

export default AnalysisWidgetList;
