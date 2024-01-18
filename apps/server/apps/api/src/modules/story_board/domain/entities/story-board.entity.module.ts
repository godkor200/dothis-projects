import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from '@Apps/modules/story_board/domain/entities/memo.entity';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
import { ReferenceEntity } from '@Apps/modules/story_board/domain/entities/reference.entity';
import { StoryBoardDetailEntity } from '@Apps/modules/story_board/domain/entities/story-board-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemoEntity,
      ReferenceEntity,
      RecentStoryBoardEntity,
      StoryBoardDetailEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class StoryBoardEntityModule {}
