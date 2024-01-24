import { MemoEntity } from '@Apps/modules/story_board/domain/entities/memo.entity';
import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { TMemoModel, zMemoSchema } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReferenceDao } from '@Apps/modules/story_board/interfaces/daos';
import { PostMemoDao } from '@Apps/modules/story_board/interfaces/daos/memo.dao';
import { MemoOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/memo.outbound';

export class MemoAdapter
  extends SqlRepositoryBase<MemoEntity, TMemoModel>
  implements MemoOutboundPort
{
  protected tableName = 'memo';

  protected schema = zMemoSchema;

  @InjectRepository(MemoEntity)
  protected readonly repository: Repository<MemoEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(props: PostMemoDao): Promise<MemoEntity> {
    let memo = this.repository.create();
    memo.content = props.body.value;
    memo.boardId = Number(props.storyBoardId);
    return await this.repository.save(memo);
  }
}
