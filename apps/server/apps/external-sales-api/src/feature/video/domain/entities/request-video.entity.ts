import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/**
 * create table request_video
 * (
 *     video_id        varchar(30)                         not null comment '유튜브 영상(쇼츠)의 video_id'
 *         primary key,
 *     user_id         varchar(30)                         not null comment '당사의 client',
 *     users_client_id varchar(30)                         not null comment '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨), client의 바이어',
 *     manager_id      varchar(30)                         null comment '관리자 식별 아이디',
 *     operator_id     varchar(30)                         null comment '운영자 식별 아이디',
 *     vod_id          varchar(30)                         null comment '라이브러리 식별 아이디',
 *     is_shorts       tinyint(1)                          not null,
 *     update_date     timestamp default CURRENT_TIMESTAMP null
 * )
 *     comment '영상 크롤링 등록 테이블';
 */
@Entity({ name: 'request_video' })
export class RequestVideoEntity {
  @PrimaryColumn({
    length: 30,
    name: 'video_id',
    comment: '유튜브 영상(쇼츠)의 video_id',
  })
  videoId: string;

  @Column({ length: 30, name: 'user_id', comment: '당사의 client' })
  userId: string;

  @Column({
    name: 'users_client_id',
    length: 30,
    comment:
      '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨), client의 바이어',
  })
  usersClientId: string;

  @Column({
    name: 'is_shorts',
    type: 'tinyint',
    default: 0,
    comment: '0: public, 1: private',
  })
  isShorts: number;

  @Column({
    name: 'manager_id',
    length: 30,
    nullable: true,
    comment: '관리자 식별 아이디',
  })
  managerId: string;

  @Column({
    name: 'operator_id',
    length: 30,
    nullable: true,
    comment: '운영자 식별 아이디',
  })
  operatorId: string;

  @Column({
    name: 'vod_id',
    length: 30,
    nullable: true,
    comment: '라이브러리 식별 아이디',
  })
  vodId: string;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updateDate: Date;
}
