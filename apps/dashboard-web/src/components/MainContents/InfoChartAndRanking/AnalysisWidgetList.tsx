'use client';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import useKeyword from '@/hooks/user/useKeyword';

const AnalysisWidgetList = () => {
  const { hashKeywordList } = useKeyword();

  const analysisData = [
    {
      title: '키워드',
      content: hashKeywordList[0],
    },
    { title: '기대 조회 수', content: '17.51배' },
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
