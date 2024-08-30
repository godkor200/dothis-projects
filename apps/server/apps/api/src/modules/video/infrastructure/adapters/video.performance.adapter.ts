import { IVideoPerformanceOutboundPort } from '@Apps/modules/video/domain/ports/video.performance.outbound.port';
import { VideoPerformanceDao } from '@Apps/modules/video/infrastructure/daos/video.performance.dao';
import { undefined } from 'zod';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import dayjs from 'dayjs';
import { Ok } from 'oxide.ts';
import { timestamp } from 'rxjs';

export class VideoPerformanceAdapter implements IVideoPerformanceOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(dao: VideoPerformanceDao): Promise<any> {
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
      // Count total videos matching the basic criteria
      const totalVideoCountResponse = await this.opensearchClient.count({
        index: 'video_history',
        body: {
          query: {
            bool: { must: mustQueries },
          },
        },
      });

      // Count videos where video_performance is greater than 1
      const countAboveAverageQueries = [
        ...mustQueries,
        {
          range: {
            video_performance: {
              gt: 1,
            },
          },
        },
      ];

      const countAboveAverageResponse = await this.opensearchClient.count({
        index: 'video_history',
        body: {
          query: {
            bool: { must: countAboveAverageQueries },
          },
        },
      });

      return Ok({
        totalVideoCount: totalVideoCountResponse.body.count,
        countAboveAverage: countAboveAverageResponse.body.count,
      });
    } catch (err) {
      console.error(err);
    }

    return Promise.resolve(undefined);
  }
}
