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
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/queries/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/queries/v1/find-individual-video-info/find-individual-video-info.query-handler';
import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';

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
  FindIndividualVideoInfoQueryHandler,
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [
    FindVideoPageHttpController,
    FindIndividualVideoInfoHttpController,
  ],
  providers: [...queryHandlers, ...commandHandlers, VideoAggregateService],
})
export class VideoApiV1Module {}
