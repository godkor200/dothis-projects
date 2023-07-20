import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/repository/db/channel-data.repository.port';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';

export class FindUserCommand {
  readonly userId: string;
  readonly search?: string;
  constructor(props: FindUserCommand) {
    this.userId = props.userId;
    this.search = props.search;
  }
}

@CommandHandler(FindUserCommand)
export class GetUserCommandHandler implements ICommandHandler<FindUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}
  async execute(command: FindUserCommand) {
    const found = await this.userRepo.findOneWithRelations(command.userId);
    if (!found) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return found;
  }
}
