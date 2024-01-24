import { RepositoryPort } from '@Libs/commons/src';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
import { StoryBoardDetailEntity } from '@Apps/modules/story_board/domain/entities/story-board-detail.entity';

export interface StoryBoardDetailOutboundPort
  extends RepositoryPort<StoryBoardDetailEntity> {
  create(boardId: number): Promise<StoryBoardDetailEntity>;
}
