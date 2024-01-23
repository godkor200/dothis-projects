import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardDetailDto } from '@Apps/modules/story_board/interfaces/dtos/story-board-detail.dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/recent-story-board.outbound';
import { Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';
import { StoryBoardDetailOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/story-board-details.outbound';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/story-board-details.di-token.constant';

@CommandHandler(PostStoryBoardDetailDto)
export class PostStoryBoardDetailCommand
  implements
    ICommandHandler<
      PostStoryBoardDetailDto,
      Result<boolean, StoryNotExistsError | InternalServerErrorException>
    >
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: RecentStoryBoardOutboundPort,

    @Inject(STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT)
    private readonly storyBoardDetail: StoryBoardDetailOutboundPort,
  ) {}
  async execute(
    command: PostStoryBoardDetailDto,
  ): Promise<
    Result<boolean, StoryNotExistsError | InternalServerErrorException>
  > {
    const { detailId, body } = command;
    if (body.hasOwnProperty('uploadDate')) {
      body['uploadDate'] = new Date(body['uploadDate']);
    }
    const res = await this.storyBoardDetail.updateOne({
      id: detailId,
      ...body,
    });
    return Ok(res.success);
  }
}
