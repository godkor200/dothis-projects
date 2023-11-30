import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  FindDailyViewsQuery,
  FindDailyViewsV3Query,
} from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IFindVideoIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
import { VideoDataService } from '@Apps/modules/video/service/video-data.service';

export interface IIncreaseData {
  date: string;
  increase_views: number;
  increase_likes: number;
  increase_comments: number;
}
@QueryHandler(FindDailyViewsV3Query)
export class FindDailyViewsQueryOsV3Handler
  implements
    IQueryHandler<
      FindDailyViewsQuery,
      Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,

    private readonly videoAggregateService: VideoAggregateService,

    private readonly videoDataService: VideoDataService,
  ) {}

  async execute(
    query: FindDailyViewsQuery,
  ): Promise<
    Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
  > {
    const arg: FindVideoDateQuery = {
      ...query,
      data: [VIDEO_DATA_KEY.VIDEO_ID, VIDEO_DATA_KEY.VIDEO_HISTORY],
    };
    const videos =
      await this.video.findVideoIdFullScanAndVideos<IFindVideoIdRes>(arg);

    if (!videos) return Err(new VideoNotFoundError());

    const filteredVideoByDate = this.videoDataService.filterByDate(
      videos,
      arg.from,
      arg.to,
    );

    const result =
      this.videoAggregateService.calculateIncrease(filteredVideoByDate);

    return Ok(result);
  }
}
