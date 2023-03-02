import { Module, Provider } from '@nestjs/common';
import { ChannelModule } from '@Apps/config/database/domain/channel/ChannelModule';
import { GetDicSearchTermHttpController } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-search-term.http.controller';
import { GetDicSearchTermCommandHandler } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { CHANNEL_DATA_REPOSITORY } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelDataRepository } from '@Apps/modules/channel/v1/db/channel-data.repository';

const controllers = [GetDicSearchTermHttpController];
const repositories: Provider[] = [
  GetDicSearchTermCommandHandler,
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
  },
];
@Module({
  imports: [ChannelModule],
  controllers,
  providers: [...repositories],
})
export class ChannelApiV1Module {}
