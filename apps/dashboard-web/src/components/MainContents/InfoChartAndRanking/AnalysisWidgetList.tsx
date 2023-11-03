'use client';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import useKeyword from '@/hooks/user/useKeyword';
import { DUMMY_ANALYSIS_WIDGET } from '@/mocks/chart/summary';

const AnalysisWidgetList = () => {
  const { hashKeywordList } = useKeyword();
  return (
    <ul className="flex gap-[22px]">
      {DUMMY_ANALYSIS_WIDGET.map(({ title, content }) => (
        <AnalysisWidgetItem key={title} title={title} content={content} />
      ))}
    </ul>
  );
};

export default AnalysisWidgetList;
