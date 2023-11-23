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
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindDailyViewsV3Dtos,
  FindDailyViewsV3Query,
} from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { IncreaseData } from '@Libs/commons/src/types/dto.types';

import { IRes } from '@Libs/commons/src/types/res.types';
import { IIncreaseData } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.v2.query-handler';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
const c = nestControllerContract(apiRouter.dailyViews);

const { getDailyViews } = c;
const { summary, description } = getDailyViews;
@ApiTags('데일리뷰')
@Controller()
export class FindDailyViewsOsV3HttpController {
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
    type: IncreaseData,
  })
  @ApiParam({
    name: 'clusterNumber',
    description: '클러스터 번호, 탐색어를 찾을때 클러스터 번호가 표기됩니다.',
    example: 6,
  })
  @ApiQuery({
    name: 'keyword',
    description: '탐색어',
    example: '먹방',
  })
  @ApiQuery({
    name: 'relationKeyword',
    description: '연관어',
    example: '삼겹살',
  })
  @ApiQuery({
    name: 'from',
    description: '언제부터 날짜',
    example: '2023-10-20',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2023-10-22',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: FindDailyViewsV3Dtos,
  ): Promise<IRes<IIncreaseData[]>> {
    const arg = new FindDailyViewsV3Query({
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
        if (err instanceof VideoHistoryNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
