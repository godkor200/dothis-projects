import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import { IPagingRes } from '@Apps/modules/video/interface/find-many-video.interface';
import { Inject } from '@nestjs/common';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
@QueryHandler(FindVideoPageQuery)
export class FindVideoPageQueryHandler
  implements IQueryHandler<FindVideoPageQuery, IPagingRes>
{
  constructor(
    @Inject(VIDEO_DI_TOKEN.FIND_VIDEO_DATA_REPOSITORY_BY_OS)
    protected readonly video: VideoServicePort,
  ) {}
  async execute(arg: FindVideoPageQuery): Promise<IPagingRes> {
    return await this.video.findVideoPaging(arg);
  }
}
