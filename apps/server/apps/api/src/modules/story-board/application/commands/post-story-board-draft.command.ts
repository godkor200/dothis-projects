import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardMainDraftDto } from '@Apps/modules/story-board/application/dtos/story-board.dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/recent-story-board.di-token.constant';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { Err, Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/errors/story.error';

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
    private readonly recentStoryBoard: StoryBoardOutboundPort,
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
