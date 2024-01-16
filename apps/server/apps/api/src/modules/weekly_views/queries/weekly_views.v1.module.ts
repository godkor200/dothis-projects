import { Module, Provider } from '@nestjs/common';
import { GetWeeklyViewsListV1HttpController } from '@Apps/modules/weekly_views/queries/v1/get-weekly-views-list/get-weekly-views-list.v1.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { GetWeeklyViewsListQueryHandler } from '@Apps/modules/weekly_views/queries/v1/get-weekly-views-list/get-weekly-views-list.query-handler';
import { WEEKLY_VIEWS_REPOSITORY_BY_OS } from '@Apps/modules/weekly_views/constants/weekly_views.di-token.constants';
import { WeeklyViewsQueryHandler } from '@Apps/modules/weekly_views/repository/database/weekly-views.query-handler';
const controllers = [GetWeeklyViewsListV1HttpController];
const repositories: Provider[] = [
  GetWeeklyViewsListQueryHandler,
  {
    provide: WEEKLY_VIEWS_REPOSITORY_BY_OS,
    useClass: WeeklyViewsQueryHandler,
  },
];
@Module({
  imports: [CqrsModule, AwsModule],
  providers: [...repositories],
  controllers,
})
export class WeeklyViewsV1Module {}
