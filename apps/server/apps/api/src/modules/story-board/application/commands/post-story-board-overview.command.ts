import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardOverviewDto } from '@Apps/modules/story-board/application/dtos/story-board-overview.dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Ok, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/events/errors/story.error';
import { StoryBoardDetailOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/story-board-details.outbound';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story-board/story-board-details.di-token.constant';
import { IRes } from '@Libs/types';
export type TOverviewRes = Result<
  IRes<boolean>,
  StoryNotExistsError | InternalServerErrorException
>;
@CommandHandler(PostStoryBoardOverviewDto)
export class PostStoryBoardOverviewCommand
  implements ICommandHandler<PostStoryBoardOverviewDto, TOverviewRes>
{
  constructor(
    @Inject(STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT)
    private readonly storyBoardDetail: StoryBoardDetailOutboundPort,
  ) {}
  async execute(command: PostStoryBoardOverviewDto): Promise<TOverviewRes> {
    const { overviewId: id, body } = command;
    if (body.hasOwnProperty('uploadDate')) {
      body['uploadDate'] = new Date(body['uploadDate']);
    }
    const res = await this.storyBoardDetail.updateOne({
      id,
      ...body,
    });
    return Ok(res);
  }
}
