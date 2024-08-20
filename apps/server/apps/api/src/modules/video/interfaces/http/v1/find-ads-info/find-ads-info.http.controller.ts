import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';

import { apiRouter, GetVideoAdsInfoRes } from '@dothis/dto';
import {
  FindAdsInfoDto,
  FindAdsInfoQuery,
} from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { match } from 'oxide.ts';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { FindAdsInfoRes, IRes, TTsRestRes } from '@Libs/types';
import { ClusterNumberMulti } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
const c = nestControllerContract(apiRouter.video);
const { summary, description } = c.getVideoAdsInfo;

@ApiTags('영상')
@Controller()
export class FindAdsInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getVideoAdsInfo)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: FindAdsInfoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiNotFoundResponse({ description: VideoHistoryNotFoundError.message })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  async execute(
    @Query() query: FindAdsInfoQuery,
    @Param() param: ClusterNumberMulti,
  ) {
    return tsRestHandler(c.getVideoAdsInfo, async ({ query, params }) => {
      const dto = new FindAdsInfoDto({
        ...query,
        clusterNumber: params.clusterNumber,
      });

      const result = await this.queryBus.execute(dto);
      return match<TFindAdsInfoRes, TTsRestRes<IRes<GetVideoAdsInfoRes>>>(
        result,
        {
          Ok: (result) => ({
            status: 200,
            body: result,
          }),
          Err: (err: Error) => {
            if (
              err instanceof VideoNotFoundError ||
              err instanceof VideoHistoryNotFoundError
            )
              throw new NotFoundException(err.message);
            if (err instanceof TableNotFoundException)
              throw new InternalServerErrorException(err.message);
            throw err;
          },
        },
      );
    });
  }
}
