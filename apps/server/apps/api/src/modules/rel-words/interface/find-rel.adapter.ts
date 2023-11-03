import { RelatedWordsEntity } from 'apps/api/src/modules/rel-words/repository/entity/related_words.entity';
import { RelwordsRes } from '@Libs/commons/src/types/dto.types';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelwordsRes>;

  findAllKeyword: () => Promise<string[]>;
}
