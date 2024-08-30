import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDailyViewsDto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';

import { DAILY_HITS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { Inject } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { IIncreaseDailyViews } from '@Apps/modules/video/application/service/helpers/video.aggregate.type';

export type TFindDailyView = Result<
  IRes<IIncreaseDailyViews>,
  VideoNotFoundError | VideoHistoryNotFoundError
>;
@QueryHandler(FindDailyViewsDto)
export class GetDailyHitsQueryHandler
  implements IQueryHandler<FindDailyViewsDto, TFindDailyView>
{
  constructor(
    @Inject(DAILY_HITS_SERVICE_DI_TOKEN)
    private readonly _service: DailyHitsServiceInboundPort,
  ) {}

  async execute(props: FindDailyViewsDto): Promise<TFindDailyView> {
    return await this._service.execute(props);
  }
}
