import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardMainDraftDto } from '@Apps/modules/story_board/interfaces/dtos/recent-story-board.dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/recent-story-board.outbound';
import { Err, Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';

@CommandHandler(PostStoryBoardMainDraftDto)
export class PostStoryBoardDraftCommand
  implements
    ICommandHandler<
      PostStoryBoardMainDraftDto,
      Result<boolean, StoryNotExistsError | InternalServerErrorException>
    >
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: RecentStoryBoardOutboundPort,
  ) {}

  async execute(
    command: PostStoryBoardMainDraftDto,
  ): Promise<
    Result<boolean, StoryNotExistsError | InternalServerErrorException>
  > {
    const res = await this.recentStoryBoard.updateOne({
      id: command.storyBoardId,
      isDraft: command.body.value,
    });
    if (!res.success) return Err(new StoryNotExistsError());
    return Ok(res.success);
  }
}
