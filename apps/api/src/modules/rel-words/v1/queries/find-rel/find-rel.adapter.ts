import { RelatedWordsEntity } from '@Apps/config/database/domain/entities/related_words/related_words.entity';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelatedWordsEntity>;
}
