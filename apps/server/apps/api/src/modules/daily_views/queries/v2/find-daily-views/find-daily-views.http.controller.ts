import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
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
import { IRes } from '@Libs/commons/src/types/res.types';
import { IncreaseData } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.query-handler';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
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
  ): Promise<IRes<IncreaseData[]>> {
    const arg = new FindDailyViewsQuery({
      clusterNumber,
      ...query,
    });
    const result: Result<IncreaseData[], NotFoundException> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof VideoNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
