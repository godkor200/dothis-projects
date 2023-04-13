import { Column, Entity } from 'typeorm';
import { IdBaseEntityAbstract } from '../../../abstract/id.base-entity.abstract';

@Entity({ name: 'channel_history' })
export class ChannelHistoryEntity extends IdBaseEntityAbstract {
  @Column('varchar', { name: 'channel_id' })
  channelId: string;

  @Column('int', { name: 'channel_total_views' })
  totalView: number;

  @Column('int', { name: 'channel_total_videos' })
  totalVideos: number;

  @Column('float', { name: 'average_views' })
  averageViews: number;
}
