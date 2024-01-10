import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/dtos/find-individual-video-info.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { VideoDetailsModel } from '@dothis/dto';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';

@QueryHandler(FindIndividualVideoInfoV1Dto)
export class FindIndividualVideoInfoQueryHandler
  implements
    IQueryHandler<
      FindIndividualVideoInfoV1Dto,
      Result<
        VideoDetailsModel,
        VideoNotFoundError | ChannelHistoryNotFoundError
      >
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,

    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    private readonly videoAggregateService: VideoAggregateService,
  ) {}

  async execute(
    query: FindIndividualVideoInfoV1Dto,
  ): Promise<
    Result<VideoDetailsModel, VideoNotFoundError | ChannelHistoryNotFoundError>
  > {
    //영상 태그 불러오기
    const video = await this.video.findVideoInfo(
      query.clusterNumber,
      query.videoId,
    );

    const channel = await this.channelHistory.findChannelHistoryInfo(
      video._source.channel_id,
    );

    if (!video.found) return Err(new VideoNotFoundError());
    if (!channel.channel_subscribers)
      return Err(new ChannelHistoryNotFoundError());

    const videoData = video._source;
    const videoTags = videoData.video_tags;
    const videoHistory = videoData.video_history;
    const channelAverageViews = channel.channel_average_views;

    const dailyViewAggregate =
      this.videoAggregateService.calculateIncreaseBySource(videoHistory);
    const lastHistory = videoHistory[videoHistory.length - 1];
    const lastViews = lastHistory.video_views;
    const lastComments = lastHistory.video_comments;
    const lastLikes = lastHistory.video_likes;
    /**
     * 기대조회수 expectedViews
     */
    const expectedViews = lastViews / channelAverageViews;
    /**
     * 참여도 participationRate
     * */
    const participationRate = (lastComments + lastLikes) / lastViews;

    const videoPublishedDate = videoData.video_published;
    const videoPrediction = this.videoAggregateService.getVideoPrediction(
      videoPublishedDate,
      dailyViewAggregate,
    );
    const subscribers = channel.channel_subscribers;

    return Ok({
      videoTags,
      videoPerformance: { expectedViews, participationRate },
      videoPrediction,
      channelPerformance: { subscribers, averageViews: channelAverageViews },
    });
  }
}
