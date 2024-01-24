import { RepositoryPort } from '@Libs/commons/src';
import { MemoEntity } from '@Apps/modules/story_board/domain/entities/memo.entity';
import { PostMemoDao } from '@Apps/modules/story_board/interfaces/daos/memo.dao';

export interface MemoOutboundPort extends RepositoryPort<MemoEntity> {
  create(prop: PostMemoDao): Promise<MemoEntity>;
}
