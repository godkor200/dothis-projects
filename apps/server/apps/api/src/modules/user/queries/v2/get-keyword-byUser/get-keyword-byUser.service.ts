import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/repository/db/channel-data.repository.port';

export class FindKeywordTagByUserCommand {
  public readonly userId: string;
  public readonly channelId: string;
  constructor(props: FindKeywordTagByUserCommand) {
    this.userId = props.userId;
    this.channelId = props.channelId;
  }
}

@CommandHandler(FindKeywordTagByUserCommand)
export class GetUserV2CommandHandler
  implements ICommandHandler<FindKeywordTagByUserCommand>
{
  constructor(
    @Inject(CHANNEL_DATA_REPOSITORY)
    protected readonly channelDataRepo: ChannelDataRepositoryPort,
  ) {}
  async execute(command: FindKeywordTagByUserCommand) {
    const res = await this.channelDataRepo.findOneByChannelId(
      command.channelId,
    );
    if (!res) return Err(new UserNotFoundError());
    const { keyword, tag } = res;
    return Ok({
      channel_keywords: keyword,
      channel_tags: tag,
    });
  }
}
