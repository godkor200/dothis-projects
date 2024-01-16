import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWeeklyViewsDto } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_BY_OS } from '@Apps/modules/weekly_views/constants/weekly_views.di-token.constants';
import { WeeklyViewsOutboundPort } from '@Apps/modules/weekly_views/repository/database/weekly-views.outbound.port';
import { WeeklyKeywordsRes } from '@Libs/commons/src/types/res.types';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';

@QueryHandler(GetWeeklyViewsDto)
export class GetWeeklyViewsListQueryHandler
  implements
    IQueryHandler<
      GetWeeklyViewsDto,
      Result<WeeklyKeywordsRes, WeeklyViewsError>
    >
{
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_BY_OS)
    private readonly weeklyViews: WeeklyViewsOutboundPort,
  ) {}
  async execute(
    query: GetWeeklyViewsDto,
  ): Promise<Result<WeeklyKeywordsRes, WeeklyViewsError>> {
    const res = await this.weeklyViews.getPaginatedWeeklyViewsByKeyword(query);
    if (res instanceof WeeklyViewsError) {
      return Err(new WeeklyViewsError());
    }
    return Ok(res);
  }
}
