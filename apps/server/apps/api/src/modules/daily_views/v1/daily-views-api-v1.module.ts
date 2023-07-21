import { Module, Provider } from '@nestjs/common';
import { DAILY_VIEWS_DI_TOKEN } from '../constants/daily-views.di-token.contants';

import { DailyViewsEntityModule } from '../repository/entity/daliy-views.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DailyViewsRepository } from '../repository/db/daily-views.repository';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoRepository } from '@Apps/modules/video/database/video.repository';
import { FindDailyViewsHttpController } from './queries/find-daily-views/find-daily-views.http.controller';
import { FindDailyViewsQueryHandler } from './queries/find-daily-views/find-daily-views.query-handler';

const controllers = [FindDailyViewsHttpController];
const repositories: Provider[] = [
  FindDailyViewsQueryHandler,
  {
    provide: DAILY_VIEWS_DI_TOKEN.FIND,
    useClass: DailyViewsRepository,
  },
  {
    provide: VIDEO_DI_TOKEN.FIND_BY_VIDEO_ID,
    useClass: VideoRepository,
  },
];

@Module({
  imports: [CqrsModule, DailyViewsEntityModule],
  controllers,
  providers: [...repositories],
})
export class DailyViewsApiV1Module {}
