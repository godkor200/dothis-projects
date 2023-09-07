import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@Apps/modules/user/domain/user.entity';

@Entity({ name: 'channel' })
export class ChannelEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'channel_id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'channel_name' })
  channelName: string;

  @Column('varchar', { name: 'channel_country' })
  country: string;

  @Column('varchar', { name: 'channel_description' })
  description: string;

  @Column('varchar', { name: 'channel_keyword' })
  keyword: string;

  @Column('varchar', { name: 'channel_link' })
  link: string;

  @Column('date', { name: 'channel_since' })
  since: Date;

  @Column({ name: 'channel_subscriber' })
  subscriber: number;

  @Column('varchar', { name: 'channel_tag' })
  tag: string;

  @Column('varchar', { name: 'channel_url' })
  url: string;

  @ManyToOne((type) => User, (user) => user.channel)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
