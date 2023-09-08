import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CHANNEL_DATA_REPOSITORY_BY_OS } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelAdapter } from '@Apps/modules/channel/interface/channel.adapter';

export class FindKeywordTagByUserCommand {
  public readonly userId: string;
  constructor(props: FindKeywordTagByUserCommand) {
    this.userId = props.userId;
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
    const found = await this.userRepo.findOneWithRelations(command.userId);
    const res = await this.channelOpenSearchRepo.findChannelTagOrKeyword(
      found.channelId,
    );
    if (!res) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res;
  }
}
