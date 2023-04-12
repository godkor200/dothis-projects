import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdBaseEntityAbstract } from '@Apps/config/database/domain/abstract/id.base-entity.abstract';
import { VideoEntity } from '@Apps/modules/video/repository/db/videos.entity';

@Entity({ name: 'daily_views' })
export class DailyViewsEntity extends IdBaseEntityAbstract {
  //1:N
  @Column({ name: 'channel_index' })
  channelIndex: number;
  //1:N
  @Column({ name: 'video_id' })
  videoId: number;

  @Column('date', { name: 'date' })
  date: Date;

  @Column('int', { name: 'views' })
  views: number;

  @ManyToOne((type) => VideoEntity, (video) => video.DailyViews)
  @JoinColumn({ name: 'video_id' })
  Video: VideoEntity;
}
