import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManyStoryBoardDto } from 'apps/api/src/modules/story-board/application/dtos';
import { Paginated } from '@Libs/commons/src';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/errors';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/recent-story-board.di-token.constant';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { StoryBoardDao } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
export type TGetManyStoryBoardRes = Result<
  Paginated<StoryBoardEntity>,
  StoryNotExistsError | InternalServerErrorException
>;
@QueryHandler(getManyStoryBoardDto)
export class GetManyStoryBoardQuery
  implements IQueryHandler<getManyStoryBoardDto, TGetManyStoryBoardRes>
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly storyBoardRepository: StoryBoardOutboundPort,
  ) {}

  async execute(query: getManyStoryBoardDto): Promise<TGetManyStoryBoardRes> {
    const arg = new StoryBoardDao(query);
    return this.storyBoardRepository.findAllPaginatedWithCondition(arg);
  }
}
