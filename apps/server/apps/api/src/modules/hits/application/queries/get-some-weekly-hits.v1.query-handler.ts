import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSomeWeeklyHitsDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import {
  IRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsSomeInboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.inbound.port';
export type TGetSomeWeeklyHitsRes = Result<
  IRes<WeeklyKeywordsRes[]>,
  WeeklyViewsError
>;
@QueryHandler(GetSomeWeeklyHitsDto)
export class GetSomeWeeklyHitsV1QueryHandler
  implements IQueryHandler<GetSomeWeeklyHitsDto, TGetSomeWeeklyHitsRes>
{
  constructor(
    @Inject(WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN)
    private readonly weeklyHitsSomeService: WeeklyHitsSomeInboundPort,
  ) {}

  async execute(dto: GetSomeWeeklyHitsDto): Promise<TGetSomeWeeklyHitsRes> {
    return await this.weeklyHitsSomeService.execute(dto);
  }
}
