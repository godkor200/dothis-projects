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
    },
    {
      title: '기대 조회 수',
      content: `${expectedView}회`,
    },
    {
      title: '경쟁 강도',
      content: convertCompetitionScoreFormat(competitionScore),
    },
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
