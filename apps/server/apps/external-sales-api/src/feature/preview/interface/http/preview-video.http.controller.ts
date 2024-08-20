import { QueryBus } from '@nestjs/cqrs';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter } from '@dothis/dto';
import {
  PreviewVideoParam,
  ReviewVideoResponse,
} from '@ExternalApps/feature/preview/application/dto/preview-video.dto';
import { JwtAccessGuard } from '@Libs/oauth';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  InvalidYoutubeUrlException,
  VideoErrNotFound,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { match } from 'oxide.ts';
import {
  PreviewVideoDto,
  PreviewVideoRes,
} from '@ExternalApps/feature/preview/domain/port/preview-video.inbound.port';
import { IResWithItem, TTsRestRes } from '@Libs/types';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';

const c = nestControllerContract(externalApiRouter.video);
const { previewVideo } = c;

const { summary, responses, description } = previewVideo;
@ApiTags('비디오')
@Controller()
export class PreviewVideoHttpController {
  constructor(private queryBus: QueryBus) {}

  @TsRestHandler(previewVideo)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: ReviewVideoResponse })
  @ApiNotFoundResponse({ type: VideoErrNotFound })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiBearerAuth('Authorization')
  async execute(@Param() param: PreviewVideoParam) {
    return tsRestHandler(previewVideo, async ({ params }) => {
      const res = await this.queryBus.execute(new PreviewVideoDto(params));
      return match<any, TTsRestRes<IResWithItem<PreviewVideoRes>>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: true, item: res },
        }),
        Err: (err) => {
          if (err instanceof VideoNotFoundException) {
            throw new NotFoundException(err.message);
          }
          if (err instanceof InvalidYoutubeUrlException) {
            throw new BadRequestException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
