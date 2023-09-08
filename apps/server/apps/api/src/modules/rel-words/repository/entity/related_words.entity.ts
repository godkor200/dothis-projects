import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'related_words' })
export class RelatedWordsEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, name: 'keyword' })
  keyword: string;

  @Column({ nullable: false, name: 'rel_words' })
  relWords: string;

  @Column({ nullable: true, name: 'cluster' })
  cluster: string;
}
