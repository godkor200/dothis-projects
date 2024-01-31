import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { StoryBoardOverviewEntity } from '@Apps/modules/story-board/domain/entities/story-board-overview.entity';

/**
 * s3에서 받아 url 에 저장
 */
@Entity({ name: 'reference' })
export class ReferenceEntity extends IdBaseDateEntityAbstract {
  @Column({ type: 'varchar', length: 2000, comment: 'URL', nullable: false })
  url: string;

  @Column({ type: 'varchar', length: 200, comment: '카테고리', nullable: true })
  category: string;

  @Column({ name: 'board_id', nullable: false })
  boardId: number;

  @ManyToOne(
    () => StoryBoardOverviewEntity,
    (storyBoardDetailEntity) => storyBoardDetailEntity.boardId,
  )
  @JoinColumn({ name: 'board_id' })
  storyOverview: StoryBoardOverviewEntity;
}
