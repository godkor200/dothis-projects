'use client';

import { useState } from 'react';

import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import {
  convertCompetitionScoreFormatToHTML,
  getCompetitionScore,
} from '@/utils/contents/competitionScore';

const CompetitionRate = ({ keyword }: { keyword: string }) => {
  const { data } = useGetDailyView({ keyword: keyword, relword: keyword });

  const totalIncreaseViews = sumIncreaseViews(data);

  const totalVideo = sumVideoCount(data);

  const copetitionScore = getCompetitionScore({
    totalDailyView: totalIncreaseViews,
    videoCount: totalVideo,
  });

  const Score = convertCompetitionScoreFormatToHTML({
    competitionScore: copetitionScore,
    totalDailyView: totalIncreaseViews,
  });

  // 결과 출력

  return <>{Score}</>;
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
