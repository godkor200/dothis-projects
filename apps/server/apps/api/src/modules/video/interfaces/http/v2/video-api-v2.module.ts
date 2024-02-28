import { Module, Provider } from '@nestjs/common';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/infrastructure/repository/database/channel-history.query-handler';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { ChannelQueryHandler } from '@Apps/modules/channel/database/channel.query-handler';
import { FindAccumulateVideosV2QueryHandler } from '@Apps/modules/video/interfaces/http/v2/find-accumulate-videos/find-accumulate-videos.query-handler';
import { FindVideoPageV2QueryHandler } from '@Apps/modules/video/interfaces/http/v2/find-video-paging/find-video-page.query-handler';
import { FindAccumulateVideosV2HttpController } from '@Apps/modules/video/interfaces/http/v2/find-accumulate-videos/find-accumulate-videos.http.controller';
import { FindVideoPageV2HttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-paging/find-video-page.http.controller';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
  FindAccumulateVideosV2QueryHandler,
  ChannelHistoryAggregateService,
  FindVideoPageV2QueryHandler,
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [
    FindAccumulateVideosV2HttpController,
    FindVideoPageV2HttpController,
  ],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV2Module {}
