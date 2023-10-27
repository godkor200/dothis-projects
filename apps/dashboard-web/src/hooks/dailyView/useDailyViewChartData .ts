import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ClientInferResponseBody } from '@ts-rest/core';

import useGetDailyView from '@/query/user/useGetDailyView';

type DailyView = ClientInferResponseBody<
  typeof apiRouter.dailyViews.getDailyViews,
  200
>['data'];

const useDailyViewChartData = () => {
  const { data } = useGetDailyView();

  // 각 날짜별 increase_views 값을 합산하는 함수
  function sumViews(data: (DailyView | undefined)[]) {
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
  }

  // 합산된 값을 원하는 형식으로 변환하는 함수
  function formatResult(summedData: Record<string, number>) {
    const formattedResult = [];

    for (const date in summedData) {
      formattedResult.push({
        x: date,
        y: summedData[date],
      });
    }

    formattedResult.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
    ); // 날짜로 정렬

    return formattedResult;
  }

  return [{ id: '일일조회수', data: formatResult(sumViews(data.flat())) }];
};

export default useDailyViewChartData;
