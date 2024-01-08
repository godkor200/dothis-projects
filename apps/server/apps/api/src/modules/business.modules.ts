import { Module } from '@nestjs/common';
import { CacheApiModule } from '@Apps/modules/cache/cache.module';
import { ChannelApiModule } from '@Apps/modules/channel/channel-api.module';
import { CommunityCrawlingApiModule } from '@Apps/modules/community-crawling/community-crawling-api.module';
import { DailyViewsApiModule } from '@Apps/modules/daily_views/daily-views-api.module';
import { RelWordsApiModules } from '@Apps/modules/rel-words/rel-words.module';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { VideoApiModule } from '@Apps/modules/video/video.module';
import { VideoHistoryApiModule } from '@Apps/modules/video_history/video_history.module';
import { ChannelHistoryApiModule } from '@Apps/modules/channel_history/channel-history-api.module';

@Module({
  imports: [
    CacheApiModule,
    ChannelApiModule,
    CommunityCrawlingApiModule,
    DailyViewsApiModule,
    RelWordsApiModules,
    UserApiModule,
    VideoApiModule,
    VideoHistoryApiModule,
    ChannelHistoryApiModule,
  ],
})
export class BusinessModule {}
