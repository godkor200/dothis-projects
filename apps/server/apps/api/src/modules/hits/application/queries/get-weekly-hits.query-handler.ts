import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { IRes, WeeklyKeywordsRes } from '@Libs/types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

import { GetWeeklyHitsListDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import { WeeklyHitsV2InboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
export type TGetWeeklyHitsRes = Result<
  IRes<WeeklyKeywordsRes[]>,
  WeeklyViewsError
>;
@QueryHandler(GetWeeklyHitsListDto)
export class GetWeeklyHitsQueryHandler
  implements IQueryHandler<GetWeeklyHitsListDto, TGetWeeklyHitsRes>
{
  constructor(
    @Inject(WEEKLY_VIEWS_SERVICE_DI_TOKEN)
    private readonly weeklyHitsService: WeeklyHitsV2InboundPort,
  ) {}

  async execute(dto: GetWeeklyHitsListDto): Promise<TGetWeeklyHitsRes> {
    return await this.weeklyHitsService.execute(dto);
  }
}
