import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok } from 'oxide.ts';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';
import {
  TVideoHistoryResult,
  VideoHistoryRecentByIdOutboundPort,
} from '@Apps/modules/video-history/domain/ports/video-history.recent-by-id.outbound.port';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export class VideoHistoryRecentByIdAdapter
  implements VideoHistoryRecentByIdOutboundPort
{
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }
  async execute(videoIds: string[]): Promise<TVideoHistoryResult> {
    try {
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );
      const { body } = await this.opensearchClient.mget({
        index, // 인덱스 이름
        body: {
          ids: videoIds, // 여러 _id 값이 담긴 배열
        },
      });

      if (!body.docs) {
        return Err(new VideoHistoryNotFoundError());
      }

      // 각 문서가 존재하는지 확인하고, 존재하는 문서의 _source를 반환
      return Ok(
        body.docs
          .filter((doc: any) => doc.found)
          .map((doc: any) => doc._source),
      );
    } catch (error) {
      console.error('Error fetching video data by IDs:', error);
      return Err(error);
    }
  }
}
