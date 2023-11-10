import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindChannelInfoDto } from '@Apps/modules/channel_history/dtos/find-channel-info.dto';
import { ChannelHistoryModel } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';

@QueryHandler(FindChannelInfoDto)
export class FindChannelHistoryQueryHandler
  implements
    IQueryHandler<
      FindChannelInfoDto,
      Result<ChannelHistoryModel, ChannelNotFoundError>
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,
  ) {}
  async execute(
    arg: FindChannelInfoDto,
  ): Promise<Result<ChannelHistoryModel, ChannelNotFoundError>> {
    const channelId = arg.channelId;
    const channel = await this.channelHistory.findChannelHistoryByLimit(
      [channelId],
      1,
      'desc',
    );

    if (!channel) return Err(new ChannelNotFoundError());

    return Ok(channel[0]);
  }
}
