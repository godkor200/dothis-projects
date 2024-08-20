import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardMainDto } from '@Apps/modules/story-board/application/dtos/story-board.dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/recent-story-board.di-token.constant';
import { StoryBoardOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board.outbound';
import { Err, Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/events/errors/story.error';
import { IRes } from '@Libs/types';
export type TPostStoryBoardTitleCommandRes = Result<
  IRes<boolean>,
  StoryNotExistsError | InternalServerErrorException
>;
@CommandHandler(PostStoryBoardMainDto)
export class PostStoryBoardTitleCommand
  implements
    ICommandHandler<PostStoryBoardMainDto, TPostStoryBoardTitleCommandRes>
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: StoryBoardOutboundPort,
  ) {}

  async execute(
    command: PostStoryBoardMainDto,
  ): Promise<TPostStoryBoardTitleCommandRes> {
    const res = await this.recentStoryBoard.updateOne({
      id: command.storyBoardId,
      title: command.body.value,
    });
    if (!res.success) return Err(new StoryNotExistsError());
    return Ok(res);
  }
}
