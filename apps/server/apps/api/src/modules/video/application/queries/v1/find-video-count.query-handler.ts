import { Result } from 'oxide.ts';
import { VideoCountRes } from '@Libs/commons/src/interfaces/types/res.types';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_COUNT_GET_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { findVideoCountByDateServiceInboundPort } from '@Apps/modules/video/domain/ports/find-video-count.inbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export type TFindVideoCount = Result<VideoCountRes, VideoNotFoundError>;

@QueryHandler(FindVideoCountDto)
export class FindVideoCountQueryHandler
  implements IQueryHandler<FindVideoCountDto, TFindVideoCount>
{
  constructor(
    @Inject(VIDEO_COUNT_GET_SERVICE_DI_TOKEN)
    private readonly findVideoCountByDate: findVideoCountByDateServiceInboundPort,
  ) {}

  async execute(dto: FindVideoCountDto): Promise<TFindVideoCount> {
    return this.findVideoCountByDate.execute(dto);
  }
}
