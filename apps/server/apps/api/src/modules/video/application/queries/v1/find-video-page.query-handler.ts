import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IIgnitePagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { Ok, Result, Err } from 'oxide.ts';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_GET_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoInboundPort } from '@Apps/modules/video/domain/ports/video.inbound.port';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/events/video_history.err';
export type TGetVideoPage = Result<
  IIgnitePagingRes,
  VideoNotFoundError | TableNotFoundException | VideoHistoryNotFoundError
>;
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
