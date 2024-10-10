import {
  ChannelInfoOutboundPort,
  ChannelInfoResult,
  TChannelInfoResult,
} from '@Apps/modules/channel/domain/ports/channel-info.outbound.port';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { DateUtil } from '@Libs/commons/utils/date.util';
import { Err, Ok } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

export class GetChannelInfoAdapter implements ChannelInfoOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}
  async execute(channelId: string): Promise<TChannelInfoResult> {
    //날짜 고정
    let adjustedTo = '2024-10-05';

    try {
      const mustQueries: any[] = [
        {
          match: {
            channel_id: channelId,
          },
        },
        {
          range: {
            '@timestamp': {
              gte: adjustedTo,
              lte: adjustedTo,
              format: 'yyyy-MM-dd', // 명확한 날짜 형식 지정
            },
          },
        },
      ];

      const response = await this.opensearchClient.search({
        index: 'video_history',
        body: { query: { bool: { must: mustQueries } } },
        _source: [
          'channel_id',
          'channel_name',
          'channel_subscribers',
          'channel_total_views',
          'channel_average_views',
          'channel_total_videos',
        ],
      });

      const results: ChannelInfoResult[] = response.body.hits.hits.map(
        (hit: any) => hit._source,
      );

      if (!results.length) {
        return Err(new ChannelNotFoundError());
      }
      return Ok(results);
    } catch (error) {
      console.error('Error searching channel data:', error);
      return Err(error);
    }
  }
}
