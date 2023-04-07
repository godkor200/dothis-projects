import { Column } from 'typeorm';
import { IdBaseEntityAbstract } from '../../abstract/id.base-entity.abstract';

export class RelatedWordsEntity extends IdBaseEntityAbstract {
  @Column({ name: 'keyword' })
  keyword: string;

  @Column({ name: 'rel_words' })
  relWords: string;
}
