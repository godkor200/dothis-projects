import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { PutEnvDtos } from '@Apps/modules/user/dtos/put-env.dtos';
import { Err, Ok, Result } from 'oxide.ts';

@CommandHandler(PutEnvDtos)
export class PutEnvCommandHandler implements ICommandHandler<PutEnvDtos> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(
    command: PutEnvDtos,
  ): Promise<Result<boolean, InternalServerErrorException>> {
    const res = await this.userRepository.updateOne(command);
    if (!res.success) return Err(new InternalServerErrorException());
    return Ok(res.success);
  }
}
