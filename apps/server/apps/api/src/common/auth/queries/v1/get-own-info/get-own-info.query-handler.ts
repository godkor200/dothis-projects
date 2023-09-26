import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interface/get-own-info.interface';
import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { User } from '@Apps/modules/user/domain/user.entity';
import { Err, Ok, Result } from 'oxide.ts';

@QueryHandler(GetOwnInfoQuery)
export class GetOwnInfoQueryHandler
  implements IQueryHandler<GetOwnInfoQuery, Result<User, NotFoundException>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(
    query: GetOwnInfoQuery,
  ): Promise<Result<User, NotFoundException>> {
    const user = await this.userRepository.findOneWithRelations(query.index);
    if (!user) return Err(new NotFoundException());
    return Ok(user);
  }
}
