import { Module } from '@nestjs/common';
import { ChannelApiModule } from '@Apps/modules/channel/channel-api.module';
import { HitsApiModule } from '@Apps/modules/hits/hits-api.module';
import { RelatedWordsApiModule } from '@Apps/modules/related-word/related-words.module';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { VideoApiModule } from '@Apps/modules/video/video.module';
import { VideoHistoryApiModule } from '@Apps/modules/video-history/video_history.module';
import { ChannelHistoryApiModule } from '@Apps/modules/channel-history/channel-history-api.module';
import { StoryBoardApiModule } from '@Apps/modules/story-board/story-board.api.module';

@Module({
  imports: [
    ChannelApiModule,
    HitsApiModule,
    RelatedWordsApiModule,
    UserApiModule,
    VideoApiModule,
    VideoHistoryApiModule,
    ChannelHistoryApiModule,
    StoryBoardApiModule,
  ],
})
export class BusinessModule {}
