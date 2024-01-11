import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { Ok, Result } from 'oxide.ts';
import { TWeeklyKeywordsListSource } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { WEEKLY_VIEWS_REPOSITORY_BY_OS } from '@Apps/modules/weekly_views/constants/weekly_views.di-token.constants';
import { WeeklyViewsOutboundPort } from '@Apps/modules/weekly_views/repository/database/weekly-views.outbound.port';

@QueryHandler(GetWeeklyViewsQuery)
export class GetWeeklyViewsListQueryHandler
  implements
    IQueryHandler<
      GetWeeklyViewsQuery,
      Result<TWeeklyKeywordsListSource[], any>
    >
{
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_BY_OS)
    private readonly weeklyViews: WeeklyViewsOutboundPort,
  ) {}
  async execute(
    query: GetWeeklyViewsQuery,
  ): Promise<Result<TWeeklyKeywordsListSource[], any>> {
    const res = await this.weeklyViews.getPaginatedWeeklyViewsByKeyword(query);
    return Ok(res);
  }
}
