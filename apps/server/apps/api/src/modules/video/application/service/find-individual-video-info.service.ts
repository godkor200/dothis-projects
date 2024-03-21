import { FindIndividualVideoInboundPort } from '@Apps/modules/video/domain/ports/find-individual-video.inbound.port';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { TVideoIndividualRes } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { Inject } from '@nestjs/common';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { IGetChannelHistoryLatestTuple } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { IGetVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VIDEO_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';

import { Err, Ok } from 'oxide.ts';

export class FindIndividualVideoInfoService
  implements FindIndividualVideoInboundPort
{
  constructor(
    @Inject(CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryLatestTuple: IGetChannelHistoryLatestTuple,

    @Inject(VIDEO_HISTORY_IGNITE_DI_TOKEN)
    private readonly videoHistory: IGetVideoHistoryOutboundPort,

    private readonly videoAggregateService: VideoAggregateService,
  ) {}

  /**
   * 개별 히스토리 정보
   * @ 필요한 정보
   * 1. 비디오 태그,비디오 히스토리 제일 최근꺼, 채널 평균 조회수
   * @ 로직
   * 클러스터 번호와 비디오 ID를 이용하여 특정 영상의 정보를 검색합니다.
   * getLatestDayTuple 해당 영상이 속한 채널의 히스토리 정보를 찾습니다.
   * 영상 정보가 존재하지 않는다면 오류를 반환하고, 채널의 구독자 수가 없다면 다른 오류를 반환합니다.
   * 영상 정보와 채널의 평균 조회수, 영상의 태그, 영상 히스토리 등 필요한 정보를 추출합니다.
   * 일일 조회수의 증가를 계산합니다.
   * 마지막 히스토리 정보에서 조회수, 댓글 수, 좋아요 수를 추출합니다.
   * 기대 조회수는 마지막 조회수를 채널의 평균 조회수로 나눈 값입니다.
   * 참여도는 마지막 댓글 수와 좋아요 수를 마지막 조회수로 나눈 값입니다.
   * 영상이 공개된 날짜와 일일 조회수 증가를 바탕으로 영상의 예상 조회수를 계산합니다.
   * 마지막으로, 영상의 태그, 영상의 성능 (기대 조회수, 참여도), 영상의 예상 조회수, 채널의 성능 (구독자 수, 평균 조회수)을 반환합니다.
   * @param dto
   */
  async execute(
    dto: FindIndividualVideoInfoV1Dto,
  ): Promise<TVideoIndividualRes> {
    const dao = new FindIndividualVideoInfoV1Dao(dto);
    const channelHistory = await this.getChannelHistoryLatestTuple.execute(dao);
    const videoHistoryRes = await this.videoHistory.execute({
      clusterNumber: dto.clusterNumber,
      videoId: dto.videoId,
      from: '2024-01-01',
      to: '2024-01-30',
    });

    /**
     * 원래 로직 현재 데이터가 완전하지 않아 1월 1일부터 1월 30일까지 고정
     *       from: DateUtil.getDaysAgo(7),
     *       to: DateUtil.getDaysAgo(),
     */

    if (channelHistory.isOk() && videoHistoryRes.isOk()) {
      const channelHistoryTagInfo = channelHistory.unwrap()[0];
      const videoHistory = videoHistoryRes.unwrap();
      const videoTags = channelHistoryTagInfo.videoTags;
      const channelAverageViews = channelHistoryTagInfo.channelAverageViews;
      const lastHistory = videoHistory[videoHistory.length - 1];
      const lastViews = lastHistory.videoViews;
      const lastComments = lastHistory.videoComments;
      const lastLikes = lastHistory.videoLikes;

      /**
       * 기대조회수 expectedViews
       */
      const expectedViews = lastViews / channelAverageViews;
      /**
       * 참여도 participationRate
       * */
      const participationRate = (lastComments + lastLikes) / lastViews;
      const dailyViewAggregate =
        this.videoAggregateService.calculateIncreaseByIgnite(videoHistory);
      const videoPublishedDate = channelHistoryTagInfo.videoPublished;
      const videoPrediction = this.videoAggregateService.getVideoPrediction(
        videoPublishedDate,
        dailyViewAggregate,
      );
      const subscribers = channelHistoryTagInfo.channelSubscribers;

      return Ok({
        success: true,
        data: {
          videoTags,
          videoPerformance: { expectedViews, participationRate },
          videoPrediction,
          channelPerformance: {
            subscribers,
            averageViews: channelAverageViews,
          },
        },
      });
    }
    return Err(channelHistory.unwrapErr());
  }
}
