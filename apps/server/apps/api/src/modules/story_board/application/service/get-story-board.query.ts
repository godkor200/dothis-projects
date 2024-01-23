import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getStoryBoardDto } from '@Apps/modules/story_board/interfaces/dtos/recent-story-board.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/recent-story-board.outbound';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';

@QueryHandler(getStoryBoardDto)
export class GetStoryBoardQuery
  implements
    IQueryHandler<
      getStoryBoardDto,
      Result<
        RecentStoryBoardEntity,
        StoryNotExistsError | InternalServerErrorException
      >
    >
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: RecentStoryBoardOutboundPort,
  ) {}

  async execute(
    query: getStoryBoardDto,
  ): Promise<
    Result<
      RecentStoryBoardEntity,
      StoryNotExistsError | InternalServerErrorException
    >
  > {
    const res = await this.recentStoryBoard.findOneWithRelations(
      query.storyBoardId,
    );

    if (!res.id) return Err(new StoryNotExistsError());
    return Ok(res);
  }
}
