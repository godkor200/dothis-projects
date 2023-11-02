import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ClientInferResponseBody } from '@ts-rest/core';

type DailyView = ClientInferResponseBody<
  typeof apiRouter.dailyViews.getDailyViews,
  200
>['data'][0];

/**
 * getDailyView api의 response로 받아온 5개 cluster의 data를 param으로 전달받아서 병합하여 같은 날짜의 increase_views를 모두 합산하는 함수
 * @param data getDailyView api의 response에서 flat으로 펼쳐준 형식으로 받는다.
 * @returns { date: increase_views, ~~ } 형식을 가진다. (increase_views를 모두 합산한 날짜를 key로 가진다.)
 */
export const sumViews = (data: (DailyView | undefined)[]) => {
  const result: Record<string, number> = {};

  data?.forEach((item) => {
    if (item) {
      const date = item.date;
      const views = item.increase_views;

      if (result[date]) {
        result[date] += views;
      } else {
        result[date] = views;
      }
    }
  });

  return result;
};

/**
 * sumViews의 return으로 나온 data를 Nivo Line그래프 형식에 맞게끔  x, y로 포맷팅을 수정 및 정렬하는 함수
 * @param summedData sumView return 형식으로 param를 받는다
 * @returns Line 그래프에서 활용할 수 있게 data =  [{ x: 날짜, y: 조회수 }] 형식을 가지며, Nivo 형식에 따라 Id값을 추가한 형식이다.
 */
export const formatToLineGraph = (summedData: Record<string, number>) => {
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

  return [{ id: '일일조회수', data: formattedResult }];
};
