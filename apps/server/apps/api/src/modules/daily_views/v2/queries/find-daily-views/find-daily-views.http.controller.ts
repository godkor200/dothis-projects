import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ApiOperation } from '@nestjs/swagger';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';
const c = nestControllerContract(apiRouter.dailyViews);
const { getDailyViews } = c;
const { summary, description } = getDailyViews;

@Controller()
export class FindDailyViewsOsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getDailyViews)
  @Get()
  @ApiOperation({
    summary,
    description,
  })
  async execute(
    @Param() params: { keyword: string; relationKeyword?: string },
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    const { keyword, relationKeyword } = params;
    const query = new FindDailyViewsQuery({
      keyword,
      relationKeyword,
      from,
      to,
    });
    return await this.queryBus.execute(query);
  }
}
