import { Module, Provider } from '@nestjs/common';
import { C_ChannelEntityModule } from '@Apps/config/database/domain/entities/c_channel/c_channel.entity.module';
import { GetDicSearchTermCommandHandler } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepository } from '@Apps/modules/channel/v1/db/channel-data.repository';

const controllers = [];
const repositories: Provider[] = [
  GetDicSearchTermCommandHandler,
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
  },
];
@Module({
  imports: [C_ChannelEntityModule],
  controllers,
  providers: [...repositories],
})
export class ChannelApiV1Module {}
