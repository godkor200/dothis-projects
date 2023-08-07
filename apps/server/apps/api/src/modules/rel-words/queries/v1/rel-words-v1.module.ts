import { Module, Provider } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '../../constants/rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/rel-words/repository/entity/related_words.entity.module';
import { RelatedWordsRepository } from '../../repository/db/rel-words.repository';
import { FindRelHttpController as FindRelHttpV1Controller } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.query-handler';

const controllers = [FindRelHttpV1Controller];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
];
@Module({
  imports: [CqrsModule, RelatedWordsModule],
  controllers,
  providers: [...repositories, FindRelQueryHandler],
})
export class RelWordsApiV1Modules {}
