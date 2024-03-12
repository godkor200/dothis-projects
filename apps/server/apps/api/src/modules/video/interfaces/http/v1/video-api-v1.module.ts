import { Module, Provider } from '@nestjs/common';
import {
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_ENTIRE_CLUSTER_IGNITE_DI_TOKEN,
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
  VIDEO_GET_EXPECTATION_DI_TOKEN,
  VIDEO_GET_VIDEO_DATA_PAGE_SERVICE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
  VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_PAGINATED_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
} from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';
import { ChannelQueryHandler } from '@Apps/modules/channel/infrastucture/adapters/channel.query-handler';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video-paging/find-video-page.http.controller';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { GetVideoDataPageService } from '@Apps/modules/video/application/service/get-video-data.service';
import { FindIndividualVideoInfoService } from '@Apps/modules/video/application/service/find-individual-video-info.service';
import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { VIDEO_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { VideoHistoryAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.adapter';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';
import { VideoEntireCountAdapter } from '@Apps/modules/video/infrastructure/adapters/video.entire-count.adapter';
import { VideoHistoryListAdapter } from '@Apps/modules/video/infrastructure/adapters/video.history-list.adapter';
import { VideoChannelHistoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
import { VideoPaginatedAdapter } from '@Apps/modules/video/infrastructure/adapters/video.paginated.adapter';
import { VideoListAdapterEntireCluster } from '@Apps/modules/video/infrastructure/adapters/video.video-list.adapter';
import { FindAccumulateVideosV1HttpController } from '@Apps/modules/video/interfaces/http/v1/find-accumulate-videos/find-accumulate-videos.http.controller';
import { FindAccumulateVideoService } from '@Apps/modules/video/application/service/find-accumulate-video.service';
import { FindAccumulateVideosV1QueryHandler } from '@Apps/modules/video/application/queries/v1/find-accumulate-videos.query-handler';
import { FindLatestChannelHistoryByVideoAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.latest-tuple.adapter';
import { ChannelHistoryRelatedVideoAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.related-video.adapter';
import { ChannelHistoryByChannelIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.by-channel-id.adapter';
const controllers = [
  FindVideoPageHttpController,
  FindIndividualVideoInfoHttpController,
  FindAccumulateVideosV1HttpController,
];

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: CHANNEL_OS_DI_TOKEN,
    useClass: ChannelQueryHandler,
  },
  GetVideoDataPageService,
  FindVideoPageQueryHandler,
  FindAccumulateVideosV1QueryHandler,
  FindIndividualVideoInfoQueryHandler,
];
const service: Provider[] = [
  {
    provide: VIDEO_GET_VIDEO_DATA_PAGE_SERVICE_DI_TOKEN,
    useClass: GetVideoDataPageService,
  },
  {
    provide: VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
    useClass: FindIndividualVideoInfoService,
  },
  {
    provide: VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
    useClass: FindAccumulateVideoService,
  },
];
const adapters: Provider[] = [
  {
    provide: VIDEO_ENTIRE_CLUSTER_IGNITE_DI_TOKEN,
    useClass: VideoListAdapterEntireCluster,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryByChannelIdAdapter,
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
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryBaseAdapter,
  },
  {
    provide: CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
    useClass: FindLatestChannelHistoryByVideoAdapter,
  },
  {
    provide: CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryRelatedVideoAdapter,
  },
  {
    provide: VIDEO_HISTORY_IGNITE_DI_TOKEN,
    useClass: VideoHistoryAdapter,
  },
  {
    provide: VIDEO_GET_EXPECTATION_DI_TOKEN,
    useClass: VideoChannelHistoryAdapter,
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
    ...adapters,
  ],
})
export class VideoApiV1Module {}
