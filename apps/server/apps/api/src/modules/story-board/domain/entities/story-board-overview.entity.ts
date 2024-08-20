import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { ReferenceEntity } from './reference.entity';
import { MemoEntity } from './memo.entity';

import { IdBaseDateEntityAbstract } from '@Libs/commons/abstract/db.base-entity.abstract';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';

@Entity({ name: 'story_board_overview' })
export class StoryBoardOverviewEntity extends IdBaseDateEntityAbstract {
  @Column({
    name: 'upload_date',
    type: 'timestamp',
    comment: '유튜브 업로드 예정일',
    nullable: true,
  })
  uploadDate: Date;

  @Column({
    name: 'create_date',
    type: 'timestamp',
    comment: '작성일자',
    nullable: true,
  })
  createDate: Date;

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

  @OneToMany(() => ReferenceEntity, (reference) => reference.storyOverview, {
    cascade: true,
  })
  references: ReferenceEntity[];

  @OneToMany(() => MemoEntity, (memo) => memo.storyOverview, { cascade: true })
  memos: MemoEntity[];

  @OneToOne(() => StoryBoardEntity, (storyboard) => storyboard.overview)
  @JoinColumn({ name: 'board_id' })
  board: StoryBoardEntity;
}
