import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindVideoOsAdapter } from 'apps/api/src/modules/video/interface/find-video.os.adapter';
import { DailyViewsEntity } from 'apps/api/src/modules/daily_views/repository/entity/daily-views.entity';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';
import { VIDEO_HISTORY_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { FindVideoHistoryOsAdapter } from '@Apps/modules/video_history/interface/find-video-history.os.adapter';

@QueryHandler(FindDailyViewsQuery)
export class FindDailyViewsQueryOsHandler
  implements IQueryHandler<FindDailyViewsQuery, DailyViewsEntity[]>
{
  @Inject(VIDEO_HISTORY_DI_TOKEN.FIND_HISTORY)
  private readonly videoHistory: FindVideoHistoryOsAdapter;
  @Inject(VIDEO_DI_TOKEN.OS_FIND_BY_VIDEO_ID)
  private readonly video: FindVideoOsAdapter;

  async execute(query: FindDailyViewsQuery): Promise<any> {
    const videos = await this.video.findvideoIdfullScanAndVideos(query);

    return await this.videoHistory.findVideoHistory(
      videos,
      query.from.toString(),
      query.to.toString(),
    );
  }
}
