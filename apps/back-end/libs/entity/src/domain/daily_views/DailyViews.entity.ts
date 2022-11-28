import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'daily_views' })
export class DailyViews {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'views' })
  views: number;

  //1:N
  @Column({ name: 'channel_index' })
  channelIndex: number;
  //1:N
  @Column({ name: 'video_id' })
  videoId: number;
}
