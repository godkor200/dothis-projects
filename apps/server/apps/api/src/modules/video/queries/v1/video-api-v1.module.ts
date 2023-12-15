import { Module, Provider } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FindVideoHandler } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-page.http.controller';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-page.query-handler';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/database/channel-history.query-handler';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/service/channel-history.service.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/database/channel.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/constants/channel-data.di-token.constants';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: CHANNEL_HISTORY_OS_DI_TOKEN,
    useClass: ChannelHistoryQueryHandler,
  },
  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
  FindVideoHandler,
  FindVideoPageQueryHandler,
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [FindVideoPageHttpController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV1Module {}
