import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindChannelInfoDto } from '@Apps/modules/channel-history/application/dtos/find-channel-info.dto';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import {
  FindChannelInfoDao,
  TFindExtendChannelHistoryListRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
@QueryHandler(FindChannelInfoDto)
export class FindChannelHistoryQueryHandler
  implements
    IQueryHandler<FindChannelInfoDto, TFindExtendChannelHistoryListRes>
{
  constructor(
    private readonly channelHistory: ChannelAndExtendHistoryOutboundPort,
  ) {}
  async execute(
    arg: FindChannelInfoDto,
  ): Promise<TFindExtendChannelHistoryListRes> {
    const dao = new FindChannelInfoDao(arg);
    const channel = await this.channelHistory.execute(dao);
    if (channel.isErr()) return Err(channel.unwrapErr());
    return Ok(channel.unwrap());
  }
}
