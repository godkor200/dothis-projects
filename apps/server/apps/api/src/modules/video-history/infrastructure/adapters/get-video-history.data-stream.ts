import {
  VideoHistoryDataStreamOutbound,
  VideoHistoryDataStreamResult,
} from '@Apps/modules/video-history/domain/ports/video-history.data-stream.outbound.port';
import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';

export class GetVideoHistoryDataStream
  implements VideoHistoryDataStreamOutbound
{
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(): Promise<VideoHistoryDataStreamResult> {
    try {
      const res = await this.opensearchClient.transport.request({
        method: 'GET',
        path: '/_data_stream/video_history',
      });
      const dataStreams = res.body.data_streams;

      if (!dataStreams || dataStreams.length === 0) {
        throw new Error('No data streams found for video_history');
      }

      const indices = dataStreams[0].indices;

      if (!indices || indices.length === 0) {
        throw new Error(
          'No backing indices found for video_history data stream',
        );
      }

      // Return the name of the most recent backing index
      const mostRecentIndex = indices[indices.length - 1].index_name;
      return mostRecentIndex;
    } catch (error) {
      console.error('Error fetching the most recent backing index:', error);
    }
  }
}
