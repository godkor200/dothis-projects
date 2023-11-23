'use client';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import useKeyword from '@/hooks/user/useKeyword';

interface Props {
  expectedView: number;
  competitionScore: number | undefined;
}

const AnalysisWidgetList = ({ expectedView, competitionScore }: Props) => {
  const { hashKeywordList } = useKeyword();

  const getCompetitionText = (competitionScore: number | undefined) => {
    if (competitionScore === undefined) {
      return '파악중';
    }

    if (competitionScore > 90) {
      return '아주 좋음 😄';
    } else if (competitionScore > 70) {
      return '좋음 😊';
    } else if (competitionScore > 30) {
      return '보통 🙂';
    } else if (competitionScore > 10) {
      return '나쁨 🙁';
    } else if (competitionScore >= 0) {
      return '매우 나쁨 ☹';
    }
    return '파악중';
  };

  const analysisData = [
    {
      title: '키워드',
      content: hashKeywordList[0],
    },
    {
      title: '기대 조회 수',
      content: `${expectedView}배`,
    },
    { title: '경쟁 강도', content: getCompetitionText(competitionScore) },
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
