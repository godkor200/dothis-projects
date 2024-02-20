import { Module, Provider } from '@nestjs/common';
import { PostStoryBoardHttpV1Controller } from '@Apps/modules/story-board/interfaces/http/controllers/v1/commands/post-story-board/post-story-board.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RECENT_STORY_BOARD_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/recent-story-board.di-token.constant';
import { StoryBoardAdapter } from '@Apps/modules/story-board/infrastructure/adapters/story-board.adapter';
import { CreateStoryBoardCommand } from '@Apps/modules/story-board/application/commands/create-story-board.command';
import { StoryBoardEntityModule } from '@Apps/modules/story-board/domain/entities/story-board.entity.module';
import { PostStoryBoardTitleCommand } from '@Apps/modules/story-board/application/commands/post-story-board-title.command';
import { PostStoryBoardDraftCommand } from '@Apps/modules/story-board/application/commands/post-story-board-draft.command';
import { PostStoryBoardOverviewCommand } from '@Apps/modules/story-board/application/commands/post-story-board-overview.command';
import { STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT } from '@Apps/modules/story-board/story-board-details.di-token.constant';
import { StoryBoardOverviewAdapter } from '@Apps/modules/story-board/infrastructure/adapters/story-board-overview.adapter';
import { GetOneStoryBoardHttpV1Controller } from '@Apps/modules/story-board/interfaces/http/controllers/v1/queries/get-one-story-board/get-one-story-board.http.controller';
import { GetOneStoryBoardQuery } from '@Apps/modules/story-board/application/queries/get-one-story-board.query';
import { PostReferenceCommand } from '@Apps/modules/story-board/application/commands/post-reference.command';
import { REFERENCE_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/reference.di-token.constant';
import { ReferenceAdapter } from '@Apps/modules/story-board/infrastructure/adapters/reference.adapter';
import { MemoAdapter } from '@Apps/modules/story-board/infrastructure/adapters/memo.adapter';
import { MEMO_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/memo.di-token.constant';
import { PostMemoCommand } from '@Apps/modules/story-board/application/commands/post-memo.command';
import { GetManyStoryBoardHttpController } from '@Apps/modules/story-board/interfaces/http/controllers/v1/queries/get-many-story-board/get-many-story-board.http.controller';
import { GetManyStoryBoardQuery } from '@Apps/modules/story-board/application/queries/get-many-story-board.query';
const controllers = [
  PostStoryBoardHttpV1Controller,
  GetOneStoryBoardHttpV1Controller,
  GetManyStoryBoardHttpController,
];
const queries: Provider[] = [GetOneStoryBoardQuery, GetManyStoryBoardQuery];

const commands: Provider[] = [
  CreateStoryBoardCommand,
  PostStoryBoardTitleCommand,
  PostStoryBoardDraftCommand,
  PostStoryBoardOverviewCommand,
  PostReferenceCommand,
  PostMemoCommand,
];
const providers: Provider[] = [
  {
    provide: RECENT_STORY_BOARD_DI_TOKEN_CONSTANT,
    useClass: StoryBoardAdapter,
  },
  {
    provide: STORY_BOARD_DETAIL_DO_TOKEN_CONSTANT,
    useClass: StoryBoardOverviewAdapter,
  },
  {
    provide: REFERENCE_DI_TOKEN_CONSTANT,
    useClass: ReferenceAdapter,
  },
  { provide: MEMO_DI_TOKEN_CONSTANT, useClass: MemoAdapter },
  ...queries,
  ...commands,
];
@Module({
  imports: [CqrsModule, StoryBoardEntityModule],
  controllers,
  providers,
})
export class StoryBoardV1Module {}
