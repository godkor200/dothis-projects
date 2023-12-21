import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ClientInferResponseBody } from '@ts-rest/core';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

type DailyView = ClientInferResponseBody<
  typeof apiRouter.dailyViews.getDailyViews,
  200
>['data'][0];

type ExpectedView = ClientInferResponseBody<
  typeof apiRouter.expectViews.getExpectedViews,
  200
>['data'][0];

/**
 * Date에 따른 initial object를 생성한다.
 * @returns sumViews, averageViews에서 사용하는 -> 설정한 날짜에 따른 initial Record<날짜,0> 객체가 들어가있는다
 */
const initViewsObjectByDate = (startDate: string, endDate: string) => {
  const viewsObject: Record<string, number> = {};

  for (
    let date = dayjs(startDate);
    date.isBefore(endDate, 'day');
    date = date.add(1, 'day')
  ) {
    viewsObject[date.format('YYYY-MM-DD')] = 0;
  }

  return viewsObject;
};

/**
 * getDailyView api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 같은 날짜의 increase_views를 모두 합산하는 함수
 * @param data getDailyView api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns { date: increase_views, ~~ } 형식을 가진다. (increase_views를 모두 합산한 날짜를 key로 가진다.)
 */
export const sumViews = (
  data: (DailyView | undefined)[],
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const result = initViewsObjectByDate(startDate, endDate);

  data?.forEach((item) => {
    if (item) {
      const date = item.date;

      const views = item.increase_views;

      if (result.hasOwnProperty(date)) {
        result[date] += views;
      }
    }
  });

  return result;
};

/**
 * getExpectedView api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 같은 날짜의 expected_views의 평균을 구하는 함수
 * @param data getExpectedView api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns   date: expected_views의,  형식을 가진다. (expected_views의 평균을 value로, 날짜를 key로 가진다.)
 */
export const averageViews = (
  data: (ExpectedView | undefined)[],
  { startDate, endDate }: { startDate: string; endDate: string },
) => {
  const result = initViewsObjectByDate(startDate, endDate);
  const dateCount = initViewsObjectByDate(startDate, endDate);

  data?.forEach((item) => {
    if (item) {
      const date = item.date;
      const views = item.expected_views;

      if (result.hasOwnProperty(date)) {
        result[date] += views;
        dateCount[date] += 1;
      }
    }
  });

  for (const date in result) {
    //for-in 루프를 사용하여 객체의 속성을 반복할 때, 객체의 프로토타입 체인에 있는 속성도 포함될 수 있다, 이때 hasOwnProperty를 사용하면 해당 속성이 직접 객체에 속해 있는지를 확인하기 위해 안정성을 위해 추가
    if (dateCount.hasOwnProperty(date)) {
      const count = dateCount[date];

      result[date] = Math.round(
        Math.round(result[date]) / count === 0 ? 1 : count,
      );
    }
  }

  // for (const date of Object.keys(result)) {
  //   const count = data.filter((item) => item?.date === date).length;
  //   result[date] = Math.round(result[date]) / count;
  // }

  return result;
};

/**
 * sumViews의 return으로 나온 data를 Nivo Line그래프 형식에 맞게끔  x, y로 포맷팅을 수정 및 정렬하는 함수
 * @param summedData sumView return 형식으로 param를 받는다
 * @returns Line 그래프에서 활용할 수 있게 data =  [{ x: 날짜, y: 조회수 }] 형식을 가지며, Nivo 형식에 따라 Id값을 추가한 형식이다.
 */
export const formatToLineGraph = (
  summedData: Record<string, number>,
  title: string,
) => {
  const formattedResult = [];

  for (const date in summedData) {
    formattedResult.push({
      x: date,
      y: summedData[date],
    });
  }

  //   날짜로 정렬
  formattedResult.sort(
    (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
  );

  return [{ id: title, data: formattedResult }];
};
