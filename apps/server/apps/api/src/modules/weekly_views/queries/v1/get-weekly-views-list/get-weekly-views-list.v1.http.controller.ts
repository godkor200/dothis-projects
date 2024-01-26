import { QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  WeeklyData,
  IRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import {
  GetWeeklyViewsDto,
  GetWeeklyViewsQuery,
} from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { match, Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';

const c = nestControllerContract(apiRouter.weeklyViews);
const { getWeeklyKeywordListWithPaging } = c;

const { summary, description } = getWeeklyKeywordListWithPaging;

@ApiTags('조회수')
@Controller()
export class GetWeeklyViewsListV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getWeeklyKeywordListWithPaging)
  @Get()
  @ApiOperation({
    summary,
    description,
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: summary,
    type: WeeklyData,
  })
  @ApiQuery({
    name: 'from',
    description: '위클리 날짜',
    example: '2024-01-08',
  })
  @ApiQuery({
    name: 'limit',
    description: '한번에 나올 문서의 갯수',
    example: '5',
  })
  @ApiQuery({
    name: 'last',
    description:
      '페이지네이션을 하기 위해 마지막 나온 객체의 인덱스 _id에 해당',
    required: false,
  })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: GetWeeklyViewsQuery,
  ): Promise<IRes<WeeklyKeywordsRes[]>> {
    const { from, limit, last, sort, order } = query;
    const arg = new GetWeeklyViewsDto({ from, limit, last, sort, order });
    const result: Result<WeeklyKeywordsRes[], WeeklyViewsError> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof WeeklyViewsError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
