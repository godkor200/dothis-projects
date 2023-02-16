import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Channel } from '../channel/Channel.entity';
import { DailyViews } from '@Apps/api/src/config/database/domain/daily_views/DailyViews.entity';
@Entity({ name: 'video' })
export class Video {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'channel_index' })
  channelIndex: number;

  @Column({ name: 'video_title' })
  videoTitle: string;

  @Column({ name: 'video_url' })
  videoUrl: string;

  @Column({ name: 'video_description' })
  videoDescription: string;

  @Column({ name: 'video_duration' })
  videoDuration: number;

  @Column({ name: 'video_published' })
  videoPublished: string;

  @Column({ name: 'video_views' })
  videoViews: string;

  @Column({ name: 'video_likes' })
  videoLikes: number;

  @Column({ name: 'video_tags' })
  videoTags: string;

  @Column({ name: 'video_category' })
  videoCategory: string;

  @Column({ name: 'video_info_card' })
  videoInfoCard: string;

  @Column({ name: 'video_with_ads' })
  videoWithAds: string;

  @Column({ name: 'video_end_screen' })
  videoEndScreen: string;

  @Column({ name: 'video_core_keyword' })
  videoCoreKeyword: string;

  @Column({ name: 'video_average_views' })
  videoAverageViews: number;

  @Column({ name: 'video_timestamp' })
  videoTimestamp: Date;

  @ManyToOne((type) => Channel, (channel) => channel.video)
  @JoinColumn({ name: 'channelIndex' })
  Channel: Channel;

  @OneToMany((type) => DailyViews, (dailyViews) => dailyViews.videoId)
  DailyViews: DailyViews[];
}
