import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';

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
    const found = await this.userRepo.findOneById(command.userId);
    if (!found) return Err(new UserNotFoundError());
    return Ok(found);
  }
}
