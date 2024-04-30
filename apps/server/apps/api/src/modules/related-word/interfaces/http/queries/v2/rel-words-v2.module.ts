import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { FindRelCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/find-rel.cache';

import { ConfigModule } from '@nestjs/config';
import { FindAutoCompleteHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.http.controller';
import { FindAutoCompleteQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.query-handler';

const controllers = [FindAutoCompleteHttpController];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  FindAutoCompleteQueryHandler,
];
@Module({
  imports: [CqrsModule, ConfigModule],
  controllers,
  providers: [...repositories],
})
export class RelWordsApiV2Modules {}
