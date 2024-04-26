import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { RelWordsEntity } from '@Libs/commons/src/interfaces/types/res.types';
import { Err, Ok, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { GetRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/find-related-words.request.dto';

@QueryHandler(GetRelatedWordsDto)
export class FindRelatedWordsQueryHandler
  implements
    IQueryHandler<
      GetRelatedWordsDto,
      Result<RelWordsEntity, RelwordsNotFoundError>
    >
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly query: FindRelatedWordOutboundPort,
  ) {}
  async execute(
    query: GetRelatedWordsDto,
  ): Promise<Result<RelWordsEntity, RelwordsNotFoundError>> {
    const res = await this.query.findOneByKeyword(query.search);
    if (!res) return Err(new RelwordsNotFoundError());
    return Ok(res);
  }
}
