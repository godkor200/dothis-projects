import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
import { TRecentStoryBoardModel, zStoryBoardSchema } from '@dothis/dto';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/recent-story-board.outbound';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class RecentStoryBoardAdapter
  extends SqlRepositoryBase<RecentStoryBoardEntity, TRecentStoryBoardModel>
  implements RecentStoryBoardOutboundPort
{
  protected tableName = 'story_board';
  protected schema = zStoryBoardSchema;

  @InjectRepository(RecentStoryBoardEntity)
  protected readonly repository: Repository<RecentStoryBoardEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(userId: number): Promise<RecentStoryBoardEntity> {
    return await this.repository.save({ userId });
  }

  async findOneWithRelations(storyId: string): Promise<RecentStoryBoardEntity> {
    const id = Number(storyId);
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
      relations: { storyboard: true },
    });
  }
}
