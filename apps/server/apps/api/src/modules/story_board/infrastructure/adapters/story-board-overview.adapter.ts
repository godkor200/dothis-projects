import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import {
  TStoryBoardOverviewModel,
  zStoryBoardOverviewSchema,
} from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StoryBoardOverviewEntity } from '@Apps/modules/story_board/domain/entities/story-board-overview.entity';
import { StoryBoardDetailOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/story-board-details.outbound';

export class StoryBoardOverviewAdapter
  extends SqlRepositoryBase<StoryBoardOverviewEntity, TStoryBoardOverviewModel>
  implements StoryBoardDetailOutboundPort
{
  protected tableName = 'story_board_overview';
  protected schema = zStoryBoardOverviewSchema;

  @InjectRepository(StoryBoardOverviewEntity)
  protected readonly repository: Repository<StoryBoardOverviewEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(boardId: number): Promise<StoryBoardOverviewEntity> {
    return await this.repository.save({ boardId });
  }
}
