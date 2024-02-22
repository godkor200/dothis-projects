import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/constants/rel-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelAdapter } from '../../../interface/find-rel.adapter';
import { FindRelV1Query } from '@Apps/modules/related-word/interface/dtos/find-rel.dto';
import { RelWordsEntity } from '@Libs/commons/src/interfaces/types/res.types';
import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/relwords.errors';

@QueryHandler(FindRelV1Query)
export class FindRelQueryHandler
  implements
    IQueryHandler<
      FindRelV1Query,
      Result<RelWordsEntity, RelwordsNotFoundError>
    >
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE) private readonly query: FindRelAdapter,
  ) {}
  async execute(
    query: FindRelV1Query,
  ): Promise<Result<RelWordsEntity, RelwordsNotFoundError>> {
    const res = await this.query.findOneByKeyword(query.keyword);
    if (!res) return Err(new RelwordsNotFoundError());
    return Ok(res);
  }
}
