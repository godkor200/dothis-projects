import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/**
 * create table request_video
 * (
 *     video_id         varchar(30)                               not null comment '유튜브 영상(쇼츠)의 video_id',
 *     user_id          varchar(30)                               not null comment '당사의 client',
 *     users_client_id  varchar(30)                               not null comment '고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨), client의 바이어',
 *     manager_id       varchar(30)                               not null comment '관리자 식별 아이디',
 *     operator_id      varchar(30)                               null comment '운영자 식별 아이디',
 *     vod_id           varchar(30)                               null comment '라이브러리 식별 아이디',
 *     is_shorts        tinyint      default 0                    not null comment '0: public, 1: private',
 *     update_date      timestamp(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6),
 *     shortform_id     varchar(30)                               null comment '쇼트폼 식별 아이디',
 *     is_keep_crawling tinyint      default 1                    not null comment '1: 크롤링 유지, 0: 크롤링 중단',
 *     is_need_crawling tinyint      default 1                    not null comment '1: video_data로 crawling 필요, 0: 이미 수집 완료',
 *     is_bad_video     tinyint      default 0                    not null comment '1: 시청 불가, 0: 시청(크롤링) 가능',
 *     webhook_url      varchar(100)                              null comment '웹훅 URL',
 *     token            text                                      not null comment '상대측 토큰',
 *     primary key (video_id, manager_id)
 * );
 */
@Entity({ name: 'request_video' })
export class RequestVideoEntity {
  @PrimaryColumn({
    length: 30,
    name: 'video_id',
    comment: '유튜브 영상(쇼츠)의 video_id',
  })
  videoId: string;

  @PrimaryColumn({
    length: 30,
    name: 'manager_id',
    comment: '관리자 식별 아이디',
    nullable: false,
  })
  managerId: string;

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

  @Column({
    name: 'shortform_id',
    length: 30,
    nullable: true,
    comment: '쇼트폼 식별 아이디',
  })
  shortformId: string;

  @Column({
    name: 'is_shorts',
    type: 'tinyint',
    default: 0,
    comment: '0: public, 1: private',
  })
  isShorts: number;

  @Column({
    name: 'is_keep_crawling',
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: '1: 크롤링 유지, 0: 크롤링 중단',
  })
  isKeepCrawling?: number;

  @Column({
    name: 'is_need_crawling',
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: '1: video_data로 crawling 필요, 0: 이미 수집 완료',
  })
  isNeedCrawling?: number;

  @Column({
    name: 'is_bad_video',
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment: '1: 시청 불가, 0: 시청(크롤링) 가능',
  })
  isBadVideo?: number;

  @Column({
    name: 'webhook_url',
    length: 100,
    nullable: true,
    comment: '웹훅 URL',
  })
  webhookUrl?: string;

  @Column({
    name: 'token',
    type: 'text',
    comment: '상대측 토큰',
  })
  token: string;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updateDate: Date;
}
