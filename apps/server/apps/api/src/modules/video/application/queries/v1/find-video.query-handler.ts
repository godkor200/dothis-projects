import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_ENTIRE_CLUSTER_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';

import {
  IGetRelatedVideoOutboundPort,
  TRelatedVideos,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';

@QueryHandler(SearchRelationVideoAndHistoryDao)
export class FindVideoHandler
  implements IQueryHandler<SearchRelationVideoAndHistoryDao, TRelatedVideos>
{
  constructor(
    @Inject(VIDEO_ENTIRE_CLUSTER_IGNITE_DI_TOKEN)
    protected readonly getRelatedVideoOutboundPort: IGetRelatedVideoOutboundPort,
  ) {}

  async execute(
    query: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideos> {
    return await this.getRelatedVideoOutboundPort.execute(query);
  }
}
