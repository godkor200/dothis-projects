import { Module } from '@nestjs/common';
import { StoryBoardEntityModule } from '@Apps/modules/story_board/domain/entities/story-board.entity.module';

@Module({ imports: [StoryBoardEntityModule] })
export class StoryBoardApiModule {}
