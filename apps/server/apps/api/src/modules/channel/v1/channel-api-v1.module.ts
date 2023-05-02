import { Module, Provider } from '@nestjs/common';
import { ChannelEntityModule } from 'apps/api/src/modules/channel/repository/entity/channel.entity.module';
import { GetDicSearchTermCommandHandler } from 'apps/api/src/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { CHANNEL_DATA_REPOSITORY } from 'apps/api/src/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepository } from 'apps/api/src/modules/channel/repository/db/channel-data.repository';

const controllers = [];
const repositories: Provider[] = [
  GetDicSearchTermCommandHandler,
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
  },
];
@Module({
  imports: [ChannelEntityModule],
  controllers,
  providers: [...repositories],
})
export class ChannelApiV1Module {}
