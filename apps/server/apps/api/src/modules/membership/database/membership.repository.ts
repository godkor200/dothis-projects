import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { TMembershipModel, zMembershipModel } from '@dothis/dto';
import { Injectable } from '@nestjs/common';
import { MembershipRepositoryPort } from '@Apps/modules/membership/database/membership.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Apps/modules/user/domain/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MembershipRepository
  extends SqlRepositoryBase<Membership, TMembershipModel>
  implements MembershipRepositoryPort
{
  protected tableName = 'Membership';
  protected schema = zMembershipModel;

  @InjectRepository(Membership)
  protected readonly repository: Repository<Membership>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
