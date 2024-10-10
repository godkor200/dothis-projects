import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';

import { DeleteChannelDto } from '@Apps/modules/channel/application/dtos/delete-register-channel.dto';
import { ChannelAnalysisRepositoryPort } from '@Apps/modules/channel/infrastucture/repositories/channel-analysis.repository.port';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { CHANNEL_REGISTRATION } from '@Apps/modules/channel/channel.di-token';

export type DeleteChannelResult = Result<boolean, ChannelNotFoundError>;

@CommandHandler(DeleteChannelDto)
export class DeleteRegisteredChannelService
  implements ICommandHandler<DeleteChannelDto, DeleteChannelResult>
{
  constructor(
    @Inject(CHANNEL_REGISTRATION)
    private readonly channelAnalysisRepository: ChannelAnalysisRepositoryPort,
  ) {}

  async execute(command: DeleteChannelDto): Promise<DeleteChannelResult> {
    try {
      const { channelId, userId } = command;

      // 채널 존재 여부 확인
      const channel = await this.channelAnalysisRepository.checkChannel(
        userId,
        channelId,
      );

      if (channel.length === 0) {
        return Err(new ChannelNotFoundError());
      }
      const registeredChannelId = channel[0].id;

      // 채널 삭제
      const deleteResult = await this.channelAnalysisRepository.delete(
        String(registeredChannelId),
      );

      return Ok(deleteResult);
    } catch (e) {
      return Err(e);
    }
  }
}
