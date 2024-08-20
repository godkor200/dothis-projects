import { Paginated, RepositoryPort } from '@Libs/commons';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';

import {
  FindOneStoryBoardDao,
  StoryBoardDao,
} from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';

import { TGetOneStoryBoardRes } from '@Apps/modules/story-board/application/queries/get-one-story-board.query';
import { TGetManyStoryBoardRes } from '@Apps/modules/story-board/application/queries/get-many-story-board.query';

export interface StoryBoardOutboundPort
  extends RepositoryPort<StoryBoardEntity> {
  create(userId: number): Promise<StoryBoardEntity>;

  findOneWithRelations(
    props: FindOneStoryBoardDao,
  ): Promise<TGetOneStoryBoardRes>;

  findAllPaginatedWithCondition(
    props: StoryBoardDao,
  ): Promise<TGetManyStoryBoardRes>;
}
