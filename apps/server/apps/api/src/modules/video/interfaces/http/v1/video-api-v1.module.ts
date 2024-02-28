import { Module, Provider } from '@nestjs/common';
import {
  VIDEO_GET_SERVICE_DI_TOKEN,
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_OS_DI_TOKEN,
  VIDEO_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';

import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';

import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/database/channel.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';

import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video-paging/find-video-page.http.controller';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { GetVideoDataPageService } from '@Apps/modules/video/application/service/get-video-data.service';
import { FindIndividualVideoInfoService } from '@Apps/modules/video/application/service/find-individual-video-info.service';
import { ChannelHistoryAdapter } from '@Apps/modules/channel_history/infrastructure/adapters/channel-history.adapter';
import { VIDEO_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryAdapter } from '@Apps/modules/video_history/infrastructure/adapters/video-history.adapter';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
  { provide: VIDEO_GET_SERVICE_DI_TOKEN, useClass: GetVideoDataPageService },
  {
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryAdapter,
  },
  {
    provide: VIDEO_HISTORY_IGNITE_DI_TOKEN,
    useClass: VideoHistoryAdapter,
  },
  GetVideoDataPageService,
  FindVideoPageQueryHandler,
  FindIndividualVideoInfoQueryHandler,
];
const service: Provider[] = [
  {
    provide: VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
    useClass: FindIndividualVideoInfoService,
  },
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers: [
    FindVideoPageHttpController,
    FindIndividualVideoInfoHttpController,
  ],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    VideoAggregateService,
    ...service,
  ],
})
export class VideoApiV1Module {}
