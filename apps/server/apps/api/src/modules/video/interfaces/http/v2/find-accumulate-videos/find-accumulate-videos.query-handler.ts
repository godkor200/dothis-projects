import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  FindAccumulateVideosDtos,
  FindAccumulateVideosV2Dtos,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';

import {
  IChannelHistory,
  IFindAccumulateVideoWithOutUserSection,
  ISection,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { Err, Ok, Result } from 'oxide.ts';

import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/application/dtos/expected-views.dtos';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/infrastructure/repositories/database/channel-history.outbound.port';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export type TFindAccumulateVideos = Result<
  IFindAccumulateVideoWithOutUserSection<ISection[]>,
  | ChannelNotFoundError
  | VideoNotFoundError
  | ChannelHistoryNotFoundError
  | ScrollApiError
>;

@QueryHandler(FindAccumulateVideosV2Dtos)
export class FindAccumulateVideosV2QueryHandler
  implements IQueryHandler<FindAccumulateVideosDtos, TFindAccumulateVideos>
{
  constructor(
    @Inject(CHANNEL_HISTORY_IGNITE_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  /**
   * 연간 조회수 기능
   * @param arg
   */
  async execute(
    arg: FindAccumulateVideosV2Dtos,
  ): Promise<TFindAccumulateVideos> {
    /**
     * 관련된 동영상과 채널의 히스토리를 필터링해서 가져옴
     */
    const channelHistoryRes =
      await this.channelHistory.scanLatestChannelHistoryByKeywordAndRelWord<IChannelHistory>(
        {
          ...arg,
          data: [
            CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS,
            CHANNEL_DATA_KEY.CHANNEL_SEUBSCRIBERS,
          ],
        },
      );

    if (channelHistoryRes instanceof ScrollApiError)
      return Err(new ScrollApiError());

    if (!channelHistoryRes.length)
      return Err(new ChannelHistoryNotFoundError());

    const section =
      this.channelHistoryAggregateService.countSubscribersByRange(
        channelHistoryRes,
      );

    return Ok({
      videoTotal: section.reduce((a, c) => a + c.number, 0),
      section,
    });
  }
}
