import { RelatedWordsEntity } from '@Apps/modules/rel-words/repository/entity/related_words.entity';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelatedWordsEntity>;
}
