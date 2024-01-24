import { RepositoryPort } from '@Libs/commons/src';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
import { User } from '@Apps/modules/user/domain/user.entity';

export interface RecentStoryBoardOutboundPort
  extends RepositoryPort<RecentStoryBoardEntity> {
  create(userId: number): Promise<RecentStoryBoardEntity>;

  findOneWithRelations(id: string): Promise<RecentStoryBoardEntity>;
}
