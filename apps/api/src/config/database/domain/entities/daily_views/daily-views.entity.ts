import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Video } from '@Apps/config/database/domain/entities/videos/videos.entity';
import { IdBaseEntityAbstract } from '@Apps/config/database/domain/abstract/id.base-entity.abstract';
@Entity({ name: 'daily_views' })
export class DailyViews extends IdBaseEntityAbstract {
  @Column({ name: 'views' })
  views: number;

  //1:N
  @Column({ name: 'channel_index' })
  channelIndex: number;
  //1:N
  @Column({ name: 'video_id' })
  videoId: number;

  @ManyToOne((type) => Video, (video) => video.DailyViews)
  @JoinColumn({ name: 'videoId' })
  Video: Video;
}
