import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { Err, Ok } from 'oxide.ts';

export class LogoutDto implements ICommand {
  public readonly id: number;

  constructor(props: LogoutDto) {
    this.id = props.id;
  }
}

@CommandHandler(LogoutDto)
export class LogoutCommandHandler implements ICommandHandler<LogoutDto> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(command: LogoutDto) {
    const res = await this.userRepository.updateOne({
      id: command.id.toString(),
      tokenRefresh: null,
    });
    if (!res.success) return Err(new InternalServerErrorException());
    return Ok(res.success);
  }
}
