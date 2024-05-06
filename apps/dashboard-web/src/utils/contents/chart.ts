import type { apiRouter } from '@dothis/dto';
import type { ClientInferResponseBody } from '@ts-rest/core';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { GUEST_AVERAGEVIEW } from '@/constants/guest';
import type { DeepRequired } from '@/hooks/react-query/query/common';
import type { NaverAPI_Results } from '@/hooks/react-query/query/useGetNaverSearchRatio';

import { getDateObjTime } from './dateObject';

dayjs.extend(isSameOrBefore);

type DailyView = DeepRequired<
  ClientInferResponseBody<typeof apiRouter.hits.getDailyViewsV1, 200>
>['data'][0];

type ExpectedView = DeepRequired<
  ClientInferResponseBody<typeof apiRouter.hits.getExpectedViews, 200>
>['data'][0];

/**
 * Date에 따른 initial 구조를 생성한다.
 * @returns @single format이 single일 경우 value-number로 반환
 * @returns @range format이 range일 경우 value-[0,0]로 반환
 * @description single과 range로 나뉘게된 이유 Apex -> area차트일 경우 area의 형식은 [min,max] 구조로 받고있습니다.
 */
type InferViewType<T> = T extends 'range' ? number[] : number;

const initChartDateFormatter = <T extends 'single' | 'range'>({
  startDate,
  endDate,
  format,
}: {
  startDate: string;
  endDate: string;
  format: T;
}) => {
  const viewsObject: Record<string, InferViewType<T>> = {};
  for (
    let date = dayjs(startDate);
    date.isBefore(endDate, 'day');
    date = date.add(1, 'day')
  ) {
    // if로 분기처리를 해도 타입추론이 안되서 에러가 발생했다.
    if (format === 'range') {
      // range 형식일 때
      viewsObject[date.format('YYYY-MM-DD')] = [0, 0] as InferViewType<T>;
    } else {
      // single 형식일 때
      viewsObject[date.format('YYYY-MM-DD')] = 0 as InferViewType<T>; // 여기서 as number를 명시적으로 지정
    }
  }

  return viewsObject;
};

/**
 * DateTime에 따라 x축이 정렬되는 ApexChart의 특징에 따른 x축의 DateTime으로 변환한 데이터를 삽입
 * ApexChart series 타입인 x,y 구조로 데이터 생성
 * @param timeSeriesData initChartDateFormatter 함수로 생성한 구조에서 data가 추가된 파라미터를 받는다.
 * @returns x:DateTime y:value 형식의 오름차순으로 정렬된 배열 반환
 */
export const createDateTimeApexChart = (
  timeSeriesData: Record<string, number | number[]>,
) => {
  const formattedResult = [];

  for (const date in timeSeriesData) {
    const data = timeSeriesData[date];
    formattedResult.push({
      x: getDateObjTime(date),
      y: data,
    });
  }

  return formattedResult.sort((a, b) => a.x - b.x);
};

/**
 *  ApexChart series의 포맷팅을 고정적으로 해주는 유틸리티 함수입니다.
 * @param dataFunction data 프로퍼티의 들어가는 포맷팅 함수입니다.
 * @param name series 네임
 * @param type chart 타입
 * @returns @dataFunction을 반환합니다.
 */
export const formatToApexChart = <T extends any[], U extends any[]>(
  dataFunction: (...args: U) => T,
  { name, type }: { name: string; type: ChartType },
) => {
  return function (...args: U): ApexAxisChartSeries[number] {
    const result = {
      data: dataFunction(...args),
      name,
      type,
    };
    return result;
  };
};

/**
 * getDailyView api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 같은 날짜의 increase_views를 모두 합산하는 함수
 * @param data getDailyView api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns @createDateTimeApexChart 에 반환된 형식을 가진다.
 */
export const handleDailyViewData = (
  data: (DailyView | undefined)[],
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const dateBasedDataSet = initChartDateFormatter({
    startDate,
    endDate,
    format: 'single',
  });
  data?.forEach((item) => {
    if (item) {
      const date = item.date;

      const views = item.increaseViews;

      if (dateBasedDataSet.hasOwnProperty(date)) {
        dateBasedDataSet[date] += Math.abs(views);
      }
    }
  });

  const result = createDateTimeApexChart(dateBasedDataSet);

  return result;
};

