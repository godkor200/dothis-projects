import { VideoListByChannelIdOutboundPort } from '@Apps/modules/video/domain/ports/video.list.by-channel-id.outbound.port';
import {
  VideoHistoryDataResp,
  VideoListByChannelIdDao,
} from '@Apps/modules/video/infrastructure/daos/video.list-by-channel-id.dao';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type VideoListByChannelIdAdapterResult = Result<
  VideoHistoryDataResp[],
  VideoNotFoundError
>;
export class VideoListByChannelIdAdapter
  implements VideoListByChannelIdOutboundPort
{
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }

  async execute(
    dao: VideoListByChannelIdDao,
  ): Promise<VideoListByChannelIdAdapterResult> {
    const mustQueries: any[] = [
      {
        match: {
          channel_id: dao.channelId,
        },
      },
    ];

    if (dao.search) {
      mustQueries.push({
        match: {
          use_text: dao.search,
        },
      });
    }
    if (dao.from) {
      mustQueries.push({
        range: {
          video_published: {
            gte: dao.from,
            format: 'yyyy-MM-dd',
          },
        },
      });
    }
    try {
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );

      const response = await this.opensearchClient.search({
        index,
        body: {
          query: {
            bool: {
              must: mustQueries,
            },
          },
          sort: [
            {
              [dao.sort || 'video_published']: { order: dao.order || 'asc' },
            },
          ],
        },
      });

      const hits = response.body.hits.hits.map((hit: any) => hit._source); // 검색 결과의 소스만 추출

      if (hits.length === 0) {
        return Err(new VideoNotFoundError());
      }
      return Ok(hits); // 검색된 결과의 data를 반환
    } catch (e) {
      return Err(e); // 에러 반환시 Err()로 감싸서 반환
    }
  }
}
