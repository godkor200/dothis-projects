'use client';

import { useState } from 'react';

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

  return (
    <div>
      {score}

      <p className="text-grey600 mt-2 text-center font-[500]">
        연관 영상의 조회수 평균{' '}
        <span className="text-primary500">
          {isNaN(totalIncreaseViews / totalVideoCount)
            ? 0
            : totalIncreaseViews / totalVideoCount}
        </span>
      </p>
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
        nestedArray.reduce(
          (subtotal, item) => subtotal + item.uniqueVideoCount,
          0,
        )
      );
    }
    return total;
  }, 0 as number);
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
