import { Controller, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindDailyViewsRequestDto,
  FindDailyViewsRequestQuery,
} from './find-daily-views.dto';
import { FindDailyViewsQuery } from './find-daily-views.query-handler';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ApiOperation } from '@nestjs/swagger';
const c = nestControllerContract(apiRouter.dailyViews);
const { getDailyViews } = c;
const { summary, description } = getDailyViews;

@Controller()
export class FindDailyViewsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getDailyViews)
  @ApiOperation({
    summary,
    description,
  })
  async execute(
    @Param() params: FindDailyViewsRequestDto,
    @Query() query: FindDailyViewsRequestQuery,
  ) {
    return this.queryBus.execute(
      new FindDailyViewsQuery({
        relationKeyword: params.relationKeyword,
        from: query.from,
        to: query.to,
      }),
    );
  }
}
