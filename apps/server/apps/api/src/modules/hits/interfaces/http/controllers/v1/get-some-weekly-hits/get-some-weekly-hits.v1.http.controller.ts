import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import {
  GetSomeWeeklyHitsDto,
  GetSomeWeeklyHitsQuery,
} from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
import { IParamsKeywordInterface } from '@Libs/commons/src/abstract/applications.abstract';
import { TGetSomeWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';
import { match } from 'oxide.ts';
import {
  IRes,
  TTsRestRes,
  WeeklyKeywordsRes,
} from '@Libs/commons/src/interfaces/types/res.types';
const c = nestControllerContract(apiRouter.hits);
const { getWeeklyKeywordSome } = c;
const { summary, description } = getWeeklyKeywordSome;

@Controller()
@ApiTags('조회수')
export class GetSomeWeeklyHitsV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getWeeklyKeywordSome)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiParam({
    name: 'keywords',
    type: String,
    required: true,
    description: 'keyword 단일, 멀티 둘다 가능',
    example: '캠핑, 캠퍼, 설악산',
  })
  async execute(
    @Query() query: GetSomeWeeklyHitsQuery,
    @Param(ParseArrayPipe) param: IParamsKeywordInterface,
  ) {
    return tsRestHandler(getWeeklyKeywordSome, async ({ query, params }) => {
      const dto = new GetSomeWeeklyHitsDto({
        keywords: param.keywords,
        ...query,
      });
      const result: TGetSomeWeeklyHitsRes = await this.queryBus.execute(dto);

      return match<
        TGetSomeWeeklyHitsRes,
        TTsRestRes<IRes<WeeklyKeywordsRes[]>>
      >(result, {
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
      });
    });
  }
}
