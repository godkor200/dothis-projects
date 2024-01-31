import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { ChannelEntity } from '@Apps/modules/channel/repository/entity/channel.entity';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
enum PLAN {
  PRO = 'PRO',
  TRIAL = 'TRIAL',
  BASIC = 'BASIC',
}

enum STATE {
  LISTLESSNESS = 'LISTLESSNESS',
  VITALITY = 'VITALITY',
}
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_email', type: 'varchar' })
  userEmail: string;

  @Column({ name: 'channel_id', type: 'varchar' })
  channelId: string;

  @Column({ name: 'token_refresh', type: 'varchar' })
  tokenRefresh: string;

  @Column({ name: 'agree_promotion', type: 'varchar' })
  agreePromotion: string;

  @Column({
    type: 'enum',
    enum: PLAN,
    default: PLAN.TRIAL,
    comment: '플랜상태(PRO, TRIAL, BASIC)',
    name: 'plan',
  })
  plan: string;

  @Column({ type: 'boolean', name: 'is_admin' })
  isAdmin: boolean;

  @Column({
    type: 'enum',
    enum: STATE,
    default: STATE.VITALITY,
    comment: '회원 상태(LISTLESSNESS, VITALITY)',
    name: 'status',
  })
  status: string;

  @Column({
    type: 'timestamp',
    name: 'date_sign_in',
    comment: '생성일',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateSignIn: Date;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
    name: 'personalization_tag',
  })
  personalizationTag: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
    name: 'search_word',
  })
  searchWord: string;

  @Column({
    name: 'isEnvLocal',
    type: 'boolean',
  })
  isEnvLocal: boolean;

  @OneToMany((type) => Membership, (Membership) => Membership.userId)
  Membership: Membership[];

  @OneToMany((type) => ChannelEntity, (channel) => channel.user)
  @JoinColumn({ name: 'channel_id' })
  channel: ChannelEntity[];

  @OneToMany(
    () => StoryBoardEntity,
    (RecentStoryboard) => RecentStoryboard.user,
  )
  recentStoryboards: StoryBoardEntity[];

  static create(user: UserInfoCommandDto) {
    const newUser = new User();
    newUser.userEmail = user.userEmail;
    newUser.channelId = user.channelId;

    return newUser;
  }
}

export class UserWithGoogleToken extends User {
  accessToken: string;
  refreshToken: string;
}
