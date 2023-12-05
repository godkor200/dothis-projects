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
import { FindAccumulateVideosQueryHandler } from '@Apps/modules/video/queries/v1/find-accumulate-videos/find-accumulate-videos.query-handler';
import { FindAccumulateVideosHttpController } from '@Apps/modules/video/queries/v1/find-accumulate-videos/find-accumulate-videos.http.controller';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/service/channel-history.service.module';

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
  FindVideoHandler,
  FindVideoPageQueryHandler,
  FindAccumulateVideosQueryHandler,
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [
    FindVideoPageHttpController,
    FindAccumulateVideosHttpController,
  ],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV1Module {}
