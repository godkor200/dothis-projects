import { Injectable, Inject } from '@nestjs/common';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok, Result } from 'oxide.ts';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import {
  SubscriberViewAnalysisOutboundPort,
  TSubscriberViewAnalysisResult,
} from '@Apps/modules/video/domain/ports/subscriber-view-analysis.outbound.port';
import { SubscriberViewAnalysisError } from '@Apps/modules/video/domain/events/video.error';
import dayjs from 'dayjs';
import { SubscriberViewsDao } from '@Apps/modules/hits/infrastructure/daos/subscriber-views.dao';

@Injectable()
export class SubscriberViewAnalysisAdapter
  implements SubscriberViewAnalysisOutboundPort
{
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(
    dao: SubscriberViewsDao,
  ): Promise<TSubscriberViewAnalysisResult> {
    const adjustedTo = dayjs(dao.to).subtract(1, 'day').format('YYYY-MM-DD');

    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      {
        range: {
          '@timestamp': {
            gte: adjustedTo,
            lte: adjustedTo,
            format: 'yyyy-MM-dd',
          },
        },
      },
    ];

    // Add condition if dao.related is present
    if (dao.related) {
      mustQueries.push({
        match: {
          use_text: dao.related,
        },
      });
    }

    try {
      const response = await this.opensearchClient.search({
        index: 'video_history', // 인덱스 이름은 실제 환경에 맞춰 조정
        size: 0,
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          aggs: {
            subscribers_1000to9999: {
              filter: {
                range: { channel_subscribers: { gte: 1000, lt: 9999 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
            subscribers_10000to49999: {
              filter: {
                range: { channel_subscribers: { gte: 10000, lt: 49999 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
            subscribers_50000to99999: {
              filter: {
                range: { channel_subscribers: { gte: 50000, lt: 99999 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
            subscribers_100000to499999: {
              filter: {
                range: { channel_subscribers: { gte: 100000, lt: 499999 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
            subscribers_500000to999999: {
              filter: {
                range: { channel_subscribers: { gte: 500000, lt: 999999 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
            subscribers_1000000plus: {
              filter: {
                range: { channel_subscribers: { gte: 1000000 } },
              },
              aggs: { total_video_views: { sum: { field: 'video_views' } } },
            },
          },
        },
      });

      const aggs = response.body.aggregations;
      const results = [
        {
          key: '1000to9999',
          from: 1000,
          to: 9999,
          docCount: aggs.subscribers_1000to9999.doc_count,
          totalVideoViews: aggs.subscribers_1000to9999.total_video_views.value,
        },
        {
          key: '10000to49999',
          from: 10000,
          to: 49999,
          docCount: aggs.subscribers_10000to49999.doc_count,
          totalVideoViews:
            aggs.subscribers_10000to49999.total_video_views.value,
        },
        {
          key: '50000to99999',
          from: 50000,
          to: 99999,
          docCount: aggs.subscribers_50000to99999.doc_count,
          totalVideoViews:
            aggs.subscribers_50000to99999.total_video_views.value,
        },
        {
          key: '100000to499999',
          from: 100000,
          to: 499999,
          docCount: aggs.subscribers_100000to499999.doc_count,
          totalVideoViews:
            aggs.subscribers_100000to499999.total_video_views.value,
        },
        {
          key: '500000to999999',
          from: 500000,
          to: 999999,
          docCount: aggs.subscribers_500000to999999.doc_count,
          totalVideoViews:
            aggs.subscribers_500000to999999.total_video_views.value,
        },
        {
          key: '1000000plus',
          from: 1000000,
          to: undefined, // 'to' is optional for this range
          docCount: aggs.subscribers_1000000plus.doc_count,
          totalVideoViews: aggs.subscribers_1000000plus.total_video_views.value,
        },
      ];

      return Ok(results);
    } catch (error) {
      console.error('Error fetching subscriber view analysis:', error);
      return Err(new SubscriberViewAnalysisError('Internal error occurred'));
    }
  }
}
