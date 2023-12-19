'use client';

import { useMemo } from 'react';

import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  const selectedWord = useSelectedWord();
  const { data: dailyViewData, isLoading: dailyViewIsLoading } =
    useGetDailyView(selectedWord);

  const startDate = useStartDate();
  const endDate = useEndDate();

  console.log(dailyViewData);
  const dailyViewChartData = useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        '일일 조회 수',
      ),
    [dailyViewData],
  );

  const { data: expectedViewData, isLoading: expectedViewIsLoading } =
    useGetExpectedView(selectedWord);

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(
        averageViews(expectedViewData.flat(), { startDate, endDate }),
        '기대 조회 수',
      ),
    [expectedViewData],
  );

  // 1. true의 개수 세기
  const trueCount = dailyViewIsLoading.filter(
    (value) => value === false,
  ).length;

  // 2. 전체 배열의 길이로 나누어 비율 계산
  const percentage = (trueCount / dailyViewIsLoading.length) * 100;

  // 3. 퍼센트로 변환
  const formattedPercentage = `${percentage.toFixed(2)}%`;

  // 배열에서 false의 개수를 세는 함수
  const countTrue = (arr: boolean[]) =>
    arr.filter((value) => value === false).length;

  // 배열의 길이로 나누어 퍼센트 계산하는 함수
  const calculatePercentage = (arr: boolean[]) =>
    (countTrue(arr) / arr.length) * 100;

  // 두 배열을 합치기
  const combinedArray = [...dailyViewIsLoading, ...expectedViewIsLoading];

  // 전체 배열에 대한 퍼센트 계산
  const totalPercentage = useMemo(
    () =>
      calculatePercentage(combinedArray)
        ? `${calculatePercentage(combinedArray)}%`
        : '0%',
    [dailyViewData, expectedViewData],
  );

  if (
    combinedArray.length === 0 ||
    combinedArray.some((item) => item === true)
  ) {
    return (
      <div className=" mr-7 flex h-[460px] w-full  flex-col">
        <div className="h-3/6 [&_svg]:overflow-visible">
          <DailyViewChart.skeleton />
        </div>
        <div className="h-3/6 [&_svg]:overflow-visible">
          <ExpectedViewChart.skeleton />
        </div>
        <div className="bg-grey200 dark:bg-grey700 mb-4  h-2.5 w-[90%]  translate-x-[60px] rounded-full">
          <div
            className="dark:bg-primary400 bg-primary600 h-2.5 rounded-full"
            style={{ width: totalPercentage }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
      <div className="h-3/6 [&_svg]:overflow-visible">
        <DailyViewChart dailyView={dailyViewChartData} />
      </div>
      <div className="h-3/6 [&_svg]:overflow-visible">
        <ExpectedViewChart expectedView={expectedViewChartData} />
      </div>
    </div>
  );
};

export default ViewChart;
