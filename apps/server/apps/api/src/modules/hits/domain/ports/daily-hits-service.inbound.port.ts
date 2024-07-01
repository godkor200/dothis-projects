import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { FindDailyViewsV2Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';

export interface ICalculateDailyHitsMetricsServiceInboundPort {
  execute(props: FindDailyViewsV1Dto): Promise<TFindDailyView>;
}
export interface DailyHitsServiceInboundPort {
  execute(props: FindDailyViewsV2Dto): Promise<TFindDailyView>;
}
