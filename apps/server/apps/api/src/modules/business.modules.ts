import { Module } from '@nestjs/common';
import { CacheApiModule } from '@Apps/modules/cache/cache.module';
import { ChannelApiModule } from '@Apps/modules/channel/channel-api.module';
import { DailyViewsApiModule } from '@Apps/modules/daily_views/daily-views-api.module';
import { RelWordsApiModules } from '@Apps/modules/rel-words/rel-words.module';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { VideoApiModule } from '@Apps/modules/video/video.module';
import { VideoHistoryApiModule } from '@Apps/modules/video_history/video_history.module';
import { ChannelHistoryApiModule } from '@Apps/modules/channel_history/channel-history-api.module';
import { WeeklyViewsApiModule } from '@Apps/modules/weekly_views/weekly-views-api.module';
import { StoryBoardApiModule } from '@Apps/modules/story_board/domain/story-board.api.module';

@Module({
  imports: [
    CacheApiModule,
    ChannelApiModule,
    DailyViewsApiModule,
    WeeklyViewsApiModule,
    RelWordsApiModules,
    UserApiModule,
    VideoApiModule,
    VideoHistoryApiModule,
    ChannelHistoryApiModule,
    StoryBoardApiModule,
  ],
})
export class BusinessModule {}
