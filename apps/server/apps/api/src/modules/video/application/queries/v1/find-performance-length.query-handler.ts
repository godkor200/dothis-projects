import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPerformanceLengthDto } from '@Apps/modules/video/application/dtos/find-performance-length.dto';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons';
import { IRes } from '@Libs/types';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindPerformanceLengthInboundPort } from '@Apps/modules/video/domain/ports/find-performance-length.inbound.port';
import { TFindPerformanceLengthRes } from '@dothis/dto';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export type TFindPerformanceLengthResult = Result<
  IRes<TFindPerformanceLengthRes>,
  VideoNotFoundError | TableNotFoundException | CacheDoesNotFoundException
>;
@QueryHandler(FindPerformanceLengthDto)
export class FindPerformanceLengthQueryHandler
  implements
    IQueryHandler<FindPerformanceLengthDto, TFindPerformanceLengthResult>
{
  constructor(
    @Inject(VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN)
    private readonly findPerformanceLengthService: FindPerformanceLengthInboundPort,
  ) {}
  async execute(
    dto: FindPerformanceLengthDto,
  ): Promise<TFindPerformanceLengthResult> {
    return await this.findPerformanceLengthService.execute(dto);
  }
}
