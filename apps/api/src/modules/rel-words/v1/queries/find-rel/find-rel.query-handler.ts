import { RelatedWordsEntity } from '@Apps/config/database/domain/entities/related_words/related_words.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
  execute(query: FindRelQuery): Promise<RelatedWordsEntity> {}
}
