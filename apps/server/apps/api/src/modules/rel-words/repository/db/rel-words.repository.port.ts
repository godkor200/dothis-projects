import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { RelatedWordsEntity } from '../entity/related_words.entity';

export interface RelatedWordsRepositoryPort
  extends RepositoryPort<RelatedWordsEntity> {
  findOneByKeyword(keyword: string): Promise<RelatedWordsEntity>;

  findAllKeyword: () => Promise<{ keyword: string }[]>;
}
