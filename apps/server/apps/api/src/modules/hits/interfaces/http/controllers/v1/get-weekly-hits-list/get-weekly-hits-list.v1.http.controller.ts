import { QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  GetWeeklyKeywordsListResType,
  IRes,
  TTsRestRes,
  WeeklyKeywordsRes,
} from '@Libs/types';
import {
  GetWeeklyViewsDto,
  GetWeeklyViewsQuery,
} from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { match } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';

const c = nestControllerContract(apiRouter.hits);
const { getWeeklyKeywordListWithPaging } = c;

const { summary, description } = getWeeklyKeywordListWithPaging;

@ApiTags('조회수')
@Controller()
export class GetWeeklyHitsListV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getWeeklyKeywordListWithPaging)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: GetWeeklyKeywordsListResType })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(@Query() query: GetWeeklyViewsQuery) {
    return tsRestHandler(getWeeklyKeywordListWithPaging, async ({ query }) => {
      const dto = new GetWeeklyViewsDto(query);
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
    });
  }
}
