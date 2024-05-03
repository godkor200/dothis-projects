import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';

export interface ICalculateDailyHitsMetricsServiceInboundPort {
  execute(props: FindDailyViewsV1Dto): Promise<TFindDailyView>;
}
