import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
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
  GetSomeWeeklyHitsQueryInterface,
} from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';
import { ParseArrayPipe } from '@Libs/commons/pipes/parse-array.pipe';
import { TGetSomeWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';
import { match } from 'oxide.ts';
import {
  GetWeeklyKeywordsListResType,
  IRes,
  TTsRestRes,
  WeeklyKeywordsRes,
} from '@Libs/types';
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
  @ApiOkResponse({ type: GetWeeklyKeywordsListResType })
  @ApiNotFoundResponse({ description: WeeklyViewsError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiQuery({
    name: 'from',
    type: String,
    required: true,
    description: '언제부터 날짜',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: true,
    description: '한 페이지에 표시할 데이터의 수',
    example: '5',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: true,
    description: '현재 페이지 번호를 나타냅니다.',
    example: '1',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: '정렬에 사용될 필드 이름을 나타냅니다.',
    enum: [
      'id',
      'ranking',
      'keyword',
      'category',
      'weekly_views',
      'video_count',
      'competitive',
      'mega_channel',
      'last_ranking',
      'YEAR',
      'MONTH',
      'DAY',
    ],
  })
  @ApiQuery({
    name: 'order',
    type: String,
    required: false,
    description: '정렬 순서를 나타냅니다. 기본은 asc 입니다.',
    enum: ['asc', 'desc', 'ASC', 'DESC'],
  })
  @ApiQuery({
    name: 'keywords',
    type: String,
    required: false,
    description: '검색 키워드',
    example: '캠핑, 캠퍼, 설악산',
  })
  @ApiQuery({
    name: 'categoryNumbers',
    type: String,
    required: false,
    description: '카테고리 번호',
    example: '32, 42, 11',
  })
  async execute(@Query(ParseArrayPipe) query: GetSomeWeeklyHitsQueryInterface) {
    return tsRestHandler(getWeeklyKeywordSome, async () => {
      const dto = new GetSomeWeeklyHitsDto(query);
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
