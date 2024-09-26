import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetVideoTimelineDto } from '@Apps/modules/video/application/dtos/video-timeline.dto';
import { Result, Ok, Err } from 'oxide.ts';
import { TChannelVideoTimeLineResp } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { TIME_LINE_TOKEN_DI_TOKEN } from '@Apps/modules/channel/channel.di-token';
import {
  GetTimelineOutboundPort,
  TimelineResult,
} from '@Apps/modules/channel/domain/ports/get-timeline.outbound.port';
import {
  VideoHistoryRecentByIdOutboundPort,
  VideoHistoryRespType,
} from '@Apps/modules/video-history/domain/ports/video-history.recent-by-id.outbound.port';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { VIDEO_HISTORY_RECENT_ID_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';

export type TTimelineResult = Result<
  TChannelVideoTimeLineResp[],
  VideoHistoryNotFoundError | ChannelNotFoundError
>;

@QueryHandler(GetVideoTimelineDto)
export class GetTimelineService
  implements IQueryHandler<GetVideoTimelineDto, TTimelineResult>
{
  constructor(
    @Inject(TIME_LINE_TOKEN_DI_TOKEN)
    private readonly videoDataAdapter: GetTimelineOutboundPort,

    @Inject(VIDEO_HISTORY_RECENT_ID_DI_TOKEN)
    private readonly videoHistoryRecentByIdAdapter: VideoHistoryRecentByIdOutboundPort,
  ) {}

  async execute(query: GetVideoTimelineDto): Promise<TTimelineResult> {
    try {
      const videosResult = await this.videoDataAdapter.execute(query.channelId);

      if (videosResult.isOk()) {
        const videos = videosResult.unwrap();
        const videoIds = videos.map((video) => video.video_id);

        const videoHistoriesResult =
          await this.videoHistoryRecentByIdAdapter.execute(videoIds);

        if (videoHistoriesResult.isOk()) {
          const videoHistories = videoHistoriesResult.unwrap();

          const videoTimeline = this.buildVideoTimeline(videos, videoHistories);
          return Ok(videoTimeline);
        } else {
          return Err(new VideoHistoryNotFoundError());
        }
      } else {
        return Err(new ChannelNotFoundError());
      }
    } catch (error) {
      return Err(error);
    }
  }

  private buildVideoTimeline(
    videos: TimelineResult[],
    videoHistories: VideoHistoryRespType[],
  ): TChannelVideoTimeLineResp[] {
    return videos.map((video) => {
      const history = videoHistories.find((h) => h.video_id === video.video_id);
      return {
        videoId: video.video_id,
        title: video ? video.video_title : 'Unknown Title',
        views: history ? history.video_views : 0,
        publishedDate: video ? video.video_published : 'Unknown Date',
      };
    });
  }
}
