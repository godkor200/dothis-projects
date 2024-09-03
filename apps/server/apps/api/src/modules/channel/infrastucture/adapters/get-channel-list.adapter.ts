import { Injectable, Inject } from '@nestjs/common';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok, Result } from 'oxide.ts';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { ChannelListOutboundPort } from '@Apps/modules/channel/domain/ports/channel-list.outbound.port';
import { ChannelListDao } from '@Apps/modules/channel/infrastucture/daos/get-channel-list.dao';

export interface ChannelSearchResult {
  channel_id: string;
  channel_name: string;
  channel_thumbnail: string;
  channel_cluster: number;
  mainly_used_keywords: string[];
  mainly_used_tags: string[];
}

export type TChannelSearchResult = Result<
  ChannelSearchResult[],
  ChannelNotFoundError
>;

@Injectable()
export class ChannelSearchAdapter implements ChannelListOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(dao: ChannelListDao): Promise<TChannelSearchResult> {
    try {
      const mustQueries: any[] = [];

      // if (dao.channelCluster !== null && dao.channelCluster !== undefined) {
      //   mustQueries.push({
      //     term: { channel_cluster: dao.channelCluster },
      //   });
      // }

      if (dao.channelCluster) {
        mustQueries.push({
          match: {
            channel_cluster: dao.channelCluster,
          },
        });
      }

      const response = await this.opensearchClient.search({
        index: 'channel_data', // 실제 인덱스 이름 사용
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          size: 70, // 최대 50개의 결과 반환
        },
        _source: [
          'channel_id',
          'channel_name',
          'channel_thumbnail',
          'channel_cluster',
          'mainly_used_keywords',
          'mainly_used_tags',
        ],
      });

      const results: ChannelSearchResult[] = response.body.hits.hits.map(
        (hit: any) => hit._source,
      );

      return Ok(results);
    } catch (error) {
      console.error('Error searching channel data:', error);
      return Err(error);
    }
  }
}
