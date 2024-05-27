import { QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  IRes,
  TTsRestRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import {
  GetWeeklyViewsDtoV2,
  GetWeeklyViewsQuery,
} from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { match, Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';

const c = nestControllerContract(apiRouter.hits);
const { getWeeklyKeywordListWithPagingV2 } = c;

const { summary, description } = getWeeklyKeywordListWithPagingV2;

@ApiTags('조회수')
@Controller()
export class GetWeeklyHitsListV2HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getWeeklyKeywordListWithPagingV2)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiQuery({
    name: 'from',
    type: String,
    required: true,
    description: '날짜',
    example: '2024-01-15',
  })
  async execute(@Query() query: GetWeeklyViewsQuery) {
    return tsRestHandler(
      getWeeklyKeywordListWithPagingV2,
      async ({ query }) => {
        const dto = new GetWeeklyViewsDtoV2(query);
        const result: TGetWeeklyHitsRes = await this.queryBus.execute(dto);

        return match<TGetWeeklyHitsRes, TTsRestRes<IRes<WeeklyKeywordsRes[]>>>(
          result,
          {
            Ok: (result) => ({
              status: 200,
              body: result,
            }),
            Err: (err: Error) => {
              if (err instanceof WeeklyViewsError) {
                throw new NotFoundException(err.message);
              }
              throw err;
            },
          },
        );
      },
    );
  }
}
