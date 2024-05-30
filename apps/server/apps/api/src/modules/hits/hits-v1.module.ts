import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { GetDailyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-daily-hits/get-daily-hits.v1.http.controller';
import { CalculateDailyHitsMetricsService } from '@Apps/modules/hits/application/services/calculate-daily-hits.service';
import {
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import {
  ANALYSIS_HITS_SERVICE_DI_TOKEN,
  DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
  EXPECTED_HITS_SERVICE_DI_TOKEN,
  HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN,
  PROBABILITY_SUCCESS_SERVICE_DI_TOKEN,
  VIDEO_CHANNEL_AVERG_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_DI_TOKEN,
  WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsService } from '@Apps/modules/hits/application/services/weekly-hits.service';
import { GetWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { WeeklyHitsRepository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.repository';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';
import { ExpectedHitsService } from '@Apps/modules/hits/application/services/expected-hits.v1.service';
import { ExpectedViewsV1QueryHandler } from '@Apps/modules/hits/application/queries/expected-views.v1.query-handler';
import { VideoChannelHistoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';
import { VideoHistoryListAdapter } from '@Apps/modules/video/infrastructure/adapters/video.history-list.adapter';
import { ExpectedHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/expected-hits/expected-hits.v1.http.controller';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { GetProbabilitySuccessHttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-probability-success/get-probability-success.http.controller';
import { GetProbabilitySuccessQueryHandler } from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { GetProbabilitySuccessService } from '@Apps/modules/hits/application/services/get-probability-success.service';
import { VideoChannelAverageViewsAdapter } from '@Apps/modules/video/infrastructure/adapters/video.channel-average-views.adapter';
import { VideoLastHistoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.last-history.adapter';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryByChannelIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.by-channel-id.adapter';
import { GetSomeWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-some-weekly-hits.v1.query-handler';
import { SomeWeeklyHitsService } from '@Apps/modules/hits/application/services/some-weekly-hits.service';
import { WeeklyHitsV1Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v1.repository';
import { GetSomeWeeklyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-some-weekly-hits/get-some-weekly-hits.v1.http.controller';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';
import { AnalysisHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/analysis-hits/analysis-hits.v1.http.controller';
import { AnalysisHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/analysis-hits.v1.query-handler';
import { AnalysisHitsService } from '@Apps/modules/hits/application/services/analysis-hits.service';

const commands: Provider[] = [];
const queries: Provider[] = [
  GetDailyHitsV1QueryHandler,
  GetWeeklyHitsV1QueryHandler,
  VideoAggregateService,
  ExpectedViewsV1QueryHandler,
  GetProbabilitySuccessQueryHandler,
  GetSomeWeeklyHitsV1QueryHandler,
  AnalysisHitsV1QueryHandler,
];
const service: Provider[] = [
  {
    provide: DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
    useClass: CalculateDailyHitsMetricsService,
  },
  { provide: EXPECTED_HITS_SERVICE_DI_TOKEN, useClass: ExpectedHitsService },
  { provide: WEEKLY_VIEWS_SERVICE_DI_TOKEN, useClass: WeeklyHitsService },
  {
    provide: PROBABILITY_SUCCESS_SERVICE_DI_TOKEN,
    useClass: GetProbabilitySuccessService,
  },
  {
    provide: WEEKLY_VIEWS_SOME_SERVICE_DI_TOKEN,
    useClass: SomeWeeklyHitsService,
  },
  {
    provide: ANALYSIS_HITS_SERVICE_DI_TOKEN,
    useClass: AnalysisHitsService,
  },
  ChannelHistoryAggregateService,
];
const controllers = [
  ExpectedHitsV1HttpController,
  GetDailyHitsV1HttpController,
  GetProbabilitySuccessHttpController,
  GetSomeWeeklyHitsV1HttpController,
  AnalysisHitsV1HttpController,
];
const repositories: Provider[] = [
  WeeklyHitsRepository,
  {
    provide: VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
    useClass: VideoHistoryListAdapter,
  },
  { provide: VIDEO_COUNT_DAY_IGNITE_DI_TOKEN, useClass: VideoCountDayAdapter },
  {
    provide: HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: VideoChannelHistoryAdapter,
  },
  { provide: WEEKLY_VIEWS_REPOSITORY_DI_TOKEN, useClass: WeeklyHitsRepository },
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V1_DI_TOKEN,
    useClass: WeeklyHitsV1Repository,
  },
  {
    provide: VIDEO_CHANNEL_AVERG_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
    useClass: VideoChannelAverageViewsAdapter,
  },
  {
    provide: VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
    useClass: VideoLastHistoryAdapter,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryByChannelIdAdapter,
  },
];

@Module({
  imports: [CqrsModule, IgniteModule, WeeklyHitsEntityModule],
  controllers,
  providers: [...commands, ...queries, ...repositories, ...service],
})
export class HitsV1Module {}
