import { Paginated, RepositoryPort } from '@Libs/commons/src';
import { StoryBoardEntity } from '@Apps/modules/story_board/domain/entities/story-board.entity';

import {
  FindOneStoryBoardDao,
  StoryBoardDao,
} from '@Apps/modules/story_board/interfaces/daos/story-board.dao';
import { Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors';

export interface StoryBoardOutboundPort
  extends RepositoryPort<StoryBoardEntity> {
  create(userId: number): Promise<StoryBoardEntity>;

  findOneWithRelations(
    props: FindOneStoryBoardDao,
  ): Promise<Result<StoryBoardEntity, StoryNotExistsError>>;

  findAllPaginatedWithCondition(
    props: StoryBoardDao,
  ): Promise<Result<Paginated<StoryBoardEntity>, StoryNotExistsError>>;
}
