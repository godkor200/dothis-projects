import { Module, Provider } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '../../constants/rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/rel-words/repository/entity/related_words.entity.module';
import { RelatedWordsRepository } from '../../repository/db/rel-words.repository';
import { FindRelHttpController as FindRelHttpV1Controller } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.query-handler';
import { UpdateAutoCompleteWordsHttpController } from '@Apps/modules/rel-words/command/v1/update-auto-complete-words/update-auto-complete-words.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/rel-words/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { FindRelCache } from '@Apps/modules/rel-words/repository/cache/find-rel.cache';

const controllers = [
  FindRelHttpV1Controller,
  UpdateAutoCompleteWordsHttpController,
];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
];

const handler = [FindRelQueryHandler, UpdateAutoCompleteWordsCommandHandler];
@Module({
  imports: [CqrsModule, RelatedWordsModule],
  controllers,
  providers: [...repositories, ...handler],
})
export class RelWordsApiV1Modules {}
