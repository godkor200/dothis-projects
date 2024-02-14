import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';

import {
  TRelatedVideos,
  VideoOutboundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';

@QueryHandler(SearchRelationVideoAndHistoryDao)
export class FindVideoHandler
  implements IQueryHandler<SearchRelationVideoAndHistoryDao, TRelatedVideos>
{
  constructor(
    @Inject(VIDEO_IGNITE_DI_TOKEN)
    protected readonly videoAdapter: VideoOutboundPort,
  ) {}

  async execute(
    query: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideos> {
    return await this.videoAdapter.getRelatedVideos(query);
  }
}
