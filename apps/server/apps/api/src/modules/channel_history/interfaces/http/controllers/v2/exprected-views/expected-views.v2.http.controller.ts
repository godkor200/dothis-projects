import { QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  ExpectedViewsV2Dto,
  ExpectedViewsV2Query,
} from '@Apps/modules/channel_history/application/dtos/expected-views.dtos';
import { match, Result } from 'oxide.ts';
import { apiRouter, TExpectedViewsArr, TExpectedViewsRes } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
const c = nestControllerContract(apiRouter.expectViews);
const { getExpectedViews } = c;
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  ExpectedViewsData,
  IRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
const { summary, description } = getExpectedViews;

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
  @ApiQuery({
    name: 'keyword',
    description: '탐색어',
    example: '페이커',
  })
  @ApiQuery({
    name: 'relationKeyword',
    description: '연관어, 연관어가 없다면 없어도됩니다.',
    example: '롤드컵',
  })
  @ApiQuery({
    name: 'from',
    description: '언제부터 날짜',
    example: '2023-11-22',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2023-11-30',
  })
  @ApiNotFoundResponse({ description: 'The video could not be found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: ExpectedViewsV2Dto,
  ): Promise<IRes<TExpectedViewsRes>> {
    const arg = new ExpectedViewsV2Query(query);
    const result: Result<
      TExpectedViewsArr,
      VideoNotFoundError | ChannelNotFoundError
    > = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (
          err instanceof VideoNotFoundError ||
          err instanceof ChannelNotFoundError
        ) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
