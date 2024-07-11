import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'request_video' })
export class RequestVideoEntity {
  @PrimaryColumn({ length: 20, name: 'user_id' })
  userId: string;

  @Column({
    name: 'users_client_id',
    length: 20,
    comment: '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨)',
  })
  usersClientId: string;

  @PrimaryColumn({ length: 48, name: 'video_id' })
  videoId: string;

  @Column({ name: 'is_shorts', type: 'tinyint', default: 0 })
  isShorts: number;

  @Column({
    name: 'public_flag',
    type: 'tinyint',
    default: 0,
    comment: '0: public, 1: private',
  })
  publicFlag: number;

  @CreateDateColumn({
    name: 'create_date',
    type: 'timestamp',
    nullable: true,
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    nullable: true,
  })
  updateDate: Date;
}
