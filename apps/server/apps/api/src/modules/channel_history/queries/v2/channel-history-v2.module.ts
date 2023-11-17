import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpectedViewsV2QueryHandler } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.query-handler';
import { ExpectedViewsV2HttpController } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.http.controller';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/database/channel-history.query-handler';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { AwsModule } from '@Apps/common/aws/aws.module';

const controllers = [ExpectedViewsV2HttpController];
const repositories: Provider[] = [
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
  imports: [CqrsModule, AwsModule],
  controllers,
  providers: [...repositories, ExpectedViewsV2QueryHandler],
})
export class ChannelHistoryV2Module {}
