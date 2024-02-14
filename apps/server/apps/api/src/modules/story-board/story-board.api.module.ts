import { Module } from '@nestjs/common';
import { StoryBoardEntityModule } from '@Apps/modules/story-board/domain/entities/story-board.entity.module';
import { StoryBoardV1Module } from '@Apps/modules/story-board/controllers/v1/story-board.v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    StoryBoardV1Module,
    RouterModule.register([{ path: 'v1', module: StoryBoardV1Module }]),
  ],
})
export class StoryBoardApiModule {}
