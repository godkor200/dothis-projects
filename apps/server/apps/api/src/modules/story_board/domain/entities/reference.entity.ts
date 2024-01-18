import { Column, Entity } from 'typeorm';
import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { StoryBoardDetailEntity } from '@Apps/modules/story_board/domain/entities/story-board-detail.entity';

@Entity({ name: 'reference' })
export class ReferenceEntity extends IdBaseDateEntityAbstract {
  @Column({ type: 'varchar', length: 2000, comment: 'URL' })
  url: string;

  @Column({ type: 'varchar', length: 200, comment: '카테고리' })
  category: string;

  @Column({ name: 'story_id' })
  storyId: number;
}
