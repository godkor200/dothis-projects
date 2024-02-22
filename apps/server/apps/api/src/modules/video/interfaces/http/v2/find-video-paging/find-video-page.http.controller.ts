import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IRes, VideoRes } from '@Libs/commons/src/interfaces/types/res.types';
import {
  FindVideoPageV2Dto,
  IFindVideoPageQuery,
} from './find-video-paging.req.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IPagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getVideoPageV2;

@ApiTags('영상')
@Controller()
export class FindVideoPageV2HttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiQuery({
    name: 'related',
    required: false,
    description: '연관어',
    example: '돼지고기',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '페이지당 갯수',
    example: '5',
  })
  @ApiQuery({
    name: 'last',
    required: false,
    description: '전 페이지 마지막 인덱스 _id',
  })
  @ApiQuery({
    name: 'cluster',
    required: true,
    description: '클러스터 인덱스',
    example: '6,34,48,16,7',
  })
  @ApiOperation({
    summary,
    description,
  })
  @TsRest(c.getVideoPageV2)
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  async execute(
    @Query() query: IFindVideoPageQuery,
  ): Promise<IRes<IPagingRes>> {
    const { limit, search, related, last, cluster } = query;

    const arg = new FindVideoPageV2Dto({
      cluster,
      limit,
      search,
      related,
      last,
    });

    const result: Result<IPagingRes, VideoNotFoundError> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof VideoNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}
