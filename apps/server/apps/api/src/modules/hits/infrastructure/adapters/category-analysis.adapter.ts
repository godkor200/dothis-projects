import { Inject, Injectable } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import {
  CategoryDistributionOutbound,
  TCategoryDistributionOutboundResult,
} from '@Apps/modules/hits/domain/ports/category-distribution.outbound.port';
import { CategoryDistributionDao } from '@Apps/modules/hits/infrastructure/daos/category-distribution.dao';
import { Ok, Err } from 'oxide.ts';
import dayjs from 'dayjs'; // assuming oxide.ts is used for result handling

@Injectable()
export class CategoryAnalysisAdapter implements CategoryDistributionOutbound {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(
    dao: CategoryDistributionDao,
  ): Promise<TCategoryDistributionOutboundResult> {
    const index = 'video_history';

    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      // Adjust the ranges for the setting aggregates for the same day at exact points
      {
        range: {
          '@timestamp': {
            gte: dao.from,
            lte: dao.to, // Next day of the starting date
            format: 'yyyy-MM-dd',
          },
        },
      },
      {
        range: {
          video_views: {
            gte: 100,
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
      const response = await this.opensearchClient.search({
        index,
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          aggs: {
            by_cluster: {
              terms: {
                field: 'video_cluster',
                order: { unique_video_count: 'desc' }, // unique_video_count를 기준으로 내림차순 정렬
              },
              aggs: {
                ending_views: {
                  filter: {
                    range: {
                      '@timestamp': {
                        gte: dao.to,
                        lt: nextDay(dao.to), // Next day of the end date
                      },
                    },
                  },
                  aggs: {
                    total_views_end: {
                      sum: { field: 'video_views' },
                    },
                  },
                },
                starting_views: {
                  filter: {
                    range: {
                      '@timestamp': {
                        gte: dao.from,
                        lt: nextDay(dao.from), // Next day of the starting date
                      },
                    },
                  },
                  aggs: {
                    total_views_start: {
                      sum: { field: 'video_views' },
                    },
                  },
                },
                view_change: {
                  bucket_script: {
                    buckets_path: {
                      startViews: 'starting_views>total_views_start',
                      endViews: 'ending_views>total_views_end',
                    },
                    script: 'params.endViews - params.startViews',
                  },
                },
                unique_video_count: {
                  cardinality: {
                    field: 'video_id',
                  },
                },
              },
            },
          },
        },
      });
      console.log(response.body.aggregations.by_cluster.buckets);
      // 결과 처리
      const aggregationResults =
        response.body.aggregations.by_cluster.buckets.map((bucket) => ({
          clusterNumber: bucket.key,
          viewChange: bucket.view_change.value,
          videoCount: bucket.unique_video_count.value,
        }));

      return Ok(aggregationResults);
    } catch (error) {
      console.error('Error during category distribution analysis:', error);
      return Err(error);
    }
  }
}

// Helper function to calculate the next day
function nextDay(dateStr: string): string {
  return dayjs(dateStr).add(1, 'day').format('YYYY-MM-DD');
}
