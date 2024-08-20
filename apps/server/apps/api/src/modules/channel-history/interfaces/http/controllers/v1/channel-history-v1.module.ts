import { Module, Provider, Scope } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { FindChannelHistoryHttpController } from '@Apps/modules/channel-history/interfaces/http/controllers/v1/find-channel-history/find-channel-history.http.controller';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';

import { FindChannelHistoryQueryHandler } from '@Apps/modules/channel-history/application/queries/find-channel-history.query-handler';

import { FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { ChannelAndHistoryJoinAdapter } from '@Apps/modules/channel/infrastucture/adapters/channel.extend-history.adapter';

const controllers = [FindChannelHistoryHttpController];
const repositories: Provider[] = [
  {
    provide: FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelAndHistoryJoinAdapter,
  },
];
@Module({
  imports: [CqrsModule, OpensearchCoreModule, ChannelHistoryServiceModule],
  controllers,
  providers: [...repositories, FindChannelHistoryQueryHandler],
})
export class ChannelHistoryV1Module {}
