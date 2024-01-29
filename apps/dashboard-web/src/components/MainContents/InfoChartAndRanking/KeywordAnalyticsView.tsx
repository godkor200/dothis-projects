'use client';

import { useEffect, useMemo } from 'react';

import type { ResponseType, VideoCount } from '@/constants/convertText';
import { CONVERT_SUBSCRIBERANGE } from '@/constants/convertText';
import { GUEST_AVERAGEVIEW } from '@/constants/guest';
import {
  useDailyViewChartDataForNivo,
  useExpectedViewChartDataForNivo,
} from '@/hooks/contents/useLineGraph';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useGetUserChannelData from '@/hooks/react-query/query/useGetUserChannelData';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import { useGptOption, useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { handleZeroDivision } from '@/utils/common';
import { getCompetitionScore } from '@/utils/contents/competitionScore';

import AnalysisWidgetList from './AnalysisWidgetList';
import CumulativeVideoChart from './CumulativeVideoChart';
import DailyView from './DailyView';
import ViewChart from './ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const KeywordAnalyticsView = () => {
  const selectedWord = useSelectedWord();

  const { isLoading: dailyViewIsLoading } = useGetDailyView(selectedWord);

  const dailyViewChartData = useDailyViewChartDataForNivo(
    selectedWord,
    '일일 조회 수',
  );

  const lastDailyView = dailyViewChartData[0].data.at(-1)?.y;
  const totalDailyView = dailyViewChartData[0].data.reduce(
    (accumulator: number, currentValue: { x: string; y: number }) => {
      return accumulator + Number(currentValue.y);
    },
    0,
  );

  const { isLoading: expectedViewIsLoading } = useGetExpectedView(selectedWord);

  const expectedViewChartData = useExpectedViewChartDataForNivo(
    selectedWord,
    '기대 조회 수',
  );

  const lastExpectedView = expectedViewChartData[0].data.at(-1)?.y;

  const { data: videoCountData, isLoading } = useGetVideoCount(selectedWord);

  const { totalCount, videoCountViewChartData } = useMemo(
    () =>
      videoCountData.reduce<{
        totalCount: number;
        videoCountViewChartData: ResponseType;
      }>(
        (acc, dataItem) => {
          dataItem?.section.forEach((sectionItem) => {
            const key = sectionItem.section;

            if (key in CONVERT_SUBSCRIBERANGE) {
              acc.totalCount += sectionItem.number;
              const existingRange = CONVERT_SUBSCRIBERANGE[key as VideoCount];
              const existingItem =
                acc.videoCountViewChartData[key as VideoCount];

              if (existingItem) {
                existingItem.value += sectionItem.number;
              } else {
                acc.videoCountViewChartData[key as VideoCount] = {
                  id: existingRange,
                  label: existingRange,
                  value: sectionItem.number,
                };
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
          videoCountViewChartData: ResponseType;
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

      setDailyViewTendency(
        handleZeroDivision(
          dailyViewChartData[0].data.at(-1)?.y!,
          dailyViewChartData[0].data[0]?.y,
        ),
      );
    }
  }, [JSON.stringify(dailyViewChartData), JSON.stringify(dailyViewIsLoading)]);

  const { data: userChannelData, isLoading: userChannelIsLoading } =
    useGetUserChannelData();

  useEffect(() => {
    if (!isLoading && !dailyViewIsLoading.some((item) => item === true)) {
      // setCompetitionScore(Math.round(competitionScore * 100) / 100);

      // if('유저 데이터의 평균 조회수') {
      //   setCompetitionScore(lastExpectedView||0 /'유저 데이터의 평균 조회수')
      //   return
      // }
      if (lastExpectedView) {
        setExpectedPercentage(
          Number(((lastExpectedView / GUEST_AVERAGEVIEW) * 100).toFixed()),
        );
      }
    }
  }, [
    isLoading,
    JSON.stringify(videoCountViewChartData),
    JSON.stringify(dailyViewIsLoading),
    lastExpectedView,
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
          sum += videoCountViewChartData[range as VideoCount].value;
        }
      } else if (range.includes('이상')) {
        let min = parseInt(range);
        if (number < min) {
          sum += videoCountViewChartData[range as VideoCount].value;
        }
      }
    }

    return sum;
  }

  const sd = useGptOption();

  return (
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <AnalysisWidgetList
        expectedView={lastExpectedView || 0}
        competitionScore={competitionScore}
      />
      <div className="flex h-[520px] w-full">
        <ViewChart />
        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <DailyView view={totalDailyView || 0} />
          <CumulativeVideoChart
            totalCount={totalCount}
            videoCountsBySection={Object.values(
              videoCountViewChartData,
            ).reverse()}
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
