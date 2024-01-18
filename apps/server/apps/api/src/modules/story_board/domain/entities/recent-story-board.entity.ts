import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@Apps/modules/user/domain/user.entity';
import { IdBaseDateEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';
import { StoryBoardDetailEntity } from '@Apps/modules/story_board/domain/entities/story-board-detail.entity';

@Entity({ name: 'story_board' })
export class RecentStoryBoardEntity extends IdBaseDateEntityAbstract {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title', type: 'varchar', length: 200, comment: '제목' })
  title: string;

  @Column({
    name: 'is_draft',
    default: true,
    type: 'boolean',
    comment: '임시 저장 여부',
  })
  isDraft: boolean;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => StoryBoardDetailEntity,
    (StoryBoardDetail) => StoryBoardDetail.id,
  )
  storyboard: StoryBoardDetailEntity[];
}
