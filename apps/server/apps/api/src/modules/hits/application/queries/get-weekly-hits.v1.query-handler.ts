import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWeeklyViewsDto } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { Result } from 'oxide.ts';
import { WeeklyHitsInboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import {
  IRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
export type TGetWeeklyHitsRes = Result<
  IRes<WeeklyKeywordsRes[]>,
  WeeklyViewsError
>;
@QueryHandler(GetWeeklyViewsDto)
export class GetWeeklyHitsV1QueryHandler
  implements IQueryHandler<GetWeeklyViewsDto, TGetWeeklyHitsRes>
{
  constructor(
    @Inject(WEEKLY_VIEWS_SERVICE_DI_TOKEN)
    private readonly weeklyHitsService: WeeklyHitsInboundPort,
  ) {}

  async execute(dto: GetWeeklyViewsDto): Promise<TGetWeeklyHitsRes> {
    return await this.weeklyHitsService.getPagination(dto);
  }
}
