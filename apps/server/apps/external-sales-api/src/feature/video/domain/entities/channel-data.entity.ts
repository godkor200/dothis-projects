import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('channel_data')
export class ChannelDataEntity {
  @PrimaryColumn({ type: 'char', length: 48, default: '', name: 'CHANNEL_ID' })
  channelId: string;

  @PrimaryColumn({ type: 'char', nullable: false, name: 'CHANNEL_ID_PART' })
  channelIdPart: string;

  @Column({ type: 'char', length: 255, nullable: true, name: 'CHANNEL_NAME' })
  channelName: string;

  @Column({ type: 'text', nullable: true, name: 'CHANNEL_DESCRIPTION' })
  channelDescription: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    name: 'CHANNEL_TAGS',
  })
  channelTags: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    name: 'MAINLY_USED_KEYWORDS',
  })
  mainlyUsedKeywords: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    name: 'MAINLY_USED_TAGS',
  })
  mainlyUsedTags: string;

  @Column({
    type: 'char',
    length: 100,
    nullable: true,
    name: 'CHANNEL_COUNTRY',
  })
  channelCountry: string;

  @Column({
    type: 'varchar',
    length: 8000,
    nullable: true,
    name: 'CHANNEL_LINK',
  })
  channelLink: string;

  @Column({ type: 'char', length: 24, nullable: true, name: 'CHANNEL_SINCE' })
  channelSince: string;

  @Column({
    type: 'smallint',
    default: -1,
    nullable: false,
    name: 'CHANNEL_CLUSTER',
  })
  channelCluster: number;

  @UpdateDateColumn({
    name: 'CRAWLED_DATE',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  crawledDate?: Date;

  @Column({ type: 'int', nullable: true, name: 'USER_ID' })
  userId?: number;

  @Column({ type: 'text', nullable: true, name: 'CHANNEL_THUMBNAIL' })
  channelThumbnail: string;
}
