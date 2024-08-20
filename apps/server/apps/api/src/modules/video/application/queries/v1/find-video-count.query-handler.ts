import { Result } from 'oxide.ts';
import { VideoCountRes } from '@Libs/types';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_COUNT_GET_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { findVideoCountByDateServiceInboundPort } from '@Apps/modules/video/domain/ports/find-video-count.inbound.port';
import {
  RelatedVideoNotFoundError,
  VideoNotFoundError,
} from '@Apps/modules/video/domain/events/video.error';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

export type TFindVideoCount = Result<
  VideoCountRes,
  VideoNotFoundError | KeywordsNotFoundError | RelatedVideoNotFoundError
>;

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
