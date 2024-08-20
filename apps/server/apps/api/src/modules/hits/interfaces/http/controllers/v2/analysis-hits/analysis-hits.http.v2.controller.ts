import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  BadReq,
  InternalServerErr,
  NotFound,
} from '@Apps/modules/hits/domain/events/errors/hits.errors';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter, TAnalysisViewsRes } from '@dothis/dto';
import {
  AnalysisHitsCombinedV2Ok,
  AnalysisHitsV2Ok,
} from '@Apps/modules/hits/application/types/analysis.res-types';
import {
  GetAnalysisHitsQuery,
  GetAnalysisHitsV2Dto,
} from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { TAnalysisHitsServiceRes } from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { match } from 'oxide.ts';
import { IRes, TTsRestRes } from '@Libs/types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
const c = nestControllerContract(apiRouter.hits);
const getAnalysisHitsV2 = c.getAnalysisHitsV2;
const { summary, description } = getAnalysisHitsV2;

@ApiTags('조회수')
@Controller()
export class AnalysisHitsV2Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getAnalysisHitsV2)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    type: AnalysisHitsCombinedV2Ok,
  })
  @ApiNotFoundResponse({ type: NotFound })
  @ApiBadRequestResponse({ type: BadReq })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  async execute(@Query() query: GetAnalysisHitsQuery) {
    return tsRestHandler(getAnalysisHitsV2, async ({ query }) => {
      const dto = new GetAnalysisHitsV2Dto(query);
      const res: TAnalysisHitsServiceRes = await this.queryBus.execute(dto);
      return match<
        TAnalysisHitsServiceRes,
        TTsRestRes<IRes<TAnalysisViewsRes[]>>
      >(res, {
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
