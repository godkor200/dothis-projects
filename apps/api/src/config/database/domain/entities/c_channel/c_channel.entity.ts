import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'channel' })
export class C_channelEntity {
  @PrimaryGeneratedColumn({ name: 'channel_id' })
  channelId: string;

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
}
