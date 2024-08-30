import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ChannelApiModule } from '@Apps/modules/channel/channel-api.module';
import { HitsApiModule } from '@Apps/modules/hits/hits-api.module';
import { VideoApiModule } from '@Apps/modules/video/video.module';
import { VideoHistoryApiModule } from '@Apps/modules/video-history/video_history.module';
import { ChannelHistoryApiModule } from '@Apps/modules/channel-history/channel-history-api.module';
import { StoryBoardApiModule } from '@Apps/modules/story-board/story-board.api.module';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';

@Module({
  imports: [
    ChannelApiModule,
    HitsApiModule,
    VideoApiModule,
    VideoHistoryApiModule,
    ChannelHistoryApiModule,
    StoryBoardApiModule,
    OpensearchCoreModule,
  ],
  providers: [],
})
export class OpensearchDependentApiModule implements NestModule {
  private router = ['video', 'hits', 'channel-history', 'channel'];
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(
      ...this.router.map((e) => ({
        path: `/v1/${e}/*`,
        method: RequestMethod.GET,
      })),
    );
  }
}
