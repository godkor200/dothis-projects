import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpectedViewsV2QueryHandler } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.query-handler';
import { ExpectedViewsV2HttpController } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.http.controller';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/repository/database/channel-history.query-handler';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { VideoDataService } from '@Apps/modules/video/application/service/video-data.service';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/service/channel-history.service.module';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';

const controllers = [ExpectedViewsV2HttpController];
const repositories: Provider[] = [
  VideoDataService,
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers,
  providers: [
    ...repositories,
    ExpectedViewsV2QueryHandler,
    ChannelHistoryAggregateService,
  ],
})
export class ChannelHistoryV2Module {}
