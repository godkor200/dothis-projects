import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { FindDailyViewV1QueryHandler } from '@Apps/modules/hits/application/commands/find-daily-view.v1.query-handler';
import { FindDailyViewV1HttpController } from '@Apps/modules/hits/http/controller/queries/v1/find-daily-view/find-daily-view.v1.http.controller';
const commands: Provider[] = [];
const queries: Provider[] = [FindDailyViewV1QueryHandler];
const controllers = [FindDailyViewV1HttpController];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commands, ...queries],
})
export class DailyViewQueryV1Module {}
