import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import { apiRouter, VideoHistoryModel } from '@dothis/dto';

import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '비디오 히스토리 데이터',
    type: VideoHistoryModel,
  })
  async execute(
    @Param('keyword') keyword: string,
    @Query('relationKeyword') relationKeyword: string | undefined,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    const query = new FindDailyViewsQuery({
      keyword,
      relationKeyword,
      from,
      to,
    });
    return await this.queryBus.execute(query);
  }
}
