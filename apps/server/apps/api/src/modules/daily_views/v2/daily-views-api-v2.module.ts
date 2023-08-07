import { Module, Provider } from '@nestjs/common';
import { DAILY_VIEWS_DI_TOKEN } from '../constants/daily-views.di-token.contants';
import { DailyViewsEntityModule } from '../repository/entity/daliy-views.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DailyViewsRepository } from '../repository/db/daily-views.repository';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindDailyViewsOsHttpController } from './queries/find-daily-views/find-daily-views.http.controller';

import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindDailyViewsQueryOsHandler } from '@Apps/modules/daily_views/v2/queries/find-daily-views/find-daily-views.query-handler';
import { VIDEO_HISTORY_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryQueryHandler } from '@Apps/modules/video_history/database/video_history.query-handler';

const controllers = [FindDailyViewsOsHttpController];
const repositories: Provider[] = [
  FindDailyViewsQueryOsHandler,
  {
    provide: VIDEO_DI_TOKEN.OS_FIND_BY_VIDEO_ID,
    useClass: VideoQueryHandler,
  },
  {
    provide: VIDEO_HISTORY_DI_TOKEN.FIND_HISTORY,
    useClass: VideoHistoryQueryHandler,
  },
];

@Module({
  imports: [CqrsModule, AwsModule],
  controllers,
  providers: [...repositories],
})
export class DailyViewsApiV2Module {}
