import {
  Controller,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter } from '@dothis/dto';
import { JwtAccessGuard } from '@Libs/oauth';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  VideoErrNotFound,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import {
  VideoCommentsDto,
  VideoCommentsParam,
  VideoCommentsQuery,
} from '@ExternalApps/feature/video/application/dto/video-comments.dto';
import { match } from 'oxide.ts';
import { IResWithItem, TTsRestRes } from '@Libs/types';
import { VideoCommentRes } from '@ExternalApps/feature/video/domain/port/video-comment.inbound.port';

const c = nestControllerContract(externalApiRouter.video);
const { getVideoComments } = c;

const { summary, responses, description } = getVideoComments;
@ApiTags('댓글')
@Controller()
export class VideoCommentsHttpController {
  constructor(private queryBus: QueryBus) {}

  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @TsRestHandler(getVideoComments)
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: VideoCommentRes })
  @ApiNotFoundResponse({ type: VideoErrNotFound })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(
    @Param() param: VideoCommentsParam,
    @Query() query: VideoCommentsQuery,
  ) {
    const arg = new VideoCommentsDto(param, query);
    return tsRestHandler(getVideoComments, async ({}) => {
      const res = await this.queryBus.execute(arg);
      return match<any, TTsRestRes<IResWithItem<VideoCommentRes>>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: true, item: res },
        }),
        Err: (err) => {
          if (err instanceof VideoNotFoundException) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
