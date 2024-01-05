import { QueryBus } from '@nestjs/cqrs';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, ChannelHistoryModel } from '@dothis/dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param } from '@nestjs/common';
import { IRes } from '@Libs/commons/src/types/res.types';
import { FindChannelInfoDto } from '@Apps/modules/channel_history/dtos/find-channel-info.dto';
import { match, Result } from 'oxide.ts';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
const c = nestControllerContract(apiRouter.channelHistory);
const { findChannelInfo } = c;
const { summary, description } = findChannelInfo;
@ApiTags('채널 히스토리')
@Controller()
export class FindChannelHistoryHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TsRest(findChannelInfo)
  @ApiResponse({
    status: 200,
    isArray: false,
    description: '채널 히스토리 최근 데이터',
  })
  @ApiParam({
    name: 'channelId',
    description: '채널아이디 유튜브가 지정한 채널아이디',
    example: 'UCF4Wxdo3inmxP-Y59wXDsFw',
  })
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ description: ChannelHistoryNotFoundError.message })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Param('channelId') channelId: string,
  ): Promise<IRes<ChannelHistoryModel>> {
    const arg = new FindChannelInfoDto({
      channelId,
    });

    const result: Result<ChannelHistoryModel, any> =
      await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof ChannelHistoryNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
