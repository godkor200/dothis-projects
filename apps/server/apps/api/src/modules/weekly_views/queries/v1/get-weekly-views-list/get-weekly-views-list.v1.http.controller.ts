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
import { apiRouter, TWeeklyKeywordsListSource } from '@dothis/dto';
import { IncreaseData, WeeklyData } from '@Libs/commons/src/types/dto.types';
import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { IRes } from '@Libs/commons/src/types/res.types';
import { match, Result } from 'oxide.ts';

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
    description: '언제부터 날짜',
    example: '2024-01-08',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2024-01-15',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: GetWeeklyViewsQuery,
  ): Promise<IRes<TWeeklyKeywordsListSource[]>> {
    const arg = new GetWeeklyViewsQuery(query);
    const result: Result<TWeeklyKeywordsListSource[], any> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        throw err;
      },
    });
  }
}
