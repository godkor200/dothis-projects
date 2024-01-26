import { RepositoryPort } from '@Libs/commons/src';
import { StoryBoardEntity } from '@Apps/modules/story_board/domain/entities/story-board.entity';
import { StoryBoardOverviewEntity } from '@Apps/modules/story_board/domain/entities/story-board-overview.entity';

export interface StoryBoardDetailOutboundPort
  extends RepositoryPort<StoryBoardOverviewEntity> {
  create(boardId: number): Promise<StoryBoardOverviewEntity>;
}
