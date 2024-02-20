import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IIgnitePagingRes,
  IPagingRes,
} from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { Ok, Result, Err } from 'oxide.ts';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_GET_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoInboundPort } from '@Apps/modules/video/domain/ports/video.inbound.port';
export type TGetVideoPage = Result<IIgnitePagingRes, VideoNotFoundError>;
@QueryHandler(GetVideoPaginatedPageDto)
export class FindVideoPageQueryHandler
  implements IQueryHandler<GetVideoPaginatedPageDto, TGetVideoPage>
{
  constructor(
    @Inject(VIDEO_GET_SERVICE_DI_TOKEN)
    private readonly videoService: VideoInboundPort,
  ) {}
  async execute(dto: GetVideoPaginatedPageDto): Promise<TGetVideoPage> {
    return await this.videoService.getVideoDataService(dto);
  }
}
