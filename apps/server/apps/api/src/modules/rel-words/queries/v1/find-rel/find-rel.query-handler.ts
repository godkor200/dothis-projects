import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from '../../../interface/find-rel.adapter';
import { RelatedWordsEntity } from '@Apps/modules/rel-words/repository/entity/related_words.entity';
import { FindRelV1Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';

@QueryHandler(FindRelV1Query)
export class FindRelQueryHandler
  implements IQueryHandler<FindRelV1Query, RelatedWordsEntity>
{
  @Inject(RELWORDS_DI_TOKEN.FIND_ONE) private readonly query: FindRelAdapter;
  execute(query: FindRelV1Query): Promise<RelatedWordsEntity> {
    return this.query.findOneByKeyword(query.keyword);
  }
}
