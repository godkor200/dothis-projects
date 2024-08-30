import { Controller, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetWeeklyKeywordDto,
  GetWeeklyKeywordQuery,
  GetWeeklyKeywordRes,
} from '@Apps/modules/hits/application/dtos/get-weekly-keyword.dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter, TKeywordThisWeeklyRes } from '@dothis/dto';
import { TGetWeeklyKeywordRes } from '@Apps/modules/hits/application/queries/get-weekly-keyword.query-handler';
import { IRes, TTsRestRes } from '@Libs/types';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
const c = nestControllerContract(apiRouter.hits);
const { getKeywordThisWeekly } = c;
const { summary, description } = getKeywordThisWeekly;

@ApiTags('탐색어')
@Controller()
export class GetWeeklyKeywordHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getKeywordThisWeekly)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: GetWeeklyKeywordRes })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(@Query() query: GetWeeklyKeywordQuery) {
    return tsRestHandler(getKeywordThisWeekly, async ({ query }) => {
      const dto = new GetWeeklyKeywordDto(query);

      const result: TGetWeeklyKeywordRes = await this.queryBus.execute(dto);

      return match<
        TGetWeeklyKeywordRes,
        TTsRestRes<IRes<TKeywordThisWeeklyRes>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: result,
        }),
        Err: (err: Error) => {
          throw err;
        },
      });
    });
  }
}
