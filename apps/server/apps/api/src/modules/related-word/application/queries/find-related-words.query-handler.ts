import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RelWordsEntity } from '@Libs/types';
import { Err, Ok, Result } from 'oxide.ts';

import { GetRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/find-related-words.request.dto';
import { RelatedWordsNotFoundError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';

@QueryHandler(GetRelatedWordsDto)
export class FindRelatedWordsQueryHandler
  implements
    IQueryHandler<
      GetRelatedWordsDto,
      Result<RelWordsEntity, RelatedWordsNotFoundError>
    >
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly query: RelatedWordsRepositoryPort,
  ) {}
  async execute(
    query: GetRelatedWordsDto,
  ): Promise<Result<RelWordsEntity, RelatedWordsNotFoundError>> {
    const res = await this.query.findOneByKeyword(query.search);
    if (!res) return Err(new RelatedWordsNotFoundError());
    return Ok(res.unwrap());
  }
}
