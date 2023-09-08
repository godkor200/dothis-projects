import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@Apps/modules/user/domain/user.entity';

@Entity({ name: 'channel' })
export class ChannelEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'int', nullable: false, name: 'user_id' })
  userId?: number;

  @Column({ type: 'varchar', length: 50, name: 'channel_id' })
  channelId: string;

  @Column({ type: 'varchar', length: 100, name: 'channel_name' })
  channelName: string;

  @Column('varchar', { length: 30, nullable: true, name: 'channel_country' })
  country?: string;

  @Column('text', { nullable: true, name: 'channel_description' })
  description: string;

  @Column('text', { nullable: true, name: 'channel_keyword' })
  keyword: string;

  @Column('text', { nullable: true, name: 'channel_link' })
  link: string;

  @Column('varchar', { length: 30, name: 'channel_since' })
  since: Date;

  @Column('int', { nullable: true, name: 'channel_subscriber' })
  subscriber: number;

  @Column('text', { nullable: true, name: 'channel_tag' })
  tag: string;

  @Column('varchar', { length: 100, name: 'channel_url' })
  url: string;

  @ManyToOne((type) => User, (user) => user.channel)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
