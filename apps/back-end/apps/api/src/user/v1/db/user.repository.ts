import { UserRepositoryPort } from '@Apps/api/src/user/v1/db/user.repository.port';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Injectable } from '@nestjs/common';
import { UserModel, zUser } from '@dothis/share/lib/dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<User, UserModel>
  implements UserRepositoryPort
{
  protected tableName = 'User';
  protected schema = zUser;
  protected readonly repository: Repository<User>;
}
