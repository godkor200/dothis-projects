import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  FindAccumulateVideosDtos,
  FindAccumulateVideosV2Dtos,
} from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import {
  IChannelHistory,
  IFindAccumulateVideoWithOutUserSection,
  ISection,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';

@QueryHandler(FindAccumulateVideosV2Dtos)
export class FindAccumulateVideosV2QueryHandler
  implements
    IQueryHandler<
      FindAccumulateVideosDtos,
      Result<
        IFindAccumulateVideoWithOutUserSection<ISection[]>,
        ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
      >
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  /**
   * @param arg
   */
  async execute(
    arg: FindAccumulateVideosV2Dtos,
  ): Promise<
    Result<
      IFindAccumulateVideoWithOutUserSection<ISection[]>,
      ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
    >
  > {
    /**
     * 관련된 동영상과 채널의 히스토리를 필터링해서 가져옴
     */
    const channelHistoryRes =
      await this.channelHistory.findChannelHistoryByKeywordAndRelWordFullScan<IChannelHistory>(
        {
          ...arg,
          data: [
            CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS,
            CHANNEL_DATA_KEY.CHANNEL_SEUBSCRIBERS,
          ],
        },
      );

    if (!channelHistoryRes.length)
      return Err(new ChannelHistoryNotFoundError());

    const section =
      this.channelHistoryAggregateService.countSubscribersByRange(
        channelHistoryRes,
      );

    return Ok({
      videoTotal: channelHistoryRes
        .map((e) => e.inner_hits.video_list.hits.total.value)
        .reduce((a, c) => a + c),
      section,
    });
  }
}
