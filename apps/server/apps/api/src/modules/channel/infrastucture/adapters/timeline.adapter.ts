import {
  GetTimelineOutboundPort,
  TGetTimelineResult,
} from '@Apps/modules/channel/domain/ports/get-timeline.outbound.port';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { DateUtil } from '@Libs/commons/utils/date.util';
import { Err, Ok } from 'oxide.ts';

export class TimelineAdapter implements GetTimelineOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(channelId: string): Promise<TGetTimelineResult> {
    const { year, month, day } = DateUtil.currentDate();
    const curr = `${year}-${month}-${day}`;
    const oneYearAgo = DateUtil.getOneYearAgo(curr);

    try {
      const mustQueries = [
        {
          match: {
            channel_id: channelId,
          },
        },
        {
          range: {
            video_published: {
              gte: oneYearAgo,
              lte: curr,
              format: 'yyyy-MM-dd', // 명확한 날짜 형식 지정
            },
          },
        },
      ];

      const response = await this.opensearchClient.search({
        index: 'video_data',
        body: { query: { bool: { must: mustQueries } } },
        _source: ['video_id', 'video_published', 'video_title'],
      });

      const results = response.body.hits.hits.map((hit: any) => hit._source);

      return Ok(results);
    } catch (error) {
      console.error('Error searching video data:', error);
      return Err(error);
    }
  }
}
