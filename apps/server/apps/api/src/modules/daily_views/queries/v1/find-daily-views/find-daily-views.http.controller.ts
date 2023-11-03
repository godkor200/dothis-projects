import { Controller, Param, Query, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindDailyViewsRequestDto,
  FindDailyViewsRequestQuery,
} from './find-daily-views.dto';
import { FindDailyViewsQuery } from './find-daily-views.query-handler';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TimeoutInterceptor } from '@Apps/modules/daily_views/interceptor/timeout.interceptor';
const c = nestControllerContract(apiRouter.dailyViews);
const { getDailyViews } = c;
const { summary, description } = getDailyViews;

@ApiTags('데일리뷰')
@Controller()
export class FindDailyViewsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getDailyViews)
  @ApiOperation({
    summary,
    description,
  })
  @UseInterceptors(TimeoutInterceptor)
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
