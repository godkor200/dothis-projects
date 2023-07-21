import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

export class FindVideoQuery implements IQuery {
  readonly search: string;
  readonly related?: string;
  constructor(props: FindVideoQuery) {
    Object.assign(this, props);
  }
}

@QueryHandler(FindVideoQuery)
export class FindVideoHandler
  implements IQueryHandler<FindVideoQuery, IfindManyVideoResult[]>
{
  constructor(
    @Inject(VIDEO_DI_TOKEN.FIND_VIDEO_DATA_REPOSITORY_BY_OS)
    protected readonly videoRepo: VideoServicePort,
  ) {}

  async execute(query: FindVideoQuery): Promise<IfindManyVideoResult[]> {
    return await this.videoRepo.findVideoByWords(query);
  }
}
