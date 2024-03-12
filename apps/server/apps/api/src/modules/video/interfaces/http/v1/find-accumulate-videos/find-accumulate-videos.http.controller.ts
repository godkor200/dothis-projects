import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindAccumulateQuery,
  FindAccumulateVideosV1Dto,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { match, Result } from 'oxide.ts';
import {
  IFindAccumulateVideoWithOutUserSection,
  ISection,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import {
  nestControllerContract,
  TsRest,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { IFindAccumulateVideosV1Res } from '@Apps/modules/video/application/queries/v1/find-accumulate-videos.query-handler';
import { ClusterNumberMulti } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getAccumulateVideo;

@ApiTags('영상')
@Controller()
export class FindAccumulateVideosV1HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getAccumulateVideo)
  @ApiOperation({
    summary,
    description,
  })
  @ApiBearerAuth('Authorization')
  @ApiNotFoundResponse({
    description:
      ChannelNotFoundError.message +
      ' ,' +
      VideoNotFoundError.message +
      ' ,' +
      ChannelHistoryNotFoundError.message,
  })
  @ApiInternalServerErrorResponse({
    description: 'The number of subscribers is not within the set range.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async execute(
    @Query() query: FindAccumulateQuery,
    @Param() param: ClusterNumberMulti,
  ) {
    return tsRestHandler(c.getAccumulateVideo, async ({ query, params }) => {
      const arg = new FindAccumulateVideosV1Dto({
        clusterNumber: param.clusterNumber,
        ...query,
      });

      const result: IFindAccumulateVideosV1Res = await this.queryBus.execute(
        arg,
      );

      return match<
        IFindAccumulateVideosV1Res,
        TTsRestRes<IRes<IFindAccumulateVideoWithOutUserSection<ISection[]>>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: result,
        }),
        Err: (err: Error) => {
          if (
            err instanceof ChannelNotFoundError ||
            err instanceof VideoNotFoundError ||
            err instanceof ChannelHistoryNotFoundError
          ) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
