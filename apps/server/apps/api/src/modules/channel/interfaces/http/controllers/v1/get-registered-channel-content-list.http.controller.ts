import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';

import { IRes, TTsRestRes } from '@Libs/types';

import {
  RegisteredChannelContentsDto,
  RegisteredChannelContentsQuery,
  RegisteredChannelContentsRes,
  RegisteredChannelContentsResSingle,
} from '@Apps/modules/channel/application/dtos/registered-channel-contents.dto';
import { GetRegisterChannelListResult } from '@Apps/modules/channel/application/service/get-register-content-list.service';
import { apiRouter } from '@dothis/dto';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

const c = nestControllerContract(apiRouter.channel); // 콘텐츠와 관련된 라우터 정의
const { getRegisterChannelContentList } = c;
const { summary, description } = getRegisterChannelContentList;

@ApiTags('채널 분석')
@Controller()
export class GetRegisterChannelContentListHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getRegisterChannelContentList)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ description: VideoNotFoundError.message })
  @ApiOkResponse({
    type: [RegisteredChannelContentsResSingle],
  })
  async execute(@Query() query: RegisteredChannelContentsQuery) {
    return tsRestHandler(getRegisterChannelContentList, async () => {
      const dto = new RegisteredChannelContentsDto(query);
      const result: GetRegisterChannelListResult = await this.queryBus.execute(
        dto,
      );
      return match<
        GetRegisterChannelListResult,
        TTsRestRes<IRes<RegisteredChannelContentsRes>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err) => {
          if (err instanceof VideoNotFoundError) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
