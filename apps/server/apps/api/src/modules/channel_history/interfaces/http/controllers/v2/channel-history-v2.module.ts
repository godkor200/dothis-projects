import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpectedViewsV2QueryHandler } from '@Apps/modules/channel_history/interfaces/http/queries/v2/exprected-views/expected-views.v2.query-handler';
import { ExpectedViewsV2HttpController } from '@Apps/modules/channel_history/interfaces/http/queries/v2/exprected-views/expected-views.v2.http.controller';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { VideoDataService } from '@Apps/modules/video/application/service/video-data.service';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';

const controllers = [ExpectedViewsV2HttpController];
const repositories: Provider[] = [
  VideoDataService,
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
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
