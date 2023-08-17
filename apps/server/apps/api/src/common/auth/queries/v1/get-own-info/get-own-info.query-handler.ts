import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interface/get-own-info.interface';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { User } from '@Apps/modules/user/domain/user.entity';

@QueryHandler(GetOwnInfoQuery)
export class GetOwnInfoQueryHandler
  implements IQueryHandler<GetOwnInfoQuery, User>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(query: GetOwnInfoQuery): Promise<User> {
    const user = this.userRepository.findOneWithRelations(query.index);
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return user;
  }
}
