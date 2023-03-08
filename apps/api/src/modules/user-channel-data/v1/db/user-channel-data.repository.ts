import { UserChannelData } from '@Apps/config/database/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataRepositoryPort } from '@Apps/modules/user-channel-data/v1/db/user-channel-data.repository.port';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { UserChannelDataModel, zUserChannelData } from '@dothis/dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserChannelDataRepository
  extends SqlRepositoryBase<UserChannelData, UserChannelDataModel>
  implements UserChannelDataRepositoryPort
{
  protected tableName = 'UserChannelData';
  protected schema = zUserChannelData;

  @InjectRepository(UserChannelData)
  protected readonly repository: Repository<UserChannelData>;
  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  async findOneByUserId(userId: string): Promise<UserChannelData> {
    return await this.repository
      .createQueryBuilder('UserChannelData')
      .where({ userId })
      .getOne();
  }
}
