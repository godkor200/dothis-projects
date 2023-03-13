import { Module, Provider } from '@nestjs/common';
import { FindDicTermHandler } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.handler';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CACHE_FIND_ALL_QUERY,
  CACHE_SET_DIC_TERM,
} from '@Apps/modules/cache/constants/cache.di-token';
import { FindDicTermImplement } from '@Apps/modules/cache/v1/infra/find-dic-term.implement';
import { FindDicTermService } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.service';
import { SetDicTermImplement } from '@Apps/modules/cache/v1/infra/set-dic-term.implement';
import { SetDicTermHandler } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.service';

const controllers = [FindDicTermHandler];

const infra: Provider[] = [
  {
    provide: CACHE_FIND_ALL_QUERY,
    useClass: FindDicTermImplement,
  },
  {
    provide: CACHE_SET_DIC_TERM,
    useClass: SetDicTermImplement,
  },
  FindDicTermService,
];

const providers: Provider[] = [...infra, SetDicTermHandler];

@Module({
  imports: [CqrsModule],
  controllers,
  providers,
})
export class CacheV1Module {}
