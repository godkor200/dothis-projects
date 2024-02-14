import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getOneStoryBoardDto } from '@Apps/modules/story-board/application/dtos/story-board.dto';
import { Result } from 'oxide.ts';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/constants/recent-story-board.di-token.constant';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/errors/story.error';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { FindOneStoryBoardDao } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
export type TGetOneStoryBoardRes = Result<
  StoryBoardEntity,
  StoryNotExistsError | InternalServerErrorException
>;
@QueryHandler(getOneStoryBoardDto)
export class GetOneStoryBoardQuery
  implements IQueryHandler<getOneStoryBoardDto, TGetOneStoryBoardRes>
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly storyBoardRepository: StoryBoardOutboundPort,
  ) {}

  async execute(query: getOneStoryBoardDto): Promise<TGetOneStoryBoardRes> {
    const props = new FindOneStoryBoardDao(query);
    return await this.storyBoardRepository.findOneWithRelations(props);
  }
}
