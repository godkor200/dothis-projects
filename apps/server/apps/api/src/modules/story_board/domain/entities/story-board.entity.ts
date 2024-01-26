import {
  Entity,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@Apps/modules/user/domain/user.entity';
import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { StoryBoardOverviewEntity } from '@Apps/modules/story_board/domain/entities/story-board-overview.entity';

@Entity({ name: 'story_board' })
export class StoryBoardEntity extends IdBaseDateEntityAbstract {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 200,
    comment: '제목',
    default: '제목 없음',
  })
  title: string;

  @Column({
    name: 'is_draft',
    default: true,
    type: 'boolean',
    comment: '임시 저장 여부',
  })
  isDraft: boolean;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    () => StoryBoardOverviewEntity,
    (StoryBoardDetail) => StoryBoardDetail.board,
  )
  overview: StoryBoardOverviewEntity;
}
