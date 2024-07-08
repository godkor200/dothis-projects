import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('channel_data')
export class ChannelEntity {
  @PrimaryColumn({ name: 'CHANNEL_ID', type: 'char', length: 48, default: '' })
  channelId: string;

  @PrimaryColumn({ name: 'channel_id_part', type: 'char', length: 1 })
  channelIdPart: string;

  @Column({ name: 'CHANNEL_NAME', type: 'char', length: 255, nullable: true })
  channelName: string;

  @Column({ name: 'CHANNEL_DESCRIPTION', type: 'text', nullable: true })
  channelDescription: string;

  @Column({
    name: 'CHANNEL_TAGS',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  channelTags: string;

  @Column({
    name: 'MAINLY_USED_KEYWORDS',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  keyword: string;

  @Column({
    name: 'MAINLY_USED_TAGS',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  tag: string;

  @Column({
    name: 'CHANNEL_COUNTRY',
    type: 'char',
    length: 100,
    nullable: true,
  })
  channelCountry: string;

  @Column({
    name: 'CHANNEL_LINK',
    type: 'varchar',
    length: 8000,
    nullable: true,
  })
  channelLink: string;

  @Column({ name: 'CHANNEL_SINCE', type: 'char', length: 24, nullable: true })
  channelSince: string;

  @Column({ name: 'CHANNEL_CLUSTER', type: 'smallint', default: -1 })
  channelCluster: number;

  @Column({ name: 'CRAWLED_DATE', type: 'timestamp', nullable: true })
  crawledDate: Date;

  @Column({ name: 'USER_ID', type: 'int', nullable: true })
  userId: number;
}
