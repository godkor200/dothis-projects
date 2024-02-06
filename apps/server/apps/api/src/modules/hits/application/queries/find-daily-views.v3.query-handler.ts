import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';
import {
  FindDailyViewsQuery,
  FindDailyViewsV3Dto,
  IIncreaseData,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/database/video.query-handler.outbound.port';
import { IVideoHistory } from '@Apps/modules/video/interfaces/find-video.os.res';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';

@QueryHandler(FindDailyViewsV3Dto)
export class FindDailyViewsQueryOsV3Handler
  implements
    IQueryHandler<
      FindDailyViewsQuery,
      Result<
        IIncreaseData[],
        VideoNotFoundError | VideoHistoryNotFoundError | ScrollApiError
      >
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoQueryHandlerOutboundPort,

    private readonly videoAggregateService: VideoAggregateService,
  ) {}

  async execute(
    query: FindDailyViewsV3Dto,
  ): Promise<
    Result<
      IIncreaseData[],
      VideoNotFoundError | VideoHistoryNotFoundError | ScrollApiError
    >
  > {
    const videos = await this.video.findVideoIdFullScanAndVideos<IVideoHistory>(
      query,
    );
    if (videos instanceof ScrollApiError) return Err(new ScrollApiError());
    if (!videos.length) return Err(new VideoNotFoundError());

    const result = this.videoAggregateService.calculateIncrease(videos);

    return Ok(result);
  }
}
