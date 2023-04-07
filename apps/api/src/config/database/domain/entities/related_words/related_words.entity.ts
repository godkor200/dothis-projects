import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IdBaseEntityAbstract } from '../../abstract/id.base-entity.abstract';

@Entity({ name: 'related_words' })
export class RelatedWordsEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'keyword' })
  keyword: string;

  @Column({ name: 'rel_words' })
  relWords: string;
}
