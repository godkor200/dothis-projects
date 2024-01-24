import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ReferenceEntity } from './reference.entity';
import { MemoEntity } from './memo.entity';

import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';

@Entity({ name: 'story_board_detail' })
export class StoryBoardDetailEntity extends IdBaseDateEntityAbstract {
  @Column({
    name: 'upload_date',
    type: 'timestamp',
    comment: '유튜브 업로드 예정일',
    nullable: true,
  })
  uploadDate: Date;

  @Column({
    name: 'description',
    type: 'text',
    comment: '설명',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'actors',
    type: 'varchar',
    length: 50,
    comment: '배우 정보',
    nullable: true,
  })
  actors: string;

  @Column({ name: 'board_id' })
  boardId: number;

  @Column({
    name: 'location',
    type: 'varchar',
    comment: '장소 정보',
    nullable: true,
  })
  location: string;

  @OneToMany(() => ReferenceEntity, (reference) => reference.storyDetail)
  references: ReferenceEntity[];

  @OneToMany(() => MemoEntity, (memo) => memo.storyDetail)
  memos: MemoEntity[];

  @OneToOne(
    () => RecentStoryBoardEntity,
    (recentStoryboard) => recentStoryboard.overview,
  )
  @JoinColumn({ name: 'board_id' })
  board: RecentStoryBoardEntity;
}
