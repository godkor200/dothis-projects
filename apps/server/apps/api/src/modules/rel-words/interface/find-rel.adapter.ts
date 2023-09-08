import { RelatedWordsEntity } from 'apps/api/src/modules/rel-words/repository/entity/related_words.entity';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelatedWordsEntity>;

  findAllKeyword: () => Promise<string[]>;
}
