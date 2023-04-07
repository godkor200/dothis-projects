import { RelatedWordsEntity } from '@Apps/config/database/domain/entities/related_words/related_words.entity';
import { FindRelQuery } from './find-rel.query-handler';

export interface FindRelAdapter {
  findOne: (option: FindRelQuery) => Promise<RelatedWordsEntity>;
}
