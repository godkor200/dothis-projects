import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { TStoryBoardDetailModel, zStoryBoardDetailSchema } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StoryBoardDetailEntity } from '@Apps/modules/story_board/domain/entities/story-board-detail.entity';
import { StoryBoardDetailOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/story-board-details.outbound';

export class StoryBoardDetailAdapter
  extends SqlRepositoryBase<StoryBoardDetailEntity, TStoryBoardDetailModel>
  implements StoryBoardDetailOutboundPort
{
  protected tableName = 'story_board_detail';
  protected schema = zStoryBoardDetailSchema;

  @InjectRepository(StoryBoardDetailEntity)
  protected readonly repository: Repository<StoryBoardDetailEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(boardId: number): Promise<StoryBoardDetailEntity> {
    return await this.repository.save({ boardId });
  }
}
