import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@Apps/config/database/domain/entities/user/user.entity';
@Entity({ name: 'UserChannelData' })
export class UserChannelData {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'channel_id' })
  channelId: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column({ name: 'channel_name' })
  channelName: string;

  @Column({ name: 'channel_videos' })
  channelVideos: number;

  @Column({ name: 'channel_describer' })
  channelDescriber: number;

  @Column({ name: 'channel_views' })
  channelViews: number;

  @Column({ name: 'channel_keywords' })
  channelKeywords: string;

  @Column({ name: 'channel_used_tags' })
  channelUsedTags: string;

  @Column({ name: 'channel_tags' })
  channelTags: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne((type) => User, (user) => user.UserChannelData)
  User: User;

  constructor(
    channelId: string,
    userId: number,
    channelName: string = null,
    channelVideos: number,
    channelDescriber: number,
    channelViews: number,
    channelKeywords: string,
  ) {
    this.channelId = channelId;
    this.userId = userId;
    this.channelName = channelName;
    this.channelVideos = channelVideos;
    this.channelDescriber = channelDescriber;
    this.channelViews = channelViews;
    this.channelKeywords = channelKeywords;
  }
}
