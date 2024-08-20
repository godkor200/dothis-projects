import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ICalculateDailyHitsMetricsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { IRes } from '@Libs/types';
import { Inject } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { IIncreaseHitsData } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;
export type TFindDailyView = Result<
  IRes<IIncreaseHitsData[]>,
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
@QueryHandler(FindDailyViewsV1Dto)
export class GetDailyHitsV1QueryHandler
  implements IQueryHandler<FindDailyViewsV1Dto, TFindDailyView>
{
  constructor(
    @Inject(DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN)
    private readonly calculateDailyHitsMetricsService: ICalculateDailyHitsMetricsServiceInboundPort,
  ) {}
  async execute(query: FindDailyViewsV1Dto): Promise<TFindDailyView> {
    const { dto } = query;
    return await this.calculateDailyHitsMetricsService.execute(dto);
  }
}
