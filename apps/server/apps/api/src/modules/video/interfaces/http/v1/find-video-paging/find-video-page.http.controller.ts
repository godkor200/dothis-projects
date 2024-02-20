import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IPagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import {
  VideoRes,
  IRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { match } from 'oxide.ts';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { ClusterNumber } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { PaginatedIgniteQueryParams } from '@Libs/commons/src/interfaces/types/dto.types';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getVideoPageV1;

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRestHandler(c.getVideoPageV1)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  async execute(
    @Param() param: ClusterNumber,
    @Query() query: PaginatedIgniteQueryParams,
  ) {
    return tsRestHandler(c.getVideoPageV1, async ({ params, query }) => {
      const arg = new GetVideoPaginatedPageDto({
        clusterNumber: params.clusterNumber,
        ...query,
      });
      const data: TGetVideoPage = await this.queryBus.execute(arg);

      return match<TGetVideoPage, TTsRestRes<IRes<IPagingRes>>>(data, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data,
          },
        }),
        Err: (err: Error) => {
          if (err instanceof VideoNotFoundError)
            throw new NotFoundException(err.message);
          throw err;
        },
      });
    });
  }
}
