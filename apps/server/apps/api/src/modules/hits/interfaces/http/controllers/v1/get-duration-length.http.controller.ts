import { Controller, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto';
import { IRes, TTsRestRes } from '@Libs/types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  GetDurationLengthDto,
  GetDurationLengthQuery,
  GetDurationLengthRes,
} from '@Apps/modules/video/application/dtos/get-duration-length.dto';
import { TGetDurationLengthRes } from '@Apps/modules/video/application/service/video.duration-length.service';

const c = nestControllerContract(apiRouter.hits);
const { getVideoDurationAnalysis } = c;
const { summary, description } = getVideoDurationAnalysis;

@ApiTags('영상 분석')
@Controller()
export class GetDurationLengthHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getVideoDurationAnalysis)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: GetDurationLengthRes }) // 실제 응답 타입으로 대체
  @ApiNotFoundResponse({ description: VideoNotFoundError.message }) // 실제 에러 메시지로 대체
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(@Query() query: GetDurationLengthQuery) {
    return tsRestHandler(getVideoDurationAnalysis, async ({ query }) => {
      const dto = new GetDurationLengthDto(query);

      const result: TGetDurationLengthRes = await this.queryBus.execute(dto);

      return match<
        TGetDurationLengthRes,
        TTsRestRes<IRes<GetDurationLengthRes>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: { success: true, data: result },
        }),
        Err: (err: Error) => {
          throw err;
        },
      });
    });
  }
}
