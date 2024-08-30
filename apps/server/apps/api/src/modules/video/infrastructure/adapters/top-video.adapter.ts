import {
  TopVideoOutboundPort,
  TopVideoResult,
} from '@Apps/modules/video/domain/ports/top-video.outbound.port';
import { TopVideoDao } from '@Apps/modules/video/infrastructure/daos/top-video.dao';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import dayjs from 'dayjs';

export class TopVideoAdapter implements TopVideoOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}
  async execute(dao: TopVideoDao): Promise<TopVideoResult> {
    const threeMonthsAgo = dayjs().subtract(3, 'months').format('YYYY-MM-DD');
    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      {
        range: {
          '@timestamp': {
            gte: dao.to,
            lte: dao.to,
            format: 'yyyy-MM-dd',
          },
        },
      },
      {
        range: {
          video_published: {
            gte: threeMonthsAgo,
            lte: dao.to,
            format: 'yyyy-MM-dd', // Date format
          },
        },
      },
    ];

    if (dao.related) {
      mustQueries.push({
        match: {
          use_text: dao.related,
        },
      });
    }
    try {
      const { body } = await this.opensearchClient.search({
        index: 'video_history', // 데이터 스트림 이름을 사용
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          sort: [
            {
              ['video_views']: {
                order: 'DESC',
              },
            },
          ],
        },
        _source: [
          'video_id',
          'video_views',
          'channel_name',
          'video_title',
          'video_published',
        ],
        size: 1,
      });

      if (!body.hits.total.value) return Err(new VideoNotFoundError());
      return Ok({
        items: body.hits.hits.map((hit) => hit._source),
      });
    } catch (err) {
      console.error('Error fetching video history:', err);
      return Err(err);
    }
  }
}
