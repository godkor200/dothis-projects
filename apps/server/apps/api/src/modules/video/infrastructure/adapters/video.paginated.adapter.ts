import {
  IGetVideoPaginatedOutboundPort,
  VideoPaginatedResult,
} from '@Apps/modules/video/domain/ports/video.paginated.outbound.port';
import { VideoPaginatedDao } from '@Apps/modules/video/infrastructure/daos/video.paginated.dao';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class VideoPaginatedAdapter implements IGetVideoPaginatedOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient, // @Inject(VIDEO_HISTORY_GET_DATA_STREAM_DI_TOKEN) // private readonly videoHistoryDataStreamAdapter: VideoHistoryDataStreamOutbound,
  ) {}

  async execute(dao: VideoPaginatedDao): Promise<VideoPaginatedResult> {
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
    ];

    if (dao.related) {
      mustQueries.push({
        match: {
          use_text: dao.related,
        },
      });
    }

    try {
      const pageSize = Number(dao.limit);
      const currentPage = dao.page ? Number(dao.page) : 1; // page가 없을 경우 기본값 1
      const fromIndex = (currentPage - 1) * pageSize; // 시작 위치 계산

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
              [dao.sort]: {
                order: dao.order,
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
        size: pageSize,
        from: fromIndex,
      });

      if (!body.hits.total.value) return Err(new VideoNotFoundError());

      return Ok({
        total: body.hits.total.value, // .value로 실제 값 접근
        items: body.hits.hits.map((hit) => hit._source),
      });
    } catch (error) {
      console.error('Error fetching video history:', error);
      return Err(error);
    }
  }
}
