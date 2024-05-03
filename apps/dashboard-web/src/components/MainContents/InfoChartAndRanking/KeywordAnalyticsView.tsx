'use client';

import { useEffect, useMemo } from 'react';

import type {
  SubscriberRange,
  SubscriberRangeVideoCounts,
} from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import { GUEST_AVERAGEVIEW } from '@/constants/guest';
import {
  useAveragePerformanceFormatter,
  useDailyViewDataFormatter,
} from '@/hooks/contents/useChartFormatter';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetPerformanceData from '@/hooks/react-query/query/useGetPerformanceData';
import useGetUserChannelData from '@/hooks/react-query/query/useGetUserChannelData';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import { useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { handleZeroDivision } from '@/utils/common';
import { getCompetitionScore } from '@/utils/contents/competitionScore';

import AnalysisWidgetList from './AnalysisWidgetList';
import AnalyticsSummaryCard from './AnalyticsSummaryCard';
import AnalyticsSummaryList from './AnalyticsSummaryList';
import CumulativeVideoChart from './CumulativeVideoChart';
import ViewChart from './ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const KeywordAnalyticsView = () => {
  const selectedWord = useSelectedWord();

  const { isLoading: dailyViewIsLoading } = useGetDailyView(selectedWord);

  const { data: dailyViewData } = useDailyViewDataFormatter(selectedWord);

  const firstDailyView = (dailyViewData.at(0) as SeriesDetail)?.y;
  const lastDailyView = (dailyViewData.at(-1) as SeriesDetail)?.y;

  const totalDailyView = (dailyViewData as SeriesDetail[])?.reduce<number>(
    (sum, item) => {
      if (item === null) {
        return sum;
      }
      if ((item as SeriesDetail)?.y === null) {
        return sum;
      }
      return sum + (item as SeriesDetail)?.y;
    },
    0,
  );

  const { isLoading: expectedViewIsLoading } =
    useGetPerformanceData(selectedWord);

  const { data: averagePerformanceData } =
    useAveragePerformanceFormatter(selectedWord);

  const lastAveragePerformance = (averagePerformanceData.at(-1) as SeriesDetail)
    ?.y;

  const { data: videoCountData, isLoading } = useGetVideoCount(selectedWord);

  const { totalCount, videoCountViewChartData } = useMemo(
    () =>
      videoCountData.reduce<{
        totalCount: number;
        videoCountViewChartData: SubscriberRangeVideoCounts;
      }>(
        (acc, dataItem) => {
          dataItem?.section?.forEach((sectionItem) => {
            const key = sectionItem.section;

            if (key in CONVERT_SUBSCRIBERANGE) {
              acc.totalCount += sectionItem.number;
              const existingRange =
                CONVERT_SUBSCRIBERANGE[key as SubscriberRange];
              const existingItem =
                acc.videoCountViewChartData[key as SubscriberRange];

              if (existingItem) {
                acc.videoCountViewChartData[key as SubscriberRange] +=
                  sectionItem.number;
              } else {
                acc.videoCountViewChartData[key as SubscriberRange] =
                  sectionItem.number;
              }
            }
          });

          return acc;
        },
        {
          totalCount: 0,
          videoCountViewChartData: {},
        } as {
          totalCount: number;
          videoCountViewChartData: SubscriberRangeVideoCounts;
        },
      ),
    [JSON.stringify(videoCountData)],
  );

  // 경쟁강도 구하는 로직 lastDailyView 절대값 설정도 고려해봐야함

  const competitionScore = getCompetitionScore({
    totalDailyView,
    videoCount: totalCount,
  });

  const {
    setVideoCount,
    setDailyViewTendency,
    setTotalDailyView,
    setExpectedPercentage,
    setHigherSubscribedChannelsCount,
  } = useGptOptionAction();

  useEffect(() => {
    if (!isLoading) {
      setVideoCount(videoCountData[0]?.videoTotal!);
    }
  }, [JSON.stringify(videoCountData)]);

  useEffect(() => {
    if (!dailyViewIsLoading.some((item) => item === true)) {
      setTotalDailyView(totalDailyView);

      setDailyViewTendency(handleZeroDivision(lastDailyView, firstDailyView));
    }
  }, [JSON.stringify(dailyViewData), JSON.stringify(dailyViewIsLoading)]);

  const { data: userChannelData, isLoading: userChannelIsLoading } =
    useGetUserChannelData();

  useEffect(() => {
    if (!isLoading && !dailyViewIsLoading.some((item) => item === true)) {
      // setCompetitionScore(Math.round(competitionScore * 100) / 100);

      // if('유저 데이터의 평균 조회수') {
      //   setCompetitionScore(lastExpectedView||0 /'유저 데이터의 평균 조회수')
      //   return
      // }
      if (lastAveragePerformance) {
        setExpectedPercentage(
          Number(
            ((lastAveragePerformance / GUEST_AVERAGEVIEW) * 100).toFixed(),
          ),
        );
      }
    }
  }, [
    isLoading,
    JSON.stringify(videoCountViewChartData),
    JSON.stringify(dailyViewIsLoading),
    lastAveragePerformance,
  ]);

  useEffect(() => {
    if (!userChannelIsLoading && !isLoading) {
      // findRange(userChannelData?.data.subscribers!);

      const current = findRangeKey(4444);

      setHigherSubscribedChannelsCount(
        findRangeValueSum(userChannelData?.data.subscribers!),
      );
    }
  }, [
    userChannelIsLoading,
    isLoading,
    JSON.stringify(videoCountViewChartData),
  ]);

  function findRangeValueSum(number: number) {
    let sum = 0;

    for (let range in CONVERT_SUBSCRIBERANGE) {
      if (range.includes('~')) {
        let [min, max] = range.split('~').map(Number);
        if (number < max) {
          sum += videoCountViewChartData[range as SubscriberRange];
        }
      } else if (range.includes('이상')) {
        let min = parseInt(range);
        if (number < min) {
          sum += videoCountViewChartData[range as SubscriberRange];
        }
      }
    }

    return sum;
  }

  return (
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <AnalysisWidgetList
        expectedView={lastAveragePerformance || 0}
        competitionScore={competitionScore}
      />
      <div className="flex h-[520px] w-full">
        <ViewChart />
        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <AnalyticsSummaryList
            totalView={totalDailyView || 0}
            viewCountChange={totalDailyView || 0}
            searchVolumeChange={totalDailyView || 0}
          />

          <CumulativeVideoChart
            totalCount={totalCount}
            videoCountsBySection={videoCountViewChartData}
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalyticsView;

function findRangeKey(number: number) {
  for (let range in CONVERT_SUBSCRIBERANGE) {
    if (range.includes('~')) {
      let [min, max] = range.split('~').map(Number);
      if (number >= min && number <= max) {
        return range;
      }
    } else if (range.includes('이상')) {
      let min = parseInt(range);
      if (number >= min) {
        return range;
      }
    }
  }
  return '1000~9999';
}
