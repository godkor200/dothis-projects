import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { RelatedWordsEntity } from '../entity/related_words.entity';
import { Result } from 'oxide.ts';
import { RelatedWordsNotFoundError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
export type RelatedWordsRepositoryFindOneByKeywordRes = Result<
  RelatedWordsEntity,
  RelatedWordsNotFoundError
>;
export interface RelatedWordsRepositoryPort
  extends RepositoryPort<RelatedWordsEntity> {
  findOneByKeyword(
    keyword: string,
  ): Promise<RelatedWordsRepositoryFindOneByKeywordRes>;

  findAllKeyword: () => Promise<{ keyword: string }[]>;
}
