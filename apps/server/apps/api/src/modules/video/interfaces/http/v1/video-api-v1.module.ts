import { Module, Provider } from '@nestjs/common';
import {
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_OS_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';

import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryQueryHandler } from '@Apps/modules/channel_history/repository/database/channel-history.query-handler';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/service/channel-history.service.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/database/channel.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/constants/channel-data.di-token.constants';

import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video-paging/find-video-page.http.controller';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';

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
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
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
