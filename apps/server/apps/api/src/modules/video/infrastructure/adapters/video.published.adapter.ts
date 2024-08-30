import {
  IVideoPubilshedOutboundRes,
  VideoPubilshedOutboundPort,
} from '@Apps/modules/video/domain/ports/video.pubilshed.outbound.port';
import { VideoPublishedDao } from '@Apps/modules/video/infrastructure/daos/video.pubilshed.dao';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';

export class VideoPublishedAdapter implements VideoPubilshedOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(dao: VideoPublishedDao): Promise<IVideoPubilshedOutboundRes> {
    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      {
        range: {
          video_published: {
            gte: dao.from,
            lte: dao.to,
            format: 'yyyy-MM-dd',
          },
        },
      },
    ];

    // dao.related가 있는 경우 추가
    if (dao.related) {
      mustQueries.push({
        match: {
          use_text: dao.related,
        },
      });
    }

    try {
      const response = await this.opensearchClient.search({
        index: 'video_data', // 인덱스 이름
        size: 0, // 결과로 문서 데이터를 포함하지 않음
        body: {
          // 쿼리와 집계를 body에 포함
          query: {
            bool: { must: mustQueries },
          },
          aggs: {
            videos_per_day: {
              date_histogram: {
                field: 'video_published',
                calendar_interval: 'day',
                format: 'yyyy-MM-dd',
              },
            },
          },
        },
      });

      // 처리할 집계 결과
      const buckets = response.body.aggregations.videos_per_day.buckets;
      return Ok(buckets);
    } catch (error) {
      console.error('Error fetching video search:', error);
      return Err(error);
    }
  }
}
