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
import { IgniteHealthCheckMiddleware } from '@Libs/commons/src/application/middleware/ignite-health-check.middleware';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';

@Module({
  imports: [
    ChannelApiModule,
    HitsApiModule,
    VideoApiModule,
    VideoHistoryApiModule,
    ChannelHistoryApiModule,
    StoryBoardApiModule,
    IgniteModule,
  ],
  providers: [IgniteHealthCheckMiddleware],
})
export class IgniteDependentApiModule implements NestModule {
  private router = ['video', 'hits', 'channel-history', 'channel'];
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IgniteHealthCheckMiddleware).forRoutes(
      ...this.router.map((e) => ({
        path: `/v1/${e}/*`,
        method: RequestMethod.GET,
      })),
    );
  }
}
