import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoDetailsModel } from '@dothis/dto';
import { Result } from 'oxide.ts';

import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/events/channel_history.error';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { FindIndividualVideoInboundPort } from '@Apps/modules/video/domain/ports/find-individual-video.inbound.port';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export type TVideoIndividualRes = Result<
  IRes<VideoDetailsModel>,
  ChannelHistoryNotFoundError | TableNotFoundException
>;
/**
 * 데이터 30일 미만 : “데이터가 부족합니다.”
 *
 * 데이터 30일 이상 ~ 90일 미만:
 * 날짜 -30   -25   -20   -15   -10   -5   오늘    +5
 * +5 : -5~오늘 까지의 조회수
 *
 * 데이터 90일 이상:
 * 날짜 -90   -75   -60   -45   -30   -15   오늘    +15
 * +15 : -15~오늘 까지의 조회수
 */
@QueryHandler(FindIndividualVideoInfoV1Dto)
export class FindIndividualVideoInfoQueryHandler
  implements IQueryHandler<FindIndividualVideoInfoV1Dto, TVideoIndividualRes>
{
  constructor(
    @Inject(VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN)
    private readonly findIndividualService: FindIndividualVideoInboundPort,
  ) {}

  async execute(
    query: FindIndividualVideoInfoV1Dto,
  ): Promise<TVideoIndividualRes> {
    return await this.findIndividualService.execute(query);
    //영상 정보 불러오기
    // const video = await this.video.findVideoInfo(
    //   query.clusterNumber,
    //   query.videoId,
    // );
    //
    // const channel = await this.channelHistory.findChannelHistoryInfo(
    //   video._source.channel_id,
    // );
    //
    // if (!video.found) return Err(new VideoNotFoundError());
    // if (!channel.channel_subscribers)
    //   return Err(new ChannelHistoryNotFoundError());
    //
    // const videoData = video._source;
    // const videoTags = videoData.video_tags;
    // const videoHistory = videoData.video_history;
    // const channelAverageViews = channel.channel_average_views;
    //
    // const dailyViewAggregate =
    //   this.videoAggregateService.calculateIncreaseBySource(videoHistory);
    // const lastHistory = videoHistory[videoHistory.length - 1];
    // const lastViews = lastHistory.video_views;
    // const lastComments = lastHistory.video_comments;
    // const lastLikes = lastHistory.video_likes;
    // /**
    //  * 기대조회수 expectedViews
    //  */
    // const expectedViews = lastViews / channelAverageViews;
    // /**
    //  * 참여도 participationRate
    //  * */
    // const participationRate = (lastComments + lastLikes) / lastViews;
    //
    // const videoPublishedDate = videoData.video_published;
    // const videoPrediction = this.videoAggregateService.getVideoPrediction(
    //   videoPublishedDate,
    //   dailyViewAggregate,
    // );
    // const subscribers = channel.channel_subscribers;
    //
    // return Ok({
    //   videoTags,
    //   videoPerformance: { expectedViews, participationRate },
    //   videoPrediction,
    //   channelPerformance: { subscribers, averageViews: channelAverageViews },
    // });
  }
}
