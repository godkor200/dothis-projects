import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';

import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { VideoHistoryRes } from '@Libs/commons/src/types/dto.types';
import { FindDailyViewsDtos } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
const c = nestControllerContract(apiRouter.dailyViews);

const { getDailyViews } = c;
const { summary, description } = getDailyViews;
@ApiTags('데일리뷰')
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
    type: VideoHistoryRes,
  })
  @ApiQuery({
    name: '위에 relationKeyword 는 연관어가 없을 경우는 없어도됩니다.',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: FindDailyViewsDtos,
  ) {
    const arg = new FindDailyViewsQuery({
      clusterNumber,
      ...query,
    });
    return await this.queryBus.execute(arg);
  }
}
