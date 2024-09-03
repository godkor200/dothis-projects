import { Module, Provider, Scope } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';
import { FindChannelHistoryHttpController } from '@Apps/modules/channel-history/interfaces/http/controllers/v1/find-channel-history/find-channel-history.http.controller';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';

const controllers = [FindChannelHistoryHttpController];
const repositories: Provider[] = [];
@Module({
  imports: [CqrsModule, OpensearchCoreModule, ChannelHistoryServiceModule],
  controllers,
  providers: [...repositories],
})
export class ChannelHistoryV1Module {}
