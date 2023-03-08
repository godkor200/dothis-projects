import { UserRepositoryPort } from '@Apps/modules/user/v1/db/user.repository.port';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { User } from '@Apps/config/database/domain/user/User.entity';
import { Injectable } from '@nestjs/common';
import { UserModel, userModel } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserRepository
  extends SqlRepositoryBase<User, UserModel>
  implements UserRepositoryPort
{
  protected tableName = 'User';
  protected schema = userModel;

  @InjectRepository(User) protected readonly repository: Repository<User>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByEmail(userEmail: string): Promise<User> {
    return await this.repository.findOneBy({ userEmail });
  }
  async updateRefreshToken(id: number, token: string): Promise<void> {
    await this.repository.update({ id }, { tokenRefresh: token });
  }
  async findOneWithRelations(id: string): Promise<User> {
    return await this.repository.findOneOrFail({
      where: { id: Number(id) },
      relations: { channel: true },
    });
  }
}
