import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/**
 create table request_channel
 (
 channel_id      varchar(48)                         not null comment '대상 채널 아이디'
 primary key,
 user_id         varchar(20)                         not null comment '당사 클라이언트 아이디',
 users_client_id varchar(20)                         null comment '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨), client의 바이어',
 update_date     timestamp default CURRENT_TIMESTAMP null
 );
 */

@Entity({ name: 'request_channel' })
export class RequestChannelsEntity {
  @PrimaryColumn({ type: 'varchar', length: 48, name: 'channel_id' })
  channelId: string;

  @Column({ type: 'varchar', length: 20, name: 'user_id', nullable: false })
  userId: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'users_client_id',
    nullable: true,
  })
  usersClientId: string;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'update_date',
  })
  updateDate: Date;
}
