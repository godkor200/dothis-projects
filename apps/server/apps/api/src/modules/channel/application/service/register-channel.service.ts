import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterChannelDto } from '@Apps/modules/channel/application/dtos/register-channel.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelAnalysisRepositoryPort } from '@Apps/modules/channel/infrastucture/repositories/channel-analysis.repository.port';
import {
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
  CHANNEL_REGISTRATION,
} from '@Apps/modules/channel/channel.di-token';
import { Inject } from '@nestjs/common';
import { ChannelAnalysisEntity } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.entity';
import {
  ChannelDuplicateError,
  ChannelNotFoundError,
} from '@Apps/modules/channel/domain/events/channel.errors';
import { ChannelInfoOutboundPort } from '@Apps/modules/channel/domain/ports/channel-info.outbound.port';

export type RegisterChannelResult = Result<
  boolean,
  ChannelDuplicateError | ChannelNotFoundError
>;

@CommandHandler(RegisterChannelDto)
export class RegisterChannelService
  implements ICommandHandler<RegisterChannelDto, RegisterChannelResult>
{
  constructor(
    @Inject(CHANNEL_REGISTRATION)
    private readonly channelAnalysisRepository: ChannelAnalysisRepositoryPort,

    @Inject(CHANNEL_INFO_ADAPTER_DI_TOKEN)
    private readonly channelInfoAdapter: ChannelInfoOutboundPort,
  ) {}

  async execute(command: RegisterChannelDto): Promise<RegisterChannelResult> {
    try {
      const checkChannel = await this.channelInfoAdapter.execute(
        command.registeredChannelId,
      );

      if (checkChannel.isErr()) {
        return Err(new ChannelNotFoundError());
      }
      const checkChannelDuplication =
        await this.channelAnalysisRepository.checkChannel(
          command.userId,
          command.registeredChannelId,
        );

      if (checkChannelDuplication.length != 0) {
        return Err(new ChannelDuplicateError());
      }
      const channelAnalysisEntity = ChannelAnalysisEntity.create(command);
      const res = await this.channelAnalysisRepository.insert(
        channelAnalysisEntity,
      );
      return Ok(res.success);
    } catch (e) {
      return Err(e);
    }
  }
}
