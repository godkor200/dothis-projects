import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChannelListDto } from '@Apps/modules/channel/application/dtos/get-channel-list.dto';
import {
  ChannelSubscriberRange,
  ChannelSubscriberRangeType,
  TChannelListResponse,
} from '@dothis/dto';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { Inject } from '@nestjs/common';
import {
  CHANNEL_DATA_LIST_DI_TOKEN,
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
} from '@Apps/modules/channel/channel.di-token';
import { ChannelListOutboundPort } from '@Apps/modules/channel/domain/ports/channel-list.outbound.port';
import { ChannelListDao } from '@Apps/modules/channel/infrastucture/daos/get-channel-list.dao';
import { ChannelInfoOutboundPort } from '@Apps/modules/channel/domain/ports/channel-info.outbound.port';
import { ChannelSearchResult } from '@Apps/modules/channel/infrastucture/adapters';

export type TChannelListResult = Result<
  TChannelListResponse,
  ChannelNotFoundError
>;

export type ChannelInfoMergeResult = {
  channel_name: string;
  channel_thumbnail: string;
  channel_cluster: number;
  mainly_used_keywords: string[];
  mainly_used_tags: string[];
  channel_subscribers?: number;
  channel_average_views?: number;
};

@QueryHandler(GetChannelListDto)
export class GetChannelListService
  implements IQueryHandler<GetChannelListDto, TChannelListResult>
{
  constructor(
    @Inject(CHANNEL_DATA_LIST_DI_TOKEN)
    private readonly channelListAdapter: ChannelListOutboundPort,

    @Inject(CHANNEL_INFO_ADAPTER_DI_TOKEN)
    private readonly channelInfoAdapter: ChannelInfoOutboundPort,
  ) {}

  private getSubscriberRange(
    domain: ChannelSubscriberRangeType,
  ): [number, number | undefined] {
    switch (domain) {
      case ChannelSubscriberRange.RANGE_1000_TO_9999:
        return [1000, 9999];
      case ChannelSubscriberRange.RANGE_10000_TO_49999:
        return [10000, 49999];
      case ChannelSubscriberRange.RANGE_50000_TO_99999:
        return [50000, 99999];
      case ChannelSubscriberRange.RANGE_100000_TO_499999:
        return [100000, 499999];
      case ChannelSubscriberRange.RANGE_500000_TO_999999:
        return [500000, 999999];
      case ChannelSubscriberRange.RANGE_1000000_PLUS:
        return [1000000, undefined]; // No upper bound
      default:
        return [undefined, undefined];
    }
  }

  async execute(dto: GetChannelListDto): Promise<TChannelListResult> {
    const dao = new ChannelListDao(
      dto.channelCluster,
      dto.channelSubscriber,
      dto.limit,
      dto.sort,
    );

    try {
      const res = await this.channelListAdapter.execute(dao);
      if (res.isOk()) {
        const resUnwrap = res.unwrap();

        const channelInfoRes: ChannelInfoMergeResult[] = await Promise.all(
          resUnwrap.map(async (data: ChannelSearchResult) => {
            const result = await this.channelInfoAdapter.execute(
              data.channel_id,
            );

            return {
              ...data,
              ...(result.isOk() ? result.unwrap()['0'] : {}),
            };
          }),
        );
        let filteredChannelInfoRes = channelInfoRes;
        if (dto.channelSubscriber) {
          const [minSubscribers, maxSubscribers] = this.getSubscriberRange(
            dto.channelSubscriber,
          );
          filteredChannelInfoRes = channelInfoRes.filter(
            (channel) =>
              channel.channel_subscribers !== undefined &&
              channel.channel_subscribers >= minSubscribers &&
              (maxSubscribers === undefined ||
                channel.channel_subscribers <= maxSubscribers),
          );
        }
        const limit = dao.limit > 50 ? 50 : dao.limit;
        const sortedAndLimitedResults = filteredChannelInfoRes
          .sort((a, b) => {
            if (dto.sort === 'channel_subscribers') {
              return (
                (b.channel_subscribers ?? 0) - (a.channel_subscribers ?? 0)
              );
            } else {
              return (
                (b.channel_average_views ?? 0) - (a.channel_average_views ?? 0)
              );
            }
          })
          .slice(0, Number(limit));

        return Ok(
          sortedAndLimitedResults.map((e) => ({
            channelName: e.channel_name,
            channelThumbnail: e.channel_thumbnail,
            channelCluster: e.channel_cluster,
            mainUsedKeywords: e.mainly_used_keywords,
            mainUsedTags: e.mainly_used_tags,
            channelSubscribers: e.channel_subscribers,
            channelAverageViews: e.channel_average_views,
          })),
        );
      }
      return Err(res.unwrapErr());
    } catch (err) {
      return Err(err);
    }
  }
}
