import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChannelData {
  @PrimaryGeneratedColumn({ name: 'channel_id' })
  channelId: number;

  @Column({ name: 'user_id' })
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
}
