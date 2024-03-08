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
  WEEKLY_VIEWS_REPOSITORY_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsService } from '@Apps/modules/hits/application/services/weekly-hits.service';
import { GetWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { WeeklyHitsRepository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.repository';
import { VideoCountDayAdapter } from '@Apps/modules/video/infrastructure/adapters/video.count-day.adapter';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { ExpectedHitsService } from '@Apps/modules/hits/application/services/expected-hits.v1.service';
import { ExpectedViewsV1QueryHandler } from '@Apps/modules/hits/application/queries/expected-views.v1.query-handler';
import { VideoChannelHistoryAdapter } from '@Apps/modules/video/infrastructure/adapters/video.channel-history.adapter';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';
import { VideoHistoryListAdapter } from '@Apps/modules/video/infrastructure/adapters/video.history-list.adapter';

const commands: Provider[] = [];
const queries: Provider[] = [
  GetDailyHitsV1QueryHandler,
  GetWeeklyHitsV1QueryHandler,
  VideoAggregateService,
  ExpectedViewsV1QueryHandler,
];
const service: Provider[] = [
  {
    provide: DAILY_HITS_METRICS_SERVICE_IGNITE_DI_TOKEN,
    useClass: CalculateDailyHitsMetricsService,
  },
  { provide: EXPECTED_HITS_SERVICE_DI_TOKEN, useClass: ExpectedHitsService },
  { provide: WEEKLY_VIEWS_SERVICE_DI_TOKEN, useClass: WeeklyHitsService },
  ChannelHistoryAggregateService,
];
const controllers = [
  GetDailyHitsV1HttpController,
  GetWeeklyHitsListV1HttpController,
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
];

@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commands, ...queries, ...repositories, ...service],
})
export class HitsV1Module {}
