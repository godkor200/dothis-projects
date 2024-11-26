import { ChannelDataByElementPort } from '@Apps/modules/channel/domain/ports/channel_data_by_element.port';
import { ChannelDataByElementDao } from '@Apps/modules/channel/infrastucture/daos/channel_data_by_element.dao';
import { Injectable, Inject } from '@nestjs/common';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Err, Ok } from 'oxide.ts';
import { ChannelAdapterOutboundResult } from '@Apps/modules/channel/domain/ports/channel.adapter.port';

export class ChannelDataByElementAdapter implements ChannelDataByElementPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}
  async execute(
    dao: ChannelDataByElementDao,
  ): Promise<ChannelAdapterOutboundResult> {
    const channelTitle = dao.element;

    try {
      // Opensearch에 대한 쿼리 작성
      const { body } = await this.opensearchClient.search({
        index: 'channel-data',
        body: {
          query: {
            terms: {
              channel_name: channelTitle, // 배열로 전달된 thumbnail 값들
            },
          },
        },
      });

      if (!body.hits.hits) {
        throw new Error('No documents found');
      }

      // 각 문서의 _source를 반환
      const channelData = body.hits.hits.map((hit: any) => ({
        channelId: hit._source.channel_id,
        channelName: hit._source.channel_name,
        channelDescription: hit._source.channel_description,
        channelTags: hit._source.channel_tags,
        channelThumbnail: hit._source.channel_thumbnail,
      }));

      return Ok(channelData);
    } catch (error) {
      console.error('Error fetching channel data:', error);
      return Err(error);
    }
  }
}
