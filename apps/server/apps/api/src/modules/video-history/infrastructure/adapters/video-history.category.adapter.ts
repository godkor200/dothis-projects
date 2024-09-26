import {
  TVideoHistoryCategoryResult,
  VideoHistoryCategoryOutbound,
} from '@Apps/modules/video-history/domain/ports/video-history.category.outbound.port';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { VideoHistoryCategoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.category.dao';
import { Err, Ok } from 'oxide.ts';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';

export class VideoHistoryCategoryAdapter
  implements VideoHistoryCategoryOutbound
{
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }
  async execute(
    dao: VideoHistoryCategoryDao,
  ): Promise<TVideoHistoryCategoryResult> {
    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
    ];

    // dao.relatedWord가 있는 경우 추가
    if (dao.related) {
      mustQueries.push({
        match: {
          use_text: dao.related,
        },
      });
    }
    try {
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );
      const response = await this.opensearchClient.search({
        index,
        size: 0, // 결과 문서는 요청하지 않음
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          aggs: {
            video_clusters: {
              terms: {
                field: 'video_cluster',
                size: 100, // 최대 100개의 클러스터
              },
            },
          },
        },
      });

      // 집계 결과 추출
      return Ok(
        response.body.aggregations.video_clusters.buckets.map((bucket) => ({
          cluster: bucket.key,
          count: bucket.doc_count,
        })),
      );
    } catch (err) {
      console.error('Error fetching video clusters:', err);
      return Err(err);
    }
  }
}
