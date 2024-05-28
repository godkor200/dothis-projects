import { FindAccumulateVideoInboundPort } from '@Apps/modules/video/domain/ports/find-accumulate-video.inbound.port';
import { FindAccumulateVideosV1Dto } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { IFindAccumulateVideosV1Res } from '@Apps/modules/video/application/queries/v1/find-accumulate-videos.query-handler';
import { Inject } from '@nestjs/common';
import {
  CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
} from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { IGetChannelHistoryRelateVideoOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { FindChannelHistoryRelatedVideoDao } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';
import { Err, Ok } from 'oxide.ts';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class FindAccumulateVideoService
  implements FindAccumulateVideoInboundPort
{
  constructor(
    @Inject(CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryRelateVideo: IGetChannelHistoryRelateVideoOutboundPort,

    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryByChannelId: ChannelHistoryByChannelIdOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}
  /**
   * 누적 영상수
   * 1. 관련영상을 찾는데 채널히스토리를 제일 마지막꺼만 가져와서 산정
   * @param dto
   */
  async execute(
    dto: FindAccumulateVideosV1Dto,
  ): Promise<IFindAccumulateVideosV1Res> {
    const dao = new FindChannelHistoryRelatedVideoDao(dto);
    try {
      const videoData = await this.getChannelHistoryRelateVideo.execute(dao);

      if (!videoData.isOk()) {
        return Err(new VideoNotFoundError());
      }
      const historyResult = videoData.unwrap();
      const channelIds = historyResult.map((e) => e.channelId);

      const channelSubscribersData =
        await this.getChannelHistoryByChannelId.execute({ channelIds });
      if (!channelSubscribersData.isOk()) {
        return Err(new ChannelHistoryNotFoundError());
      }
      const subscribersData = channelSubscribersData.unwrap();
      return Ok({
        success: true,
        data: this.channelHistoryAggregateService.countSubscribersByRange(
          historyResult,
          subscribersData,
        ),
      });
    } catch (err) {
      return Err(err);
    }
  }
}
