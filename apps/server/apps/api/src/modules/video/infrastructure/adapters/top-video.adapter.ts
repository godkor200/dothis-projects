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
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';

/**
 * 금주의 이슈 동영상 뽑기
 */
export class TopVideoAdapter implements TopVideoOutboundPort {
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }
  async execute(dao: TopVideoDao): Promise<TopVideoResult> {
    const adjustedTo = dayjs(dao.to).format('YYYY-MM-DD');
    const sevenDaysAgo = dayjs(adjustedTo)
      .subtract(7, 'day')
      .format('YYYY-MM-DD');

    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      {
        range: {
          video_published: {
            gte: sevenDaysAgo,
            lte: adjustedTo,
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
    const { index } = await this.openSearchHelper.findLargestBackingIndex(
      'video_history',
    );
    try {
      const resp = await this.opensearchClient.search({
        index, // 데이터 스트림 이름을 사용
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
        size: 5,
      });

      if (!resp.body.hits.total.value) return Err(new VideoNotFoundError());
      return Ok({
        items: resp.body.hits.hits.map((hit) => hit._source),
      });
    } catch (err) {
      console.error('Error fetching video history:', err);
      return Err(err);
    }
  }
}
