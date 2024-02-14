import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { VideoServiceInterface } from '@Apps/modules/video/domain/ports/video.service.interface';
import { VIDEO_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { Inject } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { IIncreaseData } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query';
const IgniteClient = require('apache-ignite-client');
const IllegalStateError = IgniteClient.Errors.IllegalStateError;
export type TFindDailyView = Result<
  IRes<IIncreaseData[]>,
  VideoNotFoundError | VideoHistoryNotFoundError | typeof IllegalStateError
>;
@QueryHandler(FindDailyViewsV1Dto)
export class FindDailyViewV1QueryHandler
  implements IQueryHandler<FindDailyViewsV1Dto, TFindDailyView>
{
  constructor(
    @Inject(VIDEO_SERVICE_DI_TOKEN)
    private readonly videoService: VideoServiceInterface,
  ) {}
  async execute(query: FindDailyViewsV1Dto): Promise<TFindDailyView> {
    const { dto } = query;
    return await this.videoService.calculateDailyHitsMetrics(dto);
  }
}
