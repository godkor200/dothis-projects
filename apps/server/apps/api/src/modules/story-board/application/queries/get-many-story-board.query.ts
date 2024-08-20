import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManyStoryBoardDto } from 'apps/api/src/modules/story-board/application/dtos';
import { Paginated } from '@Libs/commons';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/events/errors';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/recent-story-board.di-token.constant';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { StoryBoardDao } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
export type TGetManyStoryBoardRes = Result<
  Paginated<StoryBoardEntity>,
  StoryNotExistsError | InternalServerErrorException
>;
@QueryHandler(GetManyStoryBoardDto)
export class GetManyStoryBoardQuery
  implements IQueryHandler<GetManyStoryBoardDto, TGetManyStoryBoardRes>
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly storyBoardRepository: StoryBoardOutboundPort,
  ) {}

  async execute(query: GetManyStoryBoardDto): Promise<TGetManyStoryBoardRes> {
    const arg = new StoryBoardDao(query);
    return this.storyBoardRepository.findAllPaginatedWithCondition(arg);
  }
}
