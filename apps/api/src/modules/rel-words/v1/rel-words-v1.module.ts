import { Module, Provider } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '../constants/rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/config/database/domain/entities/related_words/related_words.entity.module';
import { RelatedWordsRepository } from '../db/rel-words.repository';
import { FindRelHttpController } from './queries/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from './queries/find-rel/find-rel.query-handler';

const controllers = [FindRelHttpController];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FINDONE,
    useClass: RelatedWordsRepository,
  },
];
@Module({
  imports: [CqrsModule, RelatedWordsModule],
  controllers,
  providers: [...repositories, FindRelQueryHandler],
})
export class RelWordsApiV1Modules {}
