import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { IRes } from '@Libs/commons/src/types/res.types';
import {
  ExpectedViewsDto,
  ExpectedViewsV2Dto,
  ExpectedViewsV2Query,
} from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { match, Result } from 'oxide.ts';
import { apiRouter } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
const c = nestControllerContract(apiRouter.expectViews);
const { getExpectedViews } = c;
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { ExpectedViewsData } from '@Libs/commons/src/types/dto.types';
const { summary, description } = getExpectedViews;
export interface IExpectedData {
  date: string;
  expected_views: number;
}

@ApiTags('기대 조회수')
@Controller()
export class ExpectedViewsV2HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getExpectedViews)
  @ApiOperation({
    summary,
    description,
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '평균 기대 조회수 데이터',
    type: ExpectedViewsData,
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
    description: '연관어, 연관어가 없다면 없어도됩니다.',
    example: '불대창',
  })
  @ApiQuery({
    name: 'from',
    description: '언제부터 날짜',
    example: '2023-10-11',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2023-10-17',
  })
  @ApiNotFoundResponse({ description: 'The video could not be found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: ExpectedViewsV2Dto,
  ): Promise<IRes<IExpectedData[]>> {
    const arg = new ExpectedViewsV2Query({ clusterNumber, ...query });
    const result: Result<IExpectedData[], VideoNotFoundError> =
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
