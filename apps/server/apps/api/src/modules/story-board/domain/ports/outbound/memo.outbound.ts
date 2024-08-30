import { RepositoryPort } from '@Libs/commons';
import { MemoEntity } from '@Apps/modules/story-board/domain/entities/memo.entity';
import { PostMemoDao } from '@Apps/modules/story-board/infrastructure/daos/memo.dao';

export interface MemoOutboundPort extends RepositoryPort<MemoEntity> {
  create(prop: PostMemoDao): Promise<MemoEntity>;
}
