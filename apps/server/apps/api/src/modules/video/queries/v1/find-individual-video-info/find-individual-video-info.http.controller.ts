import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { IRes } from '@Libs/commons/src/types/res.types';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/dtos/find-individual-video-info.dto';
import { match, Result } from 'oxide.ts';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { apiRouter, VideoDetailsModel } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoInfoRes } from '@Libs/commons/src/types/dto.types';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getIndividualVideo;

@ApiTags('영상')
@Controller()
export class FindIndividualVideoInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @ApiParam({
    name: 'videoId',
    description: '찾을 비디오의 id 값을 입력받습니다.',
    example: 'Mm-8O8iFmao',
  })
  @ApiParam({
    name: 'clusterNumber',
    description: '찾을 비디오의 클러스터 번호 값을 입력받습니다.',
    example: '0',
  })
  @TsRest(c.getIndividualVideo)
  @ApiInternalServerErrorResponse()
  @ApiOkResponse({ type: VideoInfoRes })
  @ApiNotFoundResponse({
    description: VideoNotFoundError.message,
  })
  @ApiOperation({
    summary,
    description,
  })
  async execute(
    @Param() param: { videoId: string; clusterNumber: string },
  ): Promise<IRes<VideoDetailsModel>> {
    const arg = new FindIndividualVideoInfoV1Dto(param);
    const result: Result<VideoDetailsModel, NotFoundException> =
      await this.queryBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (
          err instanceof VideoNotFoundError ||
          err instanceof ChannelHistoryNotFoundError
        ) {
          throw new NotFoundException(err.message);
        }
        throw new InternalServerErrorException(err);
      },
    });
  }
}
