import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  IFindVideoPageQuery,
  IFindVideoPageV1Dto,
} from '../../../application/dtos/find-video-paging.req.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IPagingRes } from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { VideoRes, IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { match, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getVideoPageV1;

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRest(c.getVideoPageV1)
  @Get()
  // @ApiQuery({
  //   name: 'keyword',
  //   required: true,
  //   description: '탐색어',
  //   example: '고기',
  // })
  // @ApiQuery({
  //   name: 'related',
  //   required: true,
  //   description: '연관어',
  //   example: '돼지고기',
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: true,
  //   description: '페이지당 갯수',
  //   example: '5',
  // })
  // @ApiQuery({
  //   name: 'last',
  //   required: false,
  //   description: '전 페이지 마지막 인덱스 _id',
  // })
  // @ApiParam({
  //   name: 'clusterNumber',
  //   required: true,
  //   description: '클러스터 인덱스',
  //   example: '6',
  // })
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @Query() query: IFindVideoPageQuery,
  ): Promise<IRes<IPagingRes>> {
    const { limit, search, related, last } = query;
    const arg = new IFindVideoPageV1Dto({
      cluster: clusterNumber,
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
