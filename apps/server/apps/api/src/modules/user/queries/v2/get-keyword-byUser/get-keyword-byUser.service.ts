import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CHANNEL_DATA_REPOSITORY_BY_OS } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelAdapter } from '@Apps/modules/channel/interface/channel.adapter';
import { Err, Ok } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';

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
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,

    @Inject(CHANNEL_DATA_REPOSITORY_BY_OS)
    protected readonly channelOpenSearchRepo: ChannelAdapter,
  ) {}
  async execute(command: FindKeywordTagByUserCommand) {
    const res = await this.channelOpenSearchRepo.findChannelTagOrKeyword(
      command.channelId,
    );
    if (!res) return Err(new UserNotFoundError());
    return Ok(res);
  }
}
