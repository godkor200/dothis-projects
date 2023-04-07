import { RelatedWordsEntity } from '@Apps/config/database/domain/entities/related_words/related_words.entity';
import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';

export interface RelatedWordsRepositoryPort
  extends RepositoryPort<RelatedWordsEntity> {
  findOneByKeyword(keyword: string): Promise<RelatedWordsEntity>;
}
