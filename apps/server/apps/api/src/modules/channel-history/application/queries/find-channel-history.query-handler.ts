import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindChannelInfoDto } from '@Apps/modules/channel-history/application/dtos/find-channel-info.dto';
import { ChannelHistoryModel } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { FindChannelInfoDao } from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';

@QueryHandler(FindChannelInfoDto)
export class FindChannelHistoryQueryHandler
  implements
    IQueryHandler<
      FindChannelInfoDto,
      Result<ChannelHistoryModel, ChannelNotFoundError>
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_IGNITE_DI_TOKEN)
    private readonly channelHistory: ChannelAndExtendHistoryOutboundPort,
  ) {}
  async execute(
    arg: FindChannelInfoDto,
  ): Promise<Result<ChannelHistoryModel, ChannelNotFoundError>> {
    const dao = new FindChannelInfoDao(arg);
    const channel = await this.channelHistory.execute(dao);
    if (!channel.isErr()) return Err(channel.unwrapErr());
    return Ok(channel.unwrap());
  }
}
