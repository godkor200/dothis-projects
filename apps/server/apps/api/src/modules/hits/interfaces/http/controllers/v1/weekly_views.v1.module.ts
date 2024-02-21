import { Module, Provider } from '@nestjs/common';
import { GetWeeklyViewsListV1HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v1/get-weekly-views-list/get-weekly-views-list.v1.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { GetWeeklyViewsListQueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-views-list.query-handler';

const controllers = [GetWeeklyViewsListV1HttpController];
const repositories: Provider[] = [GetWeeklyViewsListQueryHandler];
@Module({
  imports: [CqrsModule, AwsModule],
  providers: [...repositories],
  controllers,
})
export class WeeklyViewsV1Module {}
