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

@Entity({ name: 'channel' })
export class Channel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'channel_name' })
  channelName: string;

  @Column({ name: 'channel_url' })
  channelUrl: string;

  @Column({ name: 'channel_subscriber' })
  channelSubsciber: number;

  @Column({ name: 'channel_description' })
  channelDescription: string;

  @Column({ name: 'channel_since' })
  channelSince: Date;

  @Column({ name: 'channel_total_views' })
  channelTotalWiews: number;

  @Column({ name: 'channel_total_videos' })
  channelTotalVideos: number;

  @Column({ name: 'channel_normal_videos' })
  channelNomalVideos: number;

  @Column({ name: 'channel_country' })
  channelCountry: string;

  @Column({ name: 'channel_link' })
  channelLink: string;

  @ManyToOne((type) => User, (user) => user.UserChannelData)
  @JoinColumn({ name: 'userId' })
  User: User;

  @OneToMany((type) => Channel, (channel) => channel.id)
  Video: Video[];
}
