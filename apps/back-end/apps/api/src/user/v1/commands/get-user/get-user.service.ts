import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@Apps/api/src/user/v1/db/user.repository.port';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class FindUserCommand {
  readonly userId: string;

  constructor(props: FindUserCommand) {
    this.userId = props.userId;
  }
}

@CommandHandler(FindUserCommand)
export class GetUserQueryHandler implements ICommandHandler<FindUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}
  async execute(command: FindUserCommand) {
    const found = await this.userRepo.findOneById(command.userId);
    if (!found) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return found;
  }
}
