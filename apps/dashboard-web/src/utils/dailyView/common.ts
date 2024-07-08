import type { apiRouter } from '@dothis/dto';
import type { ClientInferResponseBody } from '@ts-rest/core';

type DailyView = ClientInferResponseBody<
  typeof apiRouter.hits.getDailyViewsV2,
  200
>['data'];

export const getDailyView_FluctuationRate = (data?: DailyView) => {
  if (!data) return;

  const first_searchRatio = data[0];
  const last_searchRatio = data[data.length - 1];

  return (
    Math.floor(
      ((((last_searchRatio.increaseViews || 0) as number) /
        Number(first_searchRatio.increaseViews || 1)) as number) * 100,
    ) - 100
  );
};

export const getSumDailyView = (data?: DailyView) => {
  if (data) {
    return data?.reduce((total, item) => total + item.increaseViews, 0);
  }
  return 0;
};
