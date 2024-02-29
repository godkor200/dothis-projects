import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';

import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindChannelHistoryHttpController } from '@Apps/modules/channel_history/interfaces/http/controllers/v1/find-channel-history/find-channel-history.http.controller';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { ChannelHistoryAdapter } from '@Apps/modules/channel_history/infrastructure/adapters/channel-history.adapter';
import { FindChannelHistoryQueryHandler } from '@Apps/modules/channel_history/application/queries/find-channel-history.query-handler';
const controllers = [FindChannelHistoryHttpController];
const repositories: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryAdapter,
  },
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers,
  providers: [...repositories, FindChannelHistoryQueryHandler],
})
export class ChannelHistoryV1Module {}
