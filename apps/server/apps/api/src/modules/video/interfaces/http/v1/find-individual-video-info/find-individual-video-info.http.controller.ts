import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  FindIndividualVideoInfoParams,
  FindIndividualVideoInfoParamsInterface,
  FindIndividualVideoInfoV1Dto,
} from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { match } from 'oxide.ts';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { apiRouter, VideoDetailsModel } from '@dothis/dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoInfoRes, IRes, TTsRestRes } from '@Libs/types';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { TVideoIndividualRes } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { ParseArrayPipe } from '@Libs/commons/pipes/parse-array.pipe';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getIndividualVideo;

@ApiTags('영상')
@Controller()
export class FindIndividualVideoInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(c.getIndividualVideo)
  @ApiInternalServerErrorResponse()
  @ApiOkResponse({ type: VideoInfoRes })
  @ApiNotFoundResponse({
    description: VideoNotFoundError.message,
  })
  @ApiOperation({
    summary,
    description,
  })
  @ApiParam({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 단일 가능',
    example: '0',
  })
  @ApiParam({
    name: 'videoId',
    type: String,
    required: true,
    description: '비디오아이디',
    example: '-2QMneQQGNU',
  })
  async execute(
    @Param(ParseArrayPipe) param: FindIndividualVideoInfoParamsInterface,
  ) {
    return tsRestHandler(c.getIndividualVideo, async ({ params }) => {
      const arg = new FindIndividualVideoInfoV1Dto({
        videoId: param.videoId,
        clusterNumber: param.clusterNumber,
      });
      const result: TVideoIndividualRes = await this.queryBus.execute(arg);
      return match<TVideoIndividualRes, TTsRestRes<IRes<VideoDetailsModel>>>(
        result,
        {
          Ok: (result: IRes<VideoDetailsModel>) => ({
            status: 200,
            body: result,
          }),
          Err: (err: Error) => {
            if (
              err instanceof VideoNotFoundError ||
              err instanceof ChannelHistoryNotFoundError
            ) {
              throw new NotFoundException(err.message);
            }
            throw new InternalServerErrorException(err);
          },
        },
      );
    });
  }
}
