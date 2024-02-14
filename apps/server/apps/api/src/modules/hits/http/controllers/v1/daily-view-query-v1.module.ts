import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { FindDailyViewV1QueryHandler } from '@Apps/modules/hits/application/queries/find-daily-view.v1.query-handler';
import { FindDailyViewV1HttpController } from '@Apps/modules/hits/http/controllers/v1/find-daily-view/find-daily-view.v1.http.controller';
import { VideoService } from '@Apps/modules/video/application/service/video.service';
import {
  VIDEO_IGNITE_DI_TOKEN,
  VIDEO_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/constants/video.di-token';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';
const commands: Provider[] = [];
const queries: Provider[] = [
  FindDailyViewV1QueryHandler,
  VideoAggregateService,
  { provide: VIDEO_SERVICE_DI_TOKEN, useClass: VideoService },
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
];
const controllers = [FindDailyViewV1HttpController];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commands, ...queries],
})
export class DailyViewQueryV1Module {}
