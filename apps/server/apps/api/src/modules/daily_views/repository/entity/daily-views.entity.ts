import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdBaseEntityAbstract } from 'apps/api/src/config/database/domain/abstract/id.base-entity.abstract';
import { VideoEntity } from 'apps/api/src/modules/video/repository/db/videos.entity';

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
