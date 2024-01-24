import { Module, Provider } from '@nestjs/common';
import { PostStoryBoardHttpV1Controller } from '@Apps/modules/story_board/controllers/v1/commands/post-story-board/post-story-board.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/recent-story-board.di-token.constant';
import { RecentStoryBoardAdapter } from '@Apps/modules/story_board/infrastructure/adapters/recent-story-board.adapter';
import { CreateRecentStoryBoardCommand } from '@Apps/modules/story_board/application/service/create-recent-story-board.command';
import { StoryBoardEntityModule } from '@Apps/modules/story_board/domain/entities/story-board.entity.module';
import { PostStoryBoardTitleCommand } from '@Apps/modules/story_board/application/service/post-story-board-title.command';
import { PostStoryBoardDraftCommand } from '@Apps/modules/story_board/application/service/post-story-board-draft.command';
import { PostStoryBoardDetailCommand } from '@Apps/modules/story_board/application/service/post-story-board-detail.command';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/story-board-details.di-token.constant';
import { StoryBoardDetailAdapter } from '@Apps/modules/story_board/infrastructure/adapters/story-board-detail.adapter';
import { GetStoryBoardHttpV1Controller } from '@Apps/modules/story_board/controllers/v1/queries/get-story-board/get-story-board.http.controller';
import { GetStoryBoardQuery } from '@Apps/modules/story_board/application/service/get-story-board.query';
const controllers = [
  PostStoryBoardHttpV1Controller,
  GetStoryBoardHttpV1Controller,
];
const queries: Provider[] = [GetStoryBoardQuery];

const commands: Provider[] = [
  CreateRecentStoryBoardCommand,
  PostStoryBoardTitleCommand,
  PostStoryBoardDraftCommand,
  PostStoryBoardDetailCommand,
];
const providers: Provider[] = [
  {
    provide: RECENT_STORY_BOARD_DI_TOKEN_CONSTANT,
    useClass: RecentStoryBoardAdapter,
  },
  {
    provide: STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT,
    useClass: StoryBoardDetailAdapter,
  },
  ...queries,
  ...commands,
];
@Module({
  imports: [CqrsModule, StoryBoardEntityModule],
  controllers,
  providers,
})
export class StoryBoardV1Module {}
