import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { match } from 'oxide.ts';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetAnalysisHitsDto,
  GetAnalysisHitsQuery,
} from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
import { IParamsInterface } from '@Libs/commons/src/abstract/applications.abstract';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadReq,
  InternalServerErr,
  NotFound,
  Ok,
} from '@Apps/modules/hits/domain/events/errors/hits.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

const c = nestControllerContract(apiRouter.hits);
const { summary, description } = c.getAnalysisHits;
@ApiTags('조회수')
@Controller()
export class AnalysisHitsV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getAnalysisHits)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    type: Ok,
  })
  @ApiNotFoundResponse({ type: NotFound })
  @ApiBadRequestResponse({ type: BadReq })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일, 멀티 둘다 가능',
    example: '4, 93, 14, 13, 57, 5, 43, 1, 10, 45',
  })
  async execute(
    @Query() query: GetAnalysisHitsQuery,
    @Param(ParseArrayPipe) params: IParamsInterface,
  ) {
    return tsRestHandler(c.getAnalysisHits, async ({}) => {
      const dto = new GetAnalysisHitsDto({
        ...query,
        clusterNumber: params.clusterNumber,
      });
      const res = await this.queryBus.execute(dto);
      return match(res, {
        Ok: (res) => ({ status: 200, body: res }),
        Err: (err) => {
          if (
            err instanceof VideoNotFoundError ||
            err instanceof VideoHistoryNotFoundError ||
            err instanceof ChannelNotFoundError
          ) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
