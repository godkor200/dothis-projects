import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { HitsInboundPort } from '@Apps/modules/hits/domain/ports/hits.inbound.port';
import { VIDEO_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { Inject } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { IIncreaseHitsData } from '@Apps/modules/video/application/service/video.aggregate.service';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;
export type TFindDailyView = Result<
  IRes<IIncreaseHitsData[]>,
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
@QueryHandler(FindDailyViewsV1Dto)
export class FindDailyViewV1QueryHandler
  implements IQueryHandler<FindDailyViewsV1Dto, TFindDailyView>
{
  constructor(
    @Inject(VIDEO_SERVICE_DI_TOKEN)
    private readonly hitsService: HitsInboundPort,
  ) {}
  async execute(query: FindDailyViewsV1Dto): Promise<TFindDailyView> {
    const { dto } = query;
    return await this.hitsService.calculateDailyHitsMetrics(dto);
  }
}
