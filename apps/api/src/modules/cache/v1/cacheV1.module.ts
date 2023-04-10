import { Module, Provider } from '@nestjs/common';
import { FindDicTermHttpController } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CACHE_FIND_ALL_QUERY,
  CACHE_SET_DIC_TERM,
} from '@Apps/modules/cache/constants/cache.di-token';
import { FindDicTermImplement } from '@Apps/modules/cache/infra/find-dic-term.implement';
import { FindDicTermService } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.service';
import { SetDicTermImplement } from '@Apps/modules/cache/infra/set-dic-term.implement';
import { SetDicTermHandler } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.service';
import {
  CHANNEL_DATA_REPOSITORY,
  CHANNEL_TERM,
} from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { GetDicSearchTermCommandHandler } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { ChannelDataRepository } from '@Apps/modules/channel/db/channel-data.repository';
import { SetDicTermHttpController } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.http.controller';
import { ChannelEntityModule } from '@Apps/config/database/domain/entities/channel/channel.entity.module';

const controllers = [FindDicTermHttpController, SetDicTermHttpController];

const infra: Provider[] = [
  {
    provide: CACHE_FIND_ALL_QUERY,
    useClass: FindDicTermImplement,
  },
  {
    provide: CACHE_SET_DIC_TERM,
    useClass: SetDicTermImplement,
  },
  {
    provide: CHANNEL_TERM,
    useClass: GetDicSearchTermCommandHandler,
  },
  {
    provide: CHANNEL_DATA_REPOSITORY,
    useClass: ChannelDataRepository,
  },
  FindDicTermService,
];

const providers: Provider[] = [...infra, SetDicTermHandler];

@Module({
  imports: [
    CqrsModule,
    //  ChannelEntityModule
    ChannelEntityModule,
  ],
  controllers,
  providers,
})
export class CacheV1Module {}
