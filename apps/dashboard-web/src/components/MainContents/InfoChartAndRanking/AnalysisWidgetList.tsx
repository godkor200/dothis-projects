'use client';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import { useSelectedWord } from '@/store/selectedWordStore';
import { convertCompetitionScoreFormat } from '@/utils/contents/competitionScore';

interface Props {
  expectedView: number;
  competitionScore: number | undefined;
}

const AnalysisWidgetList = ({ expectedView, competitionScore }: Props) => {
  const selectedWord = useSelectedWord();

  const analysisData = [
    {
      title: '키워드',
      content: selectedWord.keyword!,
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: '기대 조회 수',
      content: `${expectedView}회`,
      hasTooltip: true,
      tooltipText: '기대 조회 수 툴팁',
    },
    {
      title: '경쟁 강도',
      content: convertCompetitionScoreFormat(competitionScore),
      hasTooltip: true,
      tooltipText: '경쟁 강도 툴팁',
    },
  ];

  return (
    <ul className="flex gap-[22px]">
      {analysisData.map(({ title, content, hasTooltip, tooltipText }) => (
        <AnalysisWidgetItem
          key={title}
          title={title}
          content={content}
          hasTooltip={hasTooltip}
          tooltipText={tooltipText}
        />
      ))}
    </ul>
  );
};

export default AnalysisWidgetList;
