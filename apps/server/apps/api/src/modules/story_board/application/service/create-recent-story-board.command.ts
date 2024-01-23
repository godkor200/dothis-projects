import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecentStoryBoardCreateDto } from '@Apps/modules/story_board/interfaces/dtos/recent-story-board.dto';
import { RecentStoryBoardOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/recent-story-board.outbound';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
import { Ok, Result } from 'oxide.ts';

@CommandHandler(RecentStoryBoardCreateDto)
export class CreateRecentStoryBoardCommand
  implements
    ICommandHandler<
      RecentStoryBoardCreateDto,
      Result<RecentStoryBoardEntity, InternalServerErrorException>
    >
{
  constructor(
    @Inject(RECENT_STORY_BOARD_DI_TOKEN_CONSTANT)
    private readonly recentStoryBoard: RecentStoryBoardOutboundPort,
  ) {}
  async execute(
    command: RecentStoryBoardCreateDto,
  ): Promise<Result<RecentStoryBoardEntity, InternalServerErrorException>> {
    return Ok(await this.recentStoryBoard.create(command.id));
  }
}
