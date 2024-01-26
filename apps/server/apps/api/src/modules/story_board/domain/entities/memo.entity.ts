import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoryBoardOverviewEntity } from '@Apps/modules/story_board/domain/entities/story-board-overview.entity';

@Entity({ name: 'memo' })
export class MemoEntity extends IdBaseDateEntityAbstract {
  @Column({ name: 'board_id', nullable: false })
  boardId: number;

  @Column({ type: 'varchar', length: 200, comment: '제목', nullable: true })
  title: string;

  @Column({ type: 'text', comment: '내용' })
  content: string;

  @ManyToOne(
    () => StoryBoardOverviewEntity,
    (storyBoardDetailEntity) => storyBoardDetailEntity.memos,
  )
  @JoinColumn({ name: 'board_id' })
  storyOverview: StoryBoardOverviewEntity;
}
