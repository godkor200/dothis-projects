import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { TRecentStoryBoardModel, zStoryBoardSchema } from '@dothis/dto';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from '@Libs/commons/src';
import {
  FindOneStoryBoardDao,
  StoryBoardDao,
} from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
import { Err, Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/errors';

export class StoryBoardAdapter
  extends SqlRepositoryBase<StoryBoardEntity, TRecentStoryBoardModel>
  implements StoryBoardOutboundPort
{
  protected tableName = 'story-board';
  protected schema = zStoryBoardSchema;

  @InjectRepository(StoryBoardEntity)
  protected readonly repository: Repository<StoryBoardEntity>;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(userId: number): Promise<StoryBoardEntity> {
    return await this.repository.save({ userId });
  }

  async findOneWithRelations(
    props: FindOneStoryBoardDao,
  ): Promise<Result<StoryBoardEntity, StoryNotExistsError>> {
    const id = Number(props.storyId);
    const userId = Number(props.userInfo.id);

    try {
      const res = await this.repository.findOneOrFail({
        where: {
          id,
          userId,
        },
        relations: ['overview', 'overview.references', 'overview.memos'],
      });
      return Ok(res);
    } catch (err) {
      return Err(new StoryNotExistsError());
    }
  }

  async findAllPaginatedWithCondition(
    props: StoryBoardDao,
  ): Promise<Result<Paginated<StoryBoardEntity>, StoryNotExistsError>> {
    const { userInfo, limit, offset, field, param } = props;

    const userId = userInfo.id;
    const queryBuilder = this.repository
      .createQueryBuilder(this.tableName)
      .where({ userId })
      .limit(limit)
      .offset(offset);

    // orderBy 적용
    if (field && param) {
      const fieldValue = typeof field === 'boolean' ? 'id' : field; // `true`일 경우 'id'로 대체
      queryBuilder.orderBy(fieldValue, param.toUpperCase() as 'ASC' | 'DESC');
    }
    try {
      // 결과와 총 개수 가져오기
      const [data, count] = await queryBuilder.getManyAndCount();
      const page = Math.floor(offset / limit) + 1;
      return Ok(
        new Paginated<StoryBoardEntity>({
          data,
          count,
          page,
          limit,
        }),
      );
    } catch (err) {
      return Err(new StoryNotExistsError());
    }
  }
}
