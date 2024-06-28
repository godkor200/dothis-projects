import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { FinishedIssueTodayDto } from '@Apps/modules/video/application/dtos/find-issue-today.dto';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { Inject } from '@nestjs/common';
import { FindIssueTodayInboundPort } from '@Apps/modules/video/domain/ports/find-issue-today.inbound.port';
import { VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';

export type TIssueTodayRes = Result<
  IRes<IVideoSchema[]>,
  VideoNotFoundError | TableNotFoundException | VideoHistoryNotFoundError
>;
@QueryHandler(FinishedIssueTodayDto)
export class FindIssueTodayQueryHandler
  implements IQueryHandler<FinishedIssueTodayDto, TIssueTodayRes>
{
  constructor(
    @Inject(VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN)
    private readonly findIssueTodayService: FindIssueTodayInboundPort,
  ) {}
  async execute(dto: FinishedIssueTodayDto): Promise<TIssueTodayRes> {
    return this.findIssueTodayService.execute();
  }
}
