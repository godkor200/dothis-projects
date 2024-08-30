import {
  IRangeVideoHistoryOutboundPort,
  VideoHistoryRangeAdapterResult,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { RangeVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { ScrollService } from '@Apps/common/opensearch/service/opensearch.scroll-api.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class VideoHistoryRangeAdapter
  implements IRangeVideoHistoryOutboundPort
{
  constructor(private readonly scrollService: ScrollService) {}

  async execute(
    dao: RangeVideoHistoryDao,
  ): Promise<VideoHistoryRangeAdapterResult> {
    const index = 'video_history';

    const mustQueries: any[] = [
      {
        match: {
          use_text: dao.search,
        },
      },
      {
        range: {
          '@timestamp': {
            gte: dao.from,
            lte: dao.to,
            format: 'yyyy-MM-dd', // 명확한 날짜 형식 지정
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
      const allDocuments = await this.scrollService.fetchAllDocuments(
        index,
        { bool: { must: mustQueries } },
        [
          'video_id',
          'video_views',
          'channel_average_views',
          'video_performance',
          'video_cluster',
          'year_c',
          'month_c',
          'day_c',
        ],
      );

      return Ok({
        total: allDocuments.length,
        items: allDocuments,
      });
    } catch (error) {
      console.error('Error fetching video history:', error);
      return Err(error);
    }
  }
}
