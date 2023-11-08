import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpectedViewsQueryHandler } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.query-handler';
import { ExpectedViewsHttpController } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/database/channel-history.query-handler';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { VideoHistoryQueryHandler } from '@Apps/modules/video_history/database/video_history.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindChannelHistoryHttpController } from '@Apps/modules/channel_history/queries/v1/find-channel-history/find-channel-history.http.controller';
import { FindChannelHistoryQueryHandler } from '@Apps/modules/channel_history/queries/v1/find-channel-history/find-channel-history.query-handler';

const controllers = [
  ExpectedViewsHttpController,
  FindChannelHistoryHttpController,
];
const repositories: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: VIDEO_HISTORY_OS_DI_TOKEN,
    useClass: VideoHistoryQueryHandler,
  },
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
];
@Module({
  imports: [CqrsModule, AwsModule],
  controllers,
  providers: [
    ...repositories,
    ExpectedViewsQueryHandler,
    FindChannelHistoryQueryHandler,
  ],
})
export class ChannelHistoryV1Module {}
