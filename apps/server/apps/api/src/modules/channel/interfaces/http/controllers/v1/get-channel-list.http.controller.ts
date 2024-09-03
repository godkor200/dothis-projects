import { QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, TChannelListResponse } from '@dothis/dto';
import {
  GetChannelListDto,
  GetChannelListQuery,
  GetChannelListRes,
} from '@Apps/modules/channel/application/dtos/get-channel-list.dto';
import { match } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

const { getChannelList } = nestControllerContract(apiRouter.channel);

const { summary, description } = getChannelList;

@ApiTags('채널')
@Controller()
export class ChannelListHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getChannelList)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: GetChannelListRes })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: GetChannelListQuery,
  ): Promise<IRes<TChannelListResponse>> {
    const result = await this.queryBus.execute(new GetChannelListDto(query));

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
