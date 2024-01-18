import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IFindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/database/video.query-handler.outbound.port';

export class FindVideoQuery implements IQuery {
  readonly search: string;
  readonly related?: string;
  constructor(props: FindVideoQuery) {
    Object.assign(this, props);
  }
}

@QueryHandler(FindVideoQuery)
export class FindVideoHandler
  implements IQueryHandler<FindVideoQuery, IFindManyVideoResult[]>
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    protected readonly videoRepo: VideoQueryHandlerOutboundPort,
  ) {}

  async execute(query: FindVideoQuery): Promise<IFindManyVideoResult[]> {
    return await this.videoRepo.findVideoByWords(query);
  }
}
