import { Module, Provider } from '@nestjs/common';
import { FindDicTermHandler } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CACHE_FIND_ALL_QUERY } from '@Apps/modules/cache/constants/cache.contants';
import { FindDicTermImplement } from '@Apps/modules/cache/v1/infra/find-dic-term.implement';

const controllers = [FindDicTermHandler];

const infra: Provider[] = [
  {
    provide: CACHE_FIND_ALL_QUERY,
    useClass: FindDicTermImplement,
  },
];

const providers: Provider[] = [...infra];
@Module({
  imports: [CqrsModule],
  controllers,
  providers,
})
export class CacheV1Module {}
