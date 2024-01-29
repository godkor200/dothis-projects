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
      content: `${expectedView?.toLocaleString('ko-kr')}회`,
      hasTooltip: true,
      tooltipText:
        '기대 조회수란, 검색된 영상들의 성과와 사용자 채널의 평균 조회수를 바탕으로 계산한 조회수 예측 값입니다. \n 검색된 키워드를 주제로 영상을 만들면 해당 조회수 만큼 얻을 것으로 예상됩니다.',
    },
    {
      title: '경쟁 강도',
      content: convertCompetitionScoreFormat(competitionScore),
      hasTooltip: true,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
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
