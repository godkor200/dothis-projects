import { Module, Provider } from '@nestjs/common';
import { DAILY_VIEWS_DI_TOKEN } from '../constants/daily-views.di-token.contants';
import { DailyViewsEntityModule } from '../repository/entity/daliy-views.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DailyViewsRepository } from '../repository/db/daily-views.repository';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/constants/videos.di-token.constants';
import { FindDailyViewsAntenaHttpController } from './queries/find-daily-views/find-daily-views.http.controller';
import { FindDailyViewsQueryAthenaHandler } from './queries/find-daily-views/find-daily-views.query-handler';
import { VideoService } from '@Apps/modules/video/repository/repository/video.service';

const controllers = [FindDailyViewsAntenaHttpController];
const repositories: Provider[] = [
  FindDailyViewsQueryAthenaHandler,
  //   {
  //     provide: DAILY_VIEWS_DI_TOKEN.FIND,
  //     useClass: DailyViewsRepository,
  //   },
  {
    provide: VIDEO_DI_TOKEN.ATHENA_FIND_BY_VIDEO_ID,
    useClass: VideoService,
  },
];

@Module({
  imports: [CqrsModule, DailyViewsEntityModule],
  controllers,
  providers: [...repositories],
})
export class DailyViewsApiV2Module {}
