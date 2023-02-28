import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@Apps/config/database/domain/user/User.entity';
import { Video } from '@Apps/config/database/domain/videos/Videos.entity';

@Entity({ name: 'channel' })
export class Channel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'channel_id' })
  channelId: string;

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

  @Column({ name: 'tag' })
  tag: string;

  @ManyToOne((type) => User, (user) => user.channel)
  @JoinColumn({ name: 'channel_id', referencedColumnName: 'channelId' })
  user: User;

  @OneToMany((type) => Channel, (channel) => channel.id)
  video: Video[];
}
