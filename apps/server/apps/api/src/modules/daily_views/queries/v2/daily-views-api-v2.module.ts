import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindDailyViewsOsHttpController } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.v2.http.controller';

import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindDailyViewsQueryOsHandler } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.v2.query-handler';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryQueryHandler } from '@Apps/modules/video_history/database/video_history.query-handler';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';

const controllers = [FindDailyViewsOsHttpController];
const repositories: Provider[] = [
  FindDailyViewsQueryOsHandler,
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  {
    provide: VIDEO_HISTORY_OS_DI_TOKEN,
    useClass: VideoHistoryQueryHandler,
  },
];

@Module({
  imports: [CqrsModule, AwsModule],
  controllers,
  providers: [...repositories],
})
export class DailyViewsApiV2Module {}
