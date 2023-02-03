import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Video } from '@Libs/entity/src/domain/videos/Videos.entity';

@Entity({ name: 'Channel' })
export class Channel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'channel_id' })
  channelId: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'channel_name' })
  channelName: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'subscriber' })
  subscriber: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'since' })
  since: Date;

  @Column({ name: 'total_views' })
  totalViews: number;

  @Column({ name: 'total_videos' })
  totalVideos: number;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'link' })
  link: string;

  @Column({ name: 'keyword' })
  keyword: string;

  @Column({ name: 'total_normal_videos' })
  totalNormalVideos: number;

  @ManyToOne((type) => User, (user) => user.UserChannelData)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @OneToMany((type) => Channel, (channel) => channel.id)
  Video: Video[];
}
