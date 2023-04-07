import { RelatedWordsEntity } from '@Apps/config/database/domain/entities/related_words/related_words.entity';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/rel-words/db/rel-words.repository.port';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from './find-rel.adapter';

export class FindRelQuery {
  readonly keyword: string;

  constructor(props: FindRelQuery) {
    this.keyword = props.keyword;
  }
}

@QueryHandler(FindRelQuery)
export class FindRelQueryHandler
  implements IQueryHandler<FindRelQuery, RelatedWordsEntity>
{
  @Inject(RELWORDS_DI_TOKEN.FINDONE) private readonly query: FindRelAdapter;
  execute(query: FindRelQuery): Promise<RelatedWordsEntity> {
    return this.query.findOneByKeyword(query);
  }
}
