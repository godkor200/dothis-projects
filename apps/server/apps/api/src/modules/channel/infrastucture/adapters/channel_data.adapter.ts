import { Injectable, Inject } from '@nestjs/common';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Err, Ok } from 'oxide.ts';
import {
  ChannelAdapterOutboundPort,
  ChannelAdapterOutboundResult,
} from '@Apps/modules/channel/domain/ports/channel.adapter.port';

interface ChannelData {
  channelId: string;
  channelName: string;
  channelDescription: string;
  channelTags: string[];
  channelSubscribers: number;
  channelTotalViews: number;
}

@Injectable()
export class ChannelDataAdapter implements ChannelAdapterOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(ids: string[]): Promise<ChannelAdapterOutboundResult> {
    try {
      const { body } = await this.opensearchClient.mget({
        index: 'channel-data', // 채널 데이터를 저장한 인덱스 이름
        body: {
          ids: ids, // 여러 채널 ID 값이 담긴 배열
        },
      });

      if (!body.docs) {
        throw new Error('No documents found');
      }

      // 각 문서가 존재하는지 확인하고, 존재하는 문서의 _source를 반환
      const channelData = body.docs
        .filter((doc: any) => doc.found)
        .map((doc: any) => ({
          channelId: doc._source.channel_id,
          channelName: doc._source.channel_name,
          channelDescription: doc._source.channel_description,
          channelTags: doc._source.channel_tags,
        }));

      return Ok(channelData);
    } catch (error) {
      console.error('Error fetching channel data:', error);
      return Err(error);
    }
  }
}
