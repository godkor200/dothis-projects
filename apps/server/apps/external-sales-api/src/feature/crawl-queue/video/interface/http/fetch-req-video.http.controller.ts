import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FetchReqVideoDto,
  PaginatedOffsetQuery,
} from '@ExternalApps/feature/crawl-queue/video/application/dto/fetch-req-video.dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { JwtAccessGuard } from '@Libs/oauth';
import { externalApiRouter } from '@dothis/dto';
import { IResWithItem, TokenExpired, TTsRestRes } from '@Libs/types';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
import {
  VideoErrNotFound,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { match } from 'oxide.ts';
import {
  FetchReqVideoRes,
  TFetchRequestVideoRes,
  TotalFetchReqVideoRes,
} from '@ExternalApps/feature/crawl-queue/video/domain/port/fetch-req-video.inbound.port';
const c = nestControllerContract(externalApiRouter.video);
const { getReqVideos } = c;
const { summary, description } = getReqVideos;
@Controller()
@ApiTags('크롤링 될 영상 정보')
export class FetchReqVideoHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @UseGuards(JwtAccessGuard)
  @TsRestHandler(getReqVideos)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ type: VideoErrNotFound })
  @ApiOkResponse({ type: TotalFetchReqVideoRes })
  @ApiBearerAuth('Authorization')
  @ApiForbiddenResponse({ type: TokenExpired })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  async execute(@Query() query: PaginatedOffsetQuery) {
    const q = new FetchReqVideoDto(query);
    const res: TFetchRequestVideoRes = await this.queryBus.execute(q);
    return tsRestHandler(getReqVideos, async ({ query }) => {
      return match<
        TFetchRequestVideoRes,
        TTsRestRes<IResWithItem<FetchReqVideoRes>>
      >(res, {
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
