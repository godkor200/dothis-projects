import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { GetDailyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-daily-hits/get-daily-hits.v1.http.controller';
import { CalculateDailyHitsMetricsService } from '@Apps/modules/hits/application/services/calculate-daily-hits.service';
import {
  VIDEO_COUNT_DAY_IGNITE_DI_TOKEN,
  VIDEO_HISTORY_LIST_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { GetWeeklyHitsListV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-weekly-hits-list/get-weekly-hits-list.v1.http.controller';
import {
  DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
  EXPECTED_HITS_SERVICE_DI_TOKEN,
  HITS_VIDEO_CHANNEL_HISTORY_IGNITE_DI_TOKEN,
  PROBABILITY_SUCCESS_SERVICE_DI_TOKEN,
  VIDEO_CHANNEL_AVERG_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_DI_TOKEN,
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

const commands: Provider[] = [];
const queries: Provider[] = [
  GetDailyHitsV1QueryHandler,
  GetWeeklyHitsV1QueryHandler,
  VideoAggregateService,
  ExpectedViewsV1QueryHandler,
  GetProbabilitySuccessQueryHandler,
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
  ChannelHistoryAggregateService,
];
const controllers = [
  ExpectedHitsV1HttpController,
  GetDailyHitsV1HttpController,
  GetWeeklyHitsListV1HttpController,
  GetProbabilitySuccessHttpController,
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
  imports: [CqrsModule, WeeklyHitsEntityModule],
  controllers,
  providers: [...commands, ...queries, ...repositories, ...service],
})
export class HitsV1Module {}
