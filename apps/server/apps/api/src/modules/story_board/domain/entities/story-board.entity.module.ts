import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from '@Apps/modules/story_board/domain/entities/memo.entity';
import { StoryBoardEntity } from '@Apps/modules/story_board/domain/entities/story-board.entity';
import { ReferenceEntity } from '@Apps/modules/story_board/domain/entities/reference.entity';
import { StoryBoardOverviewEntity } from '@Apps/modules/story_board/domain/entities/story-board-overview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemoEntity,
      ReferenceEntity,
      StoryBoardEntity,
      StoryBoardOverviewEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class StoryBoardEntityModule {}
