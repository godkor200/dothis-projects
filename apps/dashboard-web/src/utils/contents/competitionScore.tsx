import { GUEST_AVERAGEVIEW } from '@/constants/guest';

import { cn } from '../cn';

export const convertCompetitionScoreFormat = (
  competitionScore: number | undefined,
) => {
  if (competitionScore === undefined) {
    return '파악중';
  }

  if (competitionScore > 20) {
    return '아주 좋음 😄';
  } else if (competitionScore > 5) {
    return '좋음 😊';
  } else if (competitionScore > 1) {
    return '보통 🙂';
  } else if (competitionScore > 0.1) {
    return '나쁨 🙁';
  } else if (competitionScore >= 0) {
    return '매우 나쁨 ☹';
  }
  return '파악중';
};

const CompetitionTag = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <p className={cn(`text-[20px] font-bold text-center text-${color} `)}>
      {children}
    </p>
  );
};

export const convertCompetitionScoreFormatToHTML = ({
  competitionScore,
  totalDailyView,
  videoCount = 1000,
}: {
  competitionScore: number | undefined;
  totalDailyView: number;
  videoCount?: number;
}) => {
  if (
    competitionScore === undefined ||
    competitionScore === 0 ||
    totalDailyView === 0
  ) {
    return <CompetitionTag color="grey600">{`분석중`}</CompetitionTag>;
  }

  if (totalDailyView < 1_000_000) {
    return <CompetitionTag color="chip-red">{`수요부족`}</CompetitionTag>;
  }

  if (competitionScore > 20) {
    return <CompetitionTag color="sky">{`블루오션`}</CompetitionTag>;
  } else if (competitionScore > 5) {
    if (videoCount > 1000) {
      return <CompetitionTag color="sky">{`수요 폭발`}</CompetitionTag>;
    }
    return <CompetitionTag color="green">{`공급 부족`}</CompetitionTag>;
  } else if (competitionScore > 1) {
    return <CompetitionTag color="green">{`양호`}</CompetitionTag>;
  } else if (competitionScore > 0.1) {
    return <CompetitionTag color="yellow">{`경쟁 과열`}</CompetitionTag>;
  } else if (competitionScore >= 0) {
    return <CompetitionTag color="chip-red">{`공급 과잉`}</CompetitionTag>;
  }
  return <CompetitionTag color="grey600">{`분석중`}</CompetitionTag>;
};

/**
 * 경쟁수치를 구하는 함수.
 * @param lastDailyView 지정한 날짜에서 마지막 날짜의 일일 조회 수를 가져옵니다 (현재 at메서드를 사용해서 가져오고 있어서 undefined타입 추가)
 * @param videoCount 총 비디오 갯수를 가져옵니다.
 * @returns params 중 하나라도 Boolean이 존재할 때 0을 반환하며, 그 외  lastDailyView / videoCount 를 반환합니다.
 */

export const getCompetitionScore = ({
  totalDailyView,
  videoCount,
  userAverageViews,
}: {
  totalDailyView: number;
  videoCount: number;
  userAverageViews?: number;
}) => {
  if (!totalDailyView || !videoCount) {
    return 0;
  }
  return totalDailyView / videoCount / (userAverageViews || GUEST_AVERAGEVIEW);
};
