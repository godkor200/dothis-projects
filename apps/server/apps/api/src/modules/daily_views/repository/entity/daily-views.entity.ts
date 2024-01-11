import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { VideoEntity } from '@Apps/modules/video/domain/videos.entity';
import { IdBaseEntityAbstract } from '@Libs/commons/src/abstract/db.base-entity.abstract';

@Entity({ name: 'daily_views' })
export class DailyViewsEntity extends IdBaseEntityAbstract {
  //1:N
  @Column({ name: 'channel_index' })
  channelIndex: number;
  //1:N
  @Column({ name: 'video_id' })
  videoId: number;

  @Column('int', { name: 'views' })
  views: number;

  @ManyToOne((type) => VideoEntity, (video) => video.DailyViews)
  @JoinColumn({ name: 'video_id' })
  Video: VideoEntity;
}
