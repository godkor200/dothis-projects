import { Controller, Get, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  TsRest,
  nestControllerContract,
  TsRestRequest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindDailyViewsV3Dto,
  IIncreaseData,
} from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import {
  IncreaseData,
  IRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
const c = nestControllerContract(apiRouter.dailyViews);
type RequestShapes = NestRequestShapes<typeof c>;

const { getDailyViews } = c;
const { summary, description } = getDailyViews;
@ApiTags('조회수')
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
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @TsRestRequest()
    { params, query }: RequestShapes['getDailyViews'],
  ): Promise<IRes<IIncreaseData[]>> {
    const arg = new FindDailyViewsV3Dto({
      clusterNumber: params.clusterNumber,
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
