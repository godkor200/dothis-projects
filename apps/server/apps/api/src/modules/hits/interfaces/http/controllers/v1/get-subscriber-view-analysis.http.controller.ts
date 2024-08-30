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
import { apiRouter } from '@dothis/dto'; // 실제 경로와 모듈 이름으로 대체
import { IRes, TTsRestRes } from '@Libs/types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error'; // 실제 에러 클래스로 대체
import {
  GetSubscriberViewAnalysisDto,
  GetSubscriberViewAnalysisQuery,
  GetSubscriberViewAnalysisRes,
} from '@Apps/modules/video/application/dtos/get-subscriber-view-analysis.dto';
import { TGetSubscriberViewAnalysisRes } from '@Apps/modules/hits/application/services/get-subscriber-view.analysis.service'; // 실제 DTO 파일 경로로 대체

const c = nestControllerContract(apiRouter.hits);
const { getSubscriberViewAnalysis } = c;
const { summary, description } = getSubscriberViewAnalysis;

@ApiTags('조회수 분석')
@Controller()
export class GetSubscriberViewAnalysisHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getSubscriberViewAnalysis)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: GetSubscriberViewAnalysisRes })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(@Query() query: GetSubscriberViewAnalysisQuery) {
    return tsRestHandler(getSubscriberViewAnalysis, async ({ query }) => {
      const dto = new GetSubscriberViewAnalysisDto(query);

      const result: TGetSubscriberViewAnalysisRes = await this.queryBus.execute(
        dto,
      );

      return match<
        TGetSubscriberViewAnalysisRes,
        TTsRestRes<IRes<GetSubscriberViewAnalysisRes>>
      >(result, {
        Ok: (res) => ({
          status: 200,
          body: { success: true, data: res },
        }),
        Err: (err: Error) => {
          throw err;
        },
      });
    });
  }
}
