import {
  VideoBucket,
  VideoDurationLengthOutboundPort,
  VideoDurationLengthResult,
} from '@Apps/modules/video/domain/ports/video.duration-length.outbound.port';
import { VideoDurationLengthDao } from '@Apps/modules/video/infrastructure/daos/video.duration-length.dao';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok } from 'oxide.ts';
import dayjs from 'dayjs';

export class VideoDurationLengthAdapter
  implements VideoDurationLengthOutboundPort
{
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(
    dao: VideoDurationLengthDao,
  ): Promise<VideoDurationLengthResult> {
    const adjustedTo = dayjs(dao.to).subtract(1, 'day').format('YYYY-MM-DD');

    try {
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

      if (dao.related) {
        mustQueries.push({
          match: {
            use_text: dao.related,
          },
        });
      }
      const response = await this.opensearchClient.search({
        index: 'video_history',
        size: 0,
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          aggs: {
            age_groups: {
              range: {
                field: 'video_duration',
                ranges: [
                  { from: 31, to: 90, key: '31to90' },
                  { from: 91, to: 150, key: '91to150' },
                  { from: 151, to: 210, key: '151to210' },
                ],
              },
              aggs: {
                total_video_views: {
                  sum: {
                    field: 'video_views',
                  },
                },
              },
            },
          },
        },
      });

      // 집계 결과 처리
      const ageGroups = response.body.aggregations.age_groups.buckets;
      const result: VideoBucket[] = ageGroups.map((bucket: any) => ({
        key: bucket.key,
        from: bucket.from,
        to: bucket.to,
        doc_count: bucket.doc_count,
        total_video_views: bucket.total_video_views.value,
      }));

      return Ok(result);
    } catch (error) {
      return Err(error);
    }
  }
}
