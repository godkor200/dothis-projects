'use client';

import { useState } from 'react';

import CustomTooltipComponent from '@/components/common/Tooltip/CustomTooltip';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';
import {
  convertCompetitionScoreFormatToHTML,
  getCompetitionScore,
} from '@/utils/contents/competitionScore';

const CompetitionRate = ({ keyword }: { keyword: string }) => {
  const { data: dailyViewData } = useGetDailyViewV2({
    keyword,
  });

  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData);

  const totalVideoCount = sumVideoCount(dailyViewData);

  const copetitionScore = getCompetitionScore({
    totalDailyView: totalIncreaseViews,
    videoCount: totalVideoCount,
  });

  const score = convertCompetitionScoreFormatToHTML({
    competitionScore: copetitionScore,
    totalDailyView: totalIncreaseViews,
  });

  const competitionRate = (totalIncreaseViews / totalVideoCount).toFixed(0);

  const formattedCompetitionRate =
    parseFloat(competitionRate).toLocaleString('ko-KR');

  return (
    <div>
      {score}

      {dailyViewData && (
        <CustomTooltipComponent
          title={
            '발행된 영상의 수와 조회수를 비교해 계산한 영상들의 평균 조회수입니다. \n 경쟁강도가 좋아도 평균조회수가 낮다면 좋은 결과를 예상하기 어렵습니다.'
          }
          tooltipOptions={{ side: 'bottom', sideOffset: 15, align: 'end' }}
        >
          <p className="text-grey600 mt-2 cursor-pointer whitespace-nowrap text-center font-[500]">
            연관 영상의 조회수 평균{' '}
            <span className="text-primary500">
              {isNaN(totalIncreaseViews / totalVideoCount)
                ? 0
                : formattedCompetitionRate}
            </span>
          </p>
        </CustomTooltipComponent>
      )}
    </div>
  );
};

export default CompetitionRate;

// increaseViews 값을 모두 더하는 함수
export function sumIncreaseViews(
  data: (
    | {
        date: string;
        uniqueVideoCount: number;
        increaseComments: number;
        increaseLikes: number;
        increaseViews: number;
      }[]
    | undefined
  )[],
) {
  return data.reduce((total, nestedArray) => {
    if (nestedArray) {
      return (
        total +
        nestedArray.reduce((subtotal, item) => subtotal + item.increaseViews, 0)
      );
    }
    return total;
  }, 0 as number);
}

export function sumIncreaseViewsV2(
  data:
    | {
        date: string;
        uniqueVideoCount: number;
        increaseComments: number;
        increaseLikes: number;
        increaseViews: number;
      }[]
    | {
        date: string;
        maxPerformance: number;
        increaseViews: number;
        expectedHits: number;
        minPerformance: number;
        uniqueVideoCount?: number | undefined;
        increaseComments?: number | undefined;
        increaseLikes?: number | undefined;
      }[]
    | undefined,
) {
  if (data) {
    return data?.reduce((total, item) => total + item.increaseViews, 0);
  }
  return 0;
}

// uniqueVideoCount 값을 모두 더하는 함수
export function sumVideoCount(
  data:
    | {
        date: string;
        uniqueVideoCount: number;
        increaseComments: number;
        increaseLikes: number;
        increaseViews: number;
      }[]
    | {
        date: string;
        maxPerformance: number;
        increaseViews: number;
        expectedHits: number;
        minPerformance: number;
        uniqueVideoCount?: number;
        increaseComments?: number;
        increaseLikes?: number;
      }[]
    | undefined,
) {
  if (data) {
    return data?.reduce(
      (total, item) => total + (item.uniqueVideoCount ?? 0),
      0,
    );
  }
  return 0;
}

export function sumVideoCountV2(
  data:
    | {
        number: number;
        date: string;
      }[]
    | undefined,
) {
  if (data) {
    return data.reduce((total, item) => total + item.number, 0);
  }
  return 0;
}
