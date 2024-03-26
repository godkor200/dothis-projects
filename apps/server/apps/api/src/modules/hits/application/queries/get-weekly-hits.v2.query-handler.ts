import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWeeklyViewsDtoV2 } from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import {
  IRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { WeeklyHitsV2InboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.inbound.port';
export type TGetWeeklyHitsRes = Result<
  IRes<WeeklyKeywordsRes[]>,
  WeeklyViewsError
>;
@QueryHandler(GetWeeklyViewsDtoV2)
export class GetWeeklyHitsV2QueryHandler
  implements IQueryHandler<GetWeeklyViewsDtoV2, TGetWeeklyHitsRes>
{
  constructor(
    @Inject(WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN)
    private readonly weeklyHitsService: WeeklyHitsV2InboundPort,
  ) {}

  async execute(dto: GetWeeklyViewsDtoV2): Promise<TGetWeeklyHitsRes> {
    return await this.weeklyHitsService.execute(dto);
  }
}