export const handleDailyVideoCount = (
  data: (DailyView | undefined)[],
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const dateBasedDataSet = initChartDateFormatter({
    startDate,
    endDate,
    format: 'single',
  });
  data?.forEach((item) => {
    if (item) {
      const date = item.date;

      const views = item.uniqueVideoCount;

      if (dateBasedDataSet.hasOwnProperty(date)) {
        dateBasedDataSet[date] += Math.abs(views);
      }
    }
  });

  const result = createDateTimeApexChart(dateBasedDataSet);

  return result;
};

/**
 * getPerformance api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 평균성과를 모두 합산하는 함수
 * @param data getPerformance api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns @createDateTimeApexChart 에 반환된 형식을 가진다.
 */
export const handleAveragePerformanceData = (
  data: (ExpectedView | undefined)[] | undefined,
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const dateBasedDataSet = initChartDateFormatter({
    startDate,
    endDate,
    format: 'single',
  });

  data?.forEach((item) => {
    if (item) {
      const date = item.date;
      // 소수점을 지우기 위해 round (평균성과로 변경이 되어 게스트 조회수 연산제거)
      // const views = Math.round(item.expectedHits * GUEST_AVERAGEVIEW);
      const views = Math.round(item.expectedHits * 100) / 100;

      if (dateBasedDataSet.hasOwnProperty(date)) {
        dateBasedDataSet[date] += views;
      }
    }
  });

  const result = createDateTimeApexChart(dateBasedDataSet);

  return result;
};

/**
 * getPerformance api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 범위성과를 모두 합산하는 함수
 * @param data getPerformance api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns @createDateTimeApexChart 에 @range 로 반환된 형식을 가진다.
 */
export const handleScopePerformanceData = (
  data: (ExpectedView | undefined)[] | undefined,
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const dateBasedDataSet = initChartDateFormatter({
    startDate,
    endDate,
    format: 'range',
  });

  data?.forEach((item) => {
    if (item) {
      const date = item.date;
      // 소수점을 지우기 위해 round
      const maxPerformance = Math.round(item.maxPerformance * 100) / 100;
      const minPerformance = Math.round(item.minPerformance * 100) / 100;

      if (dateBasedDataSet.hasOwnProperty(date)) {
        dateBasedDataSet[date][0] += minPerformance;
        dateBasedDataSet[date][1] += maxPerformance;
      }
    }
  });

  const result = createDateTimeApexChart(dateBasedDataSet);

  return result;
};

/**
 *
 */

export const handleNaverSearchRation = (
  data: NaverAPI_Results[],
  { startDate, endDate }: { startDate: string; endDate: string },
) => {};

/**
 * getExpectedView api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 같은 날짜의 expected_views의 평균을 구하는 함수
 * @param data getExpectedView api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns   date: expected_views의,  형식을 가진다. (expected_views의 평균을 value로, 날짜를 key로 가진다.)
 */
// export const averageViews = (
//   data: (ExpectedView | undefined)[] | undefined,
//   { startDate, endDate }: { startDate: string; endDate: string },
// ) => {
//   const result = initChartDateFormatter({
//     startDate,
//     endDate,
//     format: 'single',
//   });
//   const dateCount = initChartDateFormatter({
//     startDate,
//     endDate,
//     format: 'single',
//   });
//   data?.forEach((item) => {
//     if (item) {
//       const date = item.date;
//       const views = item.expectedHits;

//       if (result.hasOwnProperty(date)) {
//         result[date] += views;
//         dateCount[date] += 1;
//       }
//     }
//   });

//   for (const date in result) {
//     //for-in 루프를 사용하여 객체의 속성을 반복할 때, 객체의 프로토타입 체인에 있는 속성도 포함될 수 있다, 이때 hasOwnProperty를 사용하면 해당 속성이 직접 객체에 속해 있는지를 확인하기 위해 안정성을 위해 추가
//     if (dateCount.hasOwnProperty(date)) {
//       const count = dateCount[date];

//       result[date] = Math.round(
//         Math.round(result[date]) / count === 0 ? 1 : count,
//       );
//     }
//   }
//   // for (const date of Object.keys(result)) {
//   //   const count = data.filter((item) => item?.date === date).length;
//   //   result[date] = Math.round(result[date]) / count;
//   // }

//   return result;
// };
