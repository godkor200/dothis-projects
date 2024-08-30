import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Inject } from '@nestjs/common';
import {
  VideoDataOutboundPort,
  VideoDataResult,
} from '@Apps/modules/video/domain/ports/video_data.outbound.port';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export class VideoDataAdapter implements VideoDataOutboundPort {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}
  async execute(videoIds: string[]): Promise<VideoDataResult> {
    try {
      const { body } = await this.opensearchClient.mget({
        index: 'video_data', // 인덱스 이름
        body: {
          ids: videoIds, // 여러 _id 값이 담긴 배열
        },
      });

      if (!body.docs) {
        return Err(new VideoNotFoundError());
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
