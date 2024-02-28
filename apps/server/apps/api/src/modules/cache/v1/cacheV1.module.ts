import { Module, Provider } from '@nestjs/common';
import { FindDicTermHttpController } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CACHE_FIND_ALL_QUERY,
  CACHE_SET_DIC_TERM,
} from 'apps/api/src/modules/cache/constants/cache.di-token';
import { FindDicTermImplement } from 'apps/api/src/modules/cache/infra/find-dic-term.implement';
import { FindDicTermService } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.service';
import { SetDicTermImplement } from 'apps/api/src/modules/cache/infra/set-dic-term.implement';
import { SetDicTermHandler } from 'apps/api/src/modules/cache/v1/commands/set-dic-term/set-dic-term.service';
import {
  CHANNEL_DATA_REPOSITORY,
  CHANNEL_TERM,
} from '@Apps/modules/channel/channel-data.di-token.constants';
import { GetDicSearchTermCommandHandler } from 'apps/api/src/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { ChannelDataRepository } from 'apps/api/src/modules/channel/repository/db/channel-data.repository';
import { SetDicTermHttpController } from 'apps/api/src/modules/cache/v1/commands/set-dic-term/set-dic-term.http.controller';
import { ChannelEntityModule } from 'apps/api/src/modules/channel/repository/entity/channel.entity.module';

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
  /**
   * 현재 이 기능은 쓰지 않음 11/2
   */
  // controllers,
  // providers,
})
export class CacheV1Module {}
