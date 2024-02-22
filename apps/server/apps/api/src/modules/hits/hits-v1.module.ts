import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { GetDailyHitsV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-daily-hits/get-daily-hits.v1.http.controller';
import { HitsService } from '@Apps/modules/hits/application/services/hits.service';
import {
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
import { GetWeeklyHitsListV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-weekly-hits-list/get-weekly-hits-list.v1.http.controller';
import {
  WEEKLY_VIEWS_REPOSITORY_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsService } from '@Apps/modules/hits/application/services/weekly-hits.service';
import { GetWeeklyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v1.query-handler';
import { WeeklyHitsRepository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.repository';

const commands: Provider[] = [];
const queries: Provider[] = [
  GetDailyHitsV1QueryHandler,
  GetWeeklyHitsV1QueryHandler,
  VideoAggregateService,
];
const service: Provider[] = [
  { provide: VIDEO_SERVICE_DI_TOKEN, useClass: HitsService },
  { provide: WEEKLY_VIEWS_SERVICE_DI_TOKEN, useClass: WeeklyHitsService },
];
const controllers = [
  GetDailyHitsV1HttpController,
  GetWeeklyHitsListV1HttpController,
];
const repositories: Provider[] = [
  WeeklyHitsRepository,
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
  { provide: WEEKLY_VIEWS_REPOSITORY_DI_TOKEN, useClass: WeeklyHitsRepository },
];

@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commands, ...queries, ...repositories, ...service],
})
export class HitsV1Module {}
