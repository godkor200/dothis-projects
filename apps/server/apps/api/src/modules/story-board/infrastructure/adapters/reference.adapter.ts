import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';
import { ReferenceEntity } from '@Apps/modules/story-board/domain/entities/reference.entity';
import { ReferenceOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/reference.outbound';
import { TReferenceModel, zReferenceSchema } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PostReferenceDao } from 'apps/api/src/modules/story-board/infrastructure/daos';

export class ReferenceAdapter
  extends SqlRepositoryBase<ReferenceEntity, TReferenceModel>
  implements ReferenceOutboundPort
{
  protected tableName = 'reference';

  protected schema = zReferenceSchema;

  @InjectRepository(ReferenceEntity)
  protected readonly repository: Repository<ReferenceEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
  async create(props: PostReferenceDao): Promise<ReferenceEntity> {
    let referenceEntity = this.repository.create();
    referenceEntity.url = props.body.value;
    referenceEntity.boardId = Number(props.storyBoardId);
    const res = await this.repository.save(referenceEntity);
    return res;
  }
}
