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
import { IRes, TTsRestRes, WeeklyKeywordsRes } from '@Libs/types';

import { match, Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { TGetWeeklyHitsRes } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { ParseArrayPipe } from '@Libs/commons/pipes/parse-array.pipe';
import {
  GetWeeklyHitsListDto,
  GetWeeklyHitsListQueryInterface,
} from '@Apps/modules/hits/application/dtos/get-some-weekly-hits.dto';

const c = nestControllerContract(apiRouter.hits);
const { getWeeklyKeywordListWithPagingV2 } = c;

const { summary, description } = getWeeklyKeywordListWithPagingV2;
// dayjs와 관련 플러그인을 가져옵니다.
const dayjs = require('dayjs');
const weekday = require('dayjs/plugin/weekday'); // weekday 플러그인
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore'); // 비교 관련 플러그인

// 플러그인 사용
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);

// 현재 날짜
const today = dayjs();

// 오늘이 월요일이라면 (이전에 해당 함수를 호출할 때) 7일 후가 아닌 현재 월요일을 얻는다
const lastMonday =
  today.day() === 1
    ? today.subtract(7, 'day') // 현재가 월요일이면 7일 전 (이전 월요일)
    : today.day(1).subtract(1, 'week'); // 현재가 월요일이 아닐 경우, 지난 월요일

// 형식 변환
const formattedDate = lastMonday.format('YYYY-MM-DD');

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
    example: formattedDate,
  })
  @ApiQuery({
    name: 'categoryNumbers',
    type: String,
    required: false,
    description: '카테고리 번호',
    example: '77, 70, 93',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: true,
    description: '결과 제한 수',
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
    description: '페이지 번호',
    example: '1',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: '정렬 기준',
    example: 'ranking',
    enum: [
      'keyword',
      'ranking',
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
    description: '정렬 순서',
    enum: ['ASC', 'DESC'],
  })
  @ApiQuery({
    name: 'keywords',
    type: String,
    required: false,
    description: '필터될 단어',
    example: '통영, MBC경남, 야구',
  })
  async execute(@Query(ParseArrayPipe) query: GetWeeklyHitsListQueryInterface) {
    const dto = new GetWeeklyHitsListDto(query);
    return tsRestHandler(
      getWeeklyKeywordListWithPagingV2,
      async ({ query }) => {
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
