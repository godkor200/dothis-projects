import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';
import { IFindManyVideoResult } from '@Apps/modules/video/interfaces/find-many-video.interface';
import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';

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
    @Inject(VIDEO_IGNITE_DI_TOKEN)
    protected readonly videoRepo: VideoOutboundPort,
  ) {}

  async execute(query: FindVideoQuery): Promise<IFindManyVideoResult[]> {
    return await this.videoRepo.get();
  }
}
