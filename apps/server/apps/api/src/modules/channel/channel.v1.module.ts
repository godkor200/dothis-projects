import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindInfluentialListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/find-influential-list/find-influential-list.http.controller';
import { FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { FindInfluentialListService } from '@Apps/modules/channel/application/service/find-influential-list.service';
import { FindInfluentialListQueryHandler } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
import { ChannelListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-channel-list.http.controller';
import { GetChannelListService } from '@Apps/modules/channel/application/service/get-channel-list.service';
import {
  CHANNEL_DATA_LIST_DI_TOKEN,
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
} from '@Apps/modules/channel/channel.di-token';
import { ChannelSearchAdapter } from '@Apps/modules/channel/infrastucture/adapters';
import { GetChannelInfoAdapter } from '@Apps/modules/channel/infrastucture/adapters/get-channel-info.adapter';
const controllers = [
  FindInfluentialListHttpController,
  ChannelListHttpController,
];

const service: Provider[] = [
  {
    provide: FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN,
    useClass: FindInfluentialListService,
  },
  GetChannelListService,
];
const adapter: Provider[] = [
  {
    provide: CHANNEL_DATA_LIST_DI_TOKEN,
    useClass: ChannelSearchAdapter,
  },
  {
    provide: CHANNEL_INFO_ADAPTER_DI_TOKEN,
    useClass: GetChannelInfoAdapter,
  },
];
const queries: Provider[] = [FindInfluentialListQueryHandler];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...service, ...adapter, ...queries],
})
export class ChannelApiV1Module {}
