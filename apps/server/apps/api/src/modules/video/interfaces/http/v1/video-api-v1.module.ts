import { Module, Provider } from '@nestjs/common';
import {
  RedisCacheAdapterTokens,
  TOP_VIDEO_ADAPTER_DI_TOKEN,
  VIDEO_ADS_INFO_IGNITE_DI_TOKEN,
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_CATEGORY_ADAPTER_DI_TOKEN,
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
  VIDEO_DATA_ADAPTER_DI_TOKEN,
  VIDEO_DURATION_LENGTH_DO_TOKEN,
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
  VIDEO_GET_ADS_INFO_DI_TOKEN,
  VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN,
  VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN,
  VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN,
  VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
  VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_PAGINAED_ADAPTER_DI_TOKEN,
  VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN,
  VIDEO_PUBILSHED_ADAPTER_DI_TOKEN,
  VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';

import { FindIndividualVideoInfoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';
import { FindIndividualVideoInfoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-individual-video-info/find-individual-video-info.http.controller';
import { FindIndividualVideoInfoService } from '@Apps/modules/video/application/service/find-individual-video-info.service';

import {
  VIDEO_HISTORY_GET_DATA_STREAM_DI_TOKEN,
  VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_IGNITE_DI_TOKEN,
} from '@Apps/modules/video-history/video_history.di-token';
import { VideoHistoryGetListByIdsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.get-list-by-ids.adapter';
import { VideoHistoryGetMultipleByIdAdapter } from '@Apps/modules/video-history/infrastructure/adapters';
import {
  VIDEO_PERFORMANCE_DI_TOKEN,
  VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import {
  VideoDurationLengthAdapter,
  VideoPaginatedAdapter,
} from '@Apps/modules/video/infrastructure/adapters';
import { FindIssueTodayQueryHandler } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { FindIssueTodayService } from '@Apps/modules/video/application/service/find-issue-today.service';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { FindIssueTodayHttpController } from '@Apps/modules/video/interfaces/http/v1/find-issue-today/find-issue-today.http.controller';
import { VideoMultiKeywordCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.muti-keyword.cache.adapter';
import { GetTopVideoHistoryAdapter } from '@Apps/modules/video-history/infrastructure/adapters/get-top-video-history.adapter';
import { GetVideoTodayIssueCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.get-today-issue.cache.adapter';
import { SetVideoTodayIssueCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.set-today-issue.cache.adapter';
import { MockGetVideoAdsInfoAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-video-ads-info.adapter.mock';
import {
  CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
} from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { MockGetChannelHistoryLastestAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-lastest.adapter.mock';
import { MockVideoHistory } from '@Apps/modules/video-history/infrastructure/adapters/__mock__/video-history.mock';
import { MockGetRelatedVideo } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-related-video.mock';
import { MockGetChannelHistoryByIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/__mock__/get-channel-history-by-id.adapter.mock';
import { MockGetTopHitsVideoAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-top-hits-video.adapter.mock';
import { MockGetUnknownAdapter } from '@Apps/modules/video/infrastructure/adapters/__mock__/get-unknown.adapter.mock';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-paging/find-video-page.http.controller';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v2/find-video-page.query-handler';
import { GetVideoDataPaginatedService } from '@Apps/modules/video/application/service/get-video-data.paginated.service';
import { GetVideoHistoryDataStream } from '@Apps/modules/video-history/infrastructure/adapters/get-video-history.data-stream';
import { VideoDataAdapter } from '@Apps/modules/video/infrastructure/adapters/video_data.adapter';
import { CHANNEL_DATA_DI_TOKEN } from '@Apps/modules/channel/channel.di-token';
import { ChannelDataAdapter } from '@Apps/modules/channel/infrastucture/adapters/channel_data.adapter';
import { VideoPublishedAdapter } from '@Apps/modules/video/infrastructure/adapters/video.published.adapter';
import { FindVideosCountHttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-count/find-video-count.http.controller';
import { TopVideoAdapter } from '@Apps/modules/video/infrastructure/adapters/top-video.adapter';
import { FindVideoCountService } from '@Apps/modules/video/application/service/find-video-count.service';
import { FindVideoCountQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import { GetDurationLengthHttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-duration-length.http.controller';
import { VideoDurationLengthService } from '@Apps/modules/video/application/service/video.duration-length.service';
import { FindCategoryIssueVideoController } from '@Apps/modules/video/interfaces/http/v1/find-category-issue-video.http.controller';
import { FindCategoryIssueVideoQueryHandler } from '@Apps/modules/video/application/queries/v1/find-category-issue-video.query-handler';
import { VideoCategoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.category.adapter';
import { ScrollService } from '@Apps/common/opensearch/service/opensearch.scroll-api.service';

const controllers = [
  FindVideoPageHttpController,
  FindVideosCountHttpController,
  FindIssueTodayHttpController,
  GetDurationLengthHttpController,
  FindCategoryIssueVideoController,
];

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  //FindAccumulateVideosV1QueryHandler,
  //FindIndividualVideoInfoQueryHandler,
  // FindAdsInfoQueryHandler,
  // FindAdsTopHitsQueryHandler,
  //FindPerformanceLengthQueryHandler,
  FindVideoPageQueryHandler,
  FindIssueTodayQueryHandler,
  FindVideoCountQueryHandler,
  FindCategoryIssueVideoQueryHandler,
];
const service: Provider[] = [
  // { provide: VIDEO_ADS_INFO_IGNITE_DI_TOKEN, useClass: FindAdsInfoService },
  // {
  //   provide: VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN,
  //   useClass: FindIndividualVideoInfoService,
  // },
  // {
  //   provide: VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN,
  //   useClass: FindAccumulateVideoService,
  // },
  // {
  //   provide: VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN,
  //   useClass: FindAdsTopHitsService,
  // },
  // {
  //   provide: VIDEO_PERFORMANCE_LENGTH_GET_VIDEO_SERVICE_DI_TOKEN,
  //   useClass: FindPerformanceLengthService,
  // },
  {
    provide: VIDEO_GET_TODAY_ISSUE_SERVICE_DI_TOKEN,
    useClass: FindIssueTodayService,
  },
  {
    provide: VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN,
    useClass: GetVideoDataPaginatedService,
  },
  {
    provide: VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
    useClass: FindVideoCountService,
  },
  VideoDurationLengthService,
  ScrollService,
];

const adapters: Provider[] = [
  {
    provide: VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetMultipleByIdAdapter,
  },
  {
    provide: VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetListByIdsAdapter,
  },
  {
    provide: VIDEO_MULTI_KEYWORD_WORDS_ADAPTER_DI_TOKEN,
    useClass: VideoMultiKeywordCacheAdapter,
  },
  {
    provide: VIDEO_TOP_VIEWS_ADAPTER_DI_TOKEN,
    useClass: GetTopVideoHistoryAdapter,
  },
  {
    provide: RedisCacheAdapterTokens.REDIS_CLIENT_SET_TODAY_ISSUE_DI_TOKEN,
    useClass: SetVideoTodayIssueCacheAdapter,
  },
  {
    provide: RedisCacheAdapterTokens.REDIS_CLIENT_GET_TODAY_ISSUE_DI_TOKEN,
    useClass: GetVideoTodayIssueCacheAdapter,
  },
  {
    provide: VIDEO_GET_ADS_INFO_DI_TOKEN,
    useClass: MockGetVideoAdsInfoAdapter,
  },
  {
    provide: CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryLastestAdapter,
  },
  {
    provide: VIDEO_HISTORY_IGNITE_DI_TOKEN,
    useClass: MockVideoHistory,
  },
  {
    provide: CHANNEL_HISTORY_GET_RELATE_VIDEO_IGNITE_DI_TOKEN,
    useClass: MockGetRelatedVideo,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: MockGetChannelHistoryByIdAdapter,
  },
  {
    provide: VIDEO_GET_ADS_TOP_HITS_IGNITE_DI_TOKEN,
    useClass: MockGetTopHitsVideoAdapter,
  },
  {
    provide: VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
    useClass: MockGetUnknownAdapter,
  },
  {
    provide: VIDEO_PAGINAED_ADAPTER_DI_TOKEN,
    useClass: VideoPaginatedAdapter,
  },
  {
    provide: VIDEO_HISTORY_GET_DATA_STREAM_DI_TOKEN,
    useClass: GetVideoHistoryDataStream,
  },

  {
    provide: CHANNEL_DATA_DI_TOKEN,
    useClass: ChannelDataAdapter,
  },
  {
    provide: VIDEO_PUBILSHED_ADAPTER_DI_TOKEN,
    useClass: VideoPublishedAdapter,
  },
  {
    provide: TOP_VIDEO_ADAPTER_DI_TOKEN,
    useClass: TopVideoAdapter,
  },
  {
    provide: VIDEO_DURATION_LENGTH_DO_TOKEN,
    useClass: VideoDurationLengthAdapter,
  },
  {
    provide: VIDEO_DATA_ADAPTER_DI_TOKEN,
    useClass: VideoDataAdapter,
  },
  { provide: VIDEO_CATEGORY_ADAPTER_DI_TOKEN, useClass: VideoCategoryAdapter },
];

const repositories: Provider[] = [
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
];

@Module({
  imports: [
    CqrsModule,
    OpensearchCoreModule,
    ChannelHistoryServiceModule,
    WeeklyHitsEntityModule,
  ],
  controllers,
  providers: [
    ...repositories,
    ...queryHandlers,
    ...commandHandlers,
    ...service,
    ...adapters,
  ],
})
export class VideoApiV1Module {}
