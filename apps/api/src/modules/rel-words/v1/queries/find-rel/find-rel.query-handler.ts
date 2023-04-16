import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from '../../../interface/find-rel.adapter';
import { RelatedWordsEntity } from '@Apps/modules/rel-words/repository/entity/related_words.entity';

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
    return this.query.findOneByKeyword(query.keyword);
  }
}
