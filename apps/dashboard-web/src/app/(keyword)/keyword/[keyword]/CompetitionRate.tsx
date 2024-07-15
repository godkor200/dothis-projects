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

  const { data: videoUploadCount } = useGetVideoUploadCount({
    keyword,
    relword: null,
  });

  const totalIncreaseViews = sumIncreaseViewsV2(dailyViewData);

  const totalVideoCount = sumVideoCountV2(videoUploadCount);

  const copetitionScore = getCompetitionScore({
    totalDailyView: totalIncreaseViews,
    videoCount: totalVideoCount,
  });

  const score = convertCompetitionScoreFormatToHTML({
    competitionScore: copetitionScore,
    totalDailyView: totalIncreaseViews,
  });

  const competitionRate = (totalIncreaseViews / totalVideoCount).toFixed(1);
  const formattedCompetitionRate =
    parseFloat(competitionRate).toLocaleString('ko-KR');

  return (
    <div>
      {score}

      <CustomTooltipComponent
        title={
          '검색한 키워드가 포함된 영상들이 획득한 조회수의 합계와 영상이 발행된 횟수를 나타냅니다. \n 같은 기간 동안 변화한 검색량과 비교해 콘텐츠의 수요와 공급을 예측하세요.'
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
    | undefined,
) {
  if (data) {
    return data?.reduce((total, item) => total + item.uniqueVideoCount, 0);
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
