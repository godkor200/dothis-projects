import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpectedViewsQuery } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { IncreaseExpectedData } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { Result } from 'oxide.ts';
import { Inject, NotFoundException } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindVideoOsAdapter } from '@Apps/modules/video/interface/find-video.os.adapter';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryQueryHandlerPort } from '@Apps/modules/video_history/database/video_history.query-handler.port';

@QueryHandler(ExpectedViewsQuery)
export class ExpectedViewsQueryHandler
  implements
    IQueryHandler<
      ExpectedViewsQuery,
      Result<IncreaseExpectedData[], NotFoundException>
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: FindVideoOsAdapter,

    @Inject(VIDEO_HISTORY_OS_DI_TOKEN)
    private readonly videoHistory: VideoHistoryQueryHandlerPort,
  ) {}
  async execute(query: ExpectedViewsQuery): Promise<any> {
    const videos = await this.video.findvideoIdfullScanAndVideos(query);

    return Promise.resolve(undefined);
  }
}
