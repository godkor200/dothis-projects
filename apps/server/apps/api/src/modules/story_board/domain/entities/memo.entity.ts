import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'memo' })
export class MemoEntity extends IdBaseDateEntityAbstract {
  @Column({ name: 'story_id' })
  storyId: number;

  @Column({ type: 'varchar', length: 200, comment: '제목' })
  title: string;

  @Column({ type: 'text', comment: '내용' })
  content: string;
}
