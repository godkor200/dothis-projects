import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CHANNEL_HISTORY_IGNITE_DI_TOKEN,
  CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
} from '@Apps/modules/channel-history/channel-history.di-token.constants';

import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindChannelHistoryHttpController } from '@Apps/modules/channel-history/interfaces/http/controllers/v1/find-channel-history/find-channel-history.http.controller';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';
import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { FindChannelHistoryQueryHandler } from '@Apps/modules/channel-history/application/queries/find-channel-history.query-handler';
import { FindLatestChannelHistoryByVideoAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.latest-tuple.adapter';
import { FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { ChannelAndHistoryJoinAdapter } from '@Apps/modules/channel/infrastucture/adapters/channel.extend-history.adapter';
const controllers = [FindChannelHistoryHttpController];
const repositories: Provider[] = [
  {
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryBaseAdapter,
  },
  {
    provide: CHANNEL_HISTORY_LATEST_TUPLE_IGNITE_DI_TOKEN,
    useClass: FindLatestChannelHistoryByVideoAdapter,
  },
  {
    provide: FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelAndHistoryJoinAdapter,
  },
];
@Module({
  imports: [CqrsModule, AwsModule, ChannelHistoryServiceModule],
  controllers,
  providers: [...repositories, FindChannelHistoryQueryHandler],
})
export class ChannelHistoryV1Module {}
