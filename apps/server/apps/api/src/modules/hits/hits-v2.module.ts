import { Module, Provider } from '@nestjs/common';
import {
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { GetWeeklyHitsListV2HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v2/get-weekly-hits-list/get-weekly-hits-list.v2.http.controller';
import { WeeklyHitsV2Service } from '@Apps/modules/hits/application/services/weekly-hits.v2.service';
import { GetWeeklyHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v2.query-handler';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
const controllers = [GetWeeklyHitsListV2HttpController];
const query: Provider[] = [GetWeeklyHitsV2QueryHandler];
const service: Provider[] = [
  { provide: WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN, useClass: WeeklyHitsV2Service },
];
const repository: Provider[] = [
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
];
@Module({
  imports: [CqrsModule, WeeklyHitsEntityModule],
  controllers,
  providers: [...service, ...query, ...repository],
})
export class HitsV2Module {}
