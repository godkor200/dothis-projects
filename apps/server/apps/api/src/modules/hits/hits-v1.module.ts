import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { GetDailyViewV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-daily-view/get-daily-view.v1.http.controller';
import { HitsService } from '@Apps/modules/hits/application/services/hits.service';
import {
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';

import { GetWeeklyViewsListV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-weekly-views-list/get-weekly-views-list.v1.http.controller';
const commands: Provider[] = [];
const queries: Provider[] = [GetDailyHitsV1QueryHandler, VideoAggregateService];
const service: Provider[] = [
  { provide: VIDEO_SERVICE_DI_TOKEN, useClass: HitsService },
];
const controllers = [
  GetDailyViewV1HttpController,
  GetWeeklyViewsListV1HttpController,
];
const repositories: Provider[] = [
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
];

@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commands, ...queries, ...repositories, ...service],
})
export class HitsV1Module {}
