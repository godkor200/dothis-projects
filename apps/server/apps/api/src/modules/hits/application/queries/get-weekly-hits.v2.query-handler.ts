import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { IRes, WeeklyKeywordsRes } from '@Libs/types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { WeeklyHitsV2InboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.inbound.port';
import { GetWeeklyHitsListDto } from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
export type TGetWeeklyHitsRes = Result<
  IRes<WeeklyKeywordsRes[]>,
  WeeklyViewsError
>;
@QueryHandler(GetWeeklyHitsListDto)
export class GetWeeklyHitsV2QueryHandler
  implements IQueryHandler<GetWeeklyHitsListDto, TGetWeeklyHitsRes>
{
  constructor(
    @Inject(WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN)
    private readonly weeklyHitsService: WeeklyHitsV2InboundPort,
  ) {}

  async execute(dto: GetWeeklyHitsListDto): Promise<TGetWeeklyHitsRes> {
    return await this.weeklyHitsService.execute(dto);
  }
}
