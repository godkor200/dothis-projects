import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('video_data_shorts')
export class VideoDataShortsEntity {
  @PrimaryColumn({ type: 'varchar', length: 11, name: 'video_id' })
  videoId: string;

  @PrimaryColumn({ type: 'int', width: 4, name: 'year', default: 2000 })
  year: number;

  @PrimaryColumn({ type: 'int', width: 2, name: 'month', default: 1 })
  month: number;

  @PrimaryColumn({ type: 'int', width: 2, name: 'day', default: 1 })
  day: number;

  @Column({ type: 'varchar', length: 52, name: 'channel_id' })
  channelId: string;

  @Column({
    type: 'varchar',
    length: 2000,
    name: 'video_title',
    nullable: true,
  })
  videoTitle: string;

  @Column({ type: 'text', name: 'video_description', nullable: true })
  videoDescription: string;

  @Column({ type: 'varchar', length: 4000, name: 'video_tags', nullable: true })
  videoTags: string;

  @Column({
    type: 'int',
    width: 6,
    name: 'video_duration',
    default: 0,
    nullable: true,
  })
  videoDuration: number;

  @Column({ type: 'datetime', name: 'video_published', nullable: true })
  videoPublished: Date;

  @Column({ type: 'varchar', length: 50, name: 'video_category', default: '' })
  videoCategory: string;

  @Column({ type: 'int', width: 1, name: 'video_info_card', nullable: true })
  videoInfoCard: number;

  @Column({ type: 'int', width: 1, name: 'video_with_ads', nullable: true })
  videoWithAds: number;

  @Column({ type: 'int', width: 1, name: 'video_end_screen', nullable: true })
  videoEndScreen: number;

  @Column({ type: 'int', width: 6, name: 'video_cluster', nullable: true })
  videoCluster: number;

  @UpdateDateColumn({
    name: 'crawled_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  crawledDate: Date;
}
