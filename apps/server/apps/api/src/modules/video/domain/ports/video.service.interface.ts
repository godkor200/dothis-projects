import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';

export interface VideoServiceInterface {
  calculateDailyHitsMetrics(
    props: FindDailyViewsV1Dto,
  ): Promise<TFindDailyView>;
}
