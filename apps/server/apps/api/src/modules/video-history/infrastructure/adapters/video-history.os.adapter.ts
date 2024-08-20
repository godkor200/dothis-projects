import { Inject, Injectable } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import {
  IVideoHistoryOsAdapterOutboundPort,
  TVideoHistoryOsAdapterResult,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetVideoHistoryMultipleByIdAndRelatedWordsDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';

@Injectable()
export class VideoHistoryOsAdapter
  implements IVideoHistoryOsAdapterOutboundPort
{
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(
    dao: GetVideoHistoryMultipleByIdAndRelatedWordsDao,
  ): Promise<TVideoHistoryOsAdapterResult> {
    try {
      const { body } = await this.opensearchClient.search({
        index: 'video_history', // 데이터 스트림 이름을 사용
        body: {
          query: {
            bool: {
              must: [
                {
                  terms: {
                    'video_id.keyword': Object.values(dao.videoIds).flat(), // video_id 리스트에 대한 조건
                  },
                },
                {
                  match: {
                    year_c: 2024, // 연도 조건
                  },
                },
                {
                  match: {
                    month_c: 7, // 월 조건
                  },
                },
                {
                  match: {
                    day_c: 31, // 마지막 날 (31일)
                  },
                },
              ],
            },
          },
        },
        _source: [
          'video_id',
          'video_views',
          'channel_average_views',
          'video_performance',
        ],
        size: 10000,
      });

      return Ok({
        total: body.hits.total,
        items: body.hits.hits.map((hit) => hit._source),
      });
    } catch (error) {
      console.error('Error fetching video history:', error);
      return Err(error);
    }
  }
}
