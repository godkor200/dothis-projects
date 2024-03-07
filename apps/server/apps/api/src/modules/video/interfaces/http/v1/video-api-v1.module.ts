import { Module, Provider } from '@nestjs/common';
import {
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_GET_EXPECTATION_DI_TOKEN,
  VIDEO_GET_VIDEO_DATA_PAGE_SERVICE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_PAGINATED_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/infrastucture/adapters/channel.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video-paging/find-video-page.http.controller';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { GetVideoDataPageService } from '@Apps/modules/video/application/service/get-video-data.service';
import { FindIndividualVideoInfoService } from '@Apps/modules/video/application/service/find-individual-video-info.service';
import { ChannelHistoryAdapter } from '@Apps/modules/channel_history/infrastructure/adapters/channel-history.adapter';
import { VIDEO_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryAdapter } from '@Apps/modules/video_history/infrastructure/adapters/video-history.adapter';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';
import { VideoEntireCountAdapter } from '@Apps/modules/video/infrastructure/adapters/video.entire-count.adapter';
import { VideoHistoryListAdapter } from '@Apps/modules/video/infrastructure/adapters/video.history-list.adapter';
import { VideoChannelHistoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
import { ExpectedHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/expected-hits/expected-hits.v1.http.controller';
import { VideoPaginatedAdapter } from '@Apps/modules/video/infrastructure/adapters/video.paginated.adapter';
const controllers = [
  FindVideoPageHttpController,
  FindIndividualVideoInfoHttpController,
  ExpectedHitsV1HttpController,
];

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoBaseAdapter },

  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
  { provide: VIDEO_COUNT_DAY_IGNITE_DI_TOKEN, useClass: VideoCountDayAdapter },
  {
    provide: VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
    useClass: VideoEntireCountAdapter,
  },
  { provide: VIDEO_PAGINATED_IGNITE_DI_TOKEN, useClass: VideoPaginatedAdapter },
  {
    provide: VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
    useClass: VideoHistoryListAdapter,
  },
  {
    provide: VIDEO_GET_VIDEO_DATA_PAGE_SERVICE_DI_TOKEN,
    useClass: GetVideoDataPageService,
  },
  {
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryAdapter,
  },
  {
    provide: VIDEO_HISTORY_IGNITE_DI_TOKEN,
    useClass: VideoHistoryAdapter,
  },
  {
    provide: VIDEO_GET_EXPECTATION_DI_TOKEN,
    useClass: VideoChannelHistoryAdapter,
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
  controllers,
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    VideoAggregateService,
    ...service,
  ],
})
export class VideoApiV1Module {}
