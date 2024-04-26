import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindInfluentialListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/find-influential-list/find-influential-list.http.controller';
import {
  FIND_CHANNEL_PROFILE_IGNITE_DI_TOKEN,
  FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN,
} from '@Apps/modules/channel/channel-data.di-token.constants';
import { FindInfluentialListService } from '@Apps/modules/channel/application/service/find-influential-list.service';
import { InfluentialChannelProfileAdapter } from '@Apps/modules/channel/infrastucture/adapters/influential-channel-profile.adapter';
import { FindInfluentialListQueryHandler } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
const controllers = [FindInfluentialListHttpController];

const service: Provider[] = [
  {
    provide: FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN,
    useClass: FindInfluentialListService,
  },
];
const adapter: Provider[] = [
  {
    provide: FIND_CHANNEL_PROFILE_IGNITE_DI_TOKEN,
    useClass: InfluentialChannelProfileAdapter,
  },
];
const queries: Provider[] = [FindInfluentialListQueryHandler];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...service, ...adapter, ...queries],
})
export class ChannelApiV1Module {}
