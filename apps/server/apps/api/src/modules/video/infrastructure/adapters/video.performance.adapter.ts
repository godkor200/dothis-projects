import {
  IVideoPerformanceOutboundPort,
  VideoPerformanceOutboundPortResult,
} from '@Apps/modules/video/domain/ports/video.performance.outbound.port';
import { VideoPerformanceDao } from '@Apps/modules/video/infrastructure/daos/video.performance.dao';
import { undefined } from 'zod';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Ok } from 'oxide.ts';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';

export class VideoPerformanceAdapter implements IVideoPerformanceOutboundPort {
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }

  async execute(
    dao: VideoPerformanceDao,
  ): Promise<VideoPerformanceOutboundPortResult> {
    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
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
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );

      // Count total videos matching the basic criteria
      const totalVideoCountResponse = await this.opensearchClient.count({
        index,
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
        index,
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
  }
}
