import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  CategoryIssueVideoQueryParams,
  FindCategoryIssueVideoDto,
} from '@Apps/modules/video/application/dtos/find-category-issue-video.dto';
import { match } from 'oxide.ts';

import { IRes, TTsRestRes } from '@Libs/types';
import { ParseArrayPipe } from '@Libs/commons/pipes/parse-array.pipe';
import {
  ITodayIssue,
  TodayIssueVideo,
} from '@Apps/modules/video/application/dtos/video.res';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getCategoryIssueVideos;

@Controller()
@ApiTags('영상')
export class FindCategoryIssueVideoController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getCategoryIssueVideos)
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse({
    description: VideoNotFoundError.message,
  })
  @ApiOkResponse({ type: TodayIssueVideo })
  @ApiOperation({
    summary,
    description,
  })
  @ApiQuery({
    name: 'from',
    type: String,
    required: true,
    description: '언제부터 날짜',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'to',
    type: String,
    required: true,
    description: '언제까지의 날짜',
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
    name: 'categoryNumbers',
    type: String,
    required: true,
    description: '카테고리 번호 하나 단독, 다수',
    example: '4, 93, 14, 13, 57, 5, 43, 1, 10, 45',
  })
  async execute(@Query(ParseArrayPipe) query: CategoryIssueVideoQueryParams) {
    return tsRestHandler(c.getCategoryIssueVideos, async () => {
      const arg = new FindCategoryIssueVideoDto({
        ...query,
      });
      const result: TIssueTodayRes = await this.queryBus.execute(arg);
      return match<TIssueTodayRes, TTsRestRes<IRes<ITodayIssue[]>>>(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err: Error) => {
          if (err instanceof VideoHistoryNotFoundError) {
            throw new NotFoundException(err.message);
          }
          throw new InternalServerErrorException(err);
        },
      });
    });
  }
}
